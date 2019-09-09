// pages/star_extend/star_extend.js
const app = getApp();
var currentPage = 1;
var banner = [];
var adver = [];
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banner: [],
        adver: [],
        peitao: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.showLoading();
        that.getlist();
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
        console.log("onshow")
        var that = this;
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
      var that = this;
      if(currentPage == that.data.totalPage){
          wx.showToast({
            title: '没有更多了',
            icon:'none'
          })
      }else{
        currentPage = currentPage + 1;
        that.getlist();
      }

    },
    top:function(e){
      console.log(e)
      wx.navigateTo({
        url: '../e_top/e_top?id=' + e.currentTarget.id + '&user_id=' + e.currentTarget.dataset.user_id,
      })
    },
    hot: function (e) {
      console.log(e)
      wx.navigateTo({
        url: '../e_hot/e_hot?id=' + e.currentTarget.id + '&user_id=' + e.currentTarget.dataset.user_id,
      })
    },
    getlist:function(){
      var that = this;
      wx.request({
        url: app.data.urlhead + "/ylsj-api-service/apppspread/startHome.do",
        data: {
          currentPage: currentPage
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
          console.log(res.data.data)
          if (res.data.status == 100) {
            wx.hideLoading();
           
            for (var i in res.data.data.advertises) {
              adver.push(res.data.data.advertises[i]);
            }
            that.setData({
              banner: res.data.data.banners,
              adver: adver,
              totalPage: res.data.data.totalPage
            });
            console.log(that.data.banner)
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
    tostardetail: function(e){
        wx.navigateTo({
            url: '../star_detail/star_detail?spread_id=' + e.currentTarget.id,
        })
    },
    promot: function(e){
       wx.navigateTo({
         url: '../star_promote/star_promote',
       })
    },
    topeitao: function(e){
        wx.showToast({
            title: '请下载娱乐世界App',
            icon: 'none'
        })
    },
    more: function (e) {
        wx.showToast({
            title: '请下载娱乐世界App',
            icon: 'none'
        })
    },
    build_xr: function(e){
        wx.navigateTo({
            url: '../build_xr/build_xr',
        })
    },
    tg_service: function (e) {
        wx.navigateTo({
            url: '../tg_service/tg_service',
        })
    },
    xx_extend: function (e) {
        wx.navigateTo({
            url: '../xx_extend/xx_extend',
        })
    }
})