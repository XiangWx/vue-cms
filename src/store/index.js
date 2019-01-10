import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        car:[] //存放购物车信息
    },
    getters,
    mutations
})