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
            page: {}
        };
    } ,
    created () {
        articleTypeApi.list(this.form , (res) => {
            if (res.code != 200) {
                this.$Message.error(res.data);
            }

        });
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