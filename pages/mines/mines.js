// pages/mines/mines.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     user:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getuser();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function(res) {
        console.log(res.data)
          that.setData({
              user: res.data
          });
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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
      title: '一手明星资源，尽在娱乐世界！',
      path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
    }
  },
   //共享联盟
   share:function(){
     var that = this;
     wx.navigateTo({
       url: '../share-pay/share-pay',
     })
    //  if (that.data.user.shareIdentityType == 0){
    //    wx.request({
    //      url: app.data.urlhead + "/ylsj-api-service/appShareAllinace/isShareAllinace.do",
    //      data: {
    //        token: wx.getStorageSync('token'),

    //      },
    //      method: 'POST',
    //      header: {
    //        'content-type': 'application/x-www-form-urlencoded'
    //      },
    //      dataType: 'json',
    //      success: function (res) {
    //        console.log(res.data.data)
    //        if (res.data.status == 100) {
    //          if (res.data.data.isAudit == 1) {
    //            wx.navigateTo({
    //              url: '../share_home/share_home',
    //            })
    //          }else{
    //            wx.navigateTo({
    //              url: '../share_pay/share_pay',
    //            })
    //          }

    //        } else if (res.data.status == 103) {
    //          wx.showToast({
    //            title: res.data.msg,
    //            icon: 'none',
    //            duration: 500
    //          })
    //          wx.navigateTo({
    //            url: '../login/login',
    //          })
    //        }  else {
    //          wx.showToast({
    //            title: res.data.msg,
    //            icon: 'none',
    //            duration: 500
    //          })
    //        }

    //      }
    //    })
    //  }else{
    //    wx.navigateTo({
    //      url: '../share_home/share_home',
    //    })
    //  }
     
   
  },
  //钱包
  find:function(){
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  //预约订单
  make:function(){
    wx.navigateTo({
      url: '../mine_make/mine_make',
    })
  },
  plone:function(){
    wx.makePhoneCall({
      phoneNumber: '4008292878' //仅为示例，并非真实的电话号码
    })
  },
  //经济人
  gl_artist: function (e) {
    wx.navigateTo({
      url: '../gl_artist/gl_artist',
    })
  },
  getuser(){
    let that = this;
    wx.request({
      url: app.data.urlmall + "/appuser/userinfo.do",
      data: {
        token:wx.getStorageSync('token'),
       
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
          console.log(res.data.data)
          if (res.data.status == 100) {
            that.setData({
              userinfo:res.data.data
            })
             
           
          }else if(res.data.status == 103){
              wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 500
              })
              wx.navigateTo({
                url: '../login/login',
              })
          } else {
              wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 500
              })
          }

      }
    })
  },
  isagent: function(e){
    wx.request({
        url: app.data.urlhead + "/ylsj-api-service/appagent/getAgent.do",
        data: {
            token: wx.getStorageSync('token')
        },
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
            if (res.data.data == 0) {
                wx.navigateTo({
                    url: '../agent_enter/agent_enter',
                })
            } else if (res.data.data == 1) {
                wx.showToast({
                    title: '经纪人身份审核中',
                    icon: 'none'
                })
            } else if (res.data.data == 2) {
                wx.showToast({
                    title: '当前已是经纪人身份',
                    icon: 'none'
                })
            } else if (res.data.data == 3) {
                wx.navigateTo({
                    url: '../agent_fail/agent_fail',
                })
            }
        }
    });
},
})