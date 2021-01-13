import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import React, { Component } from 'react'

import { connect } from 'react-redux'

import './index.scss'
import '@assets/aliIconfont/iconfont.css'

@connect(state => state.app)
class Navbar extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    title: '',
    textColor: '#000000',
    bgColor: 'none',
    pos: 'fixed'
  }

  state = {
    isSwitchTabBar: false,
    switchTabBars: []
  }

  componentDidShow() {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const switchTabBars = Taro.getApp().config.tabBar.list.map(item => item.pagePath)
    this.setState({
      isSwitchTabBar: switchTabBars.indexOf(currentPage.route) > -1,
      switchTabBars
    })
  }

  // 返回上一页
  gotoBack() {
    Taro.navigateBack()
  }

  // 返回首页
  gotoHome() {
    const { switchTabBars } = this.state
    Taro.switchTab({ url: `/${switchTabBars[0]}` })
  }

  render() {
    const { title, textColor, bgColor, layout: { navBar, unitTransformRate }, pos, onBack } = this.props
    const pages = Taro.getCurrentPages()
    const isRootPage = pages.length === 1

    return (
      <View
        className='container'
        style={
          'color: ' + textColor +
          ';padding-top: ' + navBar.top +
          'px;height: ' + navBar.contentHeight +
          'px;fill: ' + textColor +
          ';background: ' + bgColor +
          ';padding-bottom: ' + navBar.padding +
          'px; position: ' + pos
        }
      >
        {
          !isRootPage &&
          (
            <View
              className='iconfont icon-arrow-left back-icon'
              onClick={onBack || this.gotoBack}
            >
              {/* <Image className='back-icon' src={'https://qn-qghotel.lindingtechnology.com/pcenter_1599444428617'}></Image> */}
            </View>
          )
        }
        <View className='title ld-line-ellipsis'>{title}</View>
      </View>
    )
  }
}

export default Navbar
