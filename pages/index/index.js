import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navigationList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const swiper = wx.getStorageSync('swiper')
    const catitems = wx.getStorageSync('catitems')
    const floor = wx.getStorageSync('floor')

    if (!swiper) {
      this.getSwiperList()
    } else if ((Date.now() - swiper.time) / 1000 / 60 > 15) {
      this.getSwiperList()
    } else {
      this.setData({
        swiperList: swiper.data
      })
    }

    if (!catitems) {
      this.getNavigationList()
    } else if ((Date.now() - catitems.time) / 1000 / 60 > 15) {
      this.getNavigationList()
    } else {
      this.setData({
        navigationList: catitems.data
      })
    }

    if (!floor) {
      this.getFloorList()
    } else if ((Date.now() - floor.time) / 1000 / 60 > 15) {
      this.getFloorList()
    } else {
      this.setData({
        floorList: floor.data
      })
    }

  },

  /**
   * 获取轮播图列表
   */
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {
        wx.setStorageSync('swiper', {
          time: Date.now(),
          data: result,
        })
        this.setData({
          swiperList: result
        })
      })
  },

  /**
   * 获取导航列表
   */
  getNavigationList() {
    request({ url: '/home/catitems' })
      .then(result => {
        wx.setStorageSync('catitems', {
          time: Date.now(),
          data: result,
        })
        this.setData({
          navigationList: result
        })
      })
  },

  /**
   * 获取楼层列表
   */
  getFloorList() {
    request({ url: '/home/floordata' })
      .then(result => {
        wx.setStorageSync('floor', {
          time: Date.now(),
          data: result
        })
        this.setData({
          floorList: result
        })
      })
  }
})