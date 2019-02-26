import user from 'api/user.js';

let isRunningForLogout = false;

Object.assign(window , {
    // 用户注销
    logout () {
        // console.log('调用次数');
        if (isRunningForLogout) {
            return ;
        }
        isRunningForLogout = true;
        topContext.ins.loading.show();
        const token = G.s.json('token');
        user.logout({
            refresh_token: token.refresh_token
        } , (res , status) => {
            isRunningForLogout = false;
            topContext.ins.loading.hide();
            if (status != 200) {
                Prompt.alert(res.msg);
                return ;
            }
            G.s.del('token');
            router.push({name: 'login'});
        });
    } ,

    // 检查用户登录状态
    isLogin () {
        return G.s.exists('token');
    } ,
});