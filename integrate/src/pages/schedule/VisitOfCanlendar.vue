<template>
    <div class="container-fluid content">
        <breadcrumb pagetitle="复诊日历">
            <div name="other-content">
            </div>
        </breadcrumb>
        <div class="page-content" style="">
            <div class="col-sm-7" style="padding-left:0">
                <table class="table table-bordered">
                    <tbody>
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
                                        <option v-for="n in 12" :value="handleSelectMonthValue(n)">{{handleSelectMonthValue(n)}}月</option>
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
                        <td v-for="col in 7" :class="getTdClass(row, col)" :style="getTdStyle(row, col)" @click="clickDate(row, col)">
                            <div :style="getDivStyle(row, col, 'bgdate')">{{handleDate(row, col)}}</div>
                            <div :style="getDivStyle(row, col, 'bgtype')">{{getTagstr(row, col)}}</div>
                        </td>
                    </tr>
                </tbody>
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
                        <div class="col-sm-12" style="padding: 0px; line-height: 2.6;">
                            <span>复诊日期:&nbsp;&nbsp;&nbsp;{{revisittkt.thedate}}</span>
                        </div>
                    </div>
                    <div class="row" style="margin: 0px">
                        <div class="col-sm-12" style="padding: 0px; line-height: 2.6;">
                            <span>检查项目:&nbsp;&nbsp;&nbsp;</span>
                            <span v-for="checkuptpl in revisittkt.checkuptpls" style="display: inline-block; color: #5b93ef">{{checkuptpl}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    @media (max-width: 1170px) { .btn-quickly{margin-top:10px;}}
    .selected {
        background-color: #cee8ff;
    }
    .table tr td  {
        text-align: center;
        cursor: pointer;
    }
</style>
<script>
    import api from '../../config/api.js';
    import util from '../../lib/util.js';
    export default {
        name: 'revisit',
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
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
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
                api.http({
                  url: 'schedule.appointmentcanlendar',
                  data: {
                    themonth: self.year + '-' + self.month,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.schedules = data.schedules;
                  }
                })
            },
            pointer: function(row, col) {
                row = row - 1
                col = col - 1
                if (this.schedules[row*7+col] == undefined) {
                    return ''
                }
                if (this.schedules[row*7+col].tagstr.trim() != '') {
                    return "pointer";
                } else {
                    return "";
                }
            },
            changeTheDate: function(str) {
                var self = this;
                if (str.trim() == 'year') {
                    self.month = "01";
                }
                api.http({
                  url: 'schedule.appointmentcanlendar',
                  data: {
                    themonth: self.year + '-' + self.month,
                  },
                  successCallback: function(d) {
                      self.schedules = d.data.schedules;
                  }
                })
            },
            changeTheMonth: function(str) {
                var month = Number(this.month)
                if (str.trim() == '+') {
                    if (month < 12) {
                        month = month + 1
                        this.month = this.handleSelectMonthValue(month)
                        this.$nextTick(function() {
                            console.log('month is ', this.month)
                        })
                        this.changeTheDate('month');
                    }
                } else {
                    if (month > 1) {
                        month = month - 1
                        this.month = this.handleSelectMonthValue(month)
                        this.changeTheDate('month');
                    }
                }
            },
            clickDate: function(row, col) {
                row = row - 1
                col = col - 1
                var self = this;
                var currentselectindex = row*7 + col;
                if(this.lasttimeselectindex != -1){
                    this.schedules[this.lasttimeselectindex].selected = false;
                }
                if (this.schedules[currentselectindex].tagstr.trim() != '') {
                    this.schedules[currentselectindex].selected = true;
                    this.$set(this.schedules, currentselectindex, this.schedules[currentselectindex])
                    this.lasttimeselectindex = currentselectindex > -1 ? currentselectindex : 0;

                    api.http({
                      url: 'schedule.revisittktlist',
                      data: {
                        scheduleid: self.schedules[currentselectindex].scheduleid,
                      },
                      successCallback: function(d) {
                          var data = d.data;
                          self.revisittkts = data.revisittkts;
                      }
                    })
                }
            },
            fetchData: function() {
                var self = this;
                api.http({
                  url: 'schedule.appointmentcanlendar',
                  data: {
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.schedules = data.schedules;
                      self.year = data.themonth.substring(0, data.themonth.indexOf('-'));
                      self.theyear = self.year;
                      self.month = data.themonth.substring(data.themonth.indexOf('-')+1, data.themonth.length);
                      self.themonth = self.month;
                  }
                })
            },
            handleSelectMonthValue: function(value) {
                if (value < 10) {
                    return '0' + value;
                }else {
                    return value;
                }
            },
            handleDate: function(row, col) {
                var schedule = this.getSchedule(row, col)
                if (!schedule) {
                    return ''
                }
                var result = schedule.date;
                if (result.substring(0,1).trim() == "0") {
                    result = result.substring(1);
                }
                if (result.substring(0,2).trim() == "1") {
                    result = schedule.month + "月1日";
                }
                return result;
            },
            getSchedule(row, col) {
                row = row - 1
                col = col - 1
                // console.log('row-col', row, col)
                var index = row * 7 + col
                var schedule = this.schedules[index] || ''
                if (!schedule) {
                    return ''
                }
                return schedule
            },
            getTdClass: function(row, col) {
                var schedule = this.getSchedule(row, col)
                if (!schedule) {
                    return ''
                }
                var _class = ''
                if (schedule.selected == true) {
                    _class = 'selected'
                } else if (schedule.over == 'over') {
                    _class = 'over'
                }
                return _class
            },
            getTdStyle: function(row, col) {
                var schedule = this.getSchedule(row, col)
                if (!schedule) {
                    return ''
                }
                var style = 'color: '+ schedule.bgtype +';cursor: ' + this.pointer(row, col)
            },
            getDivStyle: function(row, col, type) {
                var schedule = this.getSchedule(row, col)
                if (!schedule) {
                    return ''
                }
                return 'color: ' + schedule[type]
            },
            getTagstr: function(row, col) {
                var schedule = this.getSchedule(row, col)
                if (!schedule) {
                    return ''
                }
                return schedule.tagstr
            }

        },
        filters: {

        },
        created: function() {
            this.fetchData()
            Bus.$emit('make-menu-mini')
        },
        watch: {
            '$route': function(to, from) {
                this.fetchData()
            }
        }
    }
</script>
