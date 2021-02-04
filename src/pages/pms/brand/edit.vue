<template>
    <div class='brand-edit-warpper'>
        <brand-detail :actionType='true'/>
    </div>
</template>

<script>
    import BrandDetail from './component/BrandDetail';

    export default {
        name: "edit",
        components: {
            BrandDetail
        }
    }
</script>

<style scoped>

</style>
