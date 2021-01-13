
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import React, { useState } from 'react'

import './index.scss'

export default function LdSwiper(props) {
  const [status, setStatus] = useState('pull')
  const [current, setCurrent] = useState(0)
  const { list } = props

  const handleActiveChange = (e) => {
    const { current } = e.detail
    setCurrent(current)
  }

  const touchEnd = (e) => {
    if (status === 'loadMore' && (props.list.length - 1) === current) {
      props.loadFn && props.loadFn()
    }
  }

  const transition = (e) => {
    if ((props.list.length - 1) !== current) return
    const { detail } = e
    if (detail.dx > 50) {
      setStatus('loadMore')
    } else {
      setStatus('pull')
    }
  }

  const swiperItems = list && list.map((item, index) => {
    const bgPng = item.url ? item.url : ''
    return (
      <SwiperItem
        key={index}
        className='swiper-item'
      >
        <Image className='item-image' src={`${bgPng}?imageMogr2/size-limit/1024k!`}></Image>
      </SwiperItem>
    )
  })

  return (
    <View className='swiper-wrap'>
      { props.loadMore &&
        <View className='load-more'>
          <Image
            src='https://qn-qghotel.lindingtechnology.com/pcenter_1610073005486.png'
            className='load-more__right'
            style={status === 'pull' && 'transform: rotateY(180deg);'}
          />
          <View className='load-more__text'>{status === 'pull' ? '加载更多' : '释放查看'}</View>
        </View>
      }
      <Swiper
        className='swiper'
        onTransition={transition}
        onTouchEnd={touchEnd}
        // circular
        autoplay={true}
        onChange={handleActiveChange}
      >
        {swiperItems}
      </Swiper>
    </View>
  )
}

