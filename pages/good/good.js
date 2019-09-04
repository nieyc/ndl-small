// pages/good/good.js
var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goods: {},
    gallery: [],
    attribute: [],
    issueList: [],
    comment: [],
    brand: {},
    specificationList: [],
    productList: [],
    relatedGoods: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"

  },

  getGoodsInfo:function(){
    let that = this;
    wx.request({
      url: api.goodDetailUrl,
      data: {
        goodId:that.data.id
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        // 收到https服务成功后返回
        if (res.data.resCode == 0){
          that.setData({
            goods: res.data.data.info,
            gallery: res.data.data.gallery,
            attribute:res.data.data.attribute
          });
          console.log("res.data.data.gallery:" + res.data.data.gallery)
          console.log("====" + res.data.data.info.goodDesc)
          WxParse.wxParse('goodsDetail', 'html', res.data.data.info.goodDesc, that);
        }
      
      
        
      },
      fail: function () {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        // 发生网络错误等情况触发
      },

      complete: function (res) {
        console.log("gallery:"+that.data.gallery)
      }
    })
  },
  getGoodsInfoxx: function () {
    let that = this;
    util.request(api.GoodsDetail, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          //goods: res.data.info,
         // gallery: res.data.gallery,
          //attribute: res.data.attribute,
          //issueList: res.data.issue,
         // comment: res.data.comment,
         // brand: res.data.brand,
         // specificationList: res.data.specificationList,
          //productList: res.data.productList,
         // userHasCollect: res.data.userHasCollect
        });

        if (res.data.userHasCollect == 1) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        } else {
          that.setData({
            'collectBackImage': that.data.noCollectImage
          });
        }

        WxParse.wxParse('goodsDetail', 'html', res.data.info.goods_desc, that);

        that.getGoodsRelated();
      }
    });

  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
      // id: 1181000
    });
    var that = this;
    this.getGoodsInfo();

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
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  },

  addToCart: function () {
    var that = this;
    if (this.data.openAttr == false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    }else{
      //添加到购物车
      console.log("goodId:====="+that.data.id);
      console.log("this.data.number:" + this.data.number);
      wx.request({
        url: api.carAddUrl,
        method: "POST",
        data: {
          goodId: that.data.id,
          number: this.data.number
        },
        header: { 'content-type': 'application/json' },
        success: function (res) {
          // 收到https服务成功后返回
          if (res.data.resCode == 0) {
            console.log("success..............." + res.data.data.goodsCount)
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              openAttr: !that.data.openAttr,
              cartGoodsCount: res.data.data.goodsCount
            });

          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }
        },
        fail: function () {
          console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
          // 发生网络错误等情况触发
        },

        complete: function (res) {

        }

      })
  
     }
    }


})