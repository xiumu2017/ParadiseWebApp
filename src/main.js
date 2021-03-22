import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import 'amfe-flexible'

// 全部引入
import Cube from 'cube-ui'
Vue.use(Cube)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
