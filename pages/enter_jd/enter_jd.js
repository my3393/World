// pages/enter_jd/enter_jd.js
const app = getApp();
var currentPage = 1;
var is_actor = 1;
var bcode;
var datas = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],
        num: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '艺人入驻进度',
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                bcode = res.data.user_id;
                console.log(bcode + "----")
            },
        })
        var that = this;
        wx.showLoading();
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appmyartist/myApplyArtist.do",
            data: {
                token: wx.getStorageSync('token'),
                is_actor: is_actor,
                currentPage: currentPage
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                
                if (res.data.data.totalPage == 0){
                    wx.showToast({
                        title: '当前类别暂无数据',
                        icon: 'none',
                        duration: 500
                    })
                    datas = [];
                    that.setData({
                        data: datas
                    })
                }else{
                    if (currentPage > res.data.data.totalPage) {
                        wx.showToast({
                            title: '已加载全部',
                            icon: 'none',
                            duration: 500
                        })
                    } else {
                        if (res.data.status == 100) {
                            wx.hideLoading();
                            for (var i in res.data.data.artists) {
                                datas.push(res.data.data.artists[i])
                            }
                            that.setData({
                                data: datas
                            })
                        }
                    }
                }

            }
        });
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

        currentPage = 1;
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
        datas = [];
        is_actor = 1;
        var that = this;
        that.setData({
            data: []
        })
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
        currentPage = currentPage + 1;
        this.onLoad();
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
    changes: function(e){
        is_actor = e.currentTarget.id;
        this.onLoad();
        datas = [];
        currentPage = 1;
        var that = this;
        that.setData({
            num: e.currentTarget.id
        }) 
    }
})