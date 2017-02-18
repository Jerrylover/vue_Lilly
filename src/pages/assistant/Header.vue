<template>
    <h4><a class="header-a" href="javascript:" @click="goback">返回</a> > {{pagetitle}}</h4>
</template>
<style scoped>
</style>
<script>
    module.exports = {
        data: function() {
            return {

            }
        },
        props: {
            pagetitle: {
                require: true,
                type: String,
            }
        },
        methods: {
            goback: function() {
                window.history.go(-1);
            }
        }
    }
</script>
