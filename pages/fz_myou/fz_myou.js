// pages/fz_myou/fz_myou.js
const app = getApp();
var keyword = '';
var name;
var fan;
var zheng;
var token;
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phones: "--",
        nicheng: "--",
        zheng: "../../images/left.png",
        fan: "../../images/right.png"
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
        that.setData({
            phones: "--",
            nicheng: "--",
            zheng: "../../images/left.png",
            fan: "../../images/right.png"
        })
        name,keyword,zheng,fan = "";
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
    getkeyword: function(e){
        keyword = e.detail.value;
    },
    gosearch: function(e){
        var that = this;
        if(keyword == ""){
            wx.showToast({
                title: '请输入手机号',
                icon: "none"
            })
            return false;
        }
        wx.getStorage({
            key: 'token',
            success: function(res) {
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appShareAllinace/searchSharePhoe.do",
                    data: {
                        token: res.data,
                        phone: keyword
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res.data.data)
                        if (res.data.status == 100) {
                            if(res.data.data == null){
                                wx.showToast({
                                    title: '手机号不存在',
                                    icon: 'none'
                                })
                            }else if(res.data.data != null){
                                that.setData({
                                    phones: res.data.data.phone,
                                    nicheng: res.data.data.username
                                })
                            }else{
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'none',
                                    duration: 500
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
        })
    },
    getname: function (e) {
        name = e.detail.value
    },
    zheng: function (e) {
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
                        zheng = datas.data.filePath;
                        console.log(zheng)
                        wx.hideLoading();
                        // do something
                    }
                })
                that.setData({
                    zheng: res.tempFilePaths[0]
                })
            }
        })
    },
    fan: function (e) {
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
                        fan = datas.data.filePath;
                        console.log(fan)
                        wx.hideLoading();
                        // do something
                    }
                })
                that.setData({
                    fan: res.tempFilePaths[0]
                })
            }
        })
    },
    submit: function (e) {
        var that = this;
        if (keyword == "") {
            wx.showToast({
                title: '请输入手机号',
                icon: "none"
            })
            return false;
        }
        if (name == "" || name == null) {
            wx.showToast({
                title: '请输入真实姓名',
                icon: 'none'
            })
            return false;
        }
        if (that.data.zheng == "../../images/left.png") {
            wx.showToast({
                title: '请上传身份证正面照',
                icon: 'none'
            })
            return false;
        }
        if (that.data.fan == "../../images/right.png") {
            wx.showToast({
                title: '请上传身份证背面照',
                icon: 'none'
            })
            return false;
        }
        wx.showLoading();
        wx.getStorage({
            key: 'token',
            success: function (res) {
                token = res.data;
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appwechatxcx/saveXcxShareAllinace.do",
                    data: {
                        token: token,
                        realName: name,
                        phone: keyword,
                        audtiType: 2,
                        sid1: zheng,
                        sid2: fan
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
                                icon: 'none',
                                duration: 1000
                            })
                            setTimeout(function () {
                                wx.switchTab({
                                    url: '../mine/mine',
                                })
                            }, 1000)
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
        })
    }
})