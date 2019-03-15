export default {
    name: "v-article-type" ,
    data () {
        return {
            form: {
                p_id: 0
            } ,
            type: [] ,
            field: {
                id: 'id' ,
                p_id: 'p_id'
            } ,
            isRunning: false ,
            // 错误消息
            error: {}
        };
    } ,
    created () {
        // 获取所有文章分类
        articleTypeApi.list(null , (res) => {
            if (res.code != 200) {
                this.$Message.error(res.data);
                return ;
            }
            let data = res.data;
            // 数据处理
            this.type = G.t.childrens(0 , data , this.field , false , true);
        });
        // 检查时编辑
        if (this.param.mode == 'edit') {
            // 获取当前正在编辑的文章分类
            articleTypeApi.detail({
                id: this.param.id
            } , (res) => {
                if (res.code != 200) {
                    return this.$Message.error(res.data);
                }
                let data = res.data;
                this.form = data;
            });
        }
    } ,
    methods: {
        check (data) {
            return {
                status: true ,
                field: '' ,
                msg: '' ,
            };
        } ,
        submit () {
            if (this.isRunning) {
                Prompt.alert('请求中...请耐心等待');
                return ;
            }
            let filter = this.check();
            if (!filter.status) {
                this.error[filter.field] = filter.msg;
                vScroll(filter.field);
                return ;
            }
            this.isRunning = true;
            articleTypeApi.edit(this.form , () => {
                //
            });
        } ,
    }
}