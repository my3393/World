// pages/funcicle/funcicle.js
const app = getApp();
let currentPage = 1;
let currentPage1 = 1;
var videos = [];
var keyword = '';
var labels = [{
    label_id: 9999,
    label_name: '全部'
}];
var imgs = [];
var label_id = '';
var is_add = 0;
var others = [];
var other = [];

var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videos: [],
        labels: [],
        num: '',
        showvideo: false,
      others: [],
      other: [],
        isvideo: true,
        play: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      wx.showLoading({
        title: '努力加载中',
      })
        var bcode = this.options.bindcode;
        var scode = this.options.scode;
        if (wx.getStorageSync("userinfo").idol_id == null || wx.getStorageSync("userinfo").idol_id == '') {
            wx.request({
                url: "https://app.apiv1.0.xingtu-group.cn/ylsj-api-service/appmyidol/setmyidol.do",
                data: {
                    token: wx.getStorageSync("token"),
                    artist_id: bcode,
                    shareUserId: scode
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function (res) {
                    console.log(res)
                    if (res.data.status == 100) {
                        wx.setStorage({
                            key: 'userinfo',
                            data: res.data.data,
                        })
                        if (wx.getStorageSync("userinfo").bindShareId == null || wx.getStorageSync("userinfo").bindShareId == '') {
                            wx.request({
                                url: "https://app.apiv1.0.xingtu-group.cn/ylsj-api-service/appuserbindshare/setbindshareuser.do",
                                data: {
                                    token: wx.getStorageSync("token"),
                                    shareUserId: bcode
                                },
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                dataType: 'json',
                                success: function (res) {
                                    console.log(res)
                                }
                            })
                        }
                    }
                }
            })
        }
        var that = this;
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appartistvideo/videos.do",
            data: {
                currentPage: currentPage
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                  wx.hideLoading()
                    for (var i in res.data.data.videos) {
                        videos.push(res.data.data.videos[i]);
                    }
                    that.setData({
                        videos: videos
                    });
                    console.log(that.data.videos)
                }

            }
        })
        // 获取艺人标签
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appactortype/actorTypes.do",
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                if (res.data.status == 100) {
                    console.log(res.data.data)
                    for (var i = 0; i < res.data.data.length; i++) {
                        labels.push(res.data.data[i])
                    }
                    that.setData({
                        labels: labels
                    })
                    console.log(labels)
                }

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
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
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
        var that = this;
        if (is_add == 0) {
            currentPage = currentPage + 1;
            wx.request({
                url: app.data.urlhead + "/ylsj-api-service/appartistvideo/videos.do",
                data: {
                    currentPage: currentPage,
                    keywords: keyword
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function(res) {
                    console.log(res.data.data)
                    if (res.data.status == 100) {
                        if (currentPage > res.data.data.totalPage) {
                            wx.showToast({
                                title: '已加载全部',
                                icon: 'none',
                                duration: 500
                            })
                        } else {
                            for (var i in res.data.data.videos) {
                                videos.push(res.data.data.videos[i]);
                            }
                            that.setData({
                                videos: videos
                            });
                            console.log(that.data.videos)
                        }

                    }

                }
            })
        }
        if (is_add == 1) {
            currentPage1 = currentPage1 + 1;
            wx.request({
                url: app.data.urlhead + "/ylsj-api-service/apphome/artistlist.do",
                data: {
                    label_id: label_id,
                    currentPage: currentPage1
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function(res) {
                    if (res.data.status == 100) {

                        if (res.data.data.totalPage == 0) {
                            wx.showToast({
                                title: '当前标签暂无艺人',
                                icon: 'none',
                                duration: 500
                            })
                        } else if (currentPage1 > res.data.data.totalPage) {
                            wx.showToast({
                                title: '已加载全部',
                                icon: 'none',
                                duration: 500
                            })
                        } else {
                            // for (var i in res.data.data.artists) {
                            //     others.push(res.data.data.artists[i])
                            // }
                            // ~~~~~~~~
                          for (var x in res.data.data.artists) {
                            other = [];
                            if (res.data.data.artists[x].file_path == null) {
                              other = [];
                            } else if (res.data.data.artists[x].file_path.indexOf(",") == -1) {
                              other = res.data.data.artists[x].file_path.split(',');
                            } else {
                              other = res.data.data.artists[x].file_path.split(",");
                            }
                            res.data.data.artists[x].other = other;
                            others.push(res.data.data.artists[x])
                          }
                             
                            that.setData({
                              others: others
                            })
                        }
                        console.log(res.data)
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
    //去往赛事
    event:function () {
       //配套
       wx.navigateToMiniProgram({
        appId: 'wx4cef4fe6585f5bfd',
        path: 'pages/e_home/e_home',
        extraData: {

        },
        envVersion: 'release',
        success(res) {
          // 打开成功
        }
      })
   
    },
    //去往赛事
    match:function () {
        //配套
        wx.navigateToMiniProgram({
         appId: 'wx8acf25d8b950de31',
         path: 'pages/pt_mall/pt_mall',
         extraData: {
 
         },
         envVersion: 'release',
         success(res) {
           // 打开成功
         }
       })
    
     },
    todetail: function(e) {
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                if (res.data.phone == '' || res.data.phone == null) {
                    wx.navigateTo({
                        url: '../bindphone/bindphone',
                    })
                } else {
                    wx.navigateTo({
                        url: '../funcicle_detail/funcicle_detail?user_id=' + e.currentTarget.id,
                    })
                }
            },
        })


    },
    aenter: function(e) {
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
    getkeyword: function(e) {
        keyword = e.detail.value;
      var that = this;
      that.setData({
        videos: []
      });
      videos = [];
      currentPage = 1;
      wx.request({
        url: app.data.urlhead + "/ylsj-api-service/appartistvideo/videos.do",
        data: {
          currentPage: currentPage,
          keywords: keyword

        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        dataType: 'json',
        success: function (res) {
          console.log(res.data.data)
          if (res.data.status == 100) {
            for (var i in res.data.data.videos) {
              videos.push(res.data.data.videos[i]);
            }
            that.setData({
              videos: videos
            });
            console.log(that.data.videos)
          }

        }
      })
    },
    tosearch: function(e) {
        
    },
    selectlabel: function(e) {
        var that = this;
        console.log(e)
        currentPage1 = 1;
        label_id = e.currentTarget.id;
        that.setData({
            num: e.currentTarget.dataset.num
        })
        if (e.currentTarget.dataset.num == 0) {
            that.setData({
                showvideo: false
            })
            is_add = 0;
        } else {
            that.setData({
                showvideo: true
            })
            is_add = 1;
        }
        others = [];
        that.setData({
            others: []
        })
        if (e.currentTarget.id == 9999) {

        } else {
            // 获取筛选数据
            wx.request({
                url: app.data.urlhead + "/ylsj-api-service/apphome/artistlist.do",
                data: {
                    label_id: label_id,
                    currentPage: currentPage1
                },
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                dataType: 'json',
                success: function(res) {
                    if (res.data.status == 100) {
                        if (res.data.data.totalPage == 0) {
                            wx.showToast({
                                title: '当前标签暂无艺人',
                                icon: 'none',
                                duration: 500
                            })
                        } else {
                            // for (var i in res.data.data.artists) {
                            //     others.push(res.data.data.artists[i])
                            // }
                          for (var x in res.data.data.artists) {
                            other = [];
                            if (res.data.data.artists[x].file_path == null) {
                              other = [];
                            } else if (res.data.data.artists[x].file_path.indexOf(",") == -1) {
                              other = res.data.data.artists[x].file_path.split(',');
                            } else {
                              other = res.data.data.artists[x].file_path.split(",");
                            }
                            res.data.data.artists[x].other = other;
                            others.push(res.data.data.artists[x])
                          }
                            // ~~~~~~~~
                            that.setData({
                                others: others
                            })
                        }

                        console.log(res.data)
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
    handleImagePreview: function(e) {
        var that = this;
        var urlsa = [];
        urlsa.push(e.currentTarget.id)
        console.log(urlsa)
        wx.previewImage({
            current: e.currentTarget.id,
            urls: urlsa
        })
    },
    showvideo: function(e) {
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo,
            play: e.currentTarget.id
        })
    },
    hidevideo: function(e) {
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo
        })
    },
    seevideo: function(e) {
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo,
            play: e.currentTarget.dataset.ids
        })
    }  
})