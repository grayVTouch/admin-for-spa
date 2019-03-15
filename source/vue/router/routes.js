import index from '../view/index/index.vue';
import login from '../view/login/login.vue';
import listForRole from '../view/role/list.vue';
import listForRoute from '../view/route/list.vue';
import listForArticleType from '../view/articleType/list.vue';
import articleType from '../view/articleType/articleType.vue';
import article from '../view/article/article.vue';
import listForArticle from '../view/article/list.vue';

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

    {
        path: '/article/list' ,
        component: listForArticle
    } ,
    {
        path: '/article/edit' ,
        component: article
    } ,
    {
        path: '/article/add' ,
        component: article
    } ,
];