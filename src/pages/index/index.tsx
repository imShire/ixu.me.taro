import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

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

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config = {
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
  state = {
    posts: [
      {id: 1, title: 'Hello World', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'Welcome to learning Taro!'},
      {id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.'},
      {id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.'},
      {id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.'},
      {id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.'},
      {id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.'},
      {id: 2, title: 'Installation', img: 'https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png', content: 'You can install Taro from npm.'}
    ]
  }
  onClick = (e) => {
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

  componentDidHide() { }

  render() {
    const scrollTop = 0
    const Threshold = 20
    const scrollStyle = {
      height: '100vh'
    }
    const ImageStyle = {
      width: '100%',
      height: '120px',
      background: '#fff',
    }
    const { posts } = this.state
    const articleItemList = posts.map((post) => {
      return <View className='article-item'>
        <Image
          style={ImageStyle}
          src={post.img}
        />
        <View onClick={this.onClick}><Text>Hello, World</Text></View>
      </View>
    })
    return (
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
