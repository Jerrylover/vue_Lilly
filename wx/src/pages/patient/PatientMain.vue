<template>
    <div class="patientmain">
        <div class="patientinfotitle">
            <span>{{patient.name}}</span>
            <span>{{patient.sexstr}}</span>
            <span>{{patient.agestr}}</span>
            <span>{{patient.disease_name}}</span>
        </div>
        <div class="doing" style="padding: 10px 10px 10px 0px; border: 1px solid #ccc; margin-top: 10px;">
            <div style="text-align: left; padding: 5px; padding-left: 0px;">
                <span style="background-color: green; color: #fff; padding: 5px 10px;border-top-right-radius: 8px;border-bottom-right-radius: 8px;">进行中</span>
            </div>
            <div>
                
            </div>
        </div>
        <div class="info" style="width: 100%">
            <div>
                <div @touchstart="clickBaseInfo(patient.id)">
                    <img src="../../../static/baseinfo.png">
                    <span>基本资料</span>
                </div>
                <div @touchstart="clickBedtkt(patient.id)">
                    <img src="../../../static/bedtkt.png">
                    <span>住院预约</span>
                </div>
            </div>
            <div style="clear: both;"></div>
            <div>
                <div @touchstart="clickRevisittkt(patient.id)">
                    <img src="../../../static/revisittkt.png">
                    <span>复诊预约</span>
                </div>
                <div @touchstart="clickChat(patient.id)">
                    <img src="../../../static/chat.png">
                    <span>诊后交流</span>
                </div>
            </div>
            <div style="clear: both;"></div>
            <div>
                <div @touchstart="clickPaper(patient.id)">
                    <img src="../../../static/paper1.png" style="width: 64px">
                    <span>量表</span>
                </div>
                <div @touchstart="clickData(patient.id)">
                    <img src="../../../static/data.png">
                    <span>数据查询</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                patient: '',
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var patientid = this.$route.params.patientid;
            var url = api.get('patient.info');
            var params = {
                openid: openid,
                patientid: patientid,
            }
            common.post(url, params, function(response){
                console.log(response);
                var data = response.data;
                self.patient = data;
                self.patient.id = patientid;
            })

        },
        methods: {
            clickBaseInfo: function(patientid) {
                console.log(patientid);
                this.$router.push({name: 'patient-baseinfo', params:{'patientid': patientid}})
            },
            clickBedtkt: function(patientid) {
                console.log(patientid);
                this.$router.push({name: 'bedtkt-patienthistory', params:{'patientid': patientid}})
            },
            clickRevisittkt: function(patientid) {

            },
            clickChat: function(patientid) {

            },
            clickPaper: function(patientid) {

            },
            clickData: function(patientid) {

            },

        }

    }
</script>
<style scoped>
    .patientinfotitle {
        border: 1px solid #ccc;
        margin-top: -50px;
        padding: 10px;
        text-align: left;
        border-radius: 4px;
    }
    .info {
        margin-top: 10px;
        display: inline-block;
        width: 100%;
    }
    .info > div {
        box-sizing:border-box;
        margin-top: 0px;
        font-size: 0px;
    }
    .info > div > div {
        box-sizing:border-box;
        font-size: 16px;
        font-size: 1.6rem;
        width: 50%;
        height: 92px;
        padding: 10px;
        border: 1px solid #ccc;
        display: inline-block;
        text-align: left;
    }
    .info > div > div:hover {
        background-color: #ddd;
    }
    .info > div > div > span {
        float: right;
        line-height: 4.3
    }
</style>