import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  data: {
    goodsInfo: {},
    isCollected: false
  },

  onShow: function () {
    const currentPage = getCurrentPages()  // 获取当前页面对象
    const { goods_id } = currentPage[currentPage.length - 1].options
    this.getGoodsDetail(goods_id)
    this.Collect()
  },

  /**
   * 获取商品详情的方法
   */
  async getGoodsDetail(params) {
    const result = await request({ url: '/goods/detail', data: { goods_id: params } })
    const goodsInfo = {
      goods_id: result.goods_id,
      goods_price: result.goods_price,
      goods_name: result.goods_name,
      goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
      pics: result.pics
    }
    this.setData({
      goodsInfo
    })
    this.Collect()
  },

  /**
   * 监听点击图片事件，点击后预览图片
   */
  handlePreviewImage(e) {
    const pics = this.data.goodsInfo.pics
    const urls = pics.map(v => v.pics_big)
    wx.previewImage({
      current: e.currentTarget.dataset.pid,
      urls
    })
  },

  /**
   * 监听点击添加购物车事件
   */
  handleCart() {
    // 获取本地存储的购物车列表
    const cartList = wx.getStorageSync('cart') || []
    const index = cartList.findIndex(v => v.goods_name === this.data.goodsInfo.goods_name)
    if (index === -1) {  // 如果购物车不存在当前添加的商品，则在当前商品添加num属性
      this.data.goodsInfo.num = 1
      this.data.goodsInfo.choose = true
      cartList.push(this.data.goodsInfo)
    } else {  // 如果购物车存在当前添加的商品，则在商品的num属性自增
      cartList[index].num++
    }
    wx.setStorageSync('cart', cartList)
    wx.showToast({
      title: '已加入购物车！',
    })
  },

  /**
   * 设置收藏toggle功能
   */
  Collect() {
    const { goods_id } = this.data.goodsInfo
    let collections = wx.getStorageSync('collect') || []
    let isCollected = collections.some(v => v.goods_id === goods_id)
    if (isCollected) {
      this.setData({ isCollected: true })
    }
  },

  /**
   * 点击收藏按钮事件
   */
  handleCollect() {
    const { goods_id } = this.data.goodsInfo
    let isCollected = false
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(v => v.goods_id === goods_id)
    if (index !== -1) {
      collect.splice(index, 1)
      wx.showToast({
        title: '已取消收藏',
      })
    } else {
      collect.push(this.data.goodsInfo)
      isCollected = true
      wx.showToast({
        title: '收藏成功',
      })
    }

    wx.setStorageSync('collect', collect)
    this.setData({ isCollected })
  }
})