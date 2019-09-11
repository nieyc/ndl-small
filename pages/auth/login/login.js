var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    code: '',
    loginErrorCount: 0,
    autoCode:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  startLogin: function () {
    var that = this;
    if (that.data.password.length < 1 || that.data.username.length < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入用户名和密码',
        showCancel: false
      });
      return false;
    }

    wx.login({
      success: function (res) {
        console.log("res.code:" + res.code);
        console.log("res.errMsg:" + res.errMsg);
        if (res.errMsg == "login:ok") {
           console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx:" + res.code)
           that.setData({
            autoCode: res.code
          }),
          console.log("that.autoCode:" + that.data.autoCode)

          wx.request({
            url: api.loginUrl,
            data: {
              userName: that.data.username,
              passWord: that.data.password,
              autoCode: that.data.autoCode
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data.resCode == 0) {
                app.globalData.userInfo = res.data.userInfo
                that.setData({
                  'loginErrorCount': 0
                });
                wx.setStorage({
                  key: "token",
                  data: res.data.sessionKey,
                  success: function () {
                    wx.switchTab({
                      url: '/pages/ucenter/index/index'
                    });
                  }
                });
              } else {
                wx.showModal({
                  title: '错误信息',
                  content: res.data.resMsg,
                  showCancel: false
                });
                return false;
              }
            }
          });
        }
      }
    })

  },
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})