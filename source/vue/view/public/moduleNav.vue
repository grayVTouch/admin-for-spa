<template>
    <div class="module-nav">
        <div class="left">
            <img :src="topRoute.b_ico" class="image">
            <span class="cn">{{ topRoute.name }}</span>
            <span class="delimiter">/</span>
            <span class="en">{{ topRoute.en }}</span>
            &nbsp;&nbsp;
            <button class="btn-8" @click.prevent="$parent.location($parent.route.route , $parent.param)">标签页刷新</button>
        </div>
        <div class="right">
            <!-- 面包屑 -->
            <template v-for="(v,k) in pos">
                <span class="text" @click="v.route != '' && v.route != $parent.route.route ? $parent.location(v.route) : null">{{ v.name }}</span>
                <span class="delimiter" v-if="!(k == pos.length - 1)">/</span>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-moduleNav" ,
        props: {
            topRoute: {
                type: Object ,
                required: true ,
                default: {}
            } ,
            pos: {
                type: Array ,
                required: true ,
                default: []
            }
        } ,
        watch: {}
    }
</script>
<style scoped src="./css/moduleNav.css"></style>