// pages/e_hot/e_hot.js
var poster;
var app = getApp();
var count = 0;
var ids = [];
var moren = [];
var names = undefined;
var name = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    posters: '../../images/addtu.png',
    price:'',
    days:'',
    prices:'',
    players:[],
    isshow:true,
    checked:false,
    tag:[
      { name:'04:00~10:00'},
      { name:'10:00~16:00'},
      { name:'16:00~22:00'},
      { name:'22:00~04:00'},
    ],
    time:'',
    tar:999,
    name:[],
    showlabels:true,
    num:'0',
    nationalPrice:'',
    provincePrice:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
     this.setData({
       id:options.id
     })
     this.getplayer();
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
  tag:function(e){
    this.setData({
      tar: e.currentTarget.dataset.num,
      time: e.currentTarget.dataset.name,
    })
  },
  close: function () {
    var that = this;
    this.setData({
      isshow: !this.data.isshow
    })
  },
  //选择地区
  choose:function(){
    var that = this;
    that.setData({
      showlabels: !that.data.showlabels,
     
    })
  },
  chooselabel: function (e) {
    console.log(e)
    
     var that = this;
   
     var labels = that.data.players;
    var idd = e.currentTarget.id
    var index = e.currentTarget.dataset.index
    if (idd == 99999) {
     
      for(var i in labels){
        labels[i].selected = true
      }
      name=[]
      name.push(labels[index].region_name)
      labels[0].selected = false
      that.setData({
        players: labels
      })
     
    } else {
      labels[0].selected = true
      names = undefined;
     
      ids = [];
      labels[index].selected = !labels[index].selected;
      that.setData({
        players: labels
      })
      if (name.indexOf(labels[0].region_name) > -1) {
        console.log(11)
        name.splice(0,1)
      }
      if (name.indexOf(labels[index].region_name) == -1){
         name.push(labels[index].region_name)
      } else if (name.indexOf(labels[index].region_name) > -1) {
        console.log(labels[index].region_name)
        name.splice(name.findIndex(item => item === labels[index].region_name), 1)
        
      }
      
    }
    console.log(name)
  },
  quxiao: function (e) {
    var that = this;
    ids = [];
    that.setData({
      showlabels: !that.data.showlabels,
      labels: moren
    })
    console.log(moren)
  },
  sure: function (e) {
    var that = this;
    var labels = that.data.players;
    if (name.indexOf(labels[0].region_name) > -1) {
      that.setData({
       
       price:that.data.nationalPrice * that.data.days

      })
    }else{
      that.setData({

        price: that.data.provincePrice * that.data.days * name.length

      })
    }
    that.setData({
      showlabels: !that.data.showlabels,
      name: name,
      num:name.length,
      
    })
  },
  getplayer: function (e) {
    var that = this;
    var player =[ {
      region_name: '全国',
      id: 99999,
      selected:true,
    }]
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/apparea/nextlist.do",
      data: {
        areaname: "province",
        areaid: 0
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        if (res.data.status === 100) {
          for(var i in res.data.data.arealist){
            res.data.data.arealist[i].selected = true
            player.push(res.data.data.arealist[i])

          }
          that.setData({
            players: player,

          })
         console.log(that.data.players)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
 
  //查看服务协议
  chak:function(){
    wx.navigateTo({
      url: '../e_serviceAgree/e_serviceAgree',
    })
  },
  inputs:function(e){
    this.setData({
      days: e.detail.value,
      price: e.detail.value * this.data.prices
    })
  },
  //价格
  getprice: function (e) {
    var that = this;
    wx.request({
      url: app.data.urlhead + "/ylsj-api-service/apppromotionprice/headlinesprice.do",
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
            provincePrice: res.data.data.provincePrice,
            nationalPrice: res.data.data.nationalPrice,
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
  pay: function () {
    var that = this;
    if (that.data.time == '') {
      wx.showToast({
        title: '请选择时间段',
        icon: 'none'
      })
    }else if (that.data.days == '') {
      wx.showToast({
        title: '请选择天数',
        icon: 'none'
      })
    } else if (that.data.days == '0') {
      wx.showToast({
        title: '请选择正确天数',
        icon: 'none'
      })
    } else if (that.data.name.length == '0') {
      wx.showToast({
        title: '请选择推广地区',
        icon: 'none'
      })
    } else if (that.data.checked == false) {
      wx.showToast({
        title: '点击已阅读同意协议',
        icon: 'none'
      })

    } else {
      wx.request({
        url: app.data.urlhead + "/ylsj-api-service/appheadline/headlinexcxpay.do",
        data: {
          token: wx.getStorageSync('token'),
          spreadId: that.data.id,
          time: that.data.time,
          days: that.data.days,
          provinces: that.data.name,      
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
          if (res.data.status === 100) {
            wx.requestPayment({
              timeStamp: res.data.data.sign.timeStamp,
              nonceStr: res.data.data.sign.nonceStr,
              package: res.data.data.sign.package,
              signType: 'MD5',
              paySign: res.data.data.sign.paySign,
              success(res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'none',
                  duration: 1000
                })
                wx.navigateBack({
                  delta: 1
                })
              },
              fail(res) {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 1000
                })
              }
            })

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
        }
      })

    }

  },
  checked: function (e) {
    var that = this;
    var checked = that.data.checked;
    that.setData({
      checked: !checked,
    })

  },
})