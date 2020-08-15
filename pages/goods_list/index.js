import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 标签列表
    tabs: [
      {
        id: 0,
        name: '综合',
        isAcitve: true
      },
      {
        id: 1,
        name: '销量',
        isAcitve: false
      },
      {
        id: 2,
        name: '价格',
        isAcitve: false
      }
    ],
    // 商品列表
    goodsList: []
  },

  /**
   * 设置默认请求商品列表的参数
   */
  QueryString: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },

  /**
   * 获取商品列表的总页数
   */
  pagetotal: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryString.cid = options.cid
    this.getGoodsList()
  },

  /**
   * 监听用户上拉触底事件
   */
  onReachBottom() {
    // 判断当前页面是否为最后一页
    if (this.QueryString.pagenum < this.pagetotal) {
      this.QueryString.pagenum++
      this.getGoodsList()
    } else {
      wx.showToast({
        icon: 'none',
        title: '已经到最后一页了',
      })
    }
  },

  /**
   * 监听下拉刷新事件
   */
  onPullDownRefresh() {
    this.data.goodsList = []
    this.QueryString.pagenum = 1
    this.getGoodsList()
  },
  
  /**
   * 根据商品参数cid请求商品列表的数据
   */
  async getGoodsList() {
    const result = await request({ url: '/goods/search', data: this.QueryString })
    this.pagetotal = Math.ceil(result.total / this.QueryString.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    wx.stopPullDownRefresh()
  },

  /**
   * 点击tab标签时候触发的事件
   */
  handleTabItem(e) {
    const { index } = e.detail
    const tabs = this.data.tabs
    tabs.forEach((v, i) => i === index ? v.isAcitve = true : v.isAcitve = false)
    this.setData({
      tabs
    })
  }

})