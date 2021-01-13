import Taro from '@tarojs/taro'
import { getTokenAndSession } from '@utils/request'
// import { get } from '@utils/request'

/**
 * 初始化小程序tabbar数据
 * @param {*} weappConfigs
 */
export function initTabBarData(weappConfigs) {
  const app = Taro.getApp()
  if (!app.config.tabBar.list[0].text) {
    weappConfigs.map((item, index) => {
      Taro.setTabBarItem({
        index,
        text: item.text,
        iconPath: item.icon,
        selectedIconPath: item.selectedIcon,
        fail: (err) => {
          console.error(err, '====-=-=')
        }
      })
    })
  }
}

/**
 * 初始化小程序navbar布局参数
 * @param {*} null
 */
export function initLayout() {
  const sysInfo = Taro.getSystemInfoSync()
  const capsule = Taro.getMenuButtonBoundingClientRect() // 小程序右上角胶囊按钮参数
  const model = sysInfo.model
  const reg = new RegExp('(iPhone10)|(iPhone11)|(iPhone12)')
  const hasButtomPadding = reg.test(model)
  const layout = {
    navBar: {
      top: capsule.top,
      contentHeight: capsule.height,
      padding: capsule.top - sysInfo.statusBarHeight,
      height: 2 * capsule.top + capsule.height - sysInfo.statusBarHeight // 顶部标题栏总高度，包含手机的statusBar
    },
    unitTransformRate: {
      px2rpx: (750 / sysInfo.screenWidth),
      rpx2px: (sysInfo.screenWidth / 750)
    },
    isAdaptation: hasButtomPadding,
    windowWidth: sysInfo.windowWidth
  }
  return layout
}

/**
 * 检查当前微信小程序是否是最新版本
 * @param {*} null
 */
export function updateWeapp() {
  if (Taro.canIUse('getUpdateManager')) {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(() => {
      console.log('checking.......')
    })
    updateManager.onUpdateReady(() => {
      // noinspection JSIgnoredPromiseFromCall
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本下载失败，请检查你的微信',
        showCancel: false
      })
    })
  } else {
    Taro.showModal({
      title: '微信升级',
      content: '当前微信版本过低，部分功能无法使用，请升级到最新版本',
      showCancel: false
    })
  }
}

/**
 * 检查当前session_key是否过期
 * @param {*} null
 */
export function wxCheckSession() {
  Taro.checkSession({
    success: function(res) {
      console.log(res, '未过期')
    },
    fail: async function(err) {
      // session_key 已经失效，需要重新执行登录流程
      await getTokenAndSession()
      console.log(err, '已过期')
    }
  })
}

