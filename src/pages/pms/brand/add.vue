<template>
    <div class='add-brand-warpper'>
        <brand-detail :actionType='false'/>
    </div>
</template>

<script>
    import BrandDetail from './component/BrandDetail';

    export default {
        name: "add",
        components: {
            BrandDetail
        }
    }
</script>

<style scoped>

</style>
