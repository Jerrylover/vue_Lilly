<template>
    <div class="waitpatientconfirm">
        <mt-header fixed :title="title">
            <router-link to="/bedtkt/list" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
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
        <div style="margin-top: 100px">
            <span v-if="bedtkt.patient_status == 2 || bedtkt.patient_status == 1" style="width: 80%;">您与患者约定的日期为{{bedtkt.confirm_date}}</span><br/>
            <span v-if="bedtkt.patient_status == 2">患者可以按时入院</span>
            <div v-if="bedtkt.patient_status == 3">
                <span>患者无法入院理由</span>
                <p>{{bedtkt.patient_remark}}</p>
                <div class="footer" style="position: fixed; bottom: 0px; width: 100%;left: 0px">
                    <a class="cn-btn-cancel" href="javascript:" style="width: 50%" @click="clickCancel">取消</a><!--
                --><a class="cn-btn-confirm" href="javascript:" style="width:50%" @click="clickConfirm">再次发送确认通知</a>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import common from '../../lib/common.js'
    module.exports = {
        data: function() {
            return {
                title: '',

                openid: '',
                bedtkt:{},
                bedtktid:'',
            }
        },
        methods: {
            clickCancel: function(){
                this.$router.go(-1);
            },
            clickConfirm: function() {
                this.$router.push({
                    name: "bedtkt-sendentermsg",
                    query: {
                        bedtktid: this.bedtktid
                    }
                })
            }
        },
        created(){
            var self = this;
            var queryString = this.$route.query;
            this.openid = localStorage.getItem('_openid_');
            this.bedtktid = queryString.bedtktid;
            common.getBedtktInfo(this.bedtktid, this.openid, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    console.log(response);
                    self.bedtkt = data;
                    switch (Number(self.bedtkt.patient_status)){
                    case 1:
                    case 2:
                        self.title = "住院状态查询";
                        break;
                    case 3:
                        self.title = "患者拒绝入院";
                        break;
                    }
                }
            })
            
        },

    }
</script>
<style scoped>
    .footer a {
        display: inline-block;
        /*width: 50%;*/
        padding: 10px 0px;
        text-decoration: none;
        color: #fff;
    }
    .patientinfo {
        text-align: left;
        font-size: 0px;
        border: 1px solid #58B7FF;
        padding: 15px;
        margin-bottom: 10px;
    }
    .patientinfo span {
        font-size: 16px;
        display: inline-block;
    }
    .patientinfo span.left {
        width: 45%;
    }
</style>