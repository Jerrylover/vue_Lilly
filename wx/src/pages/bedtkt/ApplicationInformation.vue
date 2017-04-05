<template>
    <div class="application-information">
        <div class="header">
            <a href="javascript:" :class="{'active': active == 'hospitalization'}" @touchstart="clickHospitalization">住院证</a>
            <a href="javascript:" :class="{'active': active == 'bloodtest'}" @touchstart="clickBloodtest">血常规</a>
        </div>
        <div class="body">
            <template v-if="active == 'hospitalization'">
                <div v-for="bedtktpic in bedtktpictures">
                    <img :src="bedtktpic" style="width: 80%">
                </div>
            </template>
            <template v-if="active == 'bloodtest'">
                <div v-for="wxpic in wxpics">
                    <img :src="wxpic" style="width: 80%">
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    module.exports = {
        data: function() {
            return {
                bedtktid: '',
                active: 'hospitalization',

                bedtktpictures:[],
                wxpics:[],
            }
        },
        created: function() {
            var self = this;
            this.bedtktid = this.$route.params.bedtktid;
            var openid = localStorage.getItem('_openid_');
            var url = api.get('bedtkt.info');
            var params = {
                bedtktid: this.bedtktid,
                openid: openid,
            }
            common.post(url, params, function(response){
                console.log(response);
                self.bedtktpictures = response.data.bedtktpictures;
                self.wxpics = response.data.wxpics;
                // console.log(self.bedtktpictures);
            })

        },
        methods: {
            clickHospitalization: function() {
                this.active = 'hospitalization';
            },
            clickBloodtest: function() {
                this.active = 'bloodtest';
            }
        },
        mounted: function() {
            document.title = "申请资料";
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
    .body {
        margin-top: 10px;
    }
</style>