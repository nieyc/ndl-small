//var api = require('../config/api.js')

function request(url, data = {}, method="POST"){
  return new Promise(function(resolve,reject){
    var time = { timestamp: Date.parse(new Date())}
    data=merge(time, data);
    var token = { token: wx.getStorageSync('token') }
    data = merge(token,data)
    console.log("data===" + JSON.stringify(data))
    wx.request({
      url: url,
      method:method,
      data: data,
      header:{
        'Content-Type': 'application/json',
        'ndl-Token': wx.getStorageSync('token')
      },
      success:function(res){
        if(res.data.resCode==0){
          resolve(res.data)
        }else if(res.data.resCode=="-1"){
          console.log("用户没有登录")
          wx.redirectTo({
            url: '/pages/auth/login/login',
          })
        }
        
      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }

    })
  });
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

function getTimeStamp(){
  var timestamp = Date.parse(new Date());
  //timestamp = timestamp / 1000;
  console.log("当前时间戳为：" + timestamp); 
  return timestamp; 
}

function merge (jsonbject1, jsonbject2) {
  var resultJsonObject = {};
  for (var attr in jsonbject1) {
    resultJsonObject[attr] = jsonbject1[attr];
  }
  for (var attr in jsonbject2) {
    resultJsonObject[attr] = jsonbject2[attr];
  }
  return resultJsonObject;
};


//为了让其他地方能引用函数
module.exports={
  request,
  showErrorToast,
  getTimeStamp
}