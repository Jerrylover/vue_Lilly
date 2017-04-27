<template>
    <div class="doctorinfo">
        <mt-header fixed title="个人设置" style="height: 60px; font-size: 20px;">
        </mt-header>
        <div class="doctor-name">{{doctor_name}} 医生（{{hospital_name}} 医院）</div>
        <div class="disease-item" v-for="disease in doctor.disease_arr" v-if="1==disease.id">
            <span>疾病:&nbsp;&nbsp;&nbsp;{{disease.name}}</span>
            <div style="width: 100%;">
                <img :src="disease.qr_url">
            </div>
        </div>
        <div style="display: inline-flex; width: 100%; height:50px; line-height:50px; border: 1px solid #ccc;">
            <img src="../../../static/msg_recieve.png" style="display: inline-block; margin-left: 20px; width: 30px; height: 30px; line-height: 30px;">
            <div style="margin-right: 120px;">接受信息推送</div>
            <mt-switch v-model="msg_accept" @change.native="clickCheckBox(msg_accept)" style="margin-right: 5px;"></mt-switch>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    module.exports = {
        data: function() {
            return {
                test: '',
                doctorid: 0,
                doctor_name: '',
                hospital_name: '',
                msg_accept: false,
                doctor: {

                }
            }
        },
        methods: {
            'clickCheckBox': function(msg_accept) {
                var self = this;
                var status = 0;
                if (msg_accept == true) {
                    status = 1;
                }else {
                    status = 0;
                }
                var url = api.get('doctor.configpost');
                var params = {
                    msg_accept: status
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        let instance = self.$toast('设置成功');
                        setTimeout(() => {
                            instance.close();
                        }, 2000);
                    }else {
                        if (msg_accept == true) {
                            msg_accept = false;
                            status = 0;
                        }else {
                            msg_accept = true;
                            status = 1;
                        }
                    }
                })
            },
            fetchData: function() {
                var self = this;
                var url = api.get('doctor.info');
                var params = {
                    doctorid: this.doctorid
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.doctor_name = data.doctor_name;
                        self.hospital_name = data.hospital_name;
                        self.doctor = data.doctor;
                        // console.log(data.msg_accept);
                        if (data.msg_accept == 1) {
                            self.msg_accept = true;
                        }else {
                            self.msg_accept = false;
                        }
                    }
                })
            },
        },
        created: function(){
            this.doctorid = localStorage.getItem('_doctorid_');
            this.fetchData();
        }
    }
</script>
<style scoped>
    .doctorinfo {
        text-align: left;
    }
    .doctor-name{
        display: block;
        border-bottom: #ccc solid 1px;
        background: white;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-bottom: 10px;
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
