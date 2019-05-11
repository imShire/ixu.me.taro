import Taro from '@tarojs/taro'
import {HTTP_STATUS} from '../constants/ecode';

function getStorage(key) {
  return Taro.getStorage({ key }).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    Taro.setStorage({ key: 'token', data: data['3rdSession'] || '' }),
    Taro.setStorage({ key: 'uid', data: data['uid'] || ''})
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const { url, payload, method = 'GET', showToast = true, autoLogin = true } = options
  const token = await getStorage('token')
  const header = token ? { 'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token } : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { code, data } = res.data
    if (code !== HTTP_STATUS.SUCCESS) {
      if (code === HTTP_STATUS.AUTHENTICATE) {
        await updateStorage({})
      }
      return Promise.reject(res.data)
    }

    return data
  }).catch((err) => {
    const defaultMsg = err.code === HTTP_STATUS.AUTHENTICATE ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    // if (err.code === HTTP_STATUS.AUTHENTICATE && autoLogin) {
    //   Taro.navigateTo({
    //     url: '/pages/user-login/user-login'
    //   })
    // }

    return Promise.reject({ message: defaultMsg, ...err })
  })
}
