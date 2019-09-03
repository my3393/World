// pages/submit_notice/submit_notice.js
var util = require('../../utils/util.js');
var app = getApp();
var label_id = '';
var minprice = '';
var maxprice = '';
var startdate = '';
var enddate = '';
var province_id = '';
var city_id = '';
var citys = [];
var areas = [];
var towns = [];
var area_id = '';
var town_id = '';
var token;
var poster = '';
var title= '';
var detail = "";
var addrs = '';
var phone = '';
var wxh = '';
var tokenn = '';
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        label: [],
        lindex: 0,
        price: [],
        pindex: 0,
        startdate: '请选择开始时间',
        enddate: '请选择结束时间',
        mrdate: util.formatTime(new Date),
        province: [],
        poindex: 0,
        city: [],
        cindex: 0,
        area: [],
        aindex: 0,
        town: [],
        tindex: 0,
        posters: '../../images/upimg.png',
        sshi: true,
        squ: true,
        sjie: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '发布通告',
        })
        wx.getStorage({
            key: 'token',
            success: function(res) {
                token = res.data;
            },
        })
        var that = this;
        // 获取所有艺人标签
        var labels = [{
            label_id: '',
            label_name: '请选择艺人类型'
        }];
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
                console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data) {
                        labels.push(res.data.data[i])
                    }
                    that.setData({
                        label: labels
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 500
                    })
                }

            }
        });
        // 获取价格区间
        var prices = [{
            max_price: '',
            min_price: '请输入价格区间',
            showrange: '请输入价格区间'
        }]
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/apppricerange/getPriceRange.do",
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data) {
                        res.data.data[i].showrange = res.data.data[i].min_price + "~" + res.data.data[i].max_price;
                        prices.push(res.data.data[i])
                    }
                    that.setData({
                        price: prices
                    })
                    console.log(that.data.price)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 500
                    })
                }

            }
        });
        // 获取所有省
        var province = [{
            id: '',
            region_name: '请选择所在省'
        }]
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/apparea/nextlist.do",
            data: {
                areaname: 'province',
                areaid: 0
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data.arealist) {
                        province.push(res.data.data.arealist[i])
                    }
                    that.setData({
                        province: province
                    })
                    console.log(that.data.price)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 500
                    })
                }

            }
        })
        // 初始化市
        citys = [{
            id: '',
            region_name: '请先选择所在省'
        }]
        that.setData({
            city: citys
        })
        // 初始化区
        areas = [{
            id: '',
            region_name: '请先选择所在省市'
        }]
        that.setData({
            area: areas
        })
        // 初始化街道
        towns = [{
            id: '',
            region_name: '请先选择所在省市区'
        }]
        that.setData({
            town: towns
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
            success: function (res) {
                bcode = res.data.user_id;
                console.log(bcode + "----")
            },
        })
        wx.checkSession({
            success: function () {
                //session_key 未过期，并且在本生命周期一直有效
                return;
            },
            fail: function () {
                // session_key 已经失效，需要重新执行登录流程
                wx.navigateTo({
                    url: "../login/login"
                })
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
        var that = this;
        poster = '';
        that.setData({
            posters: ''
        })
        title,detail,label_id,maxprice,minprice,startdate,enddate,province_id,city_id,area_id,addrs,phone,wxh = "";
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
    setlebel: function(e) {
        var that = this;
        that.setData({ //给变量赋值
            lindex: e.detail.value,
        })
        label_id = that.data.label[e.detail.value].label_id;
        console.log(label_id);

    },
    setprice: function(e) {
        var that = this;
        that.setData({ //给变量赋值
            pindex: e.detail.value,
        })
        maxprice = that.data.price[e.detail.value].max_price;
        minprice = that.data.price[e.detail.value].min_price;
    },
    bindDateChange: function(e) {
        this.setData({
            startdate: e.detail.value,
        })
        startdate = e.detail.value;
    },
    bindDateChange1: function(e) {
        this.setData({
            enddate: e.detail.value
        })
        enddate = e.detail.value;
    },
    setprovince: function(e) {
      console.log(e)
        var that = this;
        that.setData({ //给变量赋值
            poindex: e.detail.value,
            cindex: 0,
            aindex: 0,
            tindex: 0
        })
        province_id = that.data.province[e.detail.value].id;
        city_id = '';
        area_id = '';
        town_id = '';
        console.log(province_id);
        citys = [{
            id: '',
            region_name: '请选择所在市'
        }]
        that.setData({
            sshi: false
        })
        // 获取所有市
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/apparea/nextlist.do",
            data: {
                areaname: 'city',
                areaid: province_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data.arealist) {
                        citys.push(res.data.data.arealist[i])
                    }
                    that.setData({
                        city: citys
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
    setcity: function(e) {
        var that = this;
        that.setData({ //给变量赋值
            cindex: e.detail.value,
            aindex: 0,
            tindex: 0
        })
        city_id = that.data.city[e.detail.value].id;
        area_id = 0;
        town_id = 0;
        console.log(city_id);
        areas = [{
            id: '',
            region_name: '请选择所在区'
        }]
        that.setData({
            squ: false
        })
        // 获取所有市
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/apparea/nextlist.do",
            data: {
                areaname: 'area',
                areaid: city_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data.arealist) {
                        areas.push(res.data.data.arealist[i])
                    }
                    that.setData({
                        area: areas
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
    setarea: function(e) {
        var that = this;
        that.setData({ //给变量赋值
            aindex: e.detail.value,
            tindex: 0
        })
        area_id = that.data.area[e.detail.value].id;
        town_id = '';
        console.log(area_id);
        towns = [{
            id: '',
            region_name: '请选择所在街道'
        }]
        that.setData({
            sjie: false
        })
        // 获取所有市
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/apparea/nextlist.do",
            data: {
                areaname: 'town',
                areaid: area_id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            success: function(res) {
                console.log(res.data.data)
                if (res.data.status == 100) {
                    for (var i in res.data.data.arealist) {
                        towns.push(res.data.data.arealist[i])
                    }
                    that.setData({
                        town: towns
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
    settown: function(e) {
        var that = this;
        that.setData({ //给变量赋值
            tindex: e.detail.value,
        })
        town_id = that.data.town[e.detail.value].id;
        console.log(town_id);
        
    },
    chooseImage(e) {
        var that = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res.tempFilePaths[0]);
                var tempFilePaths = res.tempFilePaths;
                wx.showLoading();
                wx.uploadFile({
                    url: app.data.urlhead + '/ylsj-api-service/appfile/fileUploadXcx.do', // 仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'file',
                    header: {
                        "Content-Type": "multipart/form-data",
                        'accept': 'application/json',
                    },
                    formData: {
                        'token': token
                    },
                    dataType: 'json',
                    success(res) {
                        
                        console.log(token)
                        let datas = JSON.parse(res.data)
                        console.log(datas.data.filePath)
                        poster = datas.data.filePath;
                        console.log(poster)
                        wx.hideLoading();
                        // do something
                    }
                })
                that.setData({
                    posters: res.tempFilePaths[0]
                })
            }
        })
    },
    geititle: function (e) {
        title = e.detail.value;
    },
    getdetail: function(e){
        detail = e.detail.value;
    },
    getdetailaddr: function (e) {
        addrs = e.detail.value;
    },
    getphone: function (e) {
        phone = e.detail.value;
    },
    getwx: function (e) {
        wxh = e.detail.value;
    },
    subnotice: function(e){
        wx.getStorage({
            key: 'token',
            success: function (res) {
                tokenn = res.data;
            },
        })
        wx.checkSession({
            success: function (res) {
                if (title == '') {
                    wx.showToast({
                        title: '请输入通告标题',
                        icon: 'none'
                    })
                    return false;
                }
                if (poster == '') {
                    wx.showToast({
                        title: '请上传通告海报',
                        icon: 'none'
                    })
                    return false;
                }
                if (detail == '') {
                    wx.showToast({
                        title: '请输入通告详情',
                        icon: 'none'
                    })
                    return false;
                }
                if (label_id == '') {
                    wx.showToast({
                        title: '请选择艺人类型',
                        icon: 'none'
                    })
                    return false;
                }
                if (maxprice == '') {
                    wx.showToast({
                        title: '请选择价格预算',
                        icon: 'none'
                    })
                    return false;
                }
                if (startdate == '') {
                    wx.showToast({
                        title: '请选择开始时间',
                        icon: 'none'
                    })
                    return false;
                }
                if (enddate == '') {
                    wx.showToast({
                        title: '请选择结束时间',
                        icon: 'none'
                    })
                    return false;
                }
                if (province_id == '') {
                    wx.showToast({
                        title: '请选择所在省',
                        icon: 'none'
                    })
                    return false;
                }
                if (city_id == '') {
                    wx.showToast({
                        title: '请选择所在市',
                        icon: 'none'
                    })
                    return false;
                }
                if (area_id == '') {
                    wx.showToast({
                        title: '请选择所在区',
                        icon: 'none'
                    })
                    return false;
                }
                if (town_id == '') {
                    wx.showToast({
                        title: '请选择所在街道',
                        icon: 'none'
                    })
                    return false;
                }
                if (phone == '') {
                    wx.showToast({
                        title: '请输入联系电话',
                        icon: 'none'
                    })
                    return false;
                }
                wx.showLoading();
                
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appwechat/appwebannouncement/saveAnnouncement.do",
                    data: {
                        announcement_title: title,
                        details: detail,
                        actor_type: label_id,
                        max_price: maxprice,
                        min_price: minprice,
                        start_date: startdate,
                        end_date: enddate,
                        province_id: province_id,
                        city_id: city_id,
                        area_id: area_id,
                        address: addrs,
                        link_phone: phone,
                        weixin: wxh,
                        poster_path: poster,
                        token: tokenn
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res.data.data)
                        if (res.data.status == 100) {
                            wx.hideLoading();
                            wx.showToast({
                                title: '发布成功',
                                icon: 'success',
                                duration: 1000
                            })
                            setTimeout(function () {
                                wx.switchTab({
                                    url: '../index/index',
                                })
                            },1000)
                        } else {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }

                    }
                })
            },
            fail: function (res) {
                console.log(res, '登录过期了')
                wx.showModal({
                    title: '提示',
                    content: '你的登录信息过期了，请重新登录',
                })
                //再次调用wx.login()
                wx.login({
                    success: function (res) {
                        console.log(res.code)
                        //发送请求
                        wx.request({
                            url: '自己的域名', //仅为示例，并非真实的接口地址
                            data: {
                                code: res.code
                            },
                            header: {
                                'content-type': 'application/json' // 默认值
                            },
                            success(res) {
                                console.log(res)
                            }
                        })
                    }
                })
            }
        })
        
    }
})