
<template>
<div class="container-fluid content">
    <breadcrumb pagetitle="待审核患者列表" >
        <div name="other-content">
        </div>
    </breadcrumb>
    <div class="page-content">
        <div>
            <div class="form-group" style="float:left;width:50%">
                <div class="input-group">
                    <input class="input-search form-inline form-control" type="text" placeholder="搜索患者姓名/手机号/病历号" v-model='patient_name' @keyup.enter='doSearch($event)'>
                    <span class="input-group-btn" style="width: 1%;line-height:35px">
                            <button class="btn btn-primary" type="submit" @click="doSearch($event)">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </button>
                    </span>
                </div>
            </div>
            <a v-privilege="'数据库-患者-添加'" class="a-new-patient btn btn-primary btn-sm" href="javascript:"  @click="addPatient"><i class="fa fa-plus">&nbsp;新增患者</i></a>
        </div>
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
                <tr v-if='patients' v-for='(patient, index) in patients' :class="{gray: patient.doctor_audit_status == 2}">
                    <td><a class="scale" href="javascript:" @click="goPatient(index, $event)">{{patient.name}}</a></td>
                    <td>{{patient.out_case_no}}</td>
                    <td>{{patient.sex}}</td>
                    <td>{{patient.age}}</td>
                    <td>{{patient.first_happen_date}}</td>
                    <td>{{patient.bingcheng}}</td>
                    <td>{{patient.last_revisitrecord_date}}</td>
                    <td>{{patient.complication}}</td>
                    <td v-if="diseaseCount > 1">{{patient.diseasename}}</td>
                    <td v-html="isbindwxdesc(patient.isbindwx)"></td>
                    <td>{{patient.doctor_audit_status | filterStatus}}</td>
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
        <div class="text-center">
            <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/patient/auditlist'></pagination>
        </div>
</div>
</div>
</template>
<style scoped>

.a-new-patient {
    margin: 2px 0 10px 20px;
    float: left;
}

.a-today-visit {
    margin: 5px 20px 10px 20px;
    float: right;
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
export default {
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
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    filters: {
        filterStatus: function(status) {
            if (status == 0) {
                return '待审核';
            } else if (status == 2) {
                return '已拒绝';
            }
            return '未知';
        }
    },
    methods: {
        isbindwxdesc: function(value) {
            var desc = '';
            if (value == 1) {
                desc = '<span style="color:green">已绑定</span>';
            } else {
                desc = '未绑定';
            }
            return desc;
        },
        fetchData: function(data) {
            var self = this;
            var queryStrings = this.$route.query;
            queryStrings.type = 'audit';
            api.http({
              url: 'patient.list',
              data: queryStrings,
              successCallback: function(d) {
                  var data = d.data;
                  self.patients = data.list;
                  self.pagenum = data.page - '';
                  self.pagesize = data.pagesize - '';
                  self.total = data.total - '';
                  self.patient_name = data.patient_name;
                  self.auditcnt = data.auditcnt - '';
              }
            })
        },
        doSearch: function(e) {
            e.preventDefault();
            this.$router.push({
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
            libpatient.setDisease(patient.patient_id,  patient.diseaseid, patient.diseasename);
            if (typeof patient != 'undefined') {
                if (common.isCancerDisease(diseaseId)) {
                    this.$router.push({
                        path: '/patient/' + patient.patient_id + '/baseinfo-lungcancer/'
                    });

                } else {
                    this.$router.push({
                        path: '/patient/' + patient.patient_id + '/baseinfo/'
                    })
                }
            }
        },
        goRevisitRecords: function(index, e) {
            e.preventDefault();
            var patient = this.patients[index];
            libpatient.setPatientName(patient.patient_id, patient.name);
            libpatient.setDisease(patient.patient_id,  patient.diseaseid, patient.diseasename);
            if (typeof patient != 'undefined') {
                this.$router.push({
                    path: '/patient/' + patient.patient_id + '/revisitrecords/'
                })
            }
        },
        goVisit: function(index, e) {
            e.preventDefault();
            var patient = this.patients[index];
            libpatient.setPatientName(patient.patient_id, patient.name);
            libpatient.setDisease(patient.patient_id,  patient.diseaseid, patient.diseasename);
            if (typeof patient != 'undefined') {
                this.$router.push({
                    path: '/addvisit/' + patient.patient_id
                })
            }
        },
        addPatient: function() {
            var diseaseId = common.getDiseaseId();
            if (common.isCancerDisease(diseaseId)) {
                this.$router.push({
                    path: '/patient/new-lungcancer',
                })
            } else {
                this.$router.push({
                    path: '/patient/new',
                })
            }
        },
        clickLabel: function(e, path) {
            e.preventDefault();
            this.$router.push({
                path: '/patient/' + path,
            });
        },
        auditPass: function(e, patient) {
            var that = this;
            this.$confirm("确定要审核通过吗？", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                api.http({
                  url: 'patient.auditpass',
                  data: {
                      patientid: patient.patient_id
                  },
                  successCallback: function(d) {
                      that.$message({
                          type: 'success',
                          showClose: true,
                          duration: 1500,
                          message: '操作成功'
                      })
                      that.fetchData();
                  }
                })
            }).catch(() => {

            });
        },
        auditRefuse: function(e, patient) {
            var that = this;
            this.$confirm("确定要审核通过吗？", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                api.http({
                  url: 'patient.auditrefuse',
                  data: {
                      patientid: patient.patient_id
                  },
                  successCallback: function(d) {
                      that.$message({
                          type: 'success',
                          showClose: true,
                          duration: 1500,
                          message: '审核成功'
                      })
                      that.fetchData();
                  }
                })
            }).catch(() => {

            })
        }
    },
    created: function() {
        this.pathname = this.$route.name;
        this.fetchData();
        Bus.$emit('make-menu-mini')
    },
    watch: {
        '$route': function(to, from) {
            this.pathname = to.name;
            this.fetchData();
            Bus.$emit('make-menu-mini')
        }
    }
}
</script>
