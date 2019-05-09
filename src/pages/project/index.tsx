import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, RichText } from '@tarojs/components'


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

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillUnmount () { }

  componentDidMount () {
  }

  componentDidShow () {
  }

  componentDidHide () { }
  state = {
    nodes: '<p>xxxxxxxx</p><p>xxxxxxxx</p><p>xxxxxxxx</p><p>xxxxxxxx</p><p>xxxxxxxx</p><div>xxeqwgdffg</div>',
    posts: [
      {id: 1, title: 'Hello World', content: 'Welcome to learning Taro!'},
      {id: 2, title: 'Installation', content: 'You can install Taro from npm.'}
    ]
  }
  onClick = (e) => {
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/index/index'
    })
  }
  render () {
    const { posts } = this.state
    const content = posts.map((post) => {
      return <View key={post.id}>
        <Text>{post.title}</Text>
        <Text>{post.content}</Text>
      </View>
    })
    return (
      <View className='index'>
        <View onClick={this.onClick}><Text>Hello, World</Text></View>
        <Text>现在的时间是 {this.state}.</Text>
        {content}
        <RichText nodes={this.state.nodes}></RichText>
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
