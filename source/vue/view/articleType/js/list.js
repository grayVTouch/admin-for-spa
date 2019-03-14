import articleTypeApi from 'api/articleType.js';

export default {
    name: "v-list" ,
    data () {
        return {
            form: {
                id: '',
                order: '',
                page: 1
            },
            // 数据列表
            data: [],
            page: {
                total: 0 ,
            }
        };
    } ,
    created () {
        articleTypeApi.list(this.form , (res) => {
            if (res.code != 200) {
                this.$Message.error(res.data);
            }
            let data = res.data;
            this.data = G.t.childrens(0 , data.data , {
                id: 'id' ,
                p_id: 'p_id'
            } , false , true);
            delete data.data;
            this.page = {...data};
        });
    } ,
    mounted () {

    } ,
    components: {

    } ,
    methods: {
        // 用户提交
        submit () {

        } ,

        // 重置
        reset () {

        } ,
    }
}