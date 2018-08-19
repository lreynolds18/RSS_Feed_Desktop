import Vue from 'vue'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import VueDragDrop from 'vue-drag-drop'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

Vue.use(VueDragDrop)
Vue.use(SuiVue)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
