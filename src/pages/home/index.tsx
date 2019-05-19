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
interface IState {
  listPage?: object;
  listData?: Article[];
  loading: boolean;
}
class Index extends Component<IProps, IState> {
  constructor() {
    super(...arguments)
  }
  state: IState = {
    listPage: {},
    listData: [],
    loading: false
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
    this.queryList(1);
  }
  pushArticleDetail = (article, e) => {
    e.stopPropagation()
    Taro.navigateTo({
      url: `/pages/article/index?id=${article.id}`
    })
  }
  /**
   * 列表
   * @param page 分页
   */
  async queryList(page: number, pageSize = 5) {
    let params = {
      page: page || 1,
      pageSize
    }
    const res = await fetch({ url: POSTS_LIST, method: 'POST', params: params })
    let data = res.data;
    let result = data.result;
    if (page != 1) {
      result = [...this.state.listData, ...result]
    }
    this.setState({
      listData: result,
      listPage: data.pagination,
      loading: false
    })
    console.log(POSTS_LIST, this.state.listPage);
    console.log(POSTS_LIST, this.state.listData);
  }
  // 滚动到顶部
  onScrollToUpper = (event) => {
    console.log('onScrollToUpper', event);
  }
  // 滚动到底部
  onScrollToLower = (event) => {
    if (this.state.loading) {
      return
    }
    console.log('onScrollToLower', event);
    this.setState({
      loading: true
    })
    setTimeout(() => {
      let page = this.state.listPage.page + 1;
      this.queryList(page);
    }, 1000);
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
    const scrollTop = 1
    const Threshold = 50
    // const scrollStyle = {
    //   height: 100
    // }
    // const ImageStyle = {
    //   width: '100%',
    //   height: 160,
    //   background: '#fff',
    // }
    const { listData } = this.state
    const articleItemList = listData.map((article, index) => {
      return <View className='article-item' onClick={this.pushArticleDetail.bind(this, article)} key={index}>
        <View className='article-item--title'><Text>{article.post_title}</Text></View>
        <View className='article-item--thumb'>
          <Image
            style='width: 100%;height: auto;background: #fff;'
            src='https://ixu.me/wp-content/uploads/2015/06/nodejs.png'
          />
        </View>
        <View className='article-item--desc'>
          <Text className='article-item--desc_inner' >
            <Text style='color: transparent'>占位</Text>
            {filterHtmlTags(article.post_content)}
          </Text>
        </View>
        <View className='article-item--tag flex'>
          <View className='article-item--time flex m-r-16'>
            <View className="ixu-icon ixu-icon-calendar text-gray m-r-8"></View>
            <Text>{article.post_date}</Text>
          </View>
          <View className='article-item--view flex m-r-16'>
            <View className="ixu-icon ixu-icon-view text-gray m-r-8"></View>
            <Text>{article.comment_count}</Text>
          </View>
        </View>
        <View className='article-item--line'></View>
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
          <View className='page-article-list'>
            {articleItemList}
          </View>
          {this.state.loading && <View>loading...</View>}
        </ScrollView>
        {/* <AtTabBar
          fixed
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '专题', iconType: 'lightning-bolt' },
            { title: '我', iconType: 'user'}
          ]}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        /> */}
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
