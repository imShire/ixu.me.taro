/**
 * NOTE HOST、HOST_M 是在 config 中通过 defineConstants 配置的
 * 只所以不在代码中直接引用，是因为 eslint 会报 no-undef 的错误，因此用如下方式处理
 */
/* eslint-disable */
// export const host = 'http://vip.ixu.me/api'
// export const host = '/api'
export const host = 'http://127.0.0.1:10000/api'
export const hostM = 'http://127.0.0.1:10000'
/* eslint-enable */

// pic
export const CDN = ''

// 列表
export const POSTS_LIST = `${host}/v1/posts/list`
