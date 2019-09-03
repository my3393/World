//app.js
let avater = '';
let iv = '';
let encryptedData = '';
App({
    data: {
        user_id:'',
        urlhead: "https://app.apiv1.0.xingtu-group.cn",
        urlmall: "https://app.apiv1.0.xingtu-group.cn/ylsj-mall-api-service"
    },
    onLaunch: function(options) {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
      console.log(this.data)
      console.log(options.referrerInfo)
      if (options.referrerInfo.extraData){
        //启动时获取参数
        this.data.user_id = options.referrerInfo.extraData.user_id;
      }
      
   
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    },
    onShow: function(e) {
        wx.getSetting({
            success(res) {
                console.log(res.authSetting['scope.userInfo'])
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称

                    wx.login({
                        success: function(res) {
                            wx.getUserInfo({
                                success: function(res) {
                                  iv = res.iv
                                  encryptedData = res.encryptedData
                                    avater = JSON.parse(res.rawData)
                                    console.log(avater.nickName)
                                    wx.setStorage({
                                        key: 'avater',
                                        data: avater,
                                    })
                                }
                            })
                            console.log(res.code)
                            if (res) {
                              
                                setTimeout(function() {
                                    wx.request({
                                        url: "https://app.apiv1.0.xingtu-group.cn/ylsj-api-service/applogin3/xcx/login.do",
                                        data: {
                                            code: res.code,
                                            nickName: avater.nickName,
                                            avatarUrl: avater.avatarUrl,
                                            encryptedData: encryptedData,
                                            iv: iv
                                        },
                                        method: 'POST',
                                        header: {
                                            'content-type': 'application/x-www-form-urlencoded'
                                        },
                                        dataType: 'json',
                                        success: function(res) {
                                            console.log(res.data.data);
                                            wx.setStorage({
                                                key: 'token',
                                                data: res.data.data.token,
                                            })
                                            wx.setStorage({
                                                key: 'userinfo',
                                                data: res.data.data.user,
                                            })
                                            // if (res.data.data.user.phone == null || res.data.data.user.phone == ''){
                                            //     wx.redirectTo({
                                            //         url: '../bindphone/bindphone',
                                            //     })
                                            // }
                                        }
                                    })
                                }, 500)
                            }
                        }
                    });
                }
                if (res.authSetting['scope.userInfo'] == undefined || res.authSetting['scope.userInfo'] == false) {
                    wx.redirectTo({
                        url: '../login/login',
                    })
                }
            }
        })
    },
})