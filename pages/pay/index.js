import { request } from '../../request/index.js'
import { getSetting, chooseAddress, openSetting, showModal } from '../../request/asyncChooseAddress.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    const address = wx.getStorageSync('address')
    const cartList = wx.getStorageSync('cart')
    this.setData({})
    let totalPrice = 0
    let totalNum = 0
    cartList.forEach(v => {
      if (v.choose) {
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      }
    })
    this.setData({
      address,
      cartList,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cartList)
  },

  /**
   * 每次更改购物车的状态时，都需要把购物车状态重新赋值到缓存当中
   */
  setCart(cartList) {

  },

  /**
   * 点击支付按钮事件
   */
  handleOrderPay() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({ url: '/pages/auth/index' })
      return;
    }
    console.log(token);
  }
})