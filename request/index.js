export const request = params => {

  // 请求发送出去时，打开加载中的图标
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  // 设置公共接口路径
  const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'

  // 返回promise对象
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: result => {
        resolve(result.data.message)
      },
      fail: result => {
        reject(result)
      },
      // 不管返回的结果是成功还是失败，都要关闭加载中的图标
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}