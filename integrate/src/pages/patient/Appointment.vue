<template>
    <div class="container-fluid content">
        <breadcrumb  pagetitle="约复诊">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content" style="margin-top:5px;">
            <div class="col-sm-6" style="padding-left:0">
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
                            <div class="col-lg-2 col-sm-4" style="padding-left:0">
                                <select class="form-control" v-model="year" @change="changeTheDate('year')">
                                    <option value="2018">2018年</option>
                                    <option value="2017">2017年</option>
                                    <option value="2016">2016年</option>
                                </select>
                            </div>
                            <div class="col-lg-4 col-sm-8">
                                <div class="row">
                                    <a class="col-sm-3 btn btn-default" href="javascript:" style="" @click="changeTheMonth('-')">&lt;</a>
                                    <select class="col-sm-6 form-control" style="width: 50%" v-model="month" @change="changeTheDate('month')">
                                        <option v-for="n in 12" :value="handleSelectMonthValue(n)">{{handleSelectMonthValue(n)}}月</option>
                                    </select>
                                    <a class="col-sm-3 btn btn-default" href="javascript:" style="" @click="changeTheMonth('+')">&gt;</a>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12 text-left btn-quickly">
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
            <div class="col-sm-6" style="border: 1px solid #ccc;padding:10px;">
                <!-- <div class="row" style="margin: 10px 0px 10px 0px">
                    <span style="font-size: 18px">患者:&nbsp;&nbsp;&nbsp;{{patientname}}</span>
                </div> -->
                <div class="row" style="border-bottom: 1px solid #ccc; margin: 0;padding-bottom:10px;font-size: 18px">
                    <a href="javascript:" :class="{'currentactive': currentactive=='thistime'}" style="text-decoration: none; margin-right: 15px" @click="clickthistime">本次预约</a>
                    <a href="javascript:" :class="{'currentactive': currentactive=='history'}" style="text-decoration: none" @click="clickhistory">已预约</a>
                </div>
                <div v-show="currentactive == 'thistime'">
                    <div class="row" style="border: 1px solid #ccc; margin: 10px 0px 0px 0px; padding: 10px">
                        <div class="col-sm-2" style="width:17px">
                            <img src="../../assets/item.png">
                        </div>
                        <div class="col-sm-10">
                            <span>复诊日期:&nbsp;&nbsp;&nbsp;{{revisitdate}}</span>
                        </div>
                    </div>
                    <div class="row" style="border: 1px solid #ccc;margin: 10px 0px 30px 0px; padding: 10px">
                        <div class="row" style="margin: 0px">
                            <div class="col-sm-2" style="width:17px">
                                <img src="../../assets/item.png">
                            </div>
                            <div class="col-sm-2">
                                <span>复诊项目</span>
                            </div>
                        </div>
                        <div class="row" style="margin: 15px 0px 40px 0px">
                            <div v-for="(checkuptpl, index) in checkuptpls_alltkt" class="col-sm-4" style="padding: 5px 15px 5px 15px">
                                <div class="checkbox checkbox-inline checkbox-info">
                                <input :id="'checkuptpl' + index" type="checkbox" :value="checkuptpl.id" v-model="checkuptplids_selectedtkt">
                                <label :for="'checkuptpl'+ index" style="font-size: 16px; cursor: pointer;line-height:1.1">{{checkuptpl.title}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin: 0px 0px 20px 15%">
                            <button class="btn btn-primary" @click="saveAppointment">保存并发送给患者</button>
                            <button class="btn btn-default" @click="removeAllCheckbox">重置</button>
                        </div>
                    </div>
                </div>
                <div v-show="currentactive == 'history'">
                    <div v-for="revisittkt in revisittkt_historys" class="row">
                        <div class="row" style="margin: 0px 0px 5px 0px">
                            <div class="col-lg-2" style="width:17px">
                                <img src="../../assets/item.png">
                            </div>
                            <div class="col-sm-10">
                                <span style="font-size: 16px">复诊日期:&nbsp;&nbsp;&nbsp;{{revisittkt.thedate}}</span>
                            </div>
                        </div>
                        <div class="row" style="margin: 0px 0px 40px 0px; padding: 0px 0px 0px 15px">
                            <span style="font-size: 16px">检查项目:&nbsp;&nbsp;&nbsp;</span>
                            <span v-for="title in revisittkt.titles" style="color: #5b93ef; font-size: 16px">{{title}}&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@media (max-width: 1170px) { .btn-quickly{margin-top:10px;padding-left:0}}
h4 {
    float: left;
    padding-left: 10px;
    border-left: 3px solid #008db9;
}
.table tr td  {
    text-align: center;
    cursor: pointer;
}
.over:hover {
    background-color: #cee8ff;
}
.selected {
    background-color: #cee8ff;
}
.currentactive {
    border-bottom: 3px solid #4893ef;
    padding-bottom: 1px;
}
</style>
<script>
    import api from '../../config/api.js';
    import util from '../../lib/util.js';
    import libpatient from '../../lib/patient.js'
    export default {
        data: function() {
            return {
                year: '2016',
                month: '1',
                theyear: '',
                themonth: '',
                currentactive: 'thistime',
                revisitdate: '',
                revisittktid: '',
                lasttimeselectindex: -1,
                schedules: [],
                checkuptpls_alltkt: [],
                checkuptplids_selectedtkt: [],
                revisittkt_historys: [],
            }
        },
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
        },
        computed: {
            patientid: function() {
                return this.$route.params.patientid || ''
            },
            patientname: function() {
                return libpatient.getPatientName(this.patientid) || ''
            },
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
            fetchData: function() {
                var self = this
                api.http({
                  url: 'patient.addormodifyappointment',
                  data: {
                    patientid: self.patientid,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.year = data.baseinfo.year;
                      self.month = data.baseinfo.month;
                      self.theyear = data.baseinfo.year_today;
                      self.themonth = data.baseinfo.month_today;
                      self.schedules = data.schedules;
                      if (self.schedules != undefined && self.schedules.length > 0) {
                          for (var i = 0; i < self.schedules.length; i++) {
                              if (self.schedules[i].bgcolor != '') {
                                  self.lasttimeselectindex = i;
                                  self.schedules[i].selected = true;
                                  self.$set(self.schedules, self.lasttimeselectindex, self.schedules[self.lasttimeselectindex])
                              }
                          }
                      }
                      self.checkuptpls_alltkt = data.checkuptpls_alltkt;
                      self.revisittkt_historys = data.revisittkt_historys;
                      if (data.checkuptplids_selectedtkt != undefined) {
                          self.checkuptplids_selectedtkt = data.checkuptplids_selectedtkt;
                      }
                      if (data.revisittkt_valid != undefined ) {
                          self.revisitdate = data.revisittkt_valid.thedate;
                          self.revisittktid = data.revisittkt_valid.id;
                      }
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
            pointer: function(row, col) {
                row = row - 1
                col = col - 1
                if (this.schedules[row*7+col] == undefined) {
                    return ''
                }
                if (this.schedules[row*7+col].tdpointer.trim() == 'tdpointer') {
                    return "pointer";
                }else {
                    return "";
                }
            },
            clickDate: function(row, col) {
                var schedule = this.getSchedule(row, col)
                if (!schedule) {
                    return ''
                }
                var currentselectindex = (row - 1) * 7 + col - 1
                if ($.trim(schedule.over) == '' || this.lasttimeselectindex == currentselectindex) {
                    return ;
                }
                if(this.lasttimeselectindex != -1){
                    this.schedules[this.lasttimeselectindex].selected = false
                }
                schedule.selected = true
                this.revisitdate = schedule.thedate;
                this.lasttimeselectindex = currentselectindex;
                // this.$set(this.schedules, currentselectindex, schedule)
            },
            clickthistime: function() {
                this.currentactive = 'thistime';
            },
            clickhistory: function() {
                this.currentactive = 'history';
            },
            changeTheDate: function(str) {
                var self = this;
                if (str.trim() == 'year') {
                    self.month = "01";
                }
                api.http({
                  url: 'patient.addormodifyappointment',
                  data: {
                      patientid: self.patientid,
                      themonth: self.year + '-' + self.month,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.year = data.baseinfo.year;
                      self.month = data.baseinfo.month;
                      self.schedules = data.schedules;
                      if (data.revisittkt_valid != undefined) {
                          self.revisitdate = data.revisittkt_valid.thedate;
                          self.revisittktid = data.revisittkt_valid.id;
                      }
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
                  url: 'patient.addormodifyappointment',
                  data: {
                      patientid: self.patientid,
                      themonth: self.year + '-' + self.month,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.year = data.baseinfo.year;
                      self.month = data.baseinfo.month;
                      self.schedules = data.schedules;
                      if (data.revisittkt_valid != undefined) {
                          self.revisitdate = data.revisittkt_valid.thedate;
                          self.revisittktid = data.revisittkt_valid.id;
                      }
                  }
                })
            },
            saveAppointment: function() {
                var self = this;
                self.checkuptplids_selectedtkt = this.checkPostData();
                if ($.trim(self.revisitdate) == '') {
                    self.$message({
                      type: 'error',
                      duration: 1500,
                      showClose: true,
                      message: '请选择预约日期!'
                    });
                    return ;
                }
                api.http({
                  url: 'patient.addormodifyappointmentjson',
                  data: {
                      patientid: self.patientid,
                      revisittktid: self.revisittktid || '',
                      thedate: self.revisitdate || '',
                      checkuptplids: self.checkuptplids_selectedtkt,
                  },
                  successCallback: function(d) {
                      console.log('.............', d)
                      self.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '保存成功!'
                      });
                      api.http({
                        url: 'patient.addormodifyappointment',
                        data: {
                            patientid: self.patientid,
                        },
                        successCallback: function(d) {
                            var data = d.data;
                            self.year = data.baseinfo.year;
                            self.month = data.baseinfo.month;
                            self.theyear = data.baseinfo.year_today;
                            self.themonth = data.baseinfo.month_today
                            self.schedules = data.schedules;
                            self.checkuptpls_alltkt = data.checkuptpls_alltkt;
                            self.checkuptplids_selectedtkt = data.checkuptplids_selectedtkt;
                            self.revisittkt_historys = data.revisittkt_historys;
                            if (self.schedules != undefined && self.schedules.length > 0) {
                                for (var i = 0; i < self.schedules.length; i++) {
                                    if (self.schedules[i].bgcolor != '') {
                                        self.lasttimeselectindex = i;
                                        self.schedules[i].selected = true;
                                        self.$set(self.schedules, self.lasttimeselectindex, self.schedules[self.lasttimeselectindex])
                                    }
                                }
                            }
                            if (data.revisittkt_valid != undefined ) {
                                self.revisitdate = data.revisittkt_valid.thedate;
                                self.revisittktid = data.revisittkt_valid.id;
                            }
                        }
                      })
                  }
                })
            },
            removeAllCheckbox: function() {
                this.checkuptplids_selectedtkt = [];
            },
            checkPostData: function() {
                var resultArr= [];
                for (var value of this.checkuptplids_selectedtkt) {
                    var flag = false;
                    for (var j = 0; j < this.checkuptpls_alltkt.length; j++) {
                        if (value == this.checkuptpls_alltkt[j].id) {
                            resultArr.push(value);
                            break;
                        }
                    }
                }
                return resultArr;
            },
            clickBack: function() {
                window.history.go(-1);
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
        },
        filters: {
        },
        created: function() {
            this.fetchData()
            Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '患者复诊')
        },
        watch: {
            '$route': function() {
                this.fetchData()
                Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '患者复诊')
            }
        }
    }
</script>
