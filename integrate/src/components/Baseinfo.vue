<template>
    <table class="table table-bordered" style="margin-top: 15px">
        <tr class="bg-F5F6FA">
            <td colspan="6"><strong>个人资料</strong></td>
        </tr>
        <tr>
            <td>姓名</td>
            <td>{{patient.name}}</td>
            <td>性别</td>
            <td>{{patient.sexstr}}</td>
            <td>身份证号</td>
            <td>{{patient.prcrid}}</td>
        </tr>
        <tr>
            <td>年龄</td>
            <td>{{patient.agestr}}</td>
            <td>住址</td>
            <td colspan="4">{{patient.provincestr}}&nbsp;&nbsp;&nbsp;{{patient.citystr}}</td>
        </tr>
        <tr class="bg-F5F6FA">
            <td colspan="6"><strong>病历信息</strong></td>
        </tr>
        <tr>
            <td>主治医生</td>
            <td>{{patient.doctorname}}</td>
            <td>医院</td>
            <td>{{patient.hospitalname}}</td>
            <td>诊断</td>
            <td>{{patient.visit}}</td>
        </tr>
        <tr>
            <td>病历号</td>
            <td>{{patient.out_case_no}}</td>
            <td>就诊卡号</td>
            <td>{{patient.patientcardno}}</td>
            <td>上次复发时间</td>
            <td>{{patient.timefromastbreakout}}</td>
        </tr>
        <tr  class="bg-F5F6FA" v-if="patient.pmrefs != undefined">
            <td colspan="6">患者用药</td>
        </tr>
        <tr v-for="medicine in patient.pmrefs">
            <td>药名</td>
            <td>{{medicine.medicine_name}}</td>
            <td>剂量</td>
            <td>{{medicine.drug_value}}&nbsp;&nbsp;{{medicine.drug_unit}}</td>
            <td>首次</td>
            <td>{{medicine.first_start_date}}</td>
        </tr>
    </table>
</template>
<style scoped>
    td:nth-child(2n+1) {
        background-color: #FBFBFB;
    }
    .bg-F5F6FA td{
        /*background-color: #E0DDE9;*/
        background-color: #eee;
    }
</style>
<script>
    export default {
        props: ['patient'],
        data: function(){
            return {

            }
        }
    }
</script>
