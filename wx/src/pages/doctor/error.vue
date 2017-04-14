<template>
    <div>
        <span>{{errmsg}}网页发生错误，请稍后再试</span>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                errmsg: '错误',
            }
        },
        created: function() {
            this.errmsg = sessionStorage.getItem('_href_');
        },
        mounted: function() {
            console.log('22222');
            
        },
        watch: {
            '$route': function(to, from) {
                console.log('11111');
                console.log(to);
                this.errmsg = sessionStorage.getItem('_href_');
            }
        },
        beforeRouteEnter(to, from, next) {
            next();
        }
    }
</script>