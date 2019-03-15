<template>
    <div class="module-container">
        <module-nav :topRoute="topRoute" :pos="pos"></module-nav>
        <div class="module-content">
            <form>
                <table class="input-tb">
                    <tbody>
                        <tr>
                            <td>名称</td>
                            <td>
                                <input type="text" class="form-text" v-model="form.name">
                            </td>
                        </tr>
                        <tr>
                            <td>上级分类</td>
                            <td>
                                <v-select class="form-select" v-model="form.p_id" :data="type" :hasTop="true" ></v-select>
                            </td>
                        </tr>
                        <tr>
                            <td>权重</td>
                            <td><input type="number" step="0" class="form-text" v-model="form.weight"></td>
                        </tr>
                        <tr>
                            <td>是否隐藏</td>
                            <td>
                                <radio-group v-model="form.hidden">
                                    <radio v-for="(v,k) in $store.state.business.bool_str" :label="k">
                                        <span>{{ v }}</span>
                                    </radio>
                                </radio-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</template>

<script>
    import articleTypeApi from 'api/articleType.js';
    import select from '../public/select.vue';

    export default {
        name: "v-article-type" ,
        data () {
            return {
                form: {
                } ,
                type: [] ,
                field: {
                    id: 'id' ,
                    p_id: 'p_id'
                } ,
            };
        } ,
        components: {
            'v-select': select
        } ,
        created () {
            articleTypeApi.list(null , (res) => {
                if (res.code != 200) {
                    this.$Message.error(res.data);
                    return ;
                }
                let data = res.data;
                // 数据处理
                this.type = G.t.childrens(0 , data , this.field , false , true);
            });
            articleTypeApi.detail({
                id: this.param.id
            } , (res) => {
                if (res.code != 200) {
                    return this.$Message.error(res.data);
                }
                let data = res.data;
                this.form = data;
            });
        } ,
    }
</script>

<style scoped src="../public/css/public.css"></style>
<style scoped></style>