// pages/ffsj/ffsj.js
const app = getApp();
var token;
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        price: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
            success: function (res) {
                bcode = res.data.user_id;
                console.log(bcode + "----")
            },
        })
        wx.getStorage({
            key: 'token',
            success: function(res) {
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appShareAllinace/getupgradeprice.do",
                    data: {
                        token: res.data
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res.data.data)
                        that.setData({
                            price: res.data.data
                        })

                    }
                })
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
        title: '一手明星资源，尽在娱乐世界！',
        path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
      }
    },
    ffsj: function(e){
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function(res) {
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appwechatxcx/payXcxUpgrade.do",
                    data: {
                        token: res.data,
                        payType: 2
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.data.status == 100) {
                            wx.hideLoading();
                            wx.requestPayment({
                                timeStamp: res.data.data.sign.timeStamp,
                                nonceStr: res.data.data.sign.nonceStr,
                                package: res.data.data.sign.package,
                                signType: 'MD5',
                                paySign: res.data.data.sign.paySign,
                                success(res) {
                                    wx.showToast({
                                        title: '提交成功',
                                        icon: 'none',
                                        duration: 1000
                                    })
                                    wx.switchTab({
                                        url: '../mine/mine',
                                    })
                                },
                                fail(res) { }
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
        })
    }
})