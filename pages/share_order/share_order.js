// pages/share_order/share_order.js
const app = getApp();
let detail = [];
let details = [];
let currentPage = 1;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: [],
        counts: 0,
        tag:[
            {name:'来自我'},
            {name:'来自成员'}
        ],
        tar:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '共享订单',
        })
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
       
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        var that = this;
        that.setData({
            data: []
        })
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
      if (currentPage == that.data.totalPage) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none'
        })
      } else {
        currentPage = currentPage + 1;
        if(that.data.tar == 0){
          that.getdetail();
        }else{
          that.getdetails();
        }
      } 
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
    tag(e){
        
      var that = this;
      let index = e.currentTarget.dataset.index
      currentPage = 1
      that.setData({
        tar: index,
        totalPage:'',
      })
      if(index == 0){
        that.getdetail();
      }else{
        that.getdetails();
      }
    },
    getdetail(){
      let that = this;
      wx.request({
        url: app.data.urlhead + "/ylsj-api-service/appshareallinace3/myshareorder.do",
        data: {
          token: wx.getStorageSync('token'),
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
            for (var i in res.data.data.data) {
              detail.push(res.data.data.data[i])
            }
            that.setData({
              detail: detail,
              totalPage: res.data.data
            })


          } else if (res.data.status == 103) {
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
    getdetails() {
      let that = this;
      wx.request({
        url: app.data.urlhead + "/ylsj-api-service/appshareallinace3/myshareorder.do",
        data: {
          token: wx.getStorageSync('token'),
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
            for (var i in res.data.data.data) {
              details.push(res.data.data.data[i])
            }
            that.setData({
              details: details,
              totalPage: res.data.data
            })


          } else if (res.data.status == 103) {
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
    }
})