import { request } from '../../request/index.js'
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../request/asyncChooseAddress.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cartList: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    const address = wx.getStorageSync('address')
    const cartList = wx.getStorageSync('cart') || []
    this.setData({ address })
    this.setCart(cartList)
  },

  /**
   * 每次更改购物车的状态时，都需要把购物车状态重新赋值到缓存当中
   */
  setCart(cartList) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cartList.forEach(v => {
      if (v.choose) {
        totalPrice += v.goods_price * v.num
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cartList.length ? allChecked : false
    this.setData({
      cartList,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cartList)
  },

  /**
   * 监听点击收获地址按钮事件
   */
  async handleChooseAddress() {
    const status = await getSetting()
    const scopeAddress = status.authSetting['scope.address']
    try {
      if (scopeAddress === false) {
        await openSetting()
      }
      const result = await chooseAddress()
      wx.setStorageSync('address', result)
    } catch (error) {
      console.log(error);
    }
  },

  /**
     * 监听点击某一个商品的复选框事件
     */
  handleItemCheckbox(e) {
    const { index } = e.currentTarget.dataset
    const cartList = wx.getStorageSync('cart')
    cartList[index].choose = !(cartList[index].choose)
    this.setCart(cartList)
  },

  /**
   * 监听点击全选/不全选的复选框事件
   */
  handleAllCheckbox() {
    let { allChecked, cartList } = this.data
    allChecked = !allChecked
    cartList.forEach(v => v.choose = allChecked)
    this.setCart(cartList)
  },

  /**
   * 监听点击商品增加/减少数量的按钮事件
   */
  async editGoodsNum(e) {
    const cartList = wx.getStorageSync('cart')
    const { index } = e.currentTarget.dataset
    var arr = index.split(' ')
    if (arr[0] === '+') {
      cartList[arr[1]].num++
    } else if (cartList[arr[1]].num > 1) {
      cartList[arr[1]].num--
    } else {
      const result = await showModal('您确定要删除商品吗？')
      if (result.confirm) {
        cartList.splice(arr[1], 1)
      }
    }
    this.setCart(cartList)
  },

  /**
   * 监听点击结算按钮事件
   */
  async handlePay() {
    const { address, totalNum } = this.data
    if (address.userName === undefined) {
      await showToast({ title: '请填写您的收货地址' })
      return;
    } else if (totalNum === 0) {
      await showToast({ title: '您的购物车为空哦' })
      return;
    } else {
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    }
  }

})