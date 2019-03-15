import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

Vue.use(Vuex);
Vue.use(VueRouter);

// 开发者提示关闭！
Vue.config.productionTip = false;
// 是否允许 vue devtool 进行 debug
Vue.config.devtools = true;

const host = 'http://chat_adm.t1.tuuz.cc/';
const plugin = `${host}plugin/`;
const api = `${host}admin/`;

Object.assign(window , {
    Vue ,
    Vuex ,
    VueRouter ,
    // 共享变量
    topContext: {
        host ,
        plugin ,
        api ,
        ins: {} ,
        // 动画时间
        animateDuration: 300
    } ,
});