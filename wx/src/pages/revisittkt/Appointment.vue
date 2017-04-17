<template>
    <div class="appointment">
        <mt-header fixed title="复诊预约列表">
            <!-- <router-link to="/" slot="left"> -->
                <mt-button icon="back">返回</mt-button>
            <!-- </router-link> -->
        </mt-header>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1">七日内患者</mt-tab-item>
            <mt-tab-item id="2">本月患者</mt-tab-item>
            <mt-tab-item id="3" @click.native="moreStatus">更多</mt-tab-item>
        </mt-navbar>

        <mt-tab-container :active.sync="selected">
            <mt-tab-container-item id="1" v-show="selected == '1' || selected == '2' || selected == '3'">
                <div v-show="showSchedule">
                    <div v-for="month in months" style="text-align: left;">
                        <h3>{{month.themonth}}</h3>
                        <div class="scheduleStyle" v-for="day in month.days" @click="goRevisittkt(day)">
                            <span>{{day.theday}}</span>
                            <span>{{day.desc}}</span>
                        </div>
                    </div>
                </div>
                <div v-show="showSchedule == false" v-for="day in days" style="text-align: left;">
                    <div class="container-header" style="border-bottom: 1px dashed #ccc">
                        <h4>{{day.desc}}</h4>
                        <span style="line-height: 2.4">{{day.thedate}}</span>
                    </div>
                    <div v-for="revisittkt in day.revisittkts" style="margin: 20px 0px">
                        <table style="text-align: center; width:100%; border: 1px solid #ccc; border-collapse: collapse">
                            <tr>
                                <th width="30%">{{revisittkt.patient.name}}</th>
                                <th width="40%">{{revisittkt.patient.sexstr}}</th>
                                <th width="30%">{{revisittkt.patient.agestr}}</th>
                            </tr>
                            <tr>
                                <td colspan="3" style="text-align:left"><div>就诊卡号:&nbsp;&nbsp;&nbsp;{{revisittkt.patientcardno}}</div><div>期望解决的问题:&nbsp;&nbsp;&nbsp;{{revisittkt.patient_content}}</div></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-if="days.length == 0 && showSchedule == false" style="margin-top: 200px; margin-bottom: 20px;width: 100%;float: none">
                    <span style="padding: 10px;padding: 10px;background-color: #fcf8e3;float: none">无预约患者</span>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    import utils from '../../lib/utils.js'
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    import moment from 'moment'
    module.exports = {
        data: function() {
            return {
                showSchedule: false,
                openid: '',
                selected: '',
                days:[
                ],
                months:[
                ],
            }
        },
        created(){
            this.openid = localStorage.getItem('_openid_');
            this.selected = "1";
            this.getData(7);
        },
        methods: {
            getData: function(daysOffset) {
                var self = this;
                var fromdate = moment().format('YYYY-MM-DD');
                var todate = moment().add(daysOffset, 'days').format('YYYY-MM-DD');
                var url = api.get('appointment.list');
                var params = {
                    openid: this.openid,
                    fromdate: fromdate,
                    todate: todate,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.days = data.days;
                        // self.days = [];
                        // console.log(self.days);
                    }
                })
            },
            moreStatus: function() {
                this.showSchedule = true;
            },
            goRevisittkt: function(day){
                console.log(day);
                self = this;
                if (day.cnt == 0) {
                    return ;
                }
                self.showSchedule = false;
                var url = api.get('appointment.list');
                var params = {
                    openid: this.openid,
                    fromdate: day.thedate,
                    todate: day.thedate,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.days = data.days;
                    }
                })
            },
            clickNavbar: function() {
                console.log(this.selected);
                if (this.selected != 3) {
                    return ;
                }
                console.log('hahaha');
            }
        },
        watch: {
            'selected': function(newValue, oldValue){
                var self = this;
                console.log('newvalue:', newValue, '------oldvalue:', oldValue);
                if (newValue == 3) {
                    this.showSchedule = true;
                    var url = api.get('appointment.schedulelist');
                    var params = {
                        openid: this.openid,
                        frommonth: '',
                        tomonth: '',
                    }
                    common.post(url, params,function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            self.months = data.months;
                        }
                    })
                    return ;
                }else {
                    this.showSchedule = false;
                }
                var dayOffset = newValue == 1 ? 7 : 30;
                this.getData(dayOffset);
            }
        }
    }
</script>
<style scoped>
    h4 {
        border-left: 3px solid #0099ff;
        text-align: left;
        padding-left: 10px;
        display: inline-block;
        margin: 10px 0px;
    }
    .container-header {
        margin: 5px 0px;
    }
    .container-header span {
        color: #666;
        float: right;
    }
    table tr th {
        background-color: #caebf6;
        border:1px solid #ccc;
        padding: 5px;
        font-weight: normal;
    }
    table tr td {
        border: 1px solid #ccc;
        padding: 10px;
    }
    .scheduleStyle {
        border: 1px solid #ccc;
        display: inline-block;
        width: 25%;
        padding: 10px 5px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .scheduleStyle span {
        display: block;
        text-align: center;
    }
</style>
