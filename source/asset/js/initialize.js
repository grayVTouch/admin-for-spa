/**
 * *********************
 * 对请求进行拦截
 * *********************
 */

// 拦截 网络/登录状态 变更
G.ajax.responded = function(res , status){
    if (status == 0 && !window.navigator.onLine) {
        Prompt.alert('网络未连接，请稍后再试');
        return false;
    }
    if (res.code == 401) {
        console.log('退出登录');
        logout();
        return false;
    }
    return true;
};