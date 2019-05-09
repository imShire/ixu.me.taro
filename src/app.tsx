import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index', // 首页
      'pages/article/index', // 详情
      'pages/project/index', // 专题
      'pages/user/index', // 我

      'pages/history/index', // 最近浏览
      'pages/service/index', // 项目合作
      'pages/contact/index', // 联系作者
      'pages/about/index', // 关于小程序
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'IXU.ME',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#232323",
      backgroundColor: "#fff",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/index",
        iconPath: "./assets/tab-bar/home@2x.png",
        selectedIconPath: "./assets/tab-bar/home-active@2x.png",
        text: "首页"
      }, {
        pagePath: "pages/project/index",
        iconPath: "./assets/tab-bar/project@2x.png",
        selectedIconPath: "./assets/tab-bar/project-active@2x.png",
        text: "专题"
      }, {
        pagePath: "pages/user/index",
        iconPath: "./assets/tab-bar/user@2x.png",
        selectedIconPath: "./assets/tab-bar/user-active@2x.png",
        text: "我"
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
