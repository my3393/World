// pages/wallet_detail/wallet_detail.js
let blance=[];
let integral=[];
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    blance:[],
    integral:[],
    currentPage:1,
    totalPage:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id:options.id
    })
    if(options.id == 1){
        that.getbalance();
    }else if(options.id == 2){
      that.getintegral();
    }
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
     blance = [];
     integral= [];
     this.setData({
       blance:[],
       integral:[]
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
    var that = this;
    if(that.data.id == 1){
      if(that.data.currentPage == that.data.totalPage){
         wx.showToast({
           title:'已经没有了哦',
           icon:'none'
         })
      }else{
        that.getbalance();
      }
    }
    if(that.data.id == 2){
      if(that.data.currentPage == that.data.totalPage){
         wx.showToast({
           title:'已经没有了哦',
           icon:'none'
         })
      }else{
        that.getintegral();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //余额收支明细
  getbalance(){
    let that = this;
    wx.request({
      url: app.data.urlmall + "/appuserwithdrawal/withdrawalrecord.do",
      data: {
        token:wx.getStorageSync('token'),
        currentPage:that.data.currentPage,
        
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
          console.log(res.data.data)
          if (res.data.status == 100) {
            for(var i in res.data.data.data){
              blance.push(res.data.data.data[i])
            }
            that.setData({
              blance:blance,
              totalPage:res.data.data.totalPage
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
   //积分收支明细
   getintegral(){
    let that = this;
    wx.request({
      url: app.data.urlmall + "/appuserwithdrawal/withdrawalrecord.do",
      data: {
        token:wx.getStorageSync('token'),
        currentPage:that.data.currentPage,
        
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
          console.log(res.data.data)
          if (res.data.status == 100) {
            for(var i in res.data.data.data){
              integral.push(res.data.data.data[i])
            }
            that.setData({
              integral:integral,
              totalPage:res.data.data.totalPage
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
  }
})