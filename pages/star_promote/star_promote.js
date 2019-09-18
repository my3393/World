// pages/star_ promote/star_promote.js
const app = getApp();
var detail=[];
let id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:1,
    id:'',
    isshow:true,
    totalPage:'',


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
      if(that.data.currentPage == that.data.totalPage){
        wx.showToast({
          title: '没有更多咯',
          icon:'none'
        })
      }else{
        that.setData({
          currentPage : that.data.currentPage + 1
        })
        that.searchs()
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
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
  promote(e) {
    var that = this;
    id = e.currentTarget.id,
    that.setData({
      isshow: !that.data.isshow,
      
     })
  },
  //艺呗支付
  cance:function(){
     var that = this;
     wx.request({
      url: app.data.urlhead + "/ylsj-api-service/appstarspread/integralpay.do",
      data: {
        token:wx.getStorageSync('token'),
        artistId:id
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
            isshow: !that.data.isshow,
          })
          wx.showToast({
            title: '推广成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  //现金支付
  deter: function () {
    var that = this;
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/appstarspread/integralpay.do",
      data: {
        token: wx.getStorageSync('token'),
        artistId: id
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
            isshow: !that.data.isshow,
          })
          wx.showToast({
            title: '推广成功',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  inpu:function(e){
    this.setData({
      value:e.detail.value
    })
  },
  search:function () {
    var that = this;
    detail = [];
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/apphome/searchartist.do",
      data: {
        keywords:that.data.value,
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
         
         
          for (var i in res.data.data.artists) {
            detail.push(res.data.data.artists[i]);
          }
          that.setData({
            detail: detail,
            totalPage: res.data.data.totalPage
          });
          
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })

  },
  searchs: function () {
    var that = this;
   
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/apphome/searchartist.do",
      data: {
        keywords: that.data.value,
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


          for (var i in res.data.data.artists) {
            detail.push(res.data.data.artists[i]);
          }
          that.setData({
            detail: detail,
            totalPage: res.data.data.totalPage
          });

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })

  },
  
})