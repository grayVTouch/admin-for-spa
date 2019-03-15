/**
 * 导入 css 样式
 */
import 'iview.css';
import 'asset/css/iviewReset.css';
import 'asset/css/public.css';

/**
 * 导入 js
 */
import 'asset/js/business.js';
import 'asset/js/global.js';
import 'asset/js/subGlobal.js';
import 'asset/js/currency.js';
import 'asset/js/initialize.js';


import App from '_vue/view/App.vue';

import 'iview.js';
import mixin from '_vue/mixin';

/**
 * **************
 * 全局组件
 * **************
 */
import loading from '_vue/view/public/loading.vue';

// 全局混入
Vue.mixin(mixin);

// 注册全局组建
Vue.component('v-loading' , loading);

new Vue({
    el: '#app' ,
    template: '<App />' ,
    router ,
    mounted () {
        // // 获取 state 数据
        // console.log('store.state 数据' , this.$store.state.name);
        // // 获取 getter 过滤后数据
        // console.log('store.getter 数据' , this.$store.getters.name);
        // // 派发事件
        // this.$store.dispatch('name' , 'nihao' , 'henhao' , 'feichanghao');
    } ,
    components: {
        App
    }
});

// 登录页 和 后台首页的切