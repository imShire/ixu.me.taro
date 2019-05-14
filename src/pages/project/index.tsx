import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, ScrollView, Image } from '@tarojs/components'
import fetch from '../../utils/request'
import { POSTS_LIST } from '../../constants/api'
import { filterHtmlTags } from '../../utils/dom';
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
  id: number,
  post_author: string,
  img: string,
  post_date: any,
  post_content: string,
  post_title: string,
  post_name: string,
  post_type: string,
  post_status: string,
  comment_status: string,
  comment_count: string,
}
interface Page {
  page: number,
  page_size: number,
  total: number,
  total_page: number,
}
interface IState {
  listPage?: object;
  listData?: Article[];
}
class Index extends Component<IProps, IState> {
  constructor() {
    super(...arguments)
  }
  state: IState = {
    listPage: {},
    listData: []
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

  async componentDidShow() {
    const res = await fetch({ url: POSTS_LIST, method: 'POST' })
    let data = res.data;
    this.setState({
      listData: data.result,
      listPage: data.pagination
    })
    console.log(POSTS_LIST, this.state.listPage);
    console.log(POSTS_LIST, this.state.listData);

  }
  pushArticleDetail = (e) => {
    e.stopPropagation()
    Taro.navigateTo({
      url: '/pages/article/index'
    })
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
  handleClick(value) {
  }

  componentDidHide() { }

  render() {
    const scrollTop = 0
    const Threshold = 20
    // const scrollStyle = {
    //   height: 100
    // }
    // const ImageStyle = {
    //   width: '100%',
    //   height: 160,
    //   background: '#fff',
    // }
    const { listData } = this.state
    const projectItemList = listData.map((project, index) => {
      return <View className='project' onClick={this.pushArticleDetail} key={index}>
        <View className='project--info'>
          <Text>{project.post_title}</Text>
        </View>
        <View className='project--thumb'>
          <View className="project--thumb_mask"></View>
          <Image
            style='width: 100%;height: auto;background: #fff;'
            src='https://ixu.me/wp-content/themes/JaneCC/img/pic/2.png'
          />
        </View>
      </View>
    })
    return (
      <View className="page">
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
          <View className='page-project-list'>
            {projectItemList}
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

export default Index as ComponentClass<PageOwnProps, PageState>
