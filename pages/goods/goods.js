// pages/goods/goods.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // text:"这是一个页面"
    navList: [],
    goodsList: [],
    id: 0,
    goodTypeId: '',
    goodPlantTypeId: '',
    currentCategory: {},
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    page: 1,
    size: 10000

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    if (options.goodTypeId) {
      that.setData({
        goodTypeId: options.goodTypeId
      });
    }

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

   
    this.getGoodList();
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

  },
  getGoodList:function(){
    let that = this;
    wx.request({
      url: api.goodListUrl,
      data: {
        goodTypeId: that.data.goodTypeId,
        goodPlantTypeId: that.data.goodPlantTypeId
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data.data.channel)
        console.log(res.data.data.goodList)
        that.setData({
          navList: res.data.data.channel,
          goodList: res.data.data.goodList
        })
      },
      fail: function () {
      }

    });

  },
  switchCate: function (event) {
    console.log("this.data.goodTypeId:" + this.data.goodTypeId);
    console.log("this.data.goodTypeId:" + event.currentTarget.dataset.id);
    if (this.data.goodTypeId == event.currentTarget.dataset.id) {
      return false;
    }
    var that = this;
    var clientX = event.detail.x;
    var currentTarget = event.currentTarget;
    if (clientX < 60) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft - 60
      });
    } else if (clientX > 330) {
      that.setData({
        scrollLeft: currentTarget.offsetLeft
      });
    }
    this.setData({
      goodTypeId: event.currentTarget.dataset.id
    });
    this.getGoodList();

  },
})