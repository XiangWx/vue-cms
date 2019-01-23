import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        car:JSON.parse(localStorage.getItem('car')||'[]') //存放购物车信息
        //在这要获取本地存储的car购物车信息 如果没有在这里获取 页面一刷新 购物车数据状态不会保持
    },
    getters,
    mutations
})