const logout = `${topContext.api}AdminUser/logout`;
const info = `${topContext.api}AdminUser/info`;
const login = `${topContext.api}AdminUser/login`;

export default {
    // 用户登录
    login (data , success , error) {
        G.ajax({
            url: login ,
            method: 'post' ,
            data ,
            success ,
            error
        });
    } ,

    // 注销
    logout (data , success , error) {
        G.ajax({
            url: logout ,
            method: 'post' ,
            direct: true ,
            data ,
            success ,
            error
        });
    } ,

    // 获取当前登录用户相关信息
    info (success , error) {
        return G.ajax({
            url: info ,
            method: 'post' ,
            success ,
            error ,
        });
    } ,
};