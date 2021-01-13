import Taro from '@tarojs/taro'
import appConfig from '../app.config'

export function weekMapToCh(week) {
  const map = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return map[week]
}

export function price2point(price) {
  return parseFloat(price / 100).toFixed(2)
}

// 如果 includeOtherType=true 包含0，false，undefined，如果为 false 只包含{}
export function isEmptyObject(obj, includeOtherType = false) {
  return (includeOtherType && !obj) || JSON.stringify(obj) === '{}'
}

// 手机号校验
export function checkPhoneNumber(input) {
  return /^[1][3,4,5,7,8][0-9]{9}$/.test(input)
}

// 判断是否是数组
export function isArray(input) {
  return input && typeof input === 'object' && input.constructor === Array
}

// json对象转成key-value格式，目前仅支持属性为纯字符串的，如果不是字符串先转json字符串再处理
export function json2kv(json) {
  const kvStrArr = []
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      let item = json[key]
      if (typeof item === 'function') continue
      if (typeof item === 'object') {
        item = JSON.stringify(item)
      }

      kvStrArr.push(`${key}=${item}`)
    }
  }
  return kvStrArr.join('&')
}

// 订阅
export async function subscribe(tmplIds) {
  if (!tmplIds) return
  const ids = isArray(tmplIds) ? tmplIds : [tmplIds]
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: ids,
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
 * 获取url的query参数
 * @param {*} url
 * @param {*} name
 */
export function getQueryString(url, name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = url.match(reg)
  return r != null ? unescape(r[2]) : null
}

// 分包路径拼接
export function getRealPath(fullPath) {
  let path = ''
  let params = ''
  if (fullPath.indexOf('?') !== -1) {
    const temp = fullPath.slice(1).split('?')
    path = temp[0]
    params = temp[1]
  } else {
    path = fullPath.slice(1)
  }

  const app = Taro.getApp()
  const pagesList = app.config.pages
  if (pagesList.indexOf(path) !== -1) {
    if (params) {
      return '/' + path + '?' + params
    }
    return '/' + path
  }

  const subpackagesList = appConfig.subpackages
  let find = false
  for (let i = 0; i < subpackagesList.length; i++) {
    const list = subpackagesList[i].pages
    if (list.indexOf(path) !== -1) {
      find = true
      if (params) {
        return '/' + subpackagesList[i].root + '/' + path + '?' + params
      }
      return '/' + subpackagesList[i].root + '/' + path
    }
  }
  if (!find) return false
}
