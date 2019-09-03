// pages/yl_online/yl_online.js
var util = require('../../utils/util.js');
var app = getApp();
var token;
var wfee = [];
var title = '';
var startdate = '';
var enddate = '';
var province_id = '';
var city_id = '';
var citys = [];
var areas = [];
var towns = [];
var area_id = '';
var town_id = '';
var addrs = "";
var ccfee = "";
var persent = '';
var lids = '';
var article_id = '';
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dfee: [],
        num: null,
        price: '',
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        article_id = options.article_id
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function(res) {
                token = res.data;
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/apponlinebook/online.do",
                    data: {
                        token: token,
                        artist_id: article_id
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res.data.data)
                        if (res.data.status == 100) {
                            wfee = res.data.data.fees;
                            that.setData({
                                dfee: wfee
                            });
                        } else {
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none',
                                duration: 500
                            })
                        }

                    }
                });
            },
        })

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
            success: function (res) {
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
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.getStorage({
            key: 'token',
            success: function(res) {
                token = res.data;
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
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        var that = this;
        lids = "";
        token = '';
        title = '';
        startdate = '';
        enddate = '';
        province_id = '';
        city_id = '';
        area_id = '';
        town_id = '';
        addrs = '';
        ccfee = '';
        persent = '';
        that.setData({
            price: []
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
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
    choosefee: function(e){
        console.log(e)
        lids = e.currentTarget.id;
        var that = this;
        if (e.currentTarget.dataset.minprice == undefined){
            that.setData({
                price: '预约沟通'
            })
        }else{
            that.setData({
                price: e.currentTarget.dataset.minprice + "-" + e.currentTarget.dataset.maxprice
            })
        }
        that.setData({
            num: e.currentTarget.dataset.num
        })
    },
    geititle: function(e){
        title = e.detail.value;
        console.log(title)
    },
    bindDateChange: function (e) {
        this.setData({
            startdate: e.detail.value,
        })
        startdate = e.detail.value;
    },
    bindDateChange1: function (e) {
        this.setData({
            enddate: e.detail.value
        })
        enddate = e.detail.value;
    },
    setprovince: function (e) {
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
            success: function (res) {
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
    setcity: function (e) {
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
            success: function (res) {
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
    setarea: function (e) {
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
            success: function (res) {
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
    settown: function (e) {
        var that = this;
        that.setData({ //给变量赋值
            tindex: e.detail.value,
        })
        town_id = that.data.town[e.detail.value].id;
        console.log(town_id);
    },
    getdetailaddr: function(e){
        addrs = e.detail.value;
    },
    getfees: function(e){
        ccfee = e.detail.value;
    },
    getpersent: function(e){
        persent = e.detail.value;
    },
    subyl: function(e){
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function(res) {
                if (lids == '') {
                    wx.showToast({
                        title: '请选择出场类型',
                        icon: 'none'
                    })
                    return false;
                }
                if (title == '') {
                    wx.showToast({
                        title: '请输入活动主题',
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
                if (addrs == '') {
                    wx.showToast({
                        title: '请输入详细地址',
                        icon: 'none'
                    })
                    return false;
                }
                if (ccfee == '') {
                    wx.showToast({
                        title: '请输入出场费用',
                        icon: 'none'
                    })
                    return false;
                }
                if (persent == '') {
                    wx.showToast({
                        title: '请输入预付百分比',
                        icon: 'none'
                    })
                    return false;
                }
                wx.showLoading({
                    title: '正在提交...',
                })
                var shareUserId;
                setTimeout(function(){
                    wx.getStorage({
                        key: 'bcode',
                        success: function (res) {
                            shareUserId = res.data;
                        },
                    })
                },1000)
                setTimeout(function(){
                    wx.request({
                        url: app.data.urlhead + "/ylsj-api-service/apponlinebook/saveOnline.do",
                        data: {
                            token: res.data,
                            artist_id: article_id,
                            theme: title,
                            start_date: startdate,
                            end_date: enddate,
                            province_id: province_id,
                            city_id: city_id,
                            area_id: area_id,
                            town_id: town_id,
                            address: addrs,
                            price: ccfee,
                            pay_advance: persent,
                            label_id: lids,
                            shareUserId: shareUserId
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
                                    title: '提交预约成功',
                                    icon: 'success',
                                    duration: 1000
                                })
                                setTimeout(function () {
                                    wx.switchTab({
                                        url: '../index/index',
                                    })
                                }, 1000)
                            } else {
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            }

                        }
                    })
                },1200)
            },
        })
    }
})