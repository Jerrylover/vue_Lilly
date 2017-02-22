<template>
<app-header active="schedule-visit">
</app-header>
<div class="content">
<div class="row">
          <div class="col-md-6">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title" style="display:inline;">门诊日期表</h3>
                    <!-- <a href="javascript:" class="btn-add-ops fr" @click.prevent="addVisitTime">添加门诊时间</a> -->
                </div>
                <div class="panel-body">
                    <table class="table table-bordered fctable">
                        <thead>
                            <tr>
                                <td>星期</td>
                                <td>上午</td>
                                <td>下午</td>
                                <td>夜间</td>
                            </tr>
                            <thead>
                                <tbody>
                                    <tr v-for="one in scheduleTable">
                                        <td>
                                            {{one.weekday}}
                                        </td>
                                        <td>
                                            {{one.am}}
                                        </td>
                                        <td>
                                            {{one.pm}}
                                        </td>
                                        <td>
                                            {{one.night}}
                                        </td>
                                    </tr>
                                </tbody>
                    </table>
                    <!-- <table class="table table-striped table-bordered ">
                        <tr v-for="schedule in scheduleList">
                            <td>
                                <div class="row">
                                    <div class="col-sm-8">
                                        <span style="">{{schedule.tomorestr}}</span>
                                    </div>
                                    <div class="col-sm-4">
                                        <span :class="{'fr start-ops': schedule.status == 1, 'fr stop-ops': schedule.status != 1}" @click.prevent="clickOps($event, schedule)">
                                            <span class="ops-inner"></span>
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table> -->
                    <div style="text-align: center;">若要修改门诊时间，请联系运营人员</div>
                    <div class="showList" v-if="0">
                        <p class="clearfix" v-for="schedule in scheduleList">
                            <span class="fl">{{schedule.tomorestr}}</span>
                            <span :class="{'fr start-ops': schedule.status == 1, 'fr stop-ops': schedule.status != 1}" @click.prevent="clickOps($event, schedule)">
                            <span class="ops-inner"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6" v-show="showRightDiv">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">添加门诊</h3>
                </div>
                <div class="panel-body">
                    <div class="form-group">
                        <select class="form-control" id="op_hz" v-model="op_hz">
                          <option value="weekly">每周</option>
                          <option value="interval">隔周</option>
                          <option value="temp">临时</option>
                      </select>
                    </div>
                    <div class="form-group">
                        <label>门诊时段：</label>
                        <select class="form-control" id="day_part" v-model="day_part">
                          <option value="am">上午门诊</option>
                          <option value="pm">下午门诊</option>
                          <option value="all_day">全天门诊</option>
                          <option value="night">夜间门诊</option>
                      </select>
                    </div>
                    <div class="form-group">
                        <label>门诊类型：</label>
                        <select class="form-control" id="op_type" v-model="op_type">
                          <option value="normal">普通</option>
                          <option value="expert">专家</option>
                          <option value="special">特需</option>
                      </select>
                    </div>
                    <div class="form-group">
                        <label>选择最近的门诊出诊时间：</label>
                        <div :class="{'has-error has-feedback': iserror, 'has-feedback': !iserror}">
                            <input type="text" class="form-control op-time" id="op_date" @click="showCalendar" @change="error=false" v-model="value" placeholder="请输入日期" />
                            <span :class="{'no-error fa fa-calendar-check-o fa-lg form-control-feedback': !iserror, 'glyphicon glyphicon-remove form-control-feedback': iserror}"></span>
                            <calendar :show.sync="show" :value.sync="value" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>门诊位置：</label>
                        <input type="text" class="form-control" id="address" v-model="address" />
                    </div>
                    <span class="btn btn-primary" id="add_op" @click.prevent="save">保存</span>
                </div>
            </div>
        </div>
</div>
</div>
<app-footer></app-footer>
</template>
<style scoped>
.fa {
    padding: 10px;
    color: #008DB9;
}

.laydate_yms {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}

.laydate_bottom {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}

