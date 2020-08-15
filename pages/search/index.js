import { request } from '../../request/index.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({
  data: {
    goods: [],
    isFocus: false,
    value: ''
  },

  Timeout: 0,

  handleInput(e) {
    let { value } = e.detail
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      return
    }
    this.setData({ isFocus: true })
    clearTimeout(this.Timeout)
    this.Timeout = setTimeout(() => {  // 防止抖动：清除+设置定时器
      this.search(value)
    }, 1000)
  },

  async search(query) {
    const result = await request({ url: '/goods/search', data: { query } })
    const { goods } = result
    this.setData({ goods })
  },

  handleCancle() {
    this.setData({
      goods: [],
      isFocus: false,
      value: ''
    })
  }
})