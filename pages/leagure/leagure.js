// pages/leagure/leagure.js
const app = getApp();
var token;
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: []
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
            success: function (res) {
                token = res.data;
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appShareAllinace/shareAllinace.do",
                    data: {
                        token: token
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
                                data: res.data.data
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
    torecord: function(e){
        wx.navigateTo({
            url: '../share_record/share_record',
        })
    },
    myorder: function(e){
        wx.navigateTo({
            url: '../share_order/share_order',
        })
    },
    mymy: function(e){
        wx.navigateTo({
            url: '../wd_myou/wd_myou',
        })
    },
    applying: function(e){
        wx.navigateTo({
            url: '../fzmysq/fzmysq',
        })
    },
    fzmy: function(e){
        wx.navigateTo({
            url: '../fz_myou/fz_myou',
        })
    },
    sharecode: function(e){
        wx.navigateTo({
            url: '../share_code/share_code',
        })
    },
    syzn: function(e){
        wx.navigateTo({
            url: '../syzn/syzn',
        })
    },
    shengji: function(e){
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function(res) {
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appShareAllinace/checkupgrade.do",
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
                        if (res.data.data == 0) {
                            wx.navigateTo({
                                url: '../ffsj/ffsj',
                            })
                        } else {
                            wx.navigateTo({
                                url: '../upgrade/upgrade',
                            })
                        }

                    }
                })
            },
        })
    }
})