<template>
<div class="container-fluid content">
    <!-- <navmenu></navmenu> -->
    <breadcrumb pagetitle="患者列表" >
        <div name="other-content">
        </div>
    </breadcrumb>
    <div class="page-content">
        <div class="row" style="margin:10px 0 0 0">
            <div class="col-sm-1 success" style="float:left;padding:0;line-height:2.5">
                <a v-privilege="'数据库-患者-添加'" class="a-new-patient btn btn-success btn-sm" href="javascript:"  @click="addPatient"><i class="fa fa-plus">&nbsp;新增患者</i></a>
            </div>
            <div class="col-sm-11" style="padding-right:0">
                <div class="col-sm-3" style="float:right;padding-right:0">
                    <div class="form-group">
                        <div class="input-group">
                            <input class="input-search form-inline form-control" type="text" placeholder="搜索患者姓名/手机号/病历号" v-model='patient_name' @keyup.prevent.enter='doSearch'>
                            <span class="input-group-btn" style="width: 1%;line-height:35px">
                                    <button class="btn btn-primary" type="submit" @click.prevent="doSearch">
                                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                                    </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div style="float:right;padding-left:15px;">
                    <select class="form-control" id="selectBindWx" v-model="filterDiseaseid" @change="diseaseIdChange">
                        <option value="0" disabled hidden>选择疾病</option>
                        <option value="-1">全部</option>
                        <option v-for="disease in diseases" :value="disease.diseaseid">{{disease.name}}</option>
                    </select>
                </div>
                <div style="float:right;padding-left:15px;">
                    <select class="form-control" id="selectBindWx" v-model="filterBindWx" @change="bindWxChange">
                        <option value="0" disabled hidden>选择绑定微信</option>
                        <option value="-1">全部</option>
                        <option value="1">已绑定</option>
                        <option value="2">未绑定</option>
                    </select>
                </div>
                <div style="float:right;padding-left:15px;">
                    <select class="form-control" id="selectGender" v-model="filterGender" @change="genderChange">
                        <option value="0" disabled hidden>选择性别</option>
                        <option value="-1">全部</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                    </select>
                </div>
                <div style="float:right;padding-left:15px;">
                    <select class="form-control" id="selectGender" v-model="filterTag" @change="tagChange">
                        <option value="0" disabled hidden>选择标签</option>
                        <option value="-1">全部</option>
                        <option v-for="patienttagtpl in patienttagtpllist" :value="patienttagtpl.id">{{patienttagtpl.name}}</option>
                    </select>
                </div>
            </div>
        </div>
        <table class="table table-bordered table-hover fctable mg-t-10">
            <thead>
                <tr>
                    <th>姓名</th>
                    <th>病历号</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>标签</th>
                    <th>备注</th>
                    <th>上次就诊时间</th>
                    <th width="20%">诊断</th>
                    <th v-if="diseaseCount > 1">疾病</th>
                    <th>绑定微信</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if='patients' v-for='(patient, index) in patients'>
                    <td><a class="scale" href="javascript:" @click="goPatient(index, $event)">{{patient.name}}</a></td>
                    <td>{{patient.out_case_no}}</td>
                    <td>{{patient.sex}}</td>
                    <td>{{patient.age}}</td>
                    <td>{{patient.patienttagstr}}</td>
                    <td>{{patient.remark_doctor}}</td>
                    <td>{{patient.last_revisitrecord_date}}</td>
                    <td>{{patient.complication}}</td>
                    <td v-if="diseaseCount > 1">{{patient.diseasename}}</td>
                    <td v-html="isbindwxdesc(patient.isbindwx)"></td>
                    <td>
                        <a v-privilege="'数据库-患者-添加就诊'" class="scale" style="margin-right:20px;" href="javascript:" @click='goVisit(index, $event)'>添加就诊</a>
                        <a class="scale" href="javascript:" @click='goRevisitRecords(index, $event)'>查看病历</a>
                    </td>
                </tr>
                <tr v-if="patients.length==0">
                    <td colspan="11" class='text-center'>暂无数据</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="text-center">
        <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/patient/list'></pagination>
    </div>
</div>
</template>
<style scoped>

.a-today-visit {
    margin: 5px 20px 10px 20px;
    float: right;
}

.form-group {
    margin-bottom: 0
}
.form-group .control-label{
    font-weight: normal;
}

table thead tr {
    background-color: #F5F6FA;
}

table thead th {
    border-bottom-width: 0;
    font-weight: normal;
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
            auditcnt: 0,
            filterTag: 0,
            filterGender: 0,
            filterBindWx: 0,
            filterDiseaseid: 0,

            patienttagtpllist: [],
        }
    },
    computed: {
        diseaseCount: function() {
            var diseases = common.getDiseases();
            if ($.isArray(diseases)) {
                return diseases.length;
            }

            return 0;
        },
        diseaseid: function() {
            return common.getDiseaseId();
        },
        diseases: function() {
            return common.getDiseases();
        }
    },
    components: {
        'pagination': require('../../components/Pagination.vue'), //翻页组件
        'breadcrumb': require('../../components/BreadCrumb.vue')
    },
    filters: {

    },
    methods: {
        fetchData: function() {
            var self = this;
            var queryStrings = this.$route.query;
            api.http({
              url: 'patient.list',
              data: queryStrings,
              successCallback: function(d) {
                  var data = d.data;
                  self.patients = data.list || [];
                  self.pagenum = data.page - '';
                  self.pagesize = data.pagesize - '';
                  self.total = data.total - '';
                  self.patient_name = data.patient_name;
                  self.auditcnt = data.auditcnt;
                  self.patienttagtpllist = data.patienttagtpllist;
              }
            })
        },
        isbindwxdesc: function(value) {
            var desc = '';
            if (value == 1) {
                desc = '<span style="color:green">已绑定</span>';
            } else if (value == 2) {
                desc = '<span class="text-danger">取消关注</span>';
            } else {
                desc = '未绑定';
            }
            return desc;
        },
        doSearch: function() {
            var query = {
                patient_name: this.patient_name
            }
            if (this.filterTag != -1 && this.filterTag != 0) {
                query.patienttagtplid = this.filterTag;
            }
            if (this.filterGender != -1 && this.filterGender != 0) {
                query.sex = this.filterGender;
            }
            if (this.filterBindWx != -1 && this.filterBindWx != 0) {
                query.isbindwx = this.filterBindWx
            }
            if (this.filterDiseaseid != -1 && this.filterDiseaseid != 0) {
                query.diseaseid = this.filterDiseaseid
            }
            this.$router.push({
                path: '/patient/list',
                query: query
            });
        },
        goPatient: function(index, e) {
            var diseaseId = common.getDiseaseId();
            e.preventDefault();
            var patient = this.patients[index];
            libpatient.setPatientName(patient.patient_id, patient.name);
            libpatient.setDisease(patient.patient_id,  patient.diseaseid, patient.diseasename);
            localStorage.setItem('_diseaseid_', patient.diseaseid);
            if (typeof patient != 'undefined') {
                if (common.isCancerDisease(diseaseId)) {
                    this.$router.push({
                        path: '/patient/' + patient.patient_id + '/baseinfo-lungcancer/'
                    });

                }else {
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
            localStorage.setItem('_diseaseid_', patient.diseaseid);
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
            localStorage.setItem('_diseaseid_', patient.diseaseid);
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
            }else{
                this.$router.push({
                    path: '/patient/new',
                })
            }
        },
        clickLabel: function(e, path) {
            e.preventDefault();
            this.$router.push({
                path:'/patient/' + path,
            });
        },
        initPage: function() {
            var query = this.$route.query
            this.patient_name = query.patient_name || ''
            this.filterGender = query.sex || 0
            this.filterBindWx = query.isbindwx || 0
            this.filterDiseaseid = query.diseaseid || 0
            this.filterTag = query.patienttagtplid || 0
            this.fetchData()
        },
        genderChange: function() {
            console.log(this.filterGender);
            // return ;
            this.doSearch()
        },
        tagChange: function() {
            this.doSearch();
        },
        bindWxChange: function() {
            this.doSearch()
        },
        diseaseIdChange: function() {
            this.doSearch()
        }
    },
    mounted: function() {
    },
    created: function() {
        this.initPage();
        Bus.$emit('make-menu-mini', '患者', '患者列表')
    },
    watch: {
        $route () {
            this.initPage();
        }
    }
}
</script>
