<template>
    <app-header active='schedule-revisit'></app-header>
    <div class="container-fluid  content">
        <div class="row" style="margin: 0px">
            <div class="col-sm-7" style="">
                <table class="table table-bordered">
                    <tr>
                        <td colspan="7" style="text-align: left">
                            <div class="col-lg-1" style="display: inline;width: 20px; line-height: 1.8">
                                <img style="" src="../../assets/candaler.png">
                            </div>
                            <div class="col-lg-10" style="display: inline">
                                <span style="font-size: 20px">门诊日期</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">
                            <div class="col-lg-2 col-sm-6" style="padding-left:0;">
                                <select class="form-control" v-model="year" @change="changeTheDate('year')">
                                    <option value="2018">2018年</option>
                                    <option value="2017">2017年</option>
                                    <option value="2016">2016年</option>
                                </select>
                            </div>
                            <div class="col-lg-4 col-sm-6" style="padding-left:0;">
                                <div class="row" style="margin-left:0;margin-right:0;">
                                    <a class="col-sm-3 btn btn-default" href="javascript:" style="font-size: px;" @click="changeTheMonth('-')">&lt;</a>
                                    <select class="col-sm-6 form-control" style="width: 50%" v-model="month" @change="changeTheDate('month')">
                                        <option v-for="n in 12" :value="n | handleSelectMonthValue">{{n | handleSelectMonthValue}}月</option>
                                    </select>
                                    <a class="col-sm-3 btn btn-default" href="javascript:" style="font-size: px;" @click="changeTheMonth('+')">&gt;</a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12 text-left btn-quickly" style="padding-left:0">
                                <a class="btn btn-default" href="javascript:" @click="shortcutChangeTheDate(0)">今天</a>
                                <a class="btn btn-default" href="javascript:" @click="shortcutChangeTheDate(1)">一个月</a>
                                <a class="btn btn-default" href="javascript:" @click="shortcutChangeTheDate(3)">三个月</a>
                                <a class="btn btn-default" href="javascript:" @click="shortcutChangeTheDate(6)">半年</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>星期一</td>
                        <td>星期二</td>
                        <td>星期三</td>
                        <td>星期四</td>
                        <td>星期五</td>
                        <td>星期六</td>
                        <td>星期日</td>
                    </tr>
                    <tr v-for="row in getrows">
                        <td v-for="col in 7" :class="{'over': schedules[row*7 + col].over =='over', 'selected':schedules[row*7 + col].selected == true}" :style="{color: schedules[row*7+col].bgtype, cursor: pointer(row, col)}" @click="clickDate(row, col)">
                            <div :style="{color: schedules[row*7 + col].bgdate}">{{schedules[row*7+col].date | handleDate row col}}</div>
                            <div :style="{color: schedules[row*7 + col].bgtype}">{{schedules[row*7+col].tagstr}}</div>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="lasttimeselectindex != -1" class="col-sm-5" style="padding: 10px; border: 1px solid #ccc">
                <div v-show="!revisittkts">
                    <span>无预约</span>
                </div>
                <div v-for="revisittkt in revisittkts" class="row" style="margin: 0px 0px 15px 0px; padding: 10px;border: 1px solid #ccc">
                    <div class="row" style="margin: 0px">
                        <div class="col-sm-12" style="padding: 0px">
                            <span style="color: #5b93ef">患者:&nbsp;&nbsp;&nbsp;{{revisittkt.patient_name}}</span>
                        </div>
                    </div>
                    <div class="row" style="margin: 0px">
                        <div class="col-sm-1" style="background:url('../../assets/item.png') no-repeat;height:35px;background-position:0 14px; padding: 0px; width: 17px;"></div>
                        <div class="col-sm-11" style="padding: 0px; line-height: 2.6; margin-left: 5px">
                            <span>复诊日期:&nbsp;&nbsp;&nbsp;{{revisittkt.thedate}}</span>
                        </div>
                    </div>
                    <div class="row" style="margin: 0px">
                        <div class="col-sm-12" style="padding: 0px">
                            <span>检查项目:&nbsp;&nbsp;&nbsp;</span>
                            <span v-for="checkuptpl in revisittkt.checkuptpls" style="display: inline-block; color: #5b93ef">{{checkuptpl}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
    @media (max-width: 1170px) { .btn-quickly{margin-top:10px;}}
    .selected {
        background-color: #cee8ff;
    }
    .table tr td  {
        text-align: center;
    }
</style>
<script>
    import api from '../../config/api.js';
    import util from '../../lib/util.js';
    module.exports = {
        data: function() {
            return {

                year: 2016,
                month: '01',
                theyear: 2016,
                themonth: '01',
                schedules: '',
                revisittkts: '',

                lasttimeselectindex: -1,
            }
        },
        route: {
            data: function() {
                var self = this;
                $.ajax({
                    url: api.get('schedule.appointmentcanlendar'),
                    type: 'POST',
                    dataType: 'json',
                    data: {

                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.schedules = data.schedules;
                        self.year = data.themonth.substring(0, data.themonth.indexOf('-'));
                        self.theyear = self.year;
                        self.month = data.themonth.substring(data.themonth.indexOf('-')+1, data.themonth.length);
                        self.themonth = self.month;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
        },
        computed: {
            getrows: function() {
                var self = this;
                if (util.isArray(self.schedules) && self.schedules.length > 0) {
                    return Math.ceil(self.schedules.length/7);
                }else {
                    return 0;
                }
            },
        },
        methods: {
            shortcutChangeTheDate: function(increment) {
                var self = this;
                var month = Number(self.themonth) + increment;
                if (Number(month)%12 == 0) {
                    self.year =Number(self.theyear) + Math.floor(month/12) -1;
                }else {
                    self.year =Number(self.theyear) + Math.floor(month/12);
                }
                self.month = month%12 == 0 ? 12 : month%12;
                if (self.month < 10 && self.month > 0) {
                    self.month = '0' + self.month;
                }
                console.log(self.year, '1111', self.month);
                $.ajax({
                    url: api.get('schedule.appointmentcanlendar'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        themonth: self.year + '-' + self.month,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.schedules = data.schedules;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            pointer: function(row, col) {
                if (this.schedules[row*7+col].tagstr.trim() != '') {
                    return "pointer";
                }else {
                    return "";
                }
            },
            changeTheDate: function(str) {
                var self = this;
                if (str.trim() == 'year') {
                    self.month = "01";
                }
                $.ajax({
                    url: api.get('schedule.appointmentcanlendar'),
                    type: "POST",
                    dataType: 'json',
                    data: {
                        themonth: self.year + '-' + self.month,
                    }
                }).done(function(response){
                    if (response.errno != undefined && response.errno == 0) {
                        var data = response.data;
                        self.schedules = data.schedules;
                    }
                })
            },
            changeTheMonth: function(str) {
                if (str.trim() == '+') {
                    if (this.month < 12) {
                        this.month++;
                        this.changeTheDate('month');
                    }
                }else {
                    if (this.month > 1) {
                        this.month--;
                        this.changeTheDate('month');
                    }
                }
            },
            clickDate: function(row, col) {
                var self = this;
                var currentselectindex = row*7 + col;
                if(this.lasttimeselectindex != -1){
                    this.schedules[this.lasttimeselectindex].selected = false;
                }
                if (this.schedules[currentselectindex].tagstr.trim() != '') {
                    this.schedules[currentselectindex].selected = true;
                    this.schedules.$set(currentselectindex, this.schedules[currentselectindex]);
                    this.lasttimeselectindex = currentselectindex;

                    $.ajax({
                        url: api.get('schedule.revisittktlist'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            scheduleid: self.schedules[currentselectindex].scheduleid,
                        }
                    }).done(function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            self.revisittkts = data.revisittkts;
                        }else{
                            self.$dispatch('show-alert', response.errmsg);
                        }
                    })
                }
            },
        },
        filters: {
            handleDate: function(value, row, col) {
                var result = value;
                if (result.substring(0,1).trim() == "0") {
                    result = result.substring(1);
                }
                if (result.substring(0,2).trim() == "1") {
                    result = this.schedules[row*7 + col].month + "月1日";
                }
                return result;
            },
            handleSelectMonthValue: function(value) {
                if (value < 9) {
                    return '0' + (value+1);
                }else {
                    return value+1;
                }
            }
        }
    }
</script>
