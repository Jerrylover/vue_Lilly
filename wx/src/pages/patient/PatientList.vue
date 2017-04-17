<template>
    <div class="patientlist">
        <div style="position: fixed; top: 0px; left: 0px; width: 100%; z-index: 100;">
            <mt-search v-model="patient_name" :show="true" v-on:keyup.13.native="doSearch">
            </mt-search>
        </div>
        <div class="body-container">
            <ul v-infinite-scroll="loadMore" :infinite-scroll-disabled="true" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" style="list-style-type: none; padding:0px">
                <li class="item-box" v-for="patient in patients" @click="goPatientDetail(patient)">
                    <div class="item-box-header">
                        <span>{{patient.name}}</span>
                        <span style="float: right">{{patient.disease_name}}</span>
                    </div>
                    <div class="item-box-item" style="margin-top: 10px">
                        <span class="left">性别: </span>
                        <span>{{patient.sexstr}}</span>
                    </div>
                    <div class="item-box-item">
                        <span class="left">电话号码: </span>
                        <span>{{patient.mobile}}</span>
                    </div>
                    <div class="item-box-item">
                        <span class="left">入组日期: </span>
                        <span>{{patient.createday}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    module.exports = {
        data: function() {
            return {
                flag: 1,
                openid: '',
                patient_name: '',
                pagenum: 1,
                pagesize: 10,
                patients: [
                ]
            }
        },
        methods: {
            goPatientDetail: function(patient) {
                console.log(patient);
                this.$router.push({name: 'patient-main', params:{'patientid': patient.patientid}})
            },
            clickdiv: function() {
                console.log('aaaaa');
            },
            clicka: function() {
                 console.log('aaaaa');
            },
            hello: function() {
                console.log('22222');
            },
            doSearch: function(){
                this.pagenum = 1;
                this.flag = 1;
                var self = this;
                var url = api.get('patient.list');
                var params = {
                    patient_name: self.patient_name,
                    pagenum: self.pagenum,
                    pagesize: self.pagesize,
                    openid: self.openid
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var data = response.data;
                        self.patients = data.patients;
                        console.log(self.patients);
                    }
                })
                
            },
            loadMore: function() {
                this.fetchData();
            },
            fetchData: function() {
                if (this.flag == 0) {
                    return ;
                }
                var self = this;
                var url = api.get('patient.list');
                var params = {
                    patient_name: self.patient_name,
                    pagenum: self.pagenum,
                    pagesize: self.pagesize,
                    openid: self.openid
                }
                self.flag = 0;
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var data = response.data;
                        if (data.patients.length != 0) {
                            self.pagenum++;
                            self.patients = self.patients.concat(data.patients);
                            console.log(self.patients);
                        }
                        self.flag =1;
                    }
                })
            }
        },
        created: function() {
            this.openid = localStorage.getItem('_openid_');
            this.fetchData();
        },
        mounted: function() {
            console.log('xxxxxx');
            document.title="患者列表";
        }

    }
</script>
<style scoped>
    .mint-search {
        height: 52px;
    }
    .body-container {
        background-color: #eee;
        padding:  0px 0px 0px 0px;
        /*overflow-scrolling: touch;*/
        /*-webkit-overflow-scrolling: touch;*/
        /*overflow: auto;*/
        /*-webkit-overflow-scrolling: touch;*/
    }
    .item-box {
        background-color: #fff;
        text-align: left;
        padding: 20px;
        margin-bottom: 10px;
    }
    .item-box-header {
        border-bottom: 1px dashed #ccc;
        padding-bottom: 5px;
        color: #1996ea;
    }
    .item-box-item {
        font-size: 14px;
        padding: 2px 0px;
        color: #666;
    }
    .item-box-item .left {
        width: 25%;
        display: inline-block;
    }
</style>