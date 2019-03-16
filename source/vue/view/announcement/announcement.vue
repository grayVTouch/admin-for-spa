<template>
    <div class="module-container">
        <module-nav :topRoute="topRoute" :pos="pos"></module-nav>
        <div class="module-content">
            <form @submit.prevent="submit">
                <table class="input-tb">
                    <tbody>
                        <tr id="pos" :class="getClass(error.pos)">
                            <td>位置</td>
                            <td>
                                <input type="text" class="form-text" v-model="form.pos">
                                <span class="necessary">*，已知的位置：app（app公告）</span>
                                <span class="tip">{{ error.pos }}</span>
                            </td>
                        </tr>
                        <tr id="text" :class="getClass(error.text)">
                            <td>内容</td>
                            <td>
                                <input type="text" class="form-text" v-model="form.text">
                                <span class="necessary">*</span>
                                <span class="tip">{{ error.text }}</span>
                            </td>
                        </tr>
                        <tr id="link" :class="getClass(error.link)">
                            <td>链接</td>
                            <td>
                                <input type="text" class="form-text" v-model="form.link">
                                <span class="necessary">*</span>
                                <span class="tip">{{ error.link }}</span>
                            </td>
                        </tr>
                        <tr id="weight" :class="getClass(error.weight)">
                            <td>权重</td>
                            <td>
                                <input type="number" step="0" class="form-text" v-model="form.weight">
                                <span class="necessary">*</span>
                                <span class="tip">{{ error.weight }}</span>
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
        <v-loading ref="loading"></v-loading>
    </div>
</template>

<script src="./js/announcement.js"></script>
<style scoped src="../public/css/public.css"></style>
<style scoped src="./css/announcement.css"></style>