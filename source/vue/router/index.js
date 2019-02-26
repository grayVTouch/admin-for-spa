import routes from './routes.js';

const router = new VueRouter({
    routes
});

router.beforeEach((to , from , next) => {
    let check = ['/login'];
    // 检查用户状态
    // 如果未登录，那么跳转回普通页面
    if (isLogin()) {
        // 已经登录，跳转回首页
        if (check.includes(to.path)) {
            next({name: 'home'});
            return ;
        }
    } else {
        if (!check.includes(to.path)) {
            next('/login');
            return ;
        }
    }
    next();
});

export default router;