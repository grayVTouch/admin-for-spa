const logining = `${topContext.api}admin/AdminUser/login`;
const info = `${topContext.api}admin/info`;

export default {
    // 用户登录
    login (data , success , error) {
        G.ajax({
            url: logining ,
            method: 'post' ,
            data ,
            success ,
            error
        });
    } ,

    // 用户头像
    avatar (username , success , error) {
        return G.ajax({
            url: `${avatar}/${username}` ,
            method: 'get' ,
            success ,
            error
        });
    } ,

    // 注销
    logout (data , success , error) {
        G.ajax({
            url: logining ,
            method: 'delete' ,
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
            method: 'get' ,
            success ,
            error ,
        });
    } ,
};