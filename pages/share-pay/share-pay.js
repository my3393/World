// pages/share-pay/share-pay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tag:[
       {name:'创业者（未来之星）',id:'298',type:'1'},
       { name: '发起人', id: '2980', type: '2' },
       { name: '合伙人', id: '19800', type: '3'},
       { name: '区域股东', id: '198000', type: '4' }
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.getprice();
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
  //时段选择
  tag: function (e) {
    this.setData({
      tar: e.currentTarget.dataset.num,
      type:e.currentTarget.dataset.type
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