import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView, Button } from '@tarojs/components'


import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion
type PageStateProps = {
  counter: {
    num: number,
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Article {
  props: IProps;
}
class Article extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillUnmount() { }

  componentDidMount() {
  }

  componentDidShow() {
  }
  // 滚动到顶部
  onScrollToUpper = (event) => {
    console.log('onScrollToUpper', event);
  }
  // 滚动到底部
  onScrollToLower = (event) => {
    console.log('onScrollToLower', event);
  }
  // 滚动时触发
  onScroll = (event) => {
    // event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
    // console.log('onScroll', event.detail);
  }

  componentDidHide() { }
  state = {
  }
  render() {
    const scrollTop = 1
    const Threshold = 50
    return (
      <View className='page page-gray text-darker'>
        <ScrollView
          className='page-scroll-view'
          scrollY
          scrollWithAnimation
          enableBackToTop
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToUpper={this.onScrollToUpper}
          onScrollToLower={this.onScrollToLower}
          onScroll={this.onScroll}>
          <View className='user-profile m-b-16'>
          </View>
          <View className="user-nav m-y-32 fs-32 page-white">
            <View className="user-nav--item flex p-y-20 p-x-16">
              <View className="user-nav--item__title flex-box-1">
                <Text className=''>最近浏览</Text>
              </View>
              <View className="ixu-icon ixu-icon-arrow-right text-gray"></View>
            </View>
            <View className="user-nav--item flex p-y-20 p-x-16">
              <View className="user-nav--item__title flex-box-1">
                <Text className=''>项目合作</Text>
              </View>
              <View className="ixu-icon ixu-icon-arrow-right text-gray"></View>
            </View>
            <View className="user-nav--item flex p-y-20 p-x-16">
              <View className="user-nav--item__title flex-box-1">
                <Text className=''>联系作者</Text>
              </View>
              <View className="ixu-icon ixu-icon-arrow-right text-gray"></View>
            </View>
            <View className="user-nav--item flex p-y-20 p-x-16">
              <View className="user-nav--item__title flex-box-1">
                <Text className=''>关于小程序</Text>
              </View>
              <View className="ixu-icon ixu-icon-arrow-right text-gray"></View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Article as ComponentClass<PageOwnProps, PageState>
