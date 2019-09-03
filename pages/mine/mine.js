// pages/mine/mine.js
var phone;
var token;
const app = getApp();
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        datas: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function(res) {
                token = res.data;
            },
        }) 
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                that.setData({
                    datas: res.data
                });
            },
        })
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
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
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
    callkf: function(e) {
        wx.makePhoneCall({
            phoneNumber: '4008292878'
        })
    },
    waiting: function(e) {
        wx.showToast({
            title: '请下载娱乐世界App',
            icon: 'none'
        })
    },
    ruzhu: function(e) {
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                console.log(res.data.phone)
                if (res.data.phone == '' || res.data.phone == null) {
                    wx.navigateTo({
                        url: '../bindphone/bindphone',
                    })
                } else {
                    wx.getStorage({
                        key: 'userinfo',
                        success: function(res) {
                            if (res.data.is_actor == 2) {
                                wx.showToast({
                                    title: '您已经是艺人身份',
                                    icon: 'none'
                                })
                            } else if (res.data.is_actor == 1) {
                                wx.showToast({
                                    title: '您的信息正在审核中',
                                    icon: 'none'
                                })
                            } else {
                                wx.navigateTo({
                                    url: '../iwillpromote/iwillpromote',
                                })
                            }
                        },
                    })
                }
            },
        })
    },
    isleagure: function(e) {
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                console.log(res.data.shareIdentityType)
                if (res.data.phone == '' || res.data.phone == null) {
                    wx.showToast({
                        title: '请先绑定手机号',
                        icon: 'none'
                    })
                    setTimeout(function(){
                        wx.navigateTo({
                            url: '../bindphone/bindphone',
                        })
                    },1000)
                }else{
                    if (res.data.shareIdentityType == 0) {
                        wx.request({
                            url: app.data.urlhead + "/ylsj-api-service/appShareAllinace/isShareAllinace.do",
                            data: {
                                token: token
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            dataType: 'json',
                            success: function (res) {
                                if (res.data.data == null) {
                                    wx.navigateTo({
                                        url: '../share_desc/share_desc',
                                    })
                                } else {
                                    if (res.data.data.isAudit == 2) {
                                        wx.navigateTo({
                                            url: '../apply_fail/apply_fail',
                                        })
                                    } else if (res.data.data.isAudit == 0) {
                                        wx.navigateTo({
                                            url: '../applying/applying',
                                        })
                                    }
                                }
                            }
                        });
                    } else {
                        wx.navigateTo({
                            url: '../leagure/leagure',
                        })
                    }
                }
                
            },
        })
    },
    isagent: function(e){
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appagent/getAgent.do",
            data: {
                token: token
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
                if (res.data.data == 0) {
                    wx.navigateTo({
                        url: '../agent_enter/agent_enter',
                    })
                } else if (res.data.data == 1) {
                    wx.showToast({
                        title: '经纪人身份审核中',
                        icon: 'none'
                    })
                } else if (res.data.data == 2) {
                    wx.showToast({
                        title: '当前已是经纪人身份',
                        icon: 'none'
                    })
                } else if (res.data.data == 3) {
                    wx.navigateTo({
                        url: '../agent_fail/agent_fail',
                    })
                }
            }
        });
    },
    help_enter: function(e){
        wx.navigateTo({
            url: '../help_enter/help_enter',
        })
    },
    gl_artist: function(e){
        wx.navigateTo({
            url: '../gl_artist/gl_artist',
        })
    }
})