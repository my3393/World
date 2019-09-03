// pages/iwillpromote/iwillpromote.js
var province_id = "";
var city_id = "";
var app = getApp();
var citys = [];
var count = 0;
var ids = [];
var moren = [];
var names = undefined;
var token;
var images = [];
var imagess = [];
var simages = [];
var simagess = [];
var title = '';
var person = '';
var prices = [];
var maxprice = '';
var minprice = '';
var tokenn;
var photos;
var labels = [];
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showimg: true,
        showimgs: true,
        artist_type: "请选择艺人类型",
        showlabels: true,
        labels: [],
        posters: '../../images/upimg.png',
        posterss: '../../images/upimg.png',
        province: [],
        poindex: 0,
        city: [],
        cindex: 0,
        imgs: [],
        imgss: [],
        isvideo: true,
        showadd: false,
        showadds: false,
        showaddss: false,
        tvideo: '',
        price: [],
        pindex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.setNavigationBarTitle({
            title: '帮艺人入驻',
        })

        // 获取所有省
        var province = [{
            id: '',
            region_name: '请选择所在省'
        }]
        wx.getStorage({
            key: 'token',
            success: function (res) {
                token = res.data;
            },
        })
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
        // 获取艺人标签
        wx.request({
            url: app.data.urlhead + "/ylsj-api-service/appactortype/actorTypesXcx.do",
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
                        labels: res.data.data
                    })
                    moren = res.data.data;
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 500
                    })
                }

            }
        })

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
            success: function (res) {
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
        images = [];
        imagess = [];
        simages = [];
        simagess = [];
        count = 0;
        ids = "";
        title = '';
        province_id = '';
        city_id = '';
        person = "";
        photos = '';
        photoss = '';
        maxprice = '';
        minprice = '';
        that.setData({
            imgs: [],
            imgss: []
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
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            count: 5,
            sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res.tempFilePaths);
                var tempFilePaths = res.tempFilePaths;
                for (var i in tempFilePaths) {
                    images.push(tempFilePaths[i])
                    console.log(1)
                    wx.showLoading();
                    wx.uploadFile({
                        url: app.data.urlhead + '/ylsj-api-service/appfile/fileUploadXcx.do', // 仅为示例，非真实的接口地址
                        filePath: tempFilePaths[i],
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
                            console.log(datas)
                            wx.hideLoading();
                            simages.push(datas.data.filePath)
                            // do something
                            console.log(simages)
                            if (simages.length == 5) {
                                that.setData({
                                    showadd: !that.data.showadd
                                })
                            }
                        }
                    })


                }
                that.setData({
                    imgs: images,
                    showimg: false
                })
            }
        })
    },

    chooseImages: function (e) {
        var that = this;
        wx.chooseImage({
            count: 5,
            sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res.tempFilePaths);
                var tempFilePaths = res.tempFilePaths;
                for (var i in tempFilePaths) {
                    imagess.push(tempFilePaths[i])
                    console.log(1)
                    wx.showLoading();
                    wx.uploadFile({
                        url: app.data.urlhead + '/ylsj-api-service/appfile/fileUploadXcx.do', // 仅为示例，非真实的接口地址
                        filePath: tempFilePaths[i],
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
                            console.log(datas)
                            wx.hideLoading();
                            simagess.push(datas.data.filePath)
                            // do something
                            console.log(simages)
                            if (simagess.length == 5) {
                                that.setData({
                                    showaddss: !that.data.showaddss
                                })
                            }
                        }
                    })


                }
                that.setData({
                    imgss: imagess,
                    showimgs: false
                })
            }
        })
    },
    chooseVideo: function (e) {
        var that = this;
        wx.getStorage({
            key: 'token',
            success: function (res) {
                token = res.data;
            },
        })
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: 10,
            camera: 'back',
            success(res) {
                wx.showLoading({
                    title: '视频上传中...',
                })
                console.log(res.tempFilePath)
                var tempFilePathss = res.tempFilePaths;
                that.setData({
                    showadds: !that.data.showadds
                })
                wx.uploadFile({
                    url: app.data.urlhead + '/ylsj-api-service/appfile/fileUploadXcx.do', // 仅为示例，非真实的接口地址
                    filePath: res.tempFilePath,
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
                        console.log(datas)
                        wx.hideLoading();
                        wx.showToast({
                            title: '上传成功',
                            icon: 'success'
                        })
                        that.setData({
                            tvideo: datas.data.filePath
                        })
                    }
                })
            }
        })
    },
    handleImagePreview(e) {
        var that = this;
        const idx = e.target.dataset.idx
        const images = that.data.imgs
        wx.previewImage({
            current: images[idx],  //当前预览的图片
            urls: images,  //所有要预览的图片
        })
    },
    setprovince: function (e) {
        var that = this;
        that.setData({ //给变量赋值
            poindex: e.detail.value,
            cindex: 0
        })
        province_id = that.data.province[e.detail.value].id;
        city_id = '';
        console.log(province_id);
        citys = [{
            id: '',
            region_name: '请选择所在市'
        }]
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
        })
        city_id = that.data.city[e.detail.value].id;
        console.log(city_id);
    },
    showlabel: function (e) {
        var that = this;
        that.setData({
            showlabels: !that.data.showlabels
        })
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
        that.setData({
            showlabels: !that.data.showlabels,
            artist_type: names
        })
    },
    setprice: function (e) {
        var that = this;
        that.setData({ //给变量赋值
            pindex: e.detail.value,
        })
        maxprice = that.data.price[e.detail.value].max_price;
        minprice = that.data.price[e.detail.value].min_price;
    },
    chooselabel: function (e) {
        console.log(e)
        var that = this;
        labels = that.data.labels;


        if (count == 3) {
            wx.showToast({
                title: '最多选择三项',
                icon: 'none'
            })
            return false;
        } else {
            names = undefined;

            ids = [];
            labels[e.currentTarget.dataset.index].selected = !labels[e.currentTarget.dataset.index].selected;
            that.setData({
                labels: labels
            })
            count = 0;
            for (var i in labels) {
                if (labels[i].selected == false) {
                    count = count + 1;
                    ids.push(labels[i].label_id);
                    if (names == undefined) {
                        names = labels[i].label_name;
                    } else {
                        names = names + "-" + labels[i].label_name;
                    }
                }
            }
        }
        console.log(ids)
    },
    showvideo: function (e) {
        var that = this;
        console.log(e)
        that.setData({
            isvideo: !that.data.isvideo,
            play: e.currentTarget.id
        })
    },
    hidevideo: function (e) {
        var that = this;
        that.setData({
            isvideo: !that.data.isvideo
        })
    },
    geititle: function (e) {
        title = e.detail.value;
    },
    getperson: function (e) {
        person = e.detail.value;
    },
    subnotice: function (e) {
        var photos;
        var photoss;
        var lid;
        console.log(ids)
        wx.getStorage({
            key: 'token',
            success: function (res) {
                tokenn = res.data;
                console.log(tokenn)
            },
        })
        var that = this;
        wx.checkSession({
            success: function (res) {
                if (simages.length < 2) {
                    photos = simages[0];
                } else {
                    photos = simages.join(",");
                }
                if (simagess.length < 2) {
                    photoss = simagess[0];
                } else {
                    photoss = simagess.join(",");
                }
                if (ids.length < 2) {
                    lid = ids[0];
                } else {
                    lid = ids.join(",");
                }
                if (title == '') {
                    wx.showToast({
                        title: '请输入艺名',
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
                if (lid == undefined) {
                    wx.showToast({
                        title: '请选择艺人标签',
                        icon: 'none'
                    })
                    return false;
                }
                if (person == '') {
                    wx.showToast({
                        title: '请输入个人介绍',
                        icon: 'none'
                    })
                    return false;
                }

                if (photos == undefined) {
                    wx.showToast({
                        title: '请至少上传一张个人照',
                        icon: 'none'
                    })
                    return false;
                }
                if (that.data.tvideo == '') {
                    wx.showToast({
                        title: '请上传授权视频',
                        icon: 'none'
                    })
                    return false;
                }
                wx.showLoading();
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appwechat/appwebartist/applyArtist.do",
                    data: {
                        token: tokenn,
                        name: title,
                        province_id: province_id,
                        city_id: city_id,
                        artiseLabelsStr: lid,
                        artist_introduce: person,
                        personalPhotosStr: photos,
                        authorized_video: that.data.tvideo,
                        applyType: 2,
                        maxPrice: maxprice,
                        minPrice: minprice,
                        agentAuthorizationsStr: photoss
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
                                title: '提交成功',
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
            },
            fail: function (res) {
                console.log(res, '登录过期了')
                wx.showModal({
                    title: '提示',
                    content: '你的登录信息过期了，请重新登录',
                })
                //再次调用wx.login()
                // wx.login({
                //     success: function (res) {
                //         console.log(res.code)
                //         //发送请求
                //         wx.request({
                //             url: '自己的域名', //仅为示例，并非真实的接口地址
                //             data: {
                //                 code: res.code
                //             },
                //             header: {
                //                 'content-type': 'application/json' // 默认值
                //             },
                //             success(res) {
                //                 console.log(res)
                //             }
                //         })
                //     }
                // })
            }
        })
    }
})