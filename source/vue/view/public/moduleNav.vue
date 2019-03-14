<template>
    <div class="module-nav">
        <div class="left">
            <img :src="topRoute.b_ico" class="image">
            <span class="cn">{{ topRoute.name }}</span>
            <span class="delimiter">/</span>
            <span class="en">{{ topRoute.en }}</span>
        </div>
        <div class="right">
            <breadcrumb>
                <breadcrumb-item v-for="v in pos" @click="parent.location(v.route , null , '_self')">{{ v.name }}</breadcrumb-item>
            </breadcrumb>
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
        }
    }
</script>

<style scoped src="./css/moduleNav.css"></style>