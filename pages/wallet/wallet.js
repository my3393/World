// pages/wallet/wallet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isshow:true,
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
          that.setData({
              user: res.data
          });
          console.log(that.data.user)
      },
    })
    console.log(that.data.user)
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

  },
  //查看明细
  detail(e){
    wx.navigateTo({
      url: '../wallet_detail/wallet_detail?id=' + e.currentTarget.id,
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
  //提现
  withdrawal:function(){
    wx.navigateTo({
      url: '../wallet_withdrawal/wallet_withdrawal',
    })
  },
  close: function () {
    var that = this;
    this.setData({
      isshow: !this.data.isshow
    })
  },
})