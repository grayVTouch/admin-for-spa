import user from 'api/user.js';
import misc from 'api/misc.js';


export default {
    name: "v-login" ,
    data () {
        return {
            form: {
                username: '',
                password: '',
            },
            error: {},
            remember: false,
            isRunning: false,
            code: '' ,
        };
    } ,
    created () {

    } ,
    methods: {
        check () {
            return {
                status: true ,
                msg: ''
            };
        } ,

        submit () {
            if (this.isRunning) {
                return Prompt.alert('请求中...请耐心等待');
            }
            let filter = this.check();
            if (!filter.status) {
                return Prompt.alert(filter.msg);
            }
            this.isRunning = true;
            topContext.ins.loading.show();
            new Promise((resolve , reject) => {
                user.login(this.form , (data , code) => {
                    resolve();
                    if (code == 450) {
                        this.error = data.data;
                        return ;
                    }
                    if (code == 451) {
                        this.$Message.error(data.msg);
                        return ;
                    }
                    data = data.data;
                    // 更新验证码
                    G.s.json('token' , data);
                    // 获取用户权限范围
                    this.$router.push({name: 'home'});
                    // 跳转到首页
                } , (...args) => {
                    resolve();
                });
            }).then(() => {
                this.isRunning = false;
                topContext.ins.loading.hide();
            });
        } ,
    } ,
    watch: {
        remember (nV , oV) {
            this.form.remember = nV ? 'y' : 'n';
        }
    }
}