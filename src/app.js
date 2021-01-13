import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'
import { initLayout, wxCheckSession, updateWeapp } from '@utils/init'

import './app.scss'
import { store } from './store'

class App extends Component {
  async componentDidMount() {
    store.dispatch({ type: 'CHANGE_APP_INIT_STATUS', appInit: false })
    const layout = initLayout()
    await updateWeapp()
    // const token = Taro.getStorageSync('token')
    // if (!token) await wxCheckSession()
    store.dispatch({ type: 'INIT_LAYOUT_INFO', layout })
    store.dispatch({ type: 'CHANGE_APP_INIT_STATUS', appInit: true })
  }

  render() {
    return (
      <Provider store={store}>
        { this.props.children}
      </Provider>
    )
  }
}

export default App
