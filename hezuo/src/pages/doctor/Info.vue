<template>
    <div class="doctorinfo">
        <div class="disease-item" v-for="disease in doctor.disease_arr">
            <span>疾病:&nbsp;&nbsp;&nbsp;{{disease.name}}</span>
            <div style="width: 100%;">
                <img :src="disease.qr_url">
            </div>
        </div>
        <!-- <router-link :to="{name: 'doctor-config'}">hahaha</router-link> -->

        <!-- <mt-popup v-model="popupVisible">
            <img :src="picurl" style="width: 100%;">
        </mt-popup> -->
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    module.exports = {
        data: function() {
            return {
                // picurl: '',
                // popupVisible: false,
                test: '',
                openid: '',
                doctor: {

                }
            }
        },
        methods: {
            fetchData: function() {
                var self = this;
                var url = api.get('doctor.info');
                var params = {
                    openid: this.openid
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.doctor = data.doctor;
                    }
                })
            },
            // clickPhoto: function(disease) {
            //     this.popupVisible = true;
            //     this.picurl = disease.qr_url;
            // }
        },
        created: function(){
            this.openid = localStorage.getItem('_openid_');
            this.fetchData();
        }
    }
</script>
<style scoped>
    .doctorinfo {
        text-align: left;
    }
    .disease-item {
        border: 1px solid #ccc;
        width: 90%;
        margin: 0px auto 20px auto;
    }
    span {
        padding: 5px;
        display: block;
        width: 90%;
        margin: auto;
        text-align: left;
    }
    img {
        display: block;
        width: 100%;
        margin: auto;
    }
</style>