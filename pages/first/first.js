// pages/first/first.js

const api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsCount:'100',
    banner: [],
    channel:[],
    plant:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAd()
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
  getAd:function(){
    var self = this;
    wx.request({
      url: api.adUrl,
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        // 收到https服务成功后返回
        console.log("res.data.success:" + res.data.resCode)
        console.log("res.data.adList:" + res.data.data.adList)
      },
      fail: function () {
        console.log("getad fail...")
        // 发生网络错误等情况触发
      },
      complete: function (res) {
        //根据后台结果改变页面的值
        self.setData({
          banner: res.data.data.adList,
          channel:res.data.data.channelList,
          plant:res.data.data.plantList
        })
        // 成功或者失败后触发
      }
    })

  }
})