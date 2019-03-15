import index from '_vue/view/index/index.vue';
import login from '_vue/view/login/login.vue';
import listForRole from '_vue/view/role/list.vue';
import listForRoute from '_vue/view/route/list.vue';
import listForArticleType from '_vue/view/articleType/list.vue';
import articleType from '_vue/view/articleType/articleType.vue';

export default [
    {
        name: 'home' ,
        path: '/' ,
        component: index
    } ,
    {
        name: 'login' ,
        path: '/login' ,
        component: login
    } ,
    {
        path: '/role/list' ,
        component: listForRole
    } ,
    {
        path: '/route/list' ,
        component: listForRoute
    } ,

    {
        path: '/articleType/list' ,
        component: listForArticleType
    } ,
    {
        path: '/articleType/edit' ,
        component: articleType
    } ,
    {
        path: '/articleType/add' ,
        component: articleType
    } ,
];