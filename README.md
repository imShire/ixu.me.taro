## ixu.me.taro
 My blog app &amp; wxApp powered by @NervJS/taro

## TODO

## RN
> [React Native 端开发流程](https://nervjs.github.io/taro/docs/react-native.html)

#### Text-indent支持
RN 不支持 text-indent 属性，段落前面的空格需要额外的处理方式，目前可以用 Text 标签包2个汉字，然后将 `color: 'transparent'`，不显示汉字。
```html
<Text style='color: transparent'>占位</Text>
```



#### 运行RN
```bash
# 进入RN目录
cd taro-native-shell
# 启动安卓
react-native run-android
# 启动IOS
react-native run-ios --simulator "iPhone 8 Plus"
```

