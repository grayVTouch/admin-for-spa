<template>
    <div class="app">
        <v-loading ref="loading"></v-loading>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        mounted () {
            topContext.ins.loading = new Loading(this.$refs.loading.$el , {
                status: 'hide' ,
                type: 'line-scale'
            });
        } ,
    };
</script>
<style scoped></style>