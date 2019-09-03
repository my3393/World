// pages/build_xr/build_xr.js
const app = getApp();
var bcode;
var id;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ids: 1,
        data1: [],
        data2: [],
        data3: [],
        data: [],
        tprice: '',
        lprice: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '新人孵化',
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
        var that = this;
        wx.showLoading();
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                bcode = res.data.user_id;
                console.log(bcode + "----")
            },
        })
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/apppayservice/payservice.do",
            data: {
                type: 1
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    wx.hideLoading();
                    that.setData({
                        data: res.data.data,
                        data1: res.data.data[0],
                        data2: res.data.data[1],
                        data3: res.data.data[2],
                        tprice: res.data.data[0].promotionalPrice,
                        lprice: res.data.data[0].originalPrice,
                        ids: 1
                    })
                    id = res.data.data[0].id
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function(e) {
        var that = this;
        id = that.data.data[0].id;
        that.setData({
            tprice: that.data.data[0].promotionalPrice,
            lprice: that.data.data[0].originalPrice,
            ids: 1
        })
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
        title: '一手明星资源，尽在娱乐世界！',
        path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
      }
    },
    selects: function(e) {
        var that = this;
        that.setData({
            ids: e.currentTarget.id,
            tprice: that.data.data[e.currentTarget.id - 1].promotionalPrice,
            lprice: that.data.data[e.currentTarget.id - 1].originalPrice
        })
        id = that.data.data[e.currentTarget.id - 1].id
    },
    pay: function(e) {
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appwechatxcx/payservice/payxcx.do",
            data: {
                id: id,
                token: wx.getStorageSync("token"),
                payType: 2,
                shareUserId: wx.getStorageSync("bcode")
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    wx.requestPayment({
                        timeStamp: res.data.data.sign.timeStamp,
                        nonceStr: res.data.data.sign.nonceStr,
                        package: res.data.data.sign.package,
                        signType: 'MD5',
                        paySign: res.data.data.sign.paySign,
                        success(res) {
                            wx.showToast({
                                title: '支付成功',
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
                        icon: 'none'
                    })
                }
            }
        })
    }
})