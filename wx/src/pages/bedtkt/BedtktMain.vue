<template>
    <div class="bedtktmain">
        <div class="patientinfo">
            <div>
                <span class="left">姓名:&nbsp;&nbsp;{{bedtkt.name}}</span>
                <span>应住院日期:&nbsp;&nbsp;{{bedtkt.plan_date}}</span>
            </div>
            <div>
                <span class="left">性别:&nbsp;&nbsp;{{bedtkt.sex}}</span>
                <span>手机号:&nbsp;&nbsp;{{bedtkt.mobile}}</span>
            </div>
            <div>
                <span class="left">年龄:&nbsp;&nbsp;{{bedtkt.age}}岁</span>
                <span>近期居住地:&nbsp;&nbsp;{{bedtkt.address}}</span>
            </div>
        </div>
        <div class="currstatus" style="text-align: left; margin-top: 5px;">
            <span>最新状态</span>
            <div :style="{border: bedtkt.color,borderWidth: '1px', borderStyle: 'solid'}" style="text-align: left; border-radius: 4px; margin-top: 10px; padding: 10px 10px 10px 0px; box-sizing: border-box">
                <span :style="{backgroundColor: bedtkt.color}" style="color: #fff; padding: 5px 15px 5px 5px; box-sizing: border-box; border-top-right-radius: 18px; border-bottom-right-radius: 18px; display: inline-block">{{bedtkt.title}}</span>
                <div style="padding: 10px">
                    <span v-html="bedtkt.content"></span>
                </div>
            </div>
        </div>
        <div class="operation" style="margin-top: 30px;">
            <div class="line">
                <div @touchstart="clickApplicationInformation">
                    <img src="../../../static/baseinfo.png">
                    <span>入院资料</span>
                </div>
                <div @touchstart="clickPatientDetail">
                    <img src="../../../static/user.png">
                    <span>患者详情</span>
                </div>
            </div>
            <div class="line">
                <div style="width: 99%" @touchstart="clickSendMsg">
                    <img src="../../../static/chat.png">
                    <span>询问患者是否可以入院</span>
                </div>
            </div>
            <div class="line">
                <div @touchstart="clickConfirmEnter" style="border-color: #379a1f">
                    <img src="../../../static/confirm.png">
                    <span>确认入院</span>
                </div>
                <div @touchstart="clickRefuseEnter" style="border-color: #d5743b">
                    <img src="../../../static/refuse.png">
                    <span>拒绝患者入院</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                patientid: '',
                bedtktid: '',

                bedtkt: {
                    name: '111111111',
                    sex: '222222222',
                    mobile: '19234323455;12343231234',
                    color: 'blue',
                    title: '已拒绝',
                },
            }
        },
        created: function() {
            this.bedtktid = this.$route.params.bedtktid;
            this.patientid = this.$route.query.patientid;
        },
        methods: {
            clickApplicationInformation: function() {
                this.$router.push({
                    name: 'bedtkt-applicationinfomation', 
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            clickSendMsg: function() {
                this.$router.push({
                    name: 'bedtkt-sendentermsg', 
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            clickPatientDetail: function() {
                this.$router.push({
                    name: 'patient-main',
                    params:{
                        patientid: this.patientid,
                    }
                })
            },
            clickConfirmEnter: function() {
                this.$router.push({
                    name: 'bedtkt-pass',
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            },
            clickRefuseEnter: function() {
                this.$router.push({
                    name: 'bedtkt-refuse',
                    query:{
                        bedtktid: this.bedtktid,
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .patientinfo {
        background-color: #1996ea;
        margin: -60px -8px 0px -8px;
        text-align: left;
    }
    .patientinfo .left {
        width: 40%;
    }
    .patientinfo span {
        display: inline-block;
        color: #fff;
        padding: 5px 10px;
    }
    .line {
        box-sizing: border-box;
        margin-top: 5px;
    }
    .line > div {
        display: inline-block;
        border: 1px solid #1996ea;
        padding: 10px 0px;
        border-radius: 4px;
        font-size: 10px;
        font-size: 1rem;
        width: 48.5%;
    }
    .line img {
        width: 48px;
    }
    .line span {
        /*float: right;*/
        /*line-height: 4.5;*/
        position: relative;
        top:-20px;
        margin-right: 20px;
    }
</style>