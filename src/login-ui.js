import Vue from 'vue'
import Hello from '@/components/login.vue'

// 引入 Style 加载基础样式
import {
  /* eslint-disable no-unused-vars */
  Style,
  Dialog,
  createAPI
} from 'cube-ui'

Vue.use(Dialog)

// 创建 this.$createHello API
createAPI(Vue, Hello, ['click'], true)

// 初始化 Vue
new Vue({
  render: function (h) {
    return h('button', {
      on: {
        click: this.showHello
      }
    }, ['Show Hello'])
  },
  methods: {
    showHello() {
      // 直接调用
      // 传入配置对象，默认传入的所有对象全都当做 props 传入组件
      // 除了在调用 createAPI 的时候传入了 events，这里对应的就是
      // on{event name} 会被当做事件回调处理
      const instance = this.$createHello({
        content: 'My Hello Content',
        onClick(e) {
          console.log('Hello component clicked.')
        }
      }, /* renderFn */ (createElement) => {
        return [
          createElement('p', {
            slot: 'other'
          }, 'other content')
        ]
      })
      // 通过 Vue 组件的 $on 也是可以监听的，看使用场景
      instance.$on('click', (e) => {
        const $dialog = this.$createDialog({
          type: 'confirm',
          content: '点击确定关闭当前实例',
          icon: 'cubeic-alert'
        })
        $dialog.show()

        $dialog.$on('confirm', () => {
          // 销毁实例
          instance.remove()
        }).$on('cancel', () => {
          console.log('cancel')
        })
      })
    }
  }
})