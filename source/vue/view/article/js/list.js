
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
            articleApi.list(this.form , (res) => {
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
            this.getData();
        } ,

        // 重置
        reset () {
            this.submit();
        } ,
        // 获取层级
        floor (data) {

        } ,
    }
}