const code = `${topContext.api}misc/code`;
const refreshToken = `${topContext.api}oauth/token`;

let xhrForCode = null;
export default {
    // 获取验证码
    code (success , error) {
        if (!G.isNull(xhrForCode)) {
            xhrForCode.native('abort');
        }
        return xhrForCode = G.ajax({
            url: code ,
            method: 'get' ,
            success ,
            error
        });
    } ,
    // 获取最新的 token
    refreshToken (data , success , error) {
        return G.ajax({
            url: refreshToken ,
            method: 'post' ,
            data ,
            direct: true ,
            success ,
            error
        });
    } ,
};