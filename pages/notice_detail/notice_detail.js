// pages/notice_detail/notice_detail.js
var announcement_id;
var token;
const app = getApp();
var datas = [];
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datas: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.showLoading();
        wx.getStorage({
            key: 'token',
            success: function(res) {
                token = res.data;
            },
        })
        wx.setNavigationBarTitle({
            title: '通告详情',
        });
        announcement_id = options.notice_id;
        setTimeout(function() {
            wx.request({
                url: app.data.urlhead + "/ylsj-api-service/appannouncement/announcementDetails.do",
                data: {
                    announcement_id: announcement_id,
                    token: token
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function(res) {
                    console.log(res.data.data)
                    wx.showLoading();
                    if(res.data.status == 100){
                        wx.hideLoading();
                        datas = res.data.data;
                        that.setData({
                            datas: datas
                        });
                        console.log(datas)
                    }else{
                        wx.hideLoading();
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                }
            })
        }, 500);
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
            success: function (res) {
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

        var that = this;
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
        title: that.data.datas.announcement_title,
        path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
      }
    },
    seepw: function(e){
        wx.showModal({
            title: '提示',
            content: '开通Vip方可查看',
            success(res) {
                if (res.confirm) {
                    

                } else if (res.cancel) {

                }
            }
        })

    }
})