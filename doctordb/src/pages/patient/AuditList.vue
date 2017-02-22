<template>
<app-header active='patient'>
</app-header>
<div class="container-fluid content">
    <div class="row table-header" style="border-bottom:1px solid #ccc;">
        <h4>患者列表</h4>
        <div class="segmented-control a-new-patient col-sm-3" style="border:1px solid #ccc;padding:0">
            <input type='radio' id="patient-list" />
            <label for="patient-list" @click="clickLabel($event, 'list')">患者列表</label>
            <input type='radio' id="patient-auditlist" />
            <label for="patient-auditlist" :class="{active1: pathname == 'patient-auditlist'}" @click="clickLabel($event, 'auditlist')">待审列表 <span v-show="auditcnt > 0" class="badge" style="background-color:#DE5F5F">{{auditcnt}}</span></label>
        </div>
        <a v-privilege.literal="数据库-患者-添加" class="a-new-patient btn btn-default btn-sm" href="javascript:" class="btn btn-primary" @click="addPatient"><i class="fa fa-plus">&nbsp;新增患者</i></a>
        <div class="form-group" v-if="0">
            <div class="input-group">
                <input class="input-search form-inline form-control" type="text" placeholder="搜索患者姓名/手机号/病历号" v-model='patient_name' @keyup.enter='doSearch($event)'>
                <span class="input-group-btn" style="width: 1%;">
                        <button class="btn btn-primary" type="submit" @click="doSearch($event)">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                </button>
                </span>
            </div>
        </div>
        <a class="a-today-visit btn btn-default btn-sm collapse" href="javascript:" class="btn btn-primary">今日就诊</a>
    </div>
    <div class="row" style="margin-top:20px;">
        <table class="table table-bordered table-hover fctable">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>病历号</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>首发时间</th>
                    <th>病程</th>
                    <th>上次就诊时间</th>
                    <th width="20%">诊断</th>
                    <th v-if="diseaseCount > 1">疾病</th>
                    <th>绑定微信</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if='patients' v-for='patient in patients' :class="{gray: patient.doctor_audit_status == 2}">
                    <td><a class="scale" href="javascript:" @click="goPatient($index, $event)">{{patient.name}}</a></td>
                    <td>{{patient.out_case_no}}</td>
                    <td>{{patient.sex}}</td>
                    <td>{{patient.age}}</td>
                    <td>{{patient.first_happen_date}}</td>
                    <td>{{patient.bingcheng}}</td>
                    <td>{{patient.last_revisitrecord_date}}</td>
                    <td>{{patient.complication}}</td>
                    <td v-if="diseaseCount > 1">{{patient.diseasename}}</td>
                    <td>{{{patient.isbindwx | isbindwxdesc}}}</td>
                    <td>{{{patient.doctor_audit_status | filterStatus}}}</td>
                    <td>
                        <a class="scale" href="javascript:" @click='auditPass($event, patient)' style="margin-right:20px;">通过</a>
                        <a class="scale" v-show="patient.doctor_audit_status != 2" href="javascript:" @click='auditRefuse($event, patient)'>拒绝</a>
                    </td>
                </tr>
                <tr v-if="patients.length==0">
                    <td colspan="11" class='text-center'>暂无数据</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="row">
        <div class="col-md-12 text-center">
            <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/patient/auditlist'></pagination>
        </div>
    </div>
</div>
<app-footer></app-footer>
</template>
<style scoped>
h4 {
    float: left;
    padding-left: 10px;
    border-left: 3px solid #008db9;
}

.a-new-patient {
    margin: 5px 0 10px 20px;
    float: left;
}

.a-today-visit {
    margin: 5px 20px 10px 20px;
    float: right;
}

.input-group {
    float: right;
    width: 30%;
    margin-top: 3px;
}

.form-group {
    margin-bottom: 0;
}

table thead tr {
    background-color: #F5F6FA;
}

table thead th {
    border-bottom-width: 0;
    font-weight: normal;
}

