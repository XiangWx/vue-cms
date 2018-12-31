//入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
import 'mint-ui/lib/style.css'
//引入Mint-ui组件
import Mint from 'mint-ui'
Vue.use(Mint)

import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

//导入Mui
import './lib/mui/css/mui.css'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  render: c => c(App)

  
})
