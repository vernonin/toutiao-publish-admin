/**
 * 全局通信总线    呼叫中心
 * 作用：可以让任何组件之间相互通信
 */
import Vue from 'vue'

export default new Vue()

// 假设 a 组件要给 b 组件发送数据：
// a 发布通信事件
/**
 * import globalBus from '@/utils/global-bus'
 * globalBus.$emit('bar', 参数)
 */
// b 注册通信的事件
/**
 * import globalBus from '@/utils/global-bus'
 * globalBus.$on('foo', (参数) => {
 *    处理函数...
 * })
 */

// 注意：通信的两端所使用的事件名称必须一致，否则是无效的
