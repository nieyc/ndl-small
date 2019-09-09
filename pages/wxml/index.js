// pages/wxml/index.js
//const appUrl ="https://www.gtja.com"
const api = require('../../config/api.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time:new Date().toString(),
    loading:false,
    name:'nieyc',
    a:'1',
    szzs:'6124',
    status:false,
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-06-18'
    },
    enablePullDownRefresh:true,
    autoCode:'0',
    userName:'',
    passWord:''
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log("onload ..........")
      //动态改变变量的值
      this.setData({
        name:'陈杰',
        status:true
        })
      this.clickMe();//页面加载的时候调用
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady ..........")
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
    console.log("pull................")
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
    return{
      title: '上海农得利',
      desc: '上海农得利农业生产资料有限公司',
      path: '/pages/index/index'
    }
  },
  
  clickme1:function(){
    console.log("00000000000000000000000000")
    //console.log("00000000000000000000000000" + wx.getSystemInfo)
  },
  jump:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  clickMe:function(e){
    var self = this;
    wx.request({
      //url: appUrl+'/cos/rest/quotations/query.json',
      url: api.szzsUrl,
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        // 收到https服务成功后返回
        console.log("res.data.success:" + res.data.success)
        console.log("res.data.szzsData:" + res.data.szzsData)
        console.log("名称:" + res.data.szzsData[0].stkName)
        console.log("指数:" + res.data.szzsData[0].price)
        
        console.log(res.data)
        wx.showToast({ title: '请求成功' })
      },
      fail: function () {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        // 发生网络错误等情况触发
      },
      
      complete: function (res) {
        console.log("指数cc:" + res.data.szzsData[0].price)
        //根据后台结果改变页面的值
        self.setData({
          szzs: res.data.szzsData[0].price,
          name123:'李一文'//name123不需要先定义
        })
        // 成功或者失败后触发
      }
    })

  },
  /**取局域网数据 ，设置成不校验模式*/
  getData:function(){
    var self = this;
    wx.request({
      //url: 'http://172.16.1.103:8082/api/v1/version/0',
      url:api.versionUrl,
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        // 收到https服务成功后返回
        console.log(res.data)
        wx.showToast({ title: '请求成功' })
      },
      fail: function () {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
        // 发生网络错误等情况触发
      },

      complete: function (res) {
       console.log("complete")
        // 成功或者失败后触发
      }
    })
  },
  tap:function(){
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    this.setData({
      loading: true
    })
  },
  showModel:function(){
    wx.showModal({
      title: '标题',
      content: '告知当前状态，信息和解决方法',
      confirmText: '主操作',
      cancelText: '次要操作',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击主操作')
        } else if (res.cancel) {
          console.log('用户点击次要操作')
        }
      }
    })
  },
  showToast:function(){
  wx.showToast({
    title: '已发送',
    icon: 'success',
    image: '',
    duration: 1500,
    mask: true,
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
  },
  login:function(){
    let that=this;
    wx.login({
      success: function(res){
        console.log("res.code:" + res.code);
        console.log("res.errMsg:" + res.errMsg);
        if(res.errMsg=="login:ok"){
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx:" + res.code)
            that.setData({
              name:"nieyachun",
              autoCode: res.code
            }),
          //console.log("yyyyyyyyyyyyyyyyyyyy:" + res.code)
          console.log("userName:" + that.data.userName)
          console.log("that.autoCode:" + that.data.autoCode)
          wx.request({
            url: 'http://127.0.0.1:8082/account/login',
            method:"POST",
            header: { 'content-type': 'application/json' },
            data:{
              autoCode: that.data.autoCode
            },
             success: function (res) {
              // 收到https服务成功后返回
              console.log(res.data)
              wx.showToast({ title: '请求成功' })
            },
          })
          
        }
      }
    })
  },

  bindinputName: function (event){
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
  redirect:function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  getUserInfo:function(){
    console.log(app.globalData.userInfo124);
    console.log(app.globalData.token);
    console.log(app.globalData.openId)
  }
})