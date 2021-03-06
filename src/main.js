//入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueResource from 'vue-resource'
Vue.use(VueResource);


//全局配置请求的根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/'
//将post请求提交数据的方式改成传统表单方式提交
Vue.http.options.emulateJSON = true

//导入格式化时间的moment 插件
import moment from 'moment'

//定义全局的时间过滤器 
Vue.filter('dateFormat',(datastr,parrent='YYYY-MM-DD hh:mm:ss')=>{
    return moment(datastr).format(parrent)
})

import store from './store/'
import 'mint-ui/lib/style.css'
//引入Mint-ui组件
import Mint from 'mint-ui'
Vue.use(Mint)

//引入button组件
import { Button } from 'mint-ui'
Vue.component(Button.name, Button);

import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

//导入Mui样式
import './lib/mui/css/mui.css'
//导入拓展图标的样式
import './lib/mui/css/icons-extra.css'


//导入评论部分的组件
import comment from './components/common/comment'
//定义全局组件 参数1 组件名 参数2 组件模板对象
Vue.component('comment',comment)

//导入Lazyload
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);

//导入Mint ui中的switch组件
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router, //将router挂载到vm实例身上
  store,  //将vuex创建的store 挂载到vm实例上
  render: c => c(App) 
})
