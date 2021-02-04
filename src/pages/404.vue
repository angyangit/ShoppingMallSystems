<template>
    <div class='not-page' @click='backHome'>
    </div>
</template>

<script>
    export default {
        methods: {
            backHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped lang='scss'>
    .not-page {
        width: 100%;
        height: 100%;
        background: #1279c1 url("../assets/images/404.jpg") no-repeat 50%;
    }
</style>
