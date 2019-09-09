// pages/cart/cart.js
var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartGoods: [],
    cartTotal: {
      "goodsCount": 0,
      "goodsAmount": 0.00,
      "checkedGoodsCount": 0,
      "checkedGoodsAmount": 0.00
    },
    isEditCart: false,
    checkedAllStatus: true,
    editCartList: []

  },


  getCartList: function () {
    let that = this;
    wx.request({
      url: api.cartListUrl,
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if(res.data.resCode==0){
          that.setData({
            cartGoods: res.data.data.cartList,
            cartTotal: res.data.data.cartTotal
          })

          that.setData({
            checkedAllStatus: that.isCheckedAll()
          });
        }
      },
      fail: function () {
      }
    });
  },

  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
  },

  checkedItem: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let that = this;
    if (!this.data.isEditCart) {
      wx.request({
        url: api.cartCheckedUrl,
        data: {
          productId: that.data.cartGoods[itemIndex].id,
          isChecked: that.data.cartGoods[itemIndex].checked ? 0:1
        },
        method:"POST",
        header: { 'content-type': 'application/json' },
        success: function (res) {
          if (res.data.resCode == 0) {
            that.setData({
              cartGoods: res.data.data.cartList,
              cartTotal: res.data.data.cartTotal
            })
            that.setData({
              checkedAllStatus: that.isCheckedAll()
            });
          }
        },
        fail: function () {
        }
      })

    } else {
      //编辑状态
      let tmpCartData = this.data.cartGoods.map(function (element, index, array) {
        if (index == itemIndex) {
          element.checked = !element.checked;
        }

        return element;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }
  },


  getCheckedGoodsCount: function () {
    let checkedGoodsCount = 0;
    this.data.cartGoods.forEach(function (v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number;
      }
    });
    console.log(checkedGoodsCount);
    return checkedGoodsCount;
  },


  checkedAll: function () {
    let that = this;
    if (!this.data.isEditCart) {
        var productIds = this.data.cartGoods.map(function (v) {
        return v.id;
        });
      console.log("productIds:" + productIds);
      wx.request({
        url: api.cartCheckedAllUrl,
        data: {
          productId: productIds.join(','),
          isChecked: that.isCheckedAll() ? 0 : 1 
        },
        method: "POST",
        header: { 'content-type': 'application/json' },
        success: function (res) {
          if (res.data.resCode == 0) {
            that.setData({
              cartGoods: res.data.data.cartList,
              cartTotal: res.data.data.cartTotal
            })
            that.setData({
              checkedAllStatus: that.isCheckedAll()
            });
          }
        },
        fail: function () {
        }
      })
    } else {
      //编辑状态
      let checkedAllStatus = that.isCheckedAll();
      let tmpCartData = this.data.cartGoods.map(function (v) {
        v.checked = !checkedAllStatus;
        return v;
      });

      that.setData({
        cartGoods: tmpCartData,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },



  editCart: function () {
    var that = this;
    if (this.data.isEditCart) {
      this.getCartList();
      this.setData({
        isEditCart: !this.data.isEditCart
      });
    } else {
      //编辑状态
      let tmpCartList = this.data.cartGoods.map(function (v) {
        v.checked = false;
        return v;
      });
      this.setData({
        editCartList: this.data.cartGoods,
        cartGoods: tmpCartList,
        isEditCart: !this.data.isEditCart,
        checkedAllStatus: that.isCheckedAll(),
        'cartTotal.checkedGoodsCount': that.getCheckedGoodsCount()
      });
    }

  },
  updateCart: function (productId, number) {
    let that = this;
    wx.request({
      url: api.cartUpdateUrl,
      data: {
        productId: productId,
        number: number,
      },
      method: "POST",
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data.resCode == 0) {
          that.setData({
           // cartGoods: res.data.data.cartList,
            //cartTotal: res.data.data.cartTotal
          })
          that.setData({
            checkedAllStatus: that.isCheckedAll()
          });
        }
      },
      fail: function () {
      }

    })


  },
  cutNumber: function (event) {
    let itemIndex = event.target.dataset.itemIndex;  
    let cartItem = this.data.cartGoods[itemIndex];
    let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.id,number);
  },
  addNumber: function (event) {
    let itemIndex = event.target.dataset.itemIndex;
    let cartItem = this.data.cartGoods[itemIndex];
    let number = cartItem.number + 1;
    cartItem.number = number;
    this.setData({
      cartGoods: this.data.cartGoods
    });
    this.updateCart(cartItem.id, number);

  },
  //下单
  checkoutOrder: function () {
    //获取已选择的商品
    var that = this;
    var checkedGoods = this.data.cartGoods.filter(function (element, index, array) {
      console.log(element.goodsId)
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
   
    if (checkedGoods.length <= 0) {
      console.log("yyyyyyyyyyyyyyyyyy")
      return false;
    }

    let productIds = checkedGoods.map(function (element, index, array) {
      if (element.checked == true) {
        return element.id;
      }
    });
    console.log("productIds:" + productIds.join(','))
    //console.log("money:"+that.data.cartTotal.checkedGoodsAmount)
    console.log("money:" + this.data.cartTotal.checkedGoodsAmount)
    wx.showModal({
      title: '下单',
      content: '确认提交订单吗',
      confirmText: '确认',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
           console.log('用户点击主操作')
          console.log("productIdsxxxx:" + productIds)
          wx.request({
            url: api.orderSaverUrl,
            data: {
              productIds: productIds,
              goodAmounts:that.data.cartTotal.checkedGoodsAmount
            },
            method: "POST",
            header: { 'content-type': 'application/json' },
            success: function (res) {
             if(res.data.resCode==0){
               console.log("success....................")
               wx.redirectTo({
                 url: '/pages/payResult/payResult?status=true',
               })
             }
            }
            
          })


        } else if (res.cancel) {
          console.log('用户点击次要操作')
        }
      }
    })

    /** 
    wx.navigateTo({
      url: '../shopping/checkout/checkout'
    })*/
  },


  deleteCart: function () {
    //获取已选择的商品
    let that = this;

    let productIds = this.data.cartGoods.filter(function (element, index, array) {
      if (element.checked == true) {
        return true;
      } else {
        return false;
      }
    });
    console.log("productIds:" + productIds)
    console.log("productIds.length:" + productIds.length)
    if (productIds.length <= 0) {
      return false;
    }

    productIds = productIds.map(function (element, index, array) {
      if (element.checked == true) {
        return element.id;
      }
    });
    console.log("productIds:" + productIds.join(',') )

    wx.request({
      url: api.cartDeleteUrl,
      data: {
        productId: productIds
      },
      method: "POST",
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data.resCode == 0) {
          let cartList = res.data.data.cartList.map(v => {
            console.log(v);
            v.checked = false;
            return v;
          });
          that.setData({
            checkedAllStatus: that.isCheckedAll()
          });
        }
      },
      fail: function () {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getCartList();
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

  }
})