Page({
  data: {
    tabs: [
      {
        id: 0,
        name: '收藏的商品',
        isAcitve: true
      },
      {
        id: 1,
        name: '收藏的店铺',
        isAcitve: false
      },
      {
        id: 2,
        name: '关注的商品',
        isAcitve: false
      },
      {
        id: 3,
        name: '我的足迹',
        isAcitve: false
      }
    ],
    collect: []
  },

  onShow() {
    const collect = wx.getStorageSync('collect') || []
    this.setData({ collect })
  },

  /**
   * 监听点击tab栏事件
   */
  handleTabsItemChange(e) {
    let { index } = e.detail
    const tabs = this.data.tabs
    tabs.forEach(v => { v.id === index ? v.isAcitve = true : v.isAcitve = false });
    this.setData({ tabs })
  }
})