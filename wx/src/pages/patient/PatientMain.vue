<template>
    <div class="patientmain">
        <div class="patientinfotitle">
            <span>{{patient.name}}</span>
            <span>{{patient.sexstr}}</span>
            <span>{{patient.agestr}}</span>
            <span>{{patient.disease_name}}</span>
        </div>
        <div v-if="patient.service.bedtktid != '0' || patient.service.revisittktid != '0'" class="doing" style="padding: 10px 10px 10px 0px; border: 1px solid #ccc; margin-top: 10px; text-align: left">
            <div style="text-align: left; padding: 5px; padding-left: 0px;">
                <span style="background-color: #379a1f;color: #fff; padding: 5px 15px 5px 5px; box-sizing: border-box; border-top-right-radius: 18px; border-bottom-right-radius: 18px; display: inline-block">进行中</span>
            </div>
            <div style="padding: 5px;" v-if="patient.service.bedtktid != '0'">
                <span style="padding: 5px 0px; display: inline-block">住院预约</span>
                <a style="float: right; padding: 5px 5px; text-decoration: none" href="javascript:" @touchstart="clickBedtktInfo">查看</a>
            </div>
            <!-- <div style="padding: 5px;" v-if="patient.service.revisittktid != '0'">
                <span style="padding: 5px 0px; display: inline-block">复诊预约</span>
                <a style="float: right; padding: 5px 5px; text-decoration: none" href="javascript:" @touchstart="clickRevisittktInfo">查看</a>
            </div> -->
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
                <div @touchstart="clickPaper(patient.id)">
                    <img src="../../../static/paper1.png" style="width: 64px">
                    <span>量表</span>
                </div>
                <div @touchstart="clickData(patient.id)">
                    <img src="../../../static/data.png">
                    <span>数据查询</span>
                </div>
            </div>
            <div style="clear: both;"></div>
            <div>
                <!-- <div @touchstart="clickRevisittkt(patient.id)">
                    <img src="../../../static/revisittkt.png">
                    <span>复诊预约</span>
                </div> -->
                <div @touchstart="clickChat(patient.id)" style="width: 100%; text-align: center">
                    <img src="../../../static/chat.png">
                    <span style="text-align: left; float: none; position: relative; top: -20px;">诊后交流</span>
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
                patient: {
                    service: {
                        bedtktid: "0",
                        revisittktid: "0",
                    }
                },
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var patientid = this.$route.params.patientid;
            console.log('patientid',patientid);
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
        mounted: function() {
            document.title = "患者详情";
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
                this.$router.push({name: 'patient-pipelist', params: {'patientid': patientid}});
            },
            clickPaper: function(patientid) {
                this.$router.push({name: 'paper-tpllist4onepatient', query: {'patientid': patientid}});
            },
            clickData: function(patientid) {
                this.$router.push({name: 'revisitrecord-list', query: {'patientid': patientid}});
            },
            clickBedtktInfo: function() {
                this.$router.push({name: 'bedtktlog-list', params: {'bedtktid': this.patient.service.bedtktid}});
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