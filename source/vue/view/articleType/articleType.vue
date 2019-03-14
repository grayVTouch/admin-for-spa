<template>
    <div class="module-container">
        <module-nav :topRoute="topRoute" :pos="pos"></module-nav>
        <div class="module-content">
            <form>
                <table class="input-tb">
                    <tr>
                        <td>名称</td>
                        <td>
                            <input type="text" class="form-text">
                        </td>
                    </tr>
                    <tr>
                        <td>上级分类</td>
                        <td>

                        </td>
                    </tr>
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
                data: {} ,
            };
        } ,
        created () {
            articleTypeApi.detail({
                id: this.param.id
            } , (res) => {
                if (res.code != 200) {
                    return this.$Message.error(res.data);
                }
                this.data = res;
            });
        } ,
        mounted () {
        }
    }
</script>

<style scoped src="../public/css/public.css"></style>
<style scoped></style>