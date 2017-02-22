<template>
    <div>
    <app-header active = 'doctorgroup'></app-header>
    <div class="container-fluid content">
        <div class="row" style="border-bottom: 1px solid #ccc">
            <div class="row" style="margin: 0px">
            <div style="padding-left: 0px;float: left; margin-right: 30px">
                <h4>患者列表</h4>
            </div>
            <div class="input-group" style="padding-left: 0px; float: right; width: 30%;">
                <input class="form-control" type="text" name="" placeholder="搜索患者姓名/手机号/病历号" v-model="keyword" @keyup.enter="dosearch">
                <span class="input-group-btn" style="background-color: ">
                    <button class="btn btn-primary" @click="dosearch">
                        <i class="glyphicon glyphicon-search" aria-hidden="true"></i>
                    </button>
                </span>
            </div>
            <div style="padding-left: 0px;float: right;margin-right: 10px">
                 <select class="form-control" v-model='currentdoctorid' @change="changedoctor">
                     <option v-for="doctor in doctorlist" :value="doctor.doctorid">{{doctor.doctorname}}</option>
                 </select>
            </div>
            <div style="padding-left: 0px;float: right;margin-right: 10px">
                 <select class="form-control" v-model="currentcenterid" @change='changecenter'>
                     <option v-for="center in centerlist" :value="center.id">{{center.title}}</option>
                 </select>
            </div>
            <div style="padding-left: 0px;float: right;margin-right: 10px">
                 <select class="form-control" v-model="currentprojectid" @change="changeproject">
                     <option v-for="project in projectlist" :value="project.id">{{project.title}}</option>
                 </select>
            </div>
            </div>
            <ol class="breadcrumb" style="margin: 0">
                <li>返回</li>
                <li><router-link :to="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</router-link></li>
                <li><router-link :to="{name: 'doctorgroup-centerlist', params:{'projectid': currentprojectid}}" style="text-decoration: none">中心列表</router-link></li>
                <li><router-link :to="{name: 'doctorgroup-centerdetail', params: {'projectid': currentprojectid, 'centerid': currentcenterid}}" style="text-decoration: none">中心详情</router-link></li>
            </ol>
        </div>
        <div class="row">
        <table class="table table-bordered mg-t-20">
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
                <th>疾病</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(patient, index) in patients">
                <td><a class="scale" href="javascript:" @click="goPatient(index, $event)">{{patient.name}}</a></td>
                <td>{{patient.out_case_no}}</td>
                <td>{{patient.sex}}</td>
                <td>{{patient.age}}</td>
                <td>{{patient.first_happen_date}}</td>
                <td>{{patient.bingcheng}}</td>
                <td>{{patient.last_revisitrecord_date}}</td>
                <td>{{patient.complication}}</td>
                <td>{{patient.diseasename}}</td>
                <td>
                    <a class="scale" href="javascript:" @click='goRevisitRecords(index, $event)'>查看病历</a>
                </td>
            </tr>
            <tr v-if="patients.length == 0">
                <td colspan="11" style="text-align: center">暂无数据</td>
            </tr>
            </tbody>
        </table>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/doctorgroup/patientlist'></pagination>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
    </div>
</template>
<style scoped>
    h4 {
        display: inline-block;
        padding-left: 10px;
        border-left: 3px solid #008db9;
    }
    table tr th {
        font-weight: normal;
    }
    table tr th{
        background-color: #F5F6FA;
    }
</style>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    import libpatient from '../../lib/patient.js'
    export default {
        data: function() {
            return {
                pagenum: 1,
                pagesize: 10,
                total: 100,
                keyword: '',

                currentprojectid: '',
                currentcenterid: '',
                currentdoctorid: '',
                projectlist:[],
                currentprojectid: '',
                centerlist: [],
                doctorlist: [],
                patients: [],
            }
        },
        route: {
            data: function(transition) {

            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'pagination': require('../../components/Pagination.vue'),

        },
        methods: {
            fetchData: function() {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_patientlist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.currentprojectid,
                        dg_centerid: self.currentcenterid,
                        doctorid: self.currentdoctorid,
                        pagenum: self.pagenum,
                        keyword: self.keyword,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.pagenum = data.pagenum - '';
                        self.pagesize = data.pagesize - '';
                        self.total = data.total - '';
                        self.projectlist = data.projectlist;
                        self.centerlist = data.centerlist;
                        self.doctorlist = data.doctorlist;
                        self.patients = data.dg_patients;
                        self.currentcenterid = data.selected.dg_centerid;
                        self.currentdoctorid = data.selected.doctorid;
                    } else {
                        self.$message({
                            type: 'error',
                            message: response.errmsg
                        })
                    }
                })
            },
            changeproject: function(e) {
                var self = this;
                var index = e.target.selectedIndex;
                if (index < 0) {
                    index = 0
                }
                var projectid = ''
                if (self.projectlist.length > 0) {
                    projectid = self.projectlist[index].id || ''
                }
                this.$router.push({
                    name: 'doctorgroup-patientlist',
                    query: {
                        projectid: projectid,
                    }
                })
            },
            changecenter: function(e) {
                var self = this;
                var index = e.target.selectedIndex;
                if (index < 0) {
                    index = 0
                }
                var centerid = ''
                if (self.centerlist.length > 0) {
                    centerid = self.centerlist[index].id || ''
                }
                this.$router.push({
                    name: 'doctorgroup-patientlist',
                    query: {
                        projectid: self.currentprojectid,
                        centerid: centerid,
                    }
                })
            },
            changedoctor: function(e) {
                var self = this;
                var index = e.target.selectedIndex;
                if (index < 0) {
                    index = 0
                }
                var doctorid = ''
                if (self.doctorlist.length > 0) {
                    doctorid = self.doctorlist[index].doctorid || ''
                }
                this.$router.push({
                    name: 'doctorgroup-patientlist',
                    query: {
                        projectid: self.currentprojectid,
                        centerid: self.currentcenterid,
                        doctorid: doctorid,
                    }
                })
            },
            dosearch: function(e) {
                e.preventDefault();
                var query = Object.assign({}, this.$route.query)
                query.keyword = this.keyword
                this.$router.push({
                    name: 'doctorgroup-patientlist',
                    query: query,
                })
            },
            goRevisitRecords: function(index, e) {
                e.preventDefault();
                var self = this;
                var patient = this.patients[index];
                libpatient.setPatientName(patient.patient_id, patient.name);
                libpatient.setDiseaseid(patient.patient_id, patient.diseaseid);
                if (typeof patient != 'undefined') {
                    this.$router.push({
                        path: '/doctorgroup/' + patient.patient_id + '/revisitinfo/',
                        query: {
                            doctorid: patient.doctorid,
                            projectid: self.currentprojectid,
                            centerid: self.currentcenterid,
                        }
                    })
                }
            },
            goPatient: function(index, e) {
                var self = this;
                var diseaseId = common.getDiseaseId();
                e.preventDefault();
                var patient = this.patients[index];
                libpatient.setPatientName(patient.patient_id, patient.name);
                libpatient.setDiseaseid(patient.patient_id, patient.diseaseid);
                if (typeof patient != 'undefined') {
                    if (common.isCancerDisease(diseaseId)) {
                        this.$router.push({
                            path: '/doctorgroup/' + patient.patient_id + '/patientbaseinfo-lungcancer/',
                            query: {
                                projectid: self.currentprojectid,
                                centerid: self.currentcenterid,
                                doctorid: self.currentdoctorid,
                            }
                        });

                    }else {
                        this.$router.push({
                            path: '/doctorgroup/' + patient.patient_id + '/patientbaseinfo/',
                            query: {
                                projectid: self.currentprojectid,
                                centerid: self.currentcenterid,
                                doctorid: self.currentdoctorid,
                            }
                        })
                    }
                }
            },
            initPage: function() {
                var queryString = this.$route.query;
                console.log('----queryString', queryString)
                this.currentprojectid = queryString.projectid || '';
                this.currentcenterid = queryString.centerid || '';
                this.currentdoctorid = queryString.doctorid || '';
                this.pagenum = queryString.pagenum || 1;
                this.keyword = queryString.keyword || '';
                this.fetchData();
            }
        },
        created: function() {
            this.initPage()
        },
        watch: {
            '$route': function() {
                this.initPage()
            }
        }

    }
</script>
