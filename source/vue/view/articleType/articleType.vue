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
                                <select v-model="form.article_type_id">
                                    <option value="0">顶级分类</option>
                                    
                                </select>
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

    export default {
        name: "v-article-type" ,
        data () {
            return {
                form: {} ,
            };
        } ,
        created () {
            articleTypeApi.detail({
                id: this.param.id
            } , (res) => {
                if (res.code != 200) {
                    return this.$Message.error(res.data);
                }
                this.form = res;
            });
        } ,
        mounted () {
        }
    }
</script>

<style scoped src="../public/css/public.css"></style>
<style scoped></style>