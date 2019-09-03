// pages/agent_enter/agent_enter.js
const app = getApp();
var token = '';
var name = '';
var phone = '';
var idcard = '';
var company = '';
var poster = '';
var bcode;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: "--",
        posters: '../../images/z_add.png',
        ishow: true,
        num: 0
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
        var that = this;
        wx.getStorage({
            key: 'userinfo',
            success: function(res) {
                that.setData({
                    phone: res.data.phone
                })
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
    getname: function(e){
        name = e.detail.value
    },
    getcard: function(e){
        idcard = e.detail.value
    },
    getcompany: function(e){
        company = e.detail.value
    },
    showc: function(e){
        var that = this;
        if (e.currentTarget.id == 1){
            that.setData({
                ishow: false,
                num: e.currentTarget.id
            })
        }else{
            that.setData({
                ishow: true,
                num: e.currentTarget.id
            })
        }
        
    },
    submit: function(e){
        var that = this;
        if(name == ''){
            wx.showToast({
                title: '请填写您的真实姓名',
                icon: 'none'
            })
            return false;
        }
        if (idcard == '') {
            wx.showToast({
                title: '请填写您的身份证号',
                icon: 'none'
            })
            return false;
        }
        if (that.data.posters == '../../images/z_add.png') {
            wx.showToast({
                title: '请上传经纪人资格证',
                icon: 'none'
            })
            return false;
        }
        if(that.data.num == 0){
            wx.showToast({
                title: '请选择经纪公司',
                icon: 'none'
            })
            return false;
        } 
        if (that.data.num == 1 && company == '') {
            wx.showToast({
                title: '请填写公司名称',
                icon: 'none'
            })
            return false;
        }
        wx.showLoading();
        wx.getStorage({
            key: 'token',
            success: function(res) {
                wx.request({
                    url: app.data.urlhead + "/ylsj-api-service/appwechat/appagent/applyAgent.do",
                    data: {
                        token: res.data,
                        name: name,
                        id_card: idcard,
                        agent_type: that.data.num,
                        qualification: poster,
                        company_name: company
                    },
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    dataType: 'json',
                    success: function (res) {
                        if(res.data.status == 100){
                            wx.hideLoading();
                            wx.showToast({
                                title: '提交成功',
                                icon: 'none'
                            })
                            setTimeout(function(){
                                wx.switchTab({
                                    url: '../mine/mine',
                                })
                            },1000)
                        }else{
                            wx.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    }
                })
            },
        })
    }
})