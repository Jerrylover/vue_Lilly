<template>
    <div>
        <a class="photo-a imgShell" data-url="{{obj.detail.imgurl}}" href="javascript:" @click="clickPhoto($event)"><img :src="obj.detail.thumburl"></a>
    </div>
</template>
<style scoped>
    .imgShell {
        display: inline-block;
        width: 150px;
        height: 150px;
        line-height: 146px;
        border: 1px solid #ddd;
        background: #f5f5f5;
        text-align: center;
    }
</style>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        props: ['obj'],
        methods: {
            clickPhoto: function(e) {
                this.$dispatch('showPhotoGallery',e);
            }
        }
    }
</script>
