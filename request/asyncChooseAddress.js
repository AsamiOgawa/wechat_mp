/**
 * 定义获取用户权限的promise对象
 */
export const getSetting = function () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

/**
 * 定义设置用户权限的promise对象
 */
export const chooseAddress = function () {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

/**
 * 定义诱导用户设置权限的promise对象
 */
export const openSetting = function () {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

/**
 * 定义模态对话框的promise对象
 */
export const showModal = function (content) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content,
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

/**
 * 定义提示对话框promise对象
 */
export const showToast = function ({ title }) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title,
      icon: 'none',
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

/**
 * 定义发出请求的promise对象
 */
export const login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}