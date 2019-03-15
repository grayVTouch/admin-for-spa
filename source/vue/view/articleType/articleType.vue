<template>
    <div class="module-container">
        <module-nav :topRoute="topRoute" :pos="pos"></module-nav>
        <div class="module-content">
            <form @submit.prevent="submit">
                <table class="input-tb">
                    <tbody>
                        <tr :class="getClass(error.phone)">
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
                        <tr>
                            <td colspan="2">
                                <button type="submit" class="btn-2">提交</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</template>

<script src="./js/articleType.js"></script>
<style scoped src="../public/css/public.css"></style>
<style scoped src="./css/articleType.css"></style>