import React, { Component } from 'react'
import { View, RichText } from '@tarojs/components'

export default class RechTextParser extends Component {
  state = {
  }

  UNSAFE_componentWillMount() {
  }

  render() {
    const { richText, richTextStyle } = this.props
    const text = richText.replace(
      /\<img/gi,
      '<img style="display:block; width:100%; margin:0 auto" '
    )
    return (
      <View style={richTextStyle} className='rich-text'>
        <RichText nodes={text} />
      </View>
    )
  }
}
