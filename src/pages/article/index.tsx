import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'

import fetch from '../../utils/request'
import { POSTS_ARTICLE } from '../../constants/api'

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
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}
interface IState {
  infoData?: any;
}
class Index extends Component<IProps, IState> {
  constructor() {
    super(...arguments)
  }
  state: IState = {
    infoData: {
      id: '',
      post_author: '',
      img: '',
      post_date: '',
      post_content: '',
      post_title: '',
      post_name: '',
      post_type: '',
      post_status: '',
      comment_status: '',
      comment_count: '',
    }
  }
  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '详情'
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentWillUnmount() { }

  componentDidMount() {
  }

  componentDidShow() {
    this.queryDetail()
  }

  componentDidHide() { }


  async queryDetail() {
    let params = {
      id: this.$router.params.id
    }
    const res = await fetch({ url: POSTS_ARTICLE, method: 'POST', params: params })
    let data = res.data;

    this.setState({
      infoData: data,
    })
  }

  render() {
    // const { infoData } = this.state
    return (
      <View className='page text-darker'>
        <View className='article--thumb'>
          <Image
            style='width: 100%;height: auto;background: #fff;'
            src='https://ixu.me/wp-content/uploads/2015/06/nodejs.png'
          />
        </View>
        <View className='article--title p-x-16'>
          <Text>{this.state.infoData.post_title}</Text>
        </View>

        <View className='article--tag flex'>
          <View className='article--time flex m-r-16'>
            <View className="ixu-icon ixu-icon-calendar text-gray m-r-8"></View>
            <Text>{this.state.infoData.post_date}</Text>
          </View>
          <View className='article--view flex m-r-16'>
            <View className="ixu-icon ixu-icon-view text-gray m-r-8"></View>
            <Text>{this.state.infoData.comment_count}</Text>
          </View>
        </View>
        <View className='article--line'></View>

        <View className='article--desc'>
          <View className='article--desc__inner' >
            <RichText nodes={this.state.infoData.post_content}></RichText>
          </View>
        </View>
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
