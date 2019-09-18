// pages/share_home/share_home.js
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
  shareM:function(){
    wx.navigateTo({
      url: '../share_code/share_code',
    })
  },
  record:function(){
    wx.navigateTo({
      
      url: '../share_record/share_record',
    })
  },
  //共享订单
  order: function () {
    wx.navigateTo({

      url: '../share_order/share_order',
    })
  },
  //联盟会员
  member: function () {
    wx.navigateTo({

      url: '../share_member/share_member',
    })
  },
  //联盟伙伴
  partner: function () {
    wx.navigateTo({

      url: '../share_member/share_member',
    })
  },
  //开通共享
  go: function () {
    wx.navigateTo({

      url: '../share-pay/share-pay',
    })
  },
  getuser() {
    let that = this;
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/appshareallinace3/shareallinace.do",
      data: {
        token: wx.getStorageSync('token'),

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
            user: res.data.data
          })

          that.getprice()
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
  //共享联盟价格
  getprice() {
    let that = this;
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/appshareallinace3/getprice.do",
      data: {
       
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
            price: res.data.data
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
})