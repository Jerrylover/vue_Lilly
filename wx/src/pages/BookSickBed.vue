<template>
    <div class="book-sick-bed" style="background-color: #ddd; margin: 8px 0px;">
        <mt-header fixed title="住院预约详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right" @click="clickOperationHistory">操作记录</mt-button>
        </mt-header>
        <div style="position: fixed;top: 39px;left: 0px;width: 100%;box-shadow: 0px 1px 2px #ddd">
            <a href="javascript:" :class="['navbar', {'selected': active=='male'}]" @click="clickMale">男性患者</a><!--
            --><a href="javascript:" :class="['navbar', {'selected': active=='female'}]" @click="clickFemale">女性患者</a>
        </div>
        <div style="margin-top: 90px;">
        <div v-for="tkt in tktlist" style="text-align: left; background-color: #fff; padding: 5px; margin-bottom: 10px;" class="patientinfo">
            <div>
                <span class="left">姓名:&nbsp;&nbsp;{{tkt.name}}</span>
                <span>应住院日期:&nbsp;&nbsp;{{tkt.plan_date}}</span>
            </div>
            <div>
                <span class="left">性别:&nbsp;&nbsp;{{tkt.sex}}</span>
                <span>手机号:&nbsp;&nbsp;{{tkt.mobile}}</span>
            </div>
            <div>
                <span class="left">年龄:&nbsp;&nbsp;{{tkt.age}}岁</span>
                <span>近期居住地:&nbsp;&nbsp;{{tkt.address}}</span>
            </div>
            <div class="doperation">
                <a href="javascript:" style="background-color: #f06500" @click="clickRefuseBook(tkt)">拒绝入院</a><!--
            --><a href="javascript:" style="background-color: #4799ff" @click="clickConfirmEnter(tkt)">确认入院</a><!--
            --><a v-if="tkt.patient_status == 0" href="javascript:" style="background-color: #00ccff" @click="clickSendMsg(tkt)">发送入院通知</a><!--
            --><a v-if="tkt.patient_status == 2" href="javascript:" style="background-color: #4bcc00" @click="clickPatientConfirmCanEnter(tkt)">患者确认可入院</a><!--
            --><a v-if="tkt.patient_status == 3" href="javascript:" style="background-color: #f06500" @click="clickPatientRefuse(tkt)">患者无法入院</a><!--
            --><a v-if="tkt.patient_status == 1" href="javascript:" style="background-color: #99cc00" @click="clickWaitPatientConfirm(tkt)">患者待确认</a>
            </div>
        </div>
        <div style="position: none;margin-top: 200px; background-color: #fff">
            <span v-if="tktlist.length == 0" style="margin-top:400px;width:80%; background-color: #fcf8e3; padding: 15px">暂无数据</span>
        </div>
        </div>
    </div>
</template>
<script>
    import api from '../config/api.js'
    import common from '../lib/common.js'
    module.exports = {
        data: function() {
            return {
                openid: '',
                selected: '',
                active: 'male',
                status: '1',
                tktlist: [],
                tktlist_male: [],
                tktlist_female: [],
            }
        },
        methods: {
            'clickRefuseBook': function(tkt) {

                this.$router.push({
                    name: 'refuseenter',
                    query:{
                        name: tkt.name,
                        bedtktid: tkt.id,
                        sex: tkt.sex,
                        age: tkt.age,
                        plan_date: tkt.plan_date,
                        mobile: tkt.mobile,
                        address: tkt.address,
                    }
                })
            },
            'clickConfirmEnter': function(tkt) {
                this.$router.push({
                    name: 'confirmenter',
                    query:{
                        name: tkt.name,
                        bedtktid: tkt.id,
                        sex: tkt.sex,
                        age: tkt.age,
                        plan_date: tkt.plan_date,
                        mobile: tkt.mobile,
                        address: tkt.address,
                        confirmdate: tkt.confirm_date,
                        patient_status: tkt.patient_status,
                    }
                })
            },
            'clickSendMsg': function(tkt) {
                // console.log(tkt);
                this.$router.push({
                    name: 'sendentermsg', 
                    query:{
                        name: tkt.name,
                        bedtktid: tkt.id,
                        sex: tkt.sex,
                        age: tkt.age,
                        plan_date: tkt.plan_date,
                        mobile: tkt.mobile,
                        address: tkt.address,
                    }
                })
            },
            clickWaitPatientConfirm: function(tkt) {
                console.log(tkt);
                this.$router.push({
                    name: 'patientbookstatus',
                    query:{
                        name: tkt.name,
                        bedtktid: tkt.id,
                        sex: tkt.sex,
                        age: tkt.age,
                        plan_date: tkt.plan_date,
                        mobile: tkt.mobile,
                        address: tkt.address,
                        confirmdate: tkt.confirm_date,
                        patient_status: tkt.patient_status,
                    }
                })
            },
            clickPatientRefuse: function(tkt) {
                this.$router.push({
                    name: 'cannotenter',
                    query:{
                        name: tkt.name,
                        bedtktid: tkt.id,
                        sex: tkt.sex,
                        age: tkt.age,
                        plan_date: tkt.plan_date,
                        mobile: tkt.mobile,
                        address: tkt.address,
                        confirmdate: tkt.confirm_date,
                        patient_status: tkt.patient_status,
                        patient_remark: tkt.patient_remark,
                    }
                })
            },
            clickPatientConfirmCanEnter: function(tkt) {
                this.$router.push({
                    name: 'patientbookstatus',
                    query:{
                        name: tkt.name,
                        bedtktid: tkt.id,
                        sex: tkt.sex,
                        age: tkt.age,
                        plan_date: tkt.plan_date,
                        mobile: tkt.mobile,
                        address: tkt.address,
                        confirmdate: tkt.confirm_date,
                        patient_status: tkt.patient_status,
                    }
                });
            },
            clickMale: function() {
                this.active = 'male';
                this.tktlist = this.tktlist_male;
            },
            clickFemale: function() {
                this.active = 'female';
                this.tktlist = this.tktlist_female;
            },
            clickOperationHistory: function() {
                // console.log('aaaaa');
                this.$router.push({
                    name: 'operationhistory',
                })
            }
        },
        created(){
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            var url = api.get('sickbed.list');
            var params = {
                openid: this.openid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.tktlist_male = data.tktlist_male;
                    self.tktlist_female = data.tktlist_female;
                    self.tktlist = self.tktlist_male;
                    // self.tktlist[0].patient_status = 1;
                }
            })
        }
    }
</script>
<style scoped>
    .navbar {
        width:50%;
        display: inline-block;
        background-color: #fff;
        padding: 10px 0px;
        text-decoration: none;
        color: #26a2ff;
    }
    a.selected {
        background-color: #26a2ff;
        color: #fff;
    }
    .patientinfo span.left {
        width: 45%;
    }
    .patientinfo span {
        display: inline-block;
        font-size: 14px;
        width: auto;
    }
    .doperation{
        margin: 0px -5px;
    }
    .doperation a {
        display: inline-block;
        padding: 5px 0px;
        text-align: center;
        color: #fff;
        width:33.3333%;
        text-decoration:none;
    }
</style>