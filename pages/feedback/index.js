import { request } from '../../request/index.js'
import { showToast } from '../../request/asyncChooseAddress.js'
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({
  data: {
    tabs: [
      {
        id: 0,
        name: '体验问题',
        isAcitve: true
      },
      {
        id: 1,
        name: '投诉',
        isAcitve: false
      }
    ],
    upImg: [],
    textValue: ''
  },

  UpImgs: [],

  handleTabsItemChange(e) {
    const { index } = e.detail
    const tabs = this.data.tabs
    tabs.forEach(v => v.id === index ? v.isAcitve = true : v.isAcitve = false)
    this.setData({ tabs })
  },

  handleImg() {
    const upImg = this.data.upImg
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          upImg: [...upImg, ...res.tempFilePaths]
        })
      }
    })
  },

  handleCancleImg(e) {
    const { index } = e.currentTarget.dataset
    const upImg = this.data.upImg
    upImg.splice(index, 1)
    this.setData({ upImg })
  },

  handleTextInput(e) {
    this.setData({
      textValue: e.detail.value
    })
  },

  async handleSubmit() {
    const textValue = this.data.textValue
    const upImg = this.data.upImg

    const Base64 = this.Base64


    // if (!textValue.trim()) {
    //   await showToast({ title: '问题描述或建议不能为空' })
    //   return
    // }

    if (upImg.length !== 0) {
      upImg.forEach((v, i) => {
        wx.uploadFile({
          url: 'http://tu.svvme.com/public/api',
          filePath: v,
          name: 'img_file',
          formData: {
            "key": "pixcat"
          },
          success(res) {
            console.log(res.data);
          }
        })
      })
    }
  }

})