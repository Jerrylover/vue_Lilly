<template>
    <div>
        <span>{{errmsg}}</span>
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
        },
        watch: {
            '$router': function() {
                console.log(this.$router);
            }
        },
        beforeRouteEnter(to, from, next) {
            // var self = this;
            // var openid = '';
            // var isbind = '';
            // openid = localStorage.getItem('_openid_');
            // var url = api.get('user.isbind');
            // var params = {
            //     openid: openid,
            // }
            // common.post(url, params, function(response){
            //     if (response.errno == 0) {
            //         isbind = response.data.isbind;
            //         console.log('isbind', isbind);
            //         if (isbind == 1) {
            //             this.getDoctorInfo();
            //         }
            //     }
            // })
            next();
        }
    }
</script>