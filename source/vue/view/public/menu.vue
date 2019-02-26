<template>
    <div class='infinite-classification'>
        <div class="list">
            <v-item v-for="v in $store.state.menu" :data="v" :key="v.id"></v-item>
        </div>
    </div>
</template>

<script>
    import item from './item.vue';
    // import mapping from 'mapping/mapping.js';

    export default {
        name: "v-menu" ,
        data () {
            return {
                // mapping ,
            };
        } ,
        mounted () {

        } ,
        components: {
            'v-item': item
        }
    }
</script>

<style scoped>

</style>