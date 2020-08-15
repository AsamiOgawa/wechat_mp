import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList: [], // 左侧菜单列表
    rightMenuContent: [], // 右侧菜单内容
    indexAcitve: 0,  // 默认左侧菜单的第一个菜单为选中状态
    scrollTop: 0  // 每次切换左侧菜单的选项时，右侧内容的都会返回到页面顶部
  },
  cateList: [],  // 商品分类数据列表

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 设置缓存功能，首先判断当前本地是否存储了数据
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCateList()
    } else if ((Date.now() - cates.time) / 1000 / 60 > 15) {
      this.getCateList()
    } else {
      this.cateList = cates.data
      let leftMenuList = this.cateList.map(v => v.cat_name)
      let rightMenuContent = this.cateList[0].children
      this.setData({
        leftMenuList,
        rightMenuContent
      })
    }
  },

  /**
   * 获取商品分类数据
   */
  async getCateList() {
    const result = await request({ url: '/categories' })
    this.cateList = result
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.cateList
    })
    let leftMenuList = this.cateList.map(v => v.cat_name)
    let rightMenuContent = this.cateList[0].children
    this.setData({
      leftMenuList,
      rightMenuContent
    })

    // .then(
    //   value => {
    //     this.cateList = value.data.message
    //     // 接收到响应的数据，存储到数据到本地当中，同时设置时间戳
    //     wx.setStorageSync('cates', {
    //       time: Date.now(),
    //       data: this.cateList
    //     })

    //     // 构造左侧菜单列表
    //     let leftMenuList = this.cateList.map(v => v.cat_name)

    //     // 构造右侧菜单列表
    //     let rightMenuContent = this.cateList[0].children

    //     // 保存到data对象当中
    //     this.setData({
    //       leftMenuList,
    //       rightMenuContent
    //     })
    //   }
    // )
  },
  /**
   * 点击左侧菜单的某一个商品分类
   */
  handleItem(e) {
    const { index } = e.currentTarget.dataset
    let rightMenuContent = this.cateList[index].children
    this.setData({
      indexAcitve: index,
      rightMenuContent,
      scrollTop: 0
    })
  }
})