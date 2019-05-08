import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabBar, AtIcon } from 'taro-ui'
// @import "~taro-ui/dist/style/components/tab-bar.scss";
// @import "~taro-ui/dist/style/components/badge.scss";

import { add, minus, asyncAdd } from '../../actions/counter'

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

interface Index {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {
  constructor() {
    super(...arguments)
  }
  state = {
    current: 0,
    posts: [
      { id: 1, title: 'Hello World', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'Welcome to learning Taro!' },
      { id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.' },
      { id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: '由于 typescript 对于 object 类型推导只能推出 Key 的基本类型,的基本类型..由于 typescript 对于 object 类型推导只能推出 Key 的基本类型,的基本类型由于 typescript 对于 object 类型推导只能推出 Key 的基本类型,的基本类型' },
      { id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.' },
      { id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.' },
      { id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.' },
      { id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.' }
    ]
  }

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

  componentWillmount() {
    console.log('this.$router.params', this.$router.params) // 输出 { id: 2, type: 'test' }
  }

  componentDidMount() { }

  componentDidShow() {
    this.setState({
      date: '1'
    })
  }
  pushArticleDetail = (e) => {
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/article/index'
    })
  }
  // 滚动到顶部
  onScrollToUpper = (e) => {
  }
  // 滚动到底部
  onScrollToLower = (e) => {
  }
  // 滚动时触发
  onScroll = (event) => {
    // event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
    console.log('onScroll', event.detail);
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }

  componentDidHide() { }

  render() {
    const scrollTop = 0
    const Threshold = 20
    const scrollStyle = {
      height: '100vh'
    }
    const ImageStyle = {
      width: '100%',
      height: '160px',
      background: '#fff',
    }
    const { posts } = this.state
    const articleItemList = posts.map((article) => {
      return <View className='article-item' onClick={this.pushArticleDetail}>
        <View className='article-item-title'><Text>{article.title}</Text></View>
        <View className='article-item-thumb'>
          <Image
            style={ImageStyle}
            src={article.img}
          />
        </View>
        <View className='article-item-desc'><Text className='article-item-desc-inner'>{article.content}</Text></View>
        <View className='article-item-tag'>
          <AtIcon value='calendar' size='14'></AtIcon>
          <Text className='article-item-time'>2019-05-08</Text>
          <AtIcon value='eye' size='18'></AtIcon>
          <Text className='article-item-view'>3548</Text>
        </View>
        <View className='article-item-line'></View>
      </View>
    })
    return (
      <View>

        <ScrollView
          className='page page-article-list scroll-view'
          scrollY
          scrollWithAnimation
          enableBackToTop
          scrollTop={scrollTop}
          style={scrollStyle}
          lowerThreshold={Threshold}
          upperThreshold={Threshold}
          onScrollToUpper={this.onScrollToUpper}
          onScrollToLower={this.onScrollToLower}
          onScroll={this.onScroll}>
          <View className='page page-article-list'>
            {articleItemList}
          </View>
        </ScrollView>
        <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '专题', iconType: 'lightning-bolt' },
            { title: '我', iconType: 'user'}
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
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

export default Index as ComponentClass<PageOwnProps, PageState>
