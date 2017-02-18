<template>
    <div>
    <app-header active = 'doctorgroup'></app-header>
    <div class="container-fluid content">
        <div class="row">
            <div style="float: left; margin-right: 30px">
                <h4><strong>批量患者导入</strong></h4>
            </div>
            <div style="padding: 0px;float: left; margin-right: 30px">
                <select class="form-control" v-model="currentdisease">
                    <option v-for="disease in diseases" :value="disease.id">{{disease.name}}</option>
                </select>
            </div>
            <div style="float: left; margin-right: 30px">
                <div class="checkbox checkbox-inline checkbox-info">
                    <input id="hasimport" type="checkbox" name="" v-model="status1">
                    <label for="hasimport">已导入</label>
                </div>
                <div class="checkbox checkbox-inline checkbox-info" style="margin-right: 30px">
                    <input id="noimport" type="checkbox" name="" v-model="status2">
                    <label for="noimport">未导入</label>
                </div>
                <a href="javascript:" class="btn btn-primary btn-sm" @click="dosearch">搜索</a>
            </div>
        </div>
        <div class="row" style="border-bottom: 1px solid #ccc">
            <ol class="breadcrumb" style="margin: 0">
                <li>返回</li>
                <li><router-link href="javascript:" to="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</router-link></li>
                <li><router-link href="javascript:" to="{name: 'doctorgroup-centerlist', params:{'projectid': projectid}}" style="text-decoration: none">中心列表</router-link></li>
                <li><router-link href="javascript:" to="{name: 'doctorgroup-centerdetail', params: {'projectid': projectid, 'centerid': centerid}}" style="text-decoration: none">中心详情</router-link></li>
            </ol>
        </div>
        <div class="row" style="margin-top: 20px">
            <div class="checkbox checkbox-inline checkbox-info" style="display: inline-block; margin-right: 30px">
                <input id="all" type="checkbox" name="" @change='selectallpatient' v-model="selectallstatus">
                <label for="all">全选</label>
            </div>
            <a href="javascript:" class="btn btn-info btn-sm" @click="importall">批量导入</a>
            <a href="javascript:" class="btn btn-danger btn-sm" @click="removeall">批量删除</a>
        </div>
        <div class="row mg-t-10">
        <table class="table table-bordered table-striped">
            <tr class="light-tr">
                <th class="col-sm-1">选择</th>
                <th>患者姓名</th>
                <th>状态</th>
                <!-- <th>操作</th> -->
            </tr>
            <tr v-for="(patient, index) in patientlist" @click="setselectstatus(patient, index)">
                <td>
                    <div class="checkbox checkbox-inline checkbox-info">
                        <input type="checkbox" name="" v-model="patient.selectstatus">
                        <label></label>
                    </div>
                </td>
                <td>{{patient.name}}</td>
                <td>{{patient.import_status | filterimportstatus}}</td>
            </tr>
            <tr v-if="patientlist.length == 0">
                <td style="text-align: center" colspan="4">暂无数据</td>
            </tr>
        </table>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center">
                <pagination :cur="pagenum" :pagesize="pagesize" :total="total" :path='path'></pagination>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
</div>
</template>
<style scoped>
    h4 {
        display: inline-block;
        border-left: 3px solid #008db9;
        padding-left: 10px;
    }
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                path:'',
                pagenum: 1,
                pagesize: 100,
                total: 200,
                type: 0,
                status1: '',
                status2: '',
                patientids: [],
                currentdisease: '',
                diseases: [],
                diseaseid: '',
                projectid: '',
                centerid: '',
                selectallstatus: false,
                patientlist: [],
            }
        },
        route: {
            data: function(transition) {
                var self = this;
                self.diseaseid = transition.to.query.diseaseid;
                self.projectid = transition.to.params.projectid;
                self.centerid = transition.to.params.centerid;
                self.currentdisease = self.diseaseid;
                self.pagenum = transition.to.query.pagenum || 1;
                self.path = '/doctorgroup/' + self.projectid + '/project/' + self.centerid + '/importpatients';
                self.fetchData();
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'pagination': require('../../components/Pagination.vue'),
        },
        methods: {
            selectallpatient: function() {
                console.log(this.selectallstatus);
                for (var i = 0; i < this.patientlist.length; i++) {
                    this.patientlist[i].selectstatus = this.selectallstatus;
                    this.patientlist[i] = Object.assign({}, this.patientlist[i]);
                    Vue.set(this.patientlist, i, this.patientlist[i])
                }
            },
            dosearch: function() {
                var self = this;
                if (this.status1 == true && this.status2 == false) {
                    self.type = 1;
                }else if (this.status1 == false && this.status2 == true) {
                    self.type = 2;
                }else {
                    self.type = 0;
                }
                console.log('1111111111111111');
                console.log(self.currentdisease);
                self.$route.router.push({
                    name: 'doctorgroup-importpatients',
                    query: {
                        'diseaseid': self.currentdisease,
                        'type': self.type,
                    }
                })
            },
            importone: function(patient) {
                var self = this;
                self.patientids = [],
                self.patientids.push(patient.id);
                $.ajax({
                    url: api.get('doctorgroup.dg_patientimportpost'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        dg_centerid: self.centerid,
                        patientids: self.patientids,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.$emit('show-popup', "导入成功", function(){
                            self.selectallstatus = false;
                            self.fetchData();
                        })
                    } else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            removeone: function(patient) {
                var self = this;
                self.patientids = [],
                self.patientids.push(patient.id);
                $.ajax({
                    url: api.get('doctorgroup.dg_patientremovepost'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        dg_centerid: self.centerid,
                        patientids: self.patientids,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.$emit('show-popup', '导出成功', function(){
                            self.selectallstatus = false;
                            self.fetchData();
                        })
                    }else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            importall: function() {
                var self = this;
                this.patientids = [];
                self.$emit('show-prompt',"确定将所选患者全部导入吗？", function(){
                    for (var i = 0; i < self.patientlist.length; i++) {
                        if (self.patientlist[i].selectstatus == true) {
                            self.patientids.push(self.patientlist[i].id);
                        }
                    }
                    $.ajax({
                        url: api.get('doctorgroup.dg_patientimportpost'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            dg_projectid: self.projectid,
                            dg_centerid: self.centerid,
                            patientids: self.patientids,
                        }
                    }).done(function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            self.$emit('show-popup', '导入成功', function(){
                                self.selectallstatus = false;
                                self.fetchData();
                            })
                        }else {
                            self.$emit('show-alert', response.errmsg);
                        }
                    })
                }, function(){ return ;});
            },
            removeall: function() {
                var self = this;
                this.patientids = [];
                self.$emit('show-prompt',"确定将所选患者全部导出吗？", function(){
                    for (var i = 0; i < self.patientlist.length; i++) {
                        if(self.patientlist[i].selectstatus == true) {
                            self.patientids.push(self.patientlist[i].id);
                        }
                    }
                    $.ajax({
                        url: api.get('doctorgroup.dg_patientremovepost'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            dg_projectid: self.projectid,
                            dg_centerid: self.centerid,
                            patientids: self.patientids,
                        }
                    }).done(function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            self.$emit('show-popup', '导出成功', function(){
                                self.selectallstatus = false;
                                self.fetchData();
                            })
                        }else {
                            self.$emit('show-alert', response.errmsg);
                        }
                    })
                }, function(){ return ;});
            },
            fetchData: function() {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_patientimportpatients'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        diseaseid: self.diseaseid,
                        type: self.type,
                        pagenum: self.pagenum,
                        pagesize: self.pagesize,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.total = data.total;
                        self.patientlist = data.patients;
                        self.diseases = data.diseases;
                        self.initselectattr();
                    } else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            initselectattr: function() {
                for (var i = 0; i < this.patientlist.length; i++) {
                    this.patientlist[i].selectstatus = false;
                }
            },
            setselectstatus: function(patient, index){
                patient.selectstatus = !patient.selectstatus;
                patient = Object.assign({}, patient);
                Vue.set(this.patientlist, index, patient)

            }
        },
        filters: {
            filterimportstatus: function(value) {
                if (value == 1) {
                    return '已导入';
                } else if (value == 2) {
                    return '未导入';
                }
            }
        }
    }
</script>