tr.gray {
    background-color: #eee;
}
</style>
<script>
import common from '../../lib/common.js';
import api from '../../config/api.js';
import libpatient from '../../lib/patient.js'
module.exports = {
    data: function() {
        return {
            patients: '',
            pagenum: 1,
            pagesize: 20,
            total: 0,
            patient_name: '', //搜索词
            pathname: '',
            auditcnt: 0,
        }
    },
    computed: {
        diseaseCount: function() {
            var diseases = common.getDiseases();
            if ($.isArray(diseases)) {
                return diseases.length;
            }

            return 0;
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'pagination': require('../../components/Pagination.vue'), //翻页组件
    },
    filters: {
        isbindwxdesc: function(value) {
            var desc = '';
            if (value == 1) {
                desc = '<span style="color:green">已绑定</span>';
            } else {
                desc = '未绑定';
            }
            return desc;
        },
        filterStatus: function(status) {
            if (status == 0) {
                return '待审核';
            } else if (status == 2) {
                return '已拒绝';
            }
            return '未知';
        }
    },
    route: {
        data: function(transition) {
            this.pathname = transition.to.name;
            this.fetchData();
            transition.next();
        }
    },
    methods: {
        fetchData: function(data) {
            var self = this;
            var queryStrings = this.$route.query;
            queryStrings.type = 'audit';
            $.ajax({
                url: api.get('patient.list'),
                type: 'post',
                dataType: 'json',
                data: queryStrings,
            }).done(function(d) {
                var data = d.data;
                self.patients = data.list;
                self.pagenum = data.page;
                self.pagesize = data.pagesize;
                self.total = data.total;
                self.patient_name = data.patient_name;
                self.auditcnt = data.auditcnt;
            })
        },
        doSearch: function(e) {
            e.preventDefault();
            this.$route.router.go({
                path: '/patient/list',
                query: {
                    'patient_name': this.patient_name
                }
            });
        },
        goPatient: function(index, e) {
            var diseaseId = common.getDiseaseId();
            e.preventDefault();
            var patient = this.patients[index];
            libpatient.setPatientName(patient.patient_id, patient.name);
            libpatient.setDiseaseid(patient.patient_id, patient.diseaseid);
            if (typeof patient != 'undefined') {
                if (common.isCancerDisease(diseaseId)) {
                    this.$route.router.go({
                        path: '/patient/' + patient.patient_id + '/baseinfo-lungcancer/'
                    });

                } else {
                    this.$route.router.go({
                        path: '/patient/' + patient.patient_id + '/baseinfo/'
                    })
                }
            }
        },
        goRevisitRecords: function(index, e) {
            e.preventDefault();
            var patient = this.patients[index];
            libpatient.setPatientName(patient.patient_id, patient.name);
            libpatient.setDiseaseid(patient.patient_id, patient.diseaseid);
            if (typeof patient != 'undefined') {
                this.$route.router.go({
                    path: '/patient/' + patient.patient_id + '/revisitrecords/'
                })
            }
        },
        goVisit: function(index, e) {
            e.preventDefault();
            var patient = this.patients[index];
            libpatient.setPatientName(patient.patient_id, patient.name);
            libpatient.setDiseaseid(patient.patient_id, patient.diseaseid);
            if (typeof patient != 'undefined') {
                this.$route.router.go({
                    path: '/addvisit/' + patient.patient_id
                })
            }
        },
        addPatient: function() {
            var diseaseId = common.getDiseaseId();
            if (common.isCancerDisease(diseaseId)) {
                this.$route.router.go({
                    path: '/patient/new-lungcancer',
                })
            } else {
                this.$route.router.go({
                    path: '/patient/new',
                })
            }
        },
        clickLabel: function(e, path) {
            e.preventDefault();
            this.$route.router.go({
                path: '/patient/' + path,
            });
        },
        auditPass: function(e, patient) {
            var that = this;
            this.$dispatch('show-prompt', '确定要审核通过吗？', function() {
                $.ajax({
                    url: api.get('patient.auditpass'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        patientid: patient.patient_id
                    }
                }).done(function(d) {
                    that.$dispatch('show-popup', '操作成功');
                    that.fetchData();
                })
            })

        },
        auditRefuse: function(e, patient) {
            var that = this;
            this.$dispatch('show-prompt', '确定要审核拒绝吗？', function() {
                $.ajax({
                    url: api.get('patient.auditrefuse'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        patientid: patient.patient_id
                    }
                }).done(function(d) {
                    that.$dispatch('show-popup', '操作成功');
                    that.fetchData();
                })
            });
        }
    }
}
</script>
