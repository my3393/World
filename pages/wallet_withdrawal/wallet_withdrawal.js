// pages/wallet_withdrawal/wallet_withdrawal.js
const  app =  getApp();

  
Page({

  /**
   * 页面的初始数据
   */
  data: {
     user:'',
     valu:'',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submit(){
    let that = this;
    if(that.data.valu == ''){
      console.log(that.data.valu)
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
        
      })
    }else if(that.data.valu < 100){
      wx.showToast({
        title: '提现金额需大于100',
        icon: 'none',
        
      })
    }else if(that.data.valu > that.data.user.purse){
      wx.showToast({
        title: '输入的金额大于可提现的金额了',
        icon: 'none',
        
      })
    }else{
      wx.request({
        url: app.data.urlmall + "/appuserwithdrawal/withdrawal.do",
        data: {
          token:wx.getStorageSync('token'),
          alipayAccount:that.data.zfb,
          price:that.data.valu
        },
        method: 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
            console.log(res.data.data)
            if (res.data.status == 100) {
             
            
              wx.navigateTo({
                url: '../wallet_succ/wallet_succ',
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
  all(){
    let that = this;
    that.setData({
      valu:that.data.userinfo.purse
    })
  },
  valu(e){
    let that = this;
    that.setData({
      valu:e.detail.value
    })
  },
  //支付宝
  zfb(e){
    this.setData({
      zfb:e.detail.value
    })
  }
})