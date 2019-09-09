var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
Page({
  data: {
    status: false,
    orderId: 0
  },
  onLoad: function (options) {
    console.log("options.status:"+options.status)
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      orderId: 24,
      status: options.status
    })
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
    console.log("==========="+this.data.status)

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  createOrder:function() {
    wx.redirectTo({
      url: '/pages/cart/cart?',
    })
  }
})