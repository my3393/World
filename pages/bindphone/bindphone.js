// pages/bindphone/bindphone.js
var timer = require('../../utils/timer.js');
const app = getApp();
var phone = '';
var stoken;
var vcode;
var token;
var bcode;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '绑定手机号',
    })
    wx.getStorage({
      key: 'token',
      success: function(res) {
        token = res.data;
      },
    })
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/appgetToken/getRandomNum.do",
      data: {

      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function(res) {
        if (res.data.status == 100) {
          stoken = res.data.data;
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        bcode = res.data.user_id;
        console.log(bcode + "----")
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log(wx.getStorageSync("userinfo").is_actor)
    var isactor = wx.getStorageSync("userinfo").is_actor;
    var isleagure = wx.getStorageSync("userinfo").shareIdentityType;
    var hasdiol = wx.getStorageSync("userinfo").idol_id;
    var bcode;
    var scode;
    if (isactor == 2) {
      bcode = wx.getStorageSync("userinfo").user_id;
      scode = wx.getStorageSync("userinfo").user_id;
    } else if (isleagure != 0 && hasdiol == null) {
      bcode = wx.getStorageSync("userinfo").user_id;
      scode = wx.getStorageSync("userinfo").user_id;
    } else if (isleagure != 0 && hasdiol != null) {
      bcode = wx.getStorageSync("userinfo").idol_id;
      scode = wx.getStorageSync("userinfo").user_id;
    } else if (hasdiol != null || hasdiol != "") {
      bcode = wx.getStorageSync("userinfo").idol_id;
      scode = wx.getStorageSync("userinfo").user_id;
    } else {
      bcode = wx.getStorageSync("userinfo").user_id;
      scode = wx.getStorageSync("userinfo").user_id;
    }
    return {
      title: '明星家园，我为自己代言',
      path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
    }
  },
  getphone: function(e) {
    phone = e.detail.value;
  },
  getcode: function(e) {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none'
      });
      return true;
    }
    if (phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    }
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/applogin/sendSms/binding.do",
      data: {
        phone: phone,
        token: stoken
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function(res) {
        if (res.data.status == 100) {
          
          wx.showToast({
            title: '发送成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  getvcode: function(e) {
    vcode = e.detail.value;
  },
  bind: function(e) {
    if (phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    }
    if (vcode == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return false;
    }
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/appbindphone/weixinbindphone.do",
      data: {
        vcode: vcode,
        phone: phone,
        token: token
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function(res) {
        if (res.data.status == 100) {
          wx.showToast({
            title: '绑定成功',
            icon: 'none',
            duration: '1000',
          });
          wx.request({
            url: "https://app.apiv1.0.xingtu-group.cn/ylsj-api-service/applogin3/xcx/userinfo.do",
            data: {
              token: wx.getStorageSync("token")
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
              console.log(res.data.data);
              wx.setStorage({
                key: 'token',
                data: res.data.data.token,
              })
              wx.setStorage({
                key: 'userinfo',
                data: res.data.data.user,
              })
              // if (res.data.data.user.phone == null || res.data.data.user.phone == ''){
              //     wx.redirectTo({
              //         url: '../bindphone/bindphone',
              //     })
              // }
            }
          })
          setTimeout(function() {
            wx.switchTab({
              url: '../index/index',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  }
})