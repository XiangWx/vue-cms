//入口文件
import Vue from 'vue'

import App from './App'
import router from './router'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource);

import 'mint-ui/lib/style.css'
//引入Mint-ui组件
import Mint from 'mint-ui'
Vue.use(Mint)


import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

//导入Mui样式
import './lib/mui/css/mui.css'
//导入拓展图标的样式
import './lib/mui/css/icons-extra.css'

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router, //将router挂载到vm实例身上
  render: c => c(App)

  
})
