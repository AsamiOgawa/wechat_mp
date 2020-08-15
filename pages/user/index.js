Page({

  data: {
    userInfo: {},
    collectNum: 0
  },

  onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    let collect = wx.getStorageSync('collect') || []
    const collectNum = collect.length
    this.setData({
      userInfo,
      collectNum
    })
  },

  /**
   * 监听点击登录按钮事件
   */
  handleLoginButton() {
    wx.navigateTo({ url: '/pages/login/index' })
  }
})