<template>
    <div>
        <span>{{errmsg}}</span>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                errmsg: '页面消失不见了，请联系技术人员。',
            }
        },
        created: function() {
            // this.errmsg = sessionStorage.getItem('_href_');
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