<template>
    <div class="patientmain">
        <mt-header fixed title="患者详情" style="height: 60px; font-size: 20px;">
		</mt-header>
        <div class="patientinfotitle">
            <span>{{patient.name}}</span>
            <span>{{patient.sexstr}}</span>
            <span>{{patient.agestr}}</span>
            <span>{{patient.disease_name}}</span>
        </div>
        <div class="info" style="width: 100%;">
            <div class="info-item" @touchstart="clickBaseInfo(patient.id)" style="width: 100%; text-align: center;">
                <img class="info-img" src="../../../static/baseinfo.png">
                <span style="text-align: left; float: none; position: relative; top: -15px;">基本资料</span>
            </div>
            <div class="info-item" @touchstart="clickPaper(patient.id)" style="width: 100%; text-align: center;">
                <img class="info-img" src="../../../static/paper1.png">
                <span style="text-align: left; float: none; position: relative; top: -15px;">量表</span>
            </div>
            <div class="info-item" @touchstart="clickChat(patient.id)" style="width: 100%; text-align: center;">
                <img class="info-img" src="../../../static/chat.png">
                <span style="text-align: left; float: none; position: relative; top: -15px;">诊后交流</span>
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
                patient: {
                }
            }
        },
        created: function() {
            var self = this;
            var patientid = this.$route.params.patientid;
            console.log('patientid',patientid);
            var url = api.get('patient.info');
            var params = {
                patientid: patientid
            }
            common.post(url, params, function(response){
                console.log(response);
                var data = response.data;
                self.patient = data;
                self.patient.id = patientid;
            })

        },
        mounted: function() {
            document.title = "患者详情";
        },
        methods: {
            clickBaseInfo: function(patientid) {
                console.log(patientid);
                this.$router.push({name: 'patient-baseinfo', params:{'patientid': patientid}})
            },
            clickChat: function(patientid) {
                console.log(patientid);
                this.$router.push({name: 'patient-pipelist', params: {'patientid': patientid}});
            },
            clickPaper: function(patientid) {
                console.log(patientid);
                this.$router.push({name: 'paper-tpllist4onepatient', query: {'patientid': patientid}});
            }
        }

    }
</script>
<style scoped>
    .patientinfotitle {
        border: 1px solid #ccc;
        margin-top: 80px;
        padding: 10px;
        text-align: left;
        border-radius: 4px;
    }
    .info {
        margin-top: 10px;
        display: inline-block;
        width: 100%;
    }
    .info-item{
        margin-top: 10px;
        height: 100px;
        line-height: 100px;
    }
    .info-img{
        width: 35px;
        height: 35px;
    }

    .info > div {
        box-sizing:border-box;
        font-size: 16px;
        font-size: 1.6rem;
        width: 50%;
        height: 92px;
        line-height: 92px;
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
