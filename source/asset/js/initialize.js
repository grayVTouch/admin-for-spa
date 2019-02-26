// 做一些路由前置操作
import misc from 'api/misc.js';

let countForBefore = 0;
let countForResponded = 0;

// 全局处理的错误代码
const diyCode = [200 , 450 , 451];

// 刷新 token
let refreshToken = function(unauthCallback){
    let token = G.s.json('token');
    // 检查 token 是否过期
    const datetime = G.getCurTimeData(true , true);
    if (datetime <= token.token_expire) {
        // token 未过期
        return true;
    }
    if (datetime > token.refresh_token_expire) {
        // 重新走授权
        logout();
        return false;
    }
    // 刷新 token
    misc.refreshToken({
        refresh_token: token.refresh_token
    } , (data , status) => {
        if (status != 200) {
            console.log('刷新 token 失败');
        }
        G.s.json('token' , data.data);
        if (G.isFunction(unauthCallback)) {
            unauthCallback();
        }
    });
    // debugger
    return false;
};

G.ajax.before = function(){
    // 检查登录状态
    if (!isLogin()) {
        return true;
    }
    if (countForBefore >= 3) {
        countForBefore = 0;
        Prompt.alert('刷新 token 次数过于频繁，请稍后再试 by before');
        return false;
    }
    return refreshToken(() => {
        countForBefore++;
        // 继续执行
        this.restart();
    });
};

G.ajax.opened = function(){
    // 检查登录状态
    if (!isLogin()) {
        return true;
    }
    let token = G.s.json('token');
    this.native('setRequestHeader' , 'Authorization' , token.token);
    return true;
};

G.ajax.responded = function(data , status){
    if (status != 401) {
        if (status == 0) {
            Prompt.alert('网络未连接，请稍后再试');
            return false;
        }
        if (diyCode.indexOf(status) == -1) {
            // 发生其他错误
            Prompt.alert(data.msg);
            return false;
        }
        // 已授权
        return true;
    }
    if (countForResponded >= 3) {
        countForResponded = 0;
        Prompt.alert('刷新 token 次数过于频繁，请稍后再试 by responded');
        return false;
    }
    let res = refreshToken(() => {
        countForResponded++;
        this.restart();
    });
    return res;
};


/**
 * 客户但刷新 token 步骤：
 *
 * 1. 请求发送之前，拦截请求
 * 2. 用户是否登录
 *   2.1 未登录，不设置请求头
 *   2.2 已登录：
 *      2.2.1 检查 token 是否过期
 *          2.2.1.1 未过期，设置请求头，正常发送请求
 *          2.2.1.2 已过期，
 *              2.2.1.2.1 检查 refresh_token 是否过期
 *                  2.2.1.2.1.1 已过期，跳转到登录页面
 *                  2.2.1.2.1.2 未过期，刷新 token
 * 3. 更新本地 token，重新发送用户原先的请求
 * 4. 收到响应后，检查状态码，查看是否授权
 *      4.1 未授权，跳转到 2.2 步骤开始执行
 *      4.2 已授权，
 */
