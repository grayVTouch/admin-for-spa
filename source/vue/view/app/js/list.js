
export default {
    name: "v-list" ,
    data () {
        return {
            form: {
                id: '',
                order: '',
                page: 1
            },
            page: {
                total: 1
            } ,
            // 数据列表
            data: [],
            ins: {} ,
        };
    } ,
    created () {

    } ,
    mounted () {
        // 加载层
        this.ins.loading = new Loading(this.$refs.loading.$el , {
            status: 'hide' ,
            type: 'line-scale'
        });

        this.initialize();
    } ,
    components: {

    } ,
    methods: {
        getData () {
            this.ins.loading.show();
            // 用户列表
            appApi.list(this.form , (res) => {
                this.ins.loading.hide();
                if (res.code != 200) {
                    this.$Message.error(res.data);
                }
                let data = res.data;
                this.data = data.data;
                delete data.data;
                this.page = data;
                console.log(this.data);
            });
        } ,
        initialize () {
            this.getData();
        } ,
        // 用户提交
        submit () {
            this.form.page = 1;
            this.getData();
        } ,

        // 重置
        reset () {
            this.submit();
        } ,

        // 分页事件
        pageEvent (page) {
            this.form.page = page;
            this.getData();
        } ,
        del (id) {
            if (this.isRunning) {
                layer.alert('请求中...请耐心等待');
                return ;
            }
            let idList = [id];
            this.ins.loading.show();
            appApi.del({
                id_list: idList
            } , (res) => {
                this.isRunning = false;
                this.ins.loading.hide();
                if (res.code != 200) {
                    layer.alert(res.data);
                    return ;
                }
                layer.msg('删除成功');
                this.getData();
            });
        } ,
    }
}