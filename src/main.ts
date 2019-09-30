import Vue from 'vue'

import 'normalize.css'
// import ElementUI from "element-ui"
import "@/utils/initElementUi"

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
// import '@/icons/components'
import '@/permission'

// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