.laydate_ym {
    -webkit-box-sizing: initial;
    box-sizing: initial;
}

#laydate_box .laydate_y {
    margin-right: 4px;
}

.showList p:nth-child(odd) {
    background: #f5f5f5;
}

.showList p {
    height: 50px;
    line-height: 50px;
    margin: 0px;
    padding: 0px 10px;
}

.showList .btn {
    margin-top: 8px;
}

.stop-ops {
    height: 22px;
    width: 60px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 16px;
    background: #fff;
}

.stop-ops .ops-inner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 10px;
}

.start-ops {
    height: 22px;
    width: 60px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 16px;
    background: #5cc26f;
}

.start-ops .ops-inner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 10px;
    right: 0px;
}
</style>
<script>
import api from '../../config/api.js';
module.exports = {
    data: function() {
        return {
            error: false,
            scheduleList: [],
            scheduleTable: {},
            showRightDiv: false,
            //日历参数
            show: false,
            type: "date", //date datetime
            value: "", //日期
            begin: "",
            x: 0,
            y: 0,
            range: false, //是否多选
            //门诊相关参数
            op_hz: '',
            day_part: '',
            op_type: '',
            address: '',
        }
    },
    route: {
        data: function(transition) {
            this.fetchData();
            transition.next();
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'),
        'appFooter': require('../../components/Footer.vue'),
        'calendar': function(resolve) {
            require(['../../components/Calendar.vue'], resolve);
        }
    },
    computed: {
        iserror: function() {
            return !!this.error;
        }
    },
    methods: {
        showCalendar: function(e) {
            // e.stopPropagation();
            if (this.ismodify) {
                return;
            }
            var that = this;
            that.show = true;
            $(e.target).show();
            that.x = e.target.offsetLeft;
            that.y = e.target.offsetTop + e.target.offsetHeight + 8;
            var bindHide = function(event) {
                if (event.target == e.target) {
                    return;
                }
                event.stopPropagation();
                that.show = false;
                document.removeEventListener('click', bindHide, false);
            };
            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
            }, 500);
        },
        fetchData: function() {
            var that = this;
            $.ajax({
                url: api.get('schedule.list'),
                type: "POST",
                dataType: "json"
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {

                } else {
                    that.scheduleList = d.data.schedulelist;
                    that.scheduleTable = d.data.scheduletable;
                }
            })
        },
        addVisitTime: function(e) {
            this.showRightDiv = true;
        },
        clickOps: function(e, schedule) {
            var that = this;
            if (schedule.status == 1) { //start -> stop
                $.ajax({
                    url: api.get('schedule.closejson'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        doctorscheduleid: schedule.id
                    }
                }).done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                        that.$dispatch('show-alert', d.errmsg, function() {})
                    } else {
                        that.$dispatch('show-popup', '关闭门诊', function() {
                            // schedule.status = 0;
                            that.fetchData();
                        })
                    }
                })
            } else { //stop -> start
                $.ajax({
                    url: api.get('schedule.openjson'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        doctorscheduleid: schedule.id
                    }
                }).done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                        that.$dispatch('show-alert', d.errmsg, function() {})
                    } else {
                        that.$dispatch('show-popup', '打开门诊', function() {
                            // schedule.status = 1;
                            that.fetchData();
                        })
                    }
                })
            }
        },
        save: function(e) {
            var that = this;
            if (that.value == '') {
                that.error = true;
                return false;
            }
            $.ajax({
                url: api.get('schedule.addjson'),
                type: 'POST',
                dataType: 'json',
                data: {
                    op_date: that.value,
                    op_hz: that.op_hz,
                    day_part: that.day_part,
                    op_type: that.op_type,
                    address: that.address,
                }
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$dispatch('show-alert', d.errmsg, function() {})
                } else {
                    that.$dispatch('show-popup', '保存成功', function() {
                        that.op_hz = '';
                        that.day_part = '';
                        that.op_type = '';
                        that.address = '';
                        that.fetchData();
                    })
                }
            })
        }
    }
}
</script>
