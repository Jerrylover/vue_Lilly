<template>
    <app-header active='patient'></app-header>
    <div class="container-fluid content">
        <visit-header :patientname='patientname' :patientid='patientid' active='addvist'></visit-header>
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">添加就诊记录</h3>
                </div>
                <div class="panel-body form">
                    <div class="inner-addon right-addon">
                        <i class="fa fa-calendar-check-o fa-lg"></i>
                        <input class="form-group form-control" type="text" @click="showCalendar" v-model="value" placeholder="请输入日期">
                        <calendar :show.sync="show" :value.sync="value" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                    </div>
                    <div class="col-lg-2 col-sm-2 form-group" v-show="isShowTypeStr">
                        <select class="form-control" v-model="typestr">
                            <option value="门诊">门诊</option>
                            <option value="住院">住院</option>
                            <option value="出院">出院</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" @click="addVisit($event)">添加</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">就诊记录历史</h3>
                </div>
                <div class="panel-body">
                    <table class="table table-hover table-bordered fctable">
                        <thead>
                            <tr>
                                <th>就诊日期</th>
                                <th v-show="isShowTypeStr">类型</th>
                                <th>主诉</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="revisitrecord in revisitRecords">
                                <td class="col-lg-2 col-sm-2">{{revisitrecord.date}}</td>
                                <td v-show="isShowTypeStr">{{revisitrecord.typestr | formateTypeStr}}</td>
                                <td>{{revisitrecord.content}}</td>
                                <td>
                                    <a v-show="!revisitrecord.content" href="javascript:" @click="doDelete(revisitrecord, $event)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
.panel {
    margin-top: 20px;
}

.panel-title {
    font-weight: bold;
}

.input-group {
    width: 350px;
    float: left;
}

.form-control {
    width: 100%;
}


/*日历控件样式*/

.inner-addon {
    position: relative;
    float: left;
    width: 28%;
}


/* style icon */

.inner-addon .fa {
    position: absolute;
    padding: 10px;
    pointer-events: none;
    color: #008DB9;
}


/* align icon */

.left-addon .fa {
    left: 0px;
}

.right-addon .fa {
    right: 0px;
}


/* add padding  */

.left-addon input {
    padding-left: 30px;
}

.right-addon input {
    padding-right: 30px;
}


/***日历控件样式结束***/

button {
    float: left;
    margin-left: 50px;
}
</style>
<script>
import api from '../config/api.js'
import common from '../lib/common.js'
import libpatient from '../lib/patient.js'
module.exports = {
    data: function() {
        return {
            diseaseid: '',
            typestr: '门诊',
            patientname: '',
            patientid: '',
            revisitRecords: '',
            show: false,
            type: "date", //date datetime
            value: "",
            begin: "",
            x: 0,
            y: 0,
            range: false, //是否多选
        }
    },
    components: {
        'appHeader': require('../components/Header.vue'), //头组件
        'visitHeader': require('../components/VisitHeader.vue'),
        'appFooter': require('../components/Footer.vue'), //尾组件
        'calendar': function(resolve) {
            require(['../components/calendar.vue'], resolve);
        }
    },
    computed: {
        patientid: function() {
            return this.$route.params.patientid;
        },
        isShowTypeStr: function() {
            return this.diseaseid != 3;
        }
    },
    route: {
        data: function(transition) {
            this.fetchPatient();
            this.fetchData();
            this.diseaseid = common.getDiseaseId();
            transition.next();
        }
    },
    methods: {
        showCalendar: function(e) {
            var that = this;
            that.show = true;
            that.x = e.target.offsetLeft;
            that.y = e.target.offsetTop + e.target.offsetHeight + 8;
            var bindHide = function(event) {
                if (event.target == e.target) {
                    return;
                }
                event.stopPropagation();

                that.show = false;
                document.removeEventListener('click', bindHide, false);
                document.removeEventListener('touchstart', bindHide, false);
            };
            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
                document.addEventListener('touchstart', bindHide, false);
            }, 500);
        },
        addVisit: function(e) {
            e.preventDefault();
            var self = this;
            var util = require('../lib/util.js');
            $.ajax({
                url: api.get('revisitrecord.add'),
                type: 'post',
                dataType: 'json',
                data: {
                    date: this.value,
                    patientid: self.patientid,
                    typestr: self.typestr
                },
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    self.$dispatch('show-alert', d.errmsg);
                } else {
                    var path = '/checkuptpl/' + self.patientid + '/child/zhusu/主诉';
                    var diseaseid = libpatient.getDiseaseId(self.patientid);
                    if (common.isGastricCancer(diseaseid)) {
                        path = '/checkuptpl/' + self.patientid + '/child/zhusu1/主诉';
                    }
                    self.$route.router.go({
                        path: path,
                        query: {
                            date: self.value
                        }
                    })
                }
            })

        },
        fetchData: function() {
            var self = this;
            //获取
            $.ajax({
                url: api.get('revisitrecord.list'),
                type: 'post',
                dataType: 'json',
                data: {
                    patientid: self.patientid
                },
            }).done(function(d) {
                self.revisitRecords = d.data;
            })
        },
        fetchPatient: function() {
            var patientname = libpatient.getPatientName(this.patientid)
            if (patientname) {
                this.patientname = patientname
            } else {
                var self = this;
                $.ajax({
                    url: api.get('patient.baseinfo'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid
                    },
                }).done(function(d) {
                    self.patientname = d.data.name;
                    libpatient.setPatientName(self.patientid, self.patientname);
                })
            }
        },
        doDelete: function(revisitrecord, e) {
            e.preventDefault();
            var self = this;
            this.$dispatch('show-prompt', '确定要删除吗？', function(){
                $.ajax({
                    url: api.get('revisitrecord.delete'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        revisitrecordid: revisitrecord.revisitrecordid
                    },
                }).done(function(d) {
                    self.$dispatch('show-popup', '删除成功');
                    self.fetchData();
                })
            })
        }
    },
    filters: {
        formateTypeStr: function(value) {
            if (value == '') {
                return '门诊';
            }
            return value;
        }
    }
}
</script>
