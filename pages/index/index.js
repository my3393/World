let avater = '';
var currentPage = 1;
var city_id = '';
var actor_type = '';
let announcement = [];
const app = getApp();
var cc = "asa";
var bcode;
Page({

    data: {
        // 控制label显示隐藏
        showlabel: true,
        city: [],
        city_index: 0,
        label: [],
        num: 0,
        announcement: [],
        labels: '全部分类'
    },

    /**
     * 页面的初始数据
     */

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({});
        var citys = [{
            id: '',
            region_name: '全国'
        }];
        var label = [{
            label_id: '',
            label_name: '全部'
        }];
        var that = this;
        // console.log(options)
        // 获取全部市区
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/apparea/allcity.do",
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            dataType: 'json',
            success: function(res) {
                for (var i in res.data.data.citys) {
                    citys.push(res.data.data.citys[i]);
                }
                that.setData({
                    city: citys
                });
            }
        })
        // 获取所有艺人标签
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appactortype/actorTypes.do",
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res.data.data)
                for (var i in res.data.data) {
                    label.push(res.data.data[i]);
                }
                that.setData({
                    label: label
                });
            }
        })
    
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
        console.log(this.options)
        wx.setStorage({
            key: 'bcode',
            data: this.options.bindcode,
        })
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                bcode = res.data.user_id;
                console.log(bcode + "----")
            },
        })
       
        var that = this;
        currentPage = 1;
        that.setData({
            announcement: []
        })
        announcement = [];
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appannouncement/allAnnouncement.do",
            data: {
                currentPage: currentPage,
                city_id: city_id,
                actor_type: actor_type
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            dataType: 'json',
            success: function(res) {
                // console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data.announcement) {
                        announcement.push(res.data.data.announcement[i])
                    }
                    wx.pageScrollTo({
                        scrollTop: 0
                    })
                    that.setData({
                        announcement: announcement
                    })
                    wx.hideLoading();
                } else {
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data.status,
                        icon: 'none',
                        duration: 500
                    })
                }
            }
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
        console.log(cc)
        var that = this;
        currentPage = currentPage + 1;
        console.log(announcement)
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appannouncement/allAnnouncement.do",
            data: {
                currentPage: currentPage,
                city_id: city_id,
                actor_type: actor_type
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res)
                if (currentPage > res.data.data.totalPage) {
                    wx.showToast({
                        title: '已加载全部',
                        icon: 'none',
                        duration: 500
                    })
                } else {
                    for (var i in res.data.data.announcement) {
                        announcement.push(res.data.data.announcement[i])
                    }
                    that.setData({
                        announcement: announcement
                    })
                }

            }
        })
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

    // 选择区域
    bindPickerChange_hx: function(e) {
        cc = "123";
        var that = this;
        console.log('picker发送选择改变，携带值为', e.detail);
        that.setData({ //给变量赋值
            city_index: e.detail.value,
        })
        console.log('自定义值:', that.data.city[e.detail.value].id);
        currentPage = 1;
        announcement = [];
        city_id = that.data.city[e.detail.value].id;
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appannouncement/allAnnouncement.do",
            data: {
                currentPage: currentPage,
                city_id: city_id,
                actor_type: e.currentTarget.id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data.status)
                if (res.data.status == 100) {

                    if (res.data.data.totalPage == 0) {
                        wx.showToast({
                            title: '当前地区暂无通告',
                            icon: 'none',
                            duration: 500
                        })
                    } else if (currentPage > res.data.data.totalPage) {
                        wx.showToast({
                            title: '已加载全部',
                            icon: 'none',
                            duration: 500
                        })
                    } else {
                        for (var i in res.data.data.announcement) {
                            announcement.push(res.data.data.announcement[i])
                        }
                        announcement = announcement;
                        wx.pageScrollTo({
                            scrollTop: 0
                        })
                        that.setData({
                            announcement: announcement
                        })
                    }
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
    showlabel: function(e) {

        var that = this;
        that.setData({
            showlabel: !that.data.showlabel
        });
    },
    close: function(e) {
        var that = this;
        that.setData({
            showlabel: !that.data.showlabel
        });
    },
    todetail: function(e) {
        wx.navigateTo({
            url: '../notice_detail/notice_detail?notice_id=' + e.currentTarget.id,
        })
    },
    selectlabel: function(e) {
        console.log(e)
        var that = this;
        that.setData({
            num: e.currentTarget.dataset.num,
            showlabel: true,
            labels: e.currentTarget.dataset.name,
        });
        currentPage = 1;
        announcement = [];
        that.setData({
            announcement: []
        })
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appannouncement/allAnnouncement.do",
            data: {
                currentPage: currentPage,
                city_id: city_id,
                actor_type: e.currentTarget.id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res)
                if (res.data.status == 100) {

                    if (res.data.totalPage == 0) {
                        wx.showToast({
                            title: '当前标签暂无通告',
                            icon: 'none',
                            duration: 500
                        })
                    } else if (currentPage > res.data.data.totalPage) {
                        wx.showToast({
                            title: '已加载全部',
                            icon: 'none',
                            duration: 500
                        })
                    } else {
                        for (var i in res.data.data.announcement) {
                            announcement.push(res.data.data.announcement[i])
                        }
                        wx.pageScrollTo({
                            scrollTop: 0
                        })
                        that.setData({
                            announcement: announcement
                        })
                    }
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
    subnotice: function(e) {
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                console.log(res.data.phone)
                if (res.data.phone == '' || res.data.phone == null) {
                    wx.navigateTo({
                        url: '../bindphone/bindphone',
                    })
                } else {
                    wx.navigateTo({
                        url: '../submit_notice/submit_notice',
                    })
                }
            },
        })
    }
})