//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: '',
    passWord: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("app.globalData.userInfo:"+app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      console.log("this.data.canIUse:" + this.data.canIUse)
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("res.userInfo.avatarUrl:" + res.userInfo.avatarUrl)
        console.log("res.userInfo.nickName:" + res.userInfo.nickName)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindinputName: function (event) {
    let userName = this.data.userName;
    userName = event.detail.value;
    this.setData({
      userName: userName
    });
  },

  bindinputPwd: function (event) {
    let pwd = this.data.passWord;
    pwd = event.detail.value;
    this.setData({
      passWord: pwd
    });
  },
  login: function () {
    let that = this;
    wx.login({
      success: function (res) {
        console.log("res.code:" + res.code);
        console.log("res.errMsg:" + res.errMsg);
        if (res.errMsg == "login:ok") {
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx:" + res.code)
          that.setData({
            name: "nieyachun",
            autoCode: res.code
          }),
          console.log("userName:" + that.data.userName)
          console.log("that.autoCode:" + that.data.autoCode)
          wx.request({
            url: 'http://127.0.0.1:8082/account/login',
            method: "POST",
            header: { 'content-type': 'application/json' },
            data: {
              autoCode: that.data.autoCode,
              userName: that.data.userName,
              passWord: that.data.passWord
            },
            success: function (res) {
              // 收到https服务成功后返回
              console.log(res.data)
              if(res.data.resCode==0){
                wx.showToast({ title: '请求成功' })
                console.log("liyiwen:" + res.data.userInfo)
                app.globalData.userInfo124=res.data.userInfo
                app.globalData.session_key=res.data.session_key
                app.globalData.token=res.data.token
                app.globalData.openId=res.data.userInfo.openId
              }
             
            },
          })

        }
      }
    })
  },
  redirect:function(){
    wx.redirectTo({
      url: '/pages/wxml/index',
    })
  }
})
