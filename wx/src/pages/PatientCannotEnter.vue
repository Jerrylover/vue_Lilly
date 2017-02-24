<template>
    <div class="patientcannotenter">
        <mt-header fixed title="发送入院通知">
            <router-link to="/booksickbed" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="patientinfo">
            <div>
                <span>姓名:&nbsp;&nbsp;{{name}}</span>
                <span>应住院日期:&nbsp;&nbsp;{{plan_date}}</span>
            </div>
            <div>
                <span>性别:&nbsp;&nbsp;{{sex}}</span>
                <span>手机号:&nbsp;&nbsp;{{mobile}}</span>
            </div>
            <div>
                <span>年龄:&nbsp;&nbsp;{{age}}岁</span>
                <span>近期居住地:&nbsp;&nbsp;{{address}}</span>
            </div>
        </div>
        <span>患者无法入院理由:</span><br/>
        <p>{{reason}}</p>
    </div>
</template>
<script scoped>
    module.exports = {
        data: function(){
            return {
                openid: '',
                reason: '',
                name: '',
                plan_date: '',
                sex: '',
                mobile: '',
                address: '',
                age: '',
            }
        },
        created(){
            this.openid = localStorage.getItem('_openid_');
            var queryString = this.$route.query;
            this.name = queryString.name;
            this.plan_date = queryString.plan_date;
            this.sex = queryString.sex;
            this.mobile = queryString.mobile;
            this.address = queryString.address;
            this.age = queryString.age;
            this.confirmdate = queryString.confirmdate;

            this.patient_status = queryString.patient_status;
            this.reason = queryString.patient_remark;
        }
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
        width: 50%;
        display: inline-block;
    }
</style>