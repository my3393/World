// pages/mine_make/mine_make.js
const app = getApp();
let detail = [];
let detailes = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tag:[
       {name:'我的预约'},
       {name:'收到的预约'}
     ],
     detail:[],
     detailes:[],
     tar:'',
     isshow:true,
     currentPage:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getdetail();
     this.getdetailes();
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
    
    detail=[];
    detailes=[];
    this.setData({
      detail:[],
      detailes:[]
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
    if(that.data.tar == 0){
      if(that.data.currentPage == that.data.d_totalPage){
         wx.showToast({
           title:'已经没有了哦',
           icon:'none'
         })
      }else{
        that.getdetail();
      }
    }
    if(that.data.tar == 1){
      if(that.data.currentPage == that.data.s_totalPage){
         wx.showToast({
           title:'已经没有了哦',
           icon:'none'
         })
      }else{
        that.getdetailes();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //了解更多
  plone:function (e) {
    
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.id//仅为示例，并非真实的电话号码
    })
  },
  refu:function (e) {
    var that = this;
    that.setData({
      isshow:!that.data.isshow,
      rId:e.currentTarget.id
    })
  },
  valu(e){
    var that = this;
    console.log(e)
    var index = e.detail.value;
    that.setData({
      valu:index,
    })
  },
  //回拒确定
  ques(){
    var that = this;
    wx.request({
      url:app.data.urlhead + "/ylsj-api-service/appointartist/refuseorder.do",
      data: {
        token: wx.getStorageSync('token'),
        id: that.data.rId,
        remark:that.data.valu
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
          console.log(res.data.data)
          if (res.data.status == 100) {
              detail=[];
              detailes=[];
              that.setData({
                detail:[],
                detailes:[]
              })
              that.getdetail();
              that.getdetailes();
              that.setData({
                isshow:!that.data.isshow,
               
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
  //接单
  accept(e){
    var that = this;
    wx.request({
      url:app.data.urlhead + "/ylsj-api-service/appointartist/receiveorder.do",
      data: {
        token: wx.getStorageSync('token'),
        id: e.currentTarget.id,
        
      },
      method: 'POST',
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
          console.log(res.data.data)
          if (res.data.status == 100) {
            detail=[];
            detailes=[];
            that.setData({
              detail:[],
              detailes:[]
            })
            that.getdetail();
            that.getdetailes();
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
  tag(e){
    var that = this;
    console.log(e)
    that.setData({
      tar:e.currentTarget.dataset.index
    })
  },
  getdetail(){
    var that = this;
    wx.request({
      url:app.data.urlhead + "/ylsj-api-service/appointartist/myappoint.do",
      data: {
        token: wx.getStorageSync('token'),
        currentPage: that.data.currentPage
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
              d_totalPage:res.data.data.totalPage
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
  getdetailes(){
    var that = this;
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/appointartist/receiveappoint.do",
      data: {
        token: wx.getStorageSync('token'),
        currentPage: that.data.currentPage
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
                  detailes.push(res.data.data.data[i])
              }
              that.setData({
                detailes: detailes,
                s_totalPage:res.data.data.totalPage
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