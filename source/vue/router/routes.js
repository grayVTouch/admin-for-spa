import index from '../view/index/index.vue';
import login from '../view/login/login.vue';
import listForRole from '../view/role/list.vue';
import listForRoute from '../view/route/list.vue';
import listForArticleType from '../view/articleType/list.vue';

import listForArticle from '../view/article/list.vue';
import articleType from '../view/articleType/articleType.vue';
import article from '../view/article/article.vue';

import listForAnnouncement from '../view/announcement/list.vue';
import announcement from '../view/announcement/announcement.vue';

import listForApp from '../view/app/list.vue';
import app from '../view/app/app.vue';



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

    // 文章
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

    // 公告
    {
        path: '/announcement/list' ,
        component: listForAnnouncement
    } ,
    {
        path: '/announcement/edit' ,
        component: announcement
    } ,
    {
        path: '/announcement/add' ,
        component: announcement
    } ,

    // 应用
    {
        path: '/app/list' ,
        component: listForApp
    } ,
    {
        path: '/app/edit' ,
        component: app
    } ,
    {
        path: '/app/add' ,
        component: app
    } ,
];