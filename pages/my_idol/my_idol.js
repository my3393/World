// pages/my_idol/my_idol.js
const app = getApp();
var token;
var idol_id;
let isdefault;
var currentPage = 1;
var artist = [];
var kewword;
var banner = [];
var dt = [];
var phone;
var bcode;
var user_id = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasidol: true,
        dtnone: true,
        defaults: false,
        isshowdt: false,
        num: 1,
        artist: [],
        datas: [],
        banner: [],
        dt:[],
        videos: [],
        imgs: [],
        alldata: [],
        isvideo: true,
        play: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function (res) {
                token = res.data;
            },
        })
        
        
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
            success: function (res) {
                bcode = res.data.user_id;
                console.log(bcode + "----")
            },
        })
        artist = [];
        banner = [];
        that.setData({
            alldata: [],
            artist: [],
            datas: [],
            banner: []
        });
        currentPage = 1;
        wx.getStorage({
            key: 'userinfo',
            success: function (res) {
                idol_id = res.data.idol_id;
                console.log(idol_id)

                if (idol_id == null || idol_id == '') {
                    wx.request({
                        url: app.data.urlhead + "/ylsj-api-service/appmyidol/allartists.do",
                        data: {
                            currentPage: currentPage
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/json'
                        },
                        dataType: 'json',
                        success: function (res) {
                            console.log(res)
                            if (res.data.status == 100) {
                                for (var i in res.data.data.artist) {
                                    artist.push(res.data.data.artist[i]);
                                }
                                that.setData({
                                    artist: artist
                                })
                            }
                        }
                    })
                } else {
                    that.setData({
                        defaults: true
                    })
                    wx.request({
                        url: app.data.urlhead + "/ylsj-api-service/appartist/artistDetails.do",
                        data: {
                            token: token,
                            artist_id: idol_id
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        dataType: 'json',
                        success: function (res) {
                            console.log(res)
                            if (res.data.status == 100) {
                                user_id = res.data.data.user_id;
                                console.log(user_id)
                                if (res.data.data.file_path.indexOf(",") == -1) {
                                    banner.push(res.data.data.file_path);
                                    console.log(banner)
                                } else {
                                    banner = res.data.data.file_path.split(',');
                                }
                                console.log(banner)
                                that.setData({
                                    datas: res.data.data,
                                    banner: banner
                                })
                                wx.setNavigationBarTitle({
                                    title: res.data.data.username,
                                })
                            }
                        }
                    });
                    wx.request({
                        url: app.data.urlhead + "/ylsj-api-service/appartist/artistDynamic.do",
                        data: {
                            token: token,
                            artist_id: idol_id,
                            currentPage: 1
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        dataType: 'json',
                        success: function (res) {
                            console.log(res)
                            if (res.data.status == 100) {
                                if (res.data.data.dynamics.length == 0) {
                                    that.setData({
                                        dtnone: false
                                    })
                                } else {
                                    for (var i in res.data.data.dynamics) {
                                        dt = [];
                                        var a = [];
                                        var img = [];
                                        if (res.data.data.dynamics[i].file_path.indexOf(',') == -1) {
                                            dt.push(res.data.data.dynamics[i].file_path);
                                            if (dt[0].substring(dt[0].lastIndexOf(".")).toLowerCase() == ".mp4") {
                                                res.data.data.dynamics[i].dtvideo = dt;
                                            } else {
                                                res.data.data.dynamics[i].dtimg = dt;
                                            }
                                        } else {
                                            dt = res.data.data.dynamics[i].file_path.split(',');
                                            for (var j in dt) {
                                                if (dt[j].substring(dt[j].lastIndexOf(".")).toLowerCase() == ".mp4") {
                                                    a.push(dt[j]);
                                                } else {
                                                    img.push(dt[j]);
                                                }
                                            }
                                            res.data.data.dynamics[i].dtvideo = a;
                                            res.data.data.dynamics[i].dtimg = img;
                                        }
                                    }
                                    console.log(res.data.data.dynamics)
                                    that.setData({
                                        alldata: res.data.data.dynamics
                                    })
                                }
                            }
                        }
                    })
                }
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
        var that = this;
        currentPage = currentPage + 1;
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appmyidol/allartists.do",
            data: {
                currentPage: currentPage
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                if (res.data.status == 100) {
                    if (currentPage > res.data.data.totalPage) {
                        wx.showToast({
                            title: '已加载全部',
                            icon: 'none',
                            duration: 500
                        })
                    } else {
                        for (var i in res.data.data.artist) {
                            artist.push(res.data.data.artist[i]);
                        }
                        that.setData({
                            artist: artist
                        })
                    }

                }
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var that = this;
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
        title: '我是' + that.data.datas.name + ",我在娱乐世界等你",
        path: '/pages/funcicle/funcicle?bindcode=' + bcode + "&scode=" + scode
      }
    },
    setidol: function (e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '是否设置' + e.currentTarget.dataset.name + '为偶像，设置后不可更改！',
            success(res) {
                if (res.confirm) {
                    console.log(e)
                    wx.getStorage({
                        key: 'userinfo',
                        success: function (res) {
                            phone = res.data.phone;
                            if (phone == null || phone == '') {
                                wx.redirectTo({
                                    url: '../bindphone/bindphone',
                                })
                            }else{
                                wx.request({
                                    url: app.data.urlhead + "/ylsj-api-service/appmyidol/setmyidol.do",
                                    data: {
                                        token: token,
                                        artist_id: e.currentTarget.id
                                    },
                                    method: 'POST',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    dataType: 'json',
                                    success: function (res) {
                                        console.log(res)
                                        if (res.data.status == 100) {
                                            that.setData({
                                                defaults: !that.data.defaults
                                            });
                                            wx.getStorage({
                                                key: 'userinfo',
                                                success: function (res) {
                                                    console.log(res)
                                                    idol_id = res.data.idol_id;
                                                    wx.request({
                                                        url: app.data.urlhead + "/ylsj-api-service/appartist/artistDetails.do",
                                                        data: {
                                                            token: token,
                                                            artist_id: e.currentTarget.id
                                                        },
                                                        method: 'POST',
                                                        header: {
                                                            'content-type': 'application/x-www-form-urlencoded'
                                                        },
                                                        dataType: 'json',
                                                        success: function (res) {
                                                            console.log(res)
                                                            if (res.data.status == 100) {
                                                                if (res.data.data.file_path.indexOf(",") == -1) {
                                                                    banner.push(res.data.data.file_path);
                                                                    console.log(banner)
                                                                } else {
                                                                    banner.push(res.data.data.file_path.split(','));
                                                                }
                                                                that.setData({
                                                                    datas: res.data.data,
                                                                    banner: banner
                                                                })
                                                            }
                                                        }
                                                    });
                                                    wx.request({
                                                        url: app.data.urlhead + "/ylsj-api-service/appartist/artistDynamic.do",
                                                        data: {
                                                            token: token,
                                                            artist_id: e.currentTarget.id,
                                                            currentPage: 1
                                                        },
                                                        method: 'POST',
                                                        header: {
                                                            'content-type': 'application/x-www-form-urlencoded'
                                                        },
                                                        dataType: 'json',
                                                        success: function (res) {
                                                            console.log(res)
                                                            if (res.data.status == 100) {
                                                                if (res.data.data.dynamics.length == 0) {
                                                                    that.setData({
                                                                        dtnone: false
                                                                    })
                                                                } else {
                                                                    for (var i in res.data.data.dynamics) {
                                                                        dt = [];
                                                                        var a = [];
                                                                        var img = [];
                                                                        if (res.data.data.dynamics[i].file_path.indexOf(',') == -1) {
                                                                            dt.push(res.data.data.dynamics[i].file_path);
                                                                            if (dt[0].substring(dt[0].lastIndexOf(".")).toLowerCase() == ".mp4") {
                                                                                res.data.data.dynamics[i].dtvideo = dt;
                                                                            } else {
                                                                                res.data.data.dynamics[i].dtimg = dt;
                                                                            }
                                                                        } else {
                                                                            dt = res.data.data.dynamics[i].file_path.split(',');
                                                                            for (var j in dt) {
                                                                                if (dt[j].substring(dt[j].lastIndexOf(".")).toLowerCase() == ".mp4") {
                                                                                    a.push(dt[j]);
                                                                                } else {
                                                                                    img.push(dt[j]);
                                                                                }
                                                                            }
                                                                            res.data.data.dynamics[i].dtvideo = a;
                                                                            res.data.data.dynamics[i].dtimg = img;
                                                                        }
                                                                    }
                                                                    console.log(res.data.data.dynamics)
                                                                    that.setData({
                                                                        alldata: res.data.data.dynamics
                                                                    })
                                                                }
                                                            }
                                                        }
                                                    })
                                                },
                                            })

                                        }
                                    }
                                })
                            }
                        },
                    })
                    

                } else if (res.cancel) {

                }
            }
        })

    },
    changes: function (e) {
        var that = this;
        if (e.target.dataset.num == 1) {
            console.log(1)
            that.setData({
                isshowdt: false,
                num: 1
            })
        } else {
            console.log(2)
            that.setData({
                isshowdt: true,
                num: 2
            })
        }
    },
    todetail: function (e) {
        wx.navigateTo({
            url: '../funcicle_detail/funcicle_detail?user_id=' + e.currentTarget.id,
        })
    },
    search: function (e) {

        kewword = e.detail.value;
    },
    wancheng: function (e) {

        var that = this;
        currentPage = 1;
        artist = [];
        that.setData({
            artist: artist
        })
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appmyidol/allartists.do",
            data: {
                currentPage: currentPage,
                keywords: kewword
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                that.setData({
                    artist: []
                })
                if (res.data.status == 100) {
                    if (currentPage > res.data.data.totalPage) {
                        wx.showToast({
                            title: '已加载全部',
                            icon: 'none',
                            duration: 500
                        })
                    } else {
                        for (var i in res.data.data.artist) {
                            artist.push(res.data.data.artist[i]);
                        }
                        that.setData({
                            artist: artist
                        })
                    }

                }
            }
        })
    },
    // sqjd: function (e) {
    //     var that = this;
    //     currentPage = 1;
    //     artist = [];
    //     that.setData({
    //         artist: artist
    //     })
    //     wx.request({
    //         url: app.data.urlhead + "/ylsj-api-service/appmyidol/allartists.do",
    //         data: {
    //             currentPage: currentPage,
    //             keywords: kewword
    //         },
    //         method: 'POST',
    //         header: {
    //             'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         dataType: 'json',
    //         success: function (res) {
    //             console.log(res)
    //             that.setData({
    //                 artist: []
    //             })
    //             if (res.data.status == 100) {
    //                 if (currentPage > res.data.data.totalPage) {
    //                     wx.showToast({
    //                         title: '已加载全部',
    //                         icon: 'none',
    //                         duration: 500
    //                     })
    //                 } else {
    //                     for (var i in res.data.data.artist) {
    //                         artist.push(res.data.data.artist[i]);
    //                     }
    //                     that.setData({
    //                         artist: artist
    //                     })
    //                 }

    //             }
    //         }
    //     })
    // },
    yuyue: function(e){
        wx.navigateTo({
            url: '../yl_online/yl_online?article_id=' + user_id,
        })
    },
    showvideo: function(e){
        var that = this;
        console.log(e)
        that.setData({
            isvideo: !that.data.isvideo,
            play: e.currentTarget.id
        })
    },
    hidevideo: function(e){
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo
        })
    },
    seemore: function(e){
        wx.showToast({
            title: '请前往App或公众号',
            icon: 'none'
        })
    }
})