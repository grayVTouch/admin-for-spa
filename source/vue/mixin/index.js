export default {
    store ,
    router ,
    data () {
        return {

        };
    } ,

    methods: {
        getClass (v) {
            return v ? 'error' : '';
        } ,
        logout () {
            logout();
        } ,

        $success (msg , option = {}) {
            option.icon = 1;
            layer.alert(msg , option);
        } ,
        // 错误提示
        $error (msg , option = {}) {
            option.icon = 2;
            layer.alert(msg , option);
        } ,
        // 消息提醒
        $msg (msg , option = {}) {
            layer.msg(msg , option);
        } ,
    } ,
    components: {

    }
};