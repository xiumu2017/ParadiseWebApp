import Vue from 'vue'
import './cube-ui'
import './login-ui'
import App from './App.vue'
import 'amfe-flexible'
import { router } from './router';
import store from './store';
import { Toast } from 'vant';
import { Form } from "vant";
import { Calendar } from "vant";
import { Field } from "vant";
import { Button } from "vant";
import { Picker } from "vant";
import { Popup } from "vant";
import { Col, Row } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Image as VanImage } from 'vant';
import { Divider } from "vant";
import { Empty } from "vant";
import { Tag } from 'vant';
import { DatetimePicker } from 'vant';
import { Sticky } from 'vant';
import FloatBtn from './components/FloatBtn.vue'
import '@vant/touch-emulator';

Vue.use(FloatBtn);
Vue.use(Sticky);
Vue.use(DatetimePicker);
Vue.use(Tag);
Vue.use(Empty);
Vue.use(Divider);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Calendar);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Col);
Vue.use(Row);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
