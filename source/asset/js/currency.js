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
        const token = G.s.get('token');
        userApi.logout({
            token
        } , (res , status) => {
            isRunningForLogout = false;
            topContext.ins.loading.hide();
            if (res.code != 200) {
                Prompt.alert(res.data);
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
    // 获取对象的首个属性
    firstKey (obj){
        return Object.keys(obj)[0];
    } ,

    // 指定 id 滚动到指定位置
    // 注意这是特意为当前项目而写的！
    // 如果换过一个容器元素就会出现错误！
    // 请仅在当前项目使用
    vScroll (id , fn) {
        let dom = G('#' + id);
        let container = G('#doc-right');
        let val = dom.getDocOffsetVal('top');
        let extra = 50;
        val -= extra;
        container.vScroll(topContext.animateDuration , val , fn);
    } ,
});