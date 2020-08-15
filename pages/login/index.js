import { request } from '../../request/index.js'
import { login } from '../../request/asyncChooseAddress'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 监听点击授权登录按钮事件
   */
  async  bindGetuserinfo(e) {
    const { encryptedData, rawData, iv, signature, userInfo } = e.detail
    const { code } = await login()
    const params = { encryptedData, rawData, iv, signature, code }
    const result = await request({ url: '/users/wxlogin', data: params, method: 'post' })
    console.log(result);
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1
    })
  }

})