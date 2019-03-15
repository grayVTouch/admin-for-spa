<template>
    <option v-for="v in data">{{ v.name }}</option>
</template>

<script>
    export default {
        name: "option" ,
        props: {
            data: {
                type: Array ,
                required: true ,
                default: []
            }
        }
    }
</script>

<style scoped>

</style>