var util = require('../../../utils/test.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    orderList: [],
    page:1,
    size:10
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getOrderList();
  },
  getOrderList() {
    let that = this;
    util.request(api.orderListUrl).then(function (res) {
      console.log("res.data:" + res.data)
      console.log("res.data.resCode:" + res.resCode)
      if (res.resCode == 0) {
        console.log(res.data.orderList);
        that.setData({
          orderList: res.data.orderList
        });
      }
    }); 
  },

  payOrder() {
    wx.redirectTo({
      url: '/pages/pay/pay',
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})