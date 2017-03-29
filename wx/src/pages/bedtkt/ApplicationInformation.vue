<template>
    <div class="application-information">
        <div class="header">
            <a href="javascript:" :class="{'active': active == 'hospitalization'}" @touchstart="clickHospitalization">住院证</a>
            <a href="javascript:" :class="{'active': active == 'bloodtest'}" @touchstart="clickBloodtest">血常规</a>
        </div>
        <div>
            <img src="../../../static/refuse.png">
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                active: 'bloodtest',
            }
        },
        created: function() {
            var bedtktid = this.$route.params.bedtktid;
            var openid = localStorage.getItem('_openid_');
        },
        methods: {
            clickHospitalization: function() {
                this.active = 'hospitalization';
            },
            clickBloodtest: function() {
                this.active = 'bloodtest';
            }
        }
    }
</script>
<style scoped>
    .header {
        margin: -60px -8px 0px -8px;
        font-size: 0px;
    }
    .header a {
        font-size: 16px;
        font-size: 1.6rem;
        text-decoration: none;
        padding: 10px 0px;
        color: #fff;
        box-sizing: border-box;
        background-color: #ccc;
        display: inline-block;
        width: 50%;
    }
    .header .active {
        color: #fff;
        background-color: #1996ea;
    }
</style>