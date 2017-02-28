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
                <li><router-link  href="javascript:"  :to="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</router-link></li>
                <li><router-link  href="javascript:"  :to="{name: 'doctorgroup-centerlist', params:{'projectid': projectid}}" style="text-decoration: none">中心列表</router-link></li>
                <li><router-link  href="javascript:"  :to="{name: 'doctorgroup-centerdetail', params: {'projectid': projectid, 'centerid': centerid}}" style="text-decoration: none">中心详情</router-link></li>
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
            <thead>
            <tr class="light-tr">
                <th class="col-sm-1">选择</th>
                <th>患者姓名</th>
                <th>状态</th>
                <!-- <th>操作</th> -->
            </tr>
            </thead>
            <tbody>
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
            </tbody>
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
    export default {
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
                    this.$set(this.patientlist, i, this.patientlist[i])
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
                self.$router.push({
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
                api.http({
                  url: 'doctorgroup.dg_patientimportpost',
                  data: {
                      dg_projectid: self.projectid,
                      dg_centerid: self.centerid,
                      patientids: self.patientids,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.$message({
                          type: 'success',
                          message: '导入成功',
                          duration: 1500,
                          onClose: function() {
                              self.selectallstatus = false;
                              self.fetchData();
                          }
                      })
                  }
                })
            },
            removeone: function(patient) {
                var self = this;
                self.patientids = [],
                self.patientids.push(patient.id);
                api.http({
                  url: 'doctorgroup.dg_patientremovepost',
                  data: {
                      dg_projectid: self.projectid,
                      dg_centerid: self.centerid,
                      patientids: self.patientids,
                  },
                  successCallback: function(d) {
                      self.$message({
                          type: 'success',
                          message: '导出成功',
                          duration: 1500,
                          onClose: function() {
                              self.selectallstatus = false;
                              self.fetchData();
                          }
                      })
                  }
                })
            },
            importall: function() {
                var self = this;
                this.patientids = [];
                this.$confirm("确定将所选患者全部导入吗？", '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    for (var i = 0; i < self.patientlist.length; i++) {
                        if (self.patientlist[i].selectstatus == true) {
                            self.patientids.push(self.patientlist[i].id);
                        }
                    }
                    api.http({
                      url: 'doctorgroup.dg_patientimportpost',
                      data: {
                          dg_projectid: self.projectid,
                          dg_centerid: self.centerid,
                          patientids: self.patientids,
                      },
                      successCallback: function(d) {
                          self.$message({
                              type: 'success',
                              message: '导入成功',
                              duration: 1500,
                              onClose: function() {
                                  self.selectallstatus = false;
                                  self.fetchData();
                              }
                          })
                      }
                    })
                }).catch(() => {

                })
            },
            removeall: function() {
                var self = this;
                this.patientids = [];
                this.$confirm("确定将所选患者全部导出吗？", '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    for (var i = 0; i < self.patientlist.length; i++) {
                        if(self.patientlist[i].selectstatus == true) {
                            self.patientids.push(self.patientlist[i].id);
                        }
                    }
                    api.http({
                      url: 'doctorgroup.dg_patientremovepost',
                      data: {
                          dg_projectid: self.projectid,
                          dg_centerid: self.centerid,
                          patientids: self.patientids,
                      },
                      successCallback: function(d) {
                          self.$message({
                              type: 'success',
                              message: '导出成功',
                              duration: 1500,
                              onClose: function() {
                                  self.selectallstatus = false;
                                  self.fetchData();
                              }
                          })
                      }
                    })
                }).catch(() => {

                })
            },
            fetchData: function() {
                var self = this;
                api.http({
                  url: 'doctorgroup.dg_patientimportpatients',
                  data: {
                      dg_projectid: self.projectid,
                      diseaseid: self.diseaseid,
                      type: self.type,
                      pagenum: self.pagenum,
                      pagesize: self.pagesize,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.total = data.total - '';
                      self.patientlist = data.patients;
                      self.diseases = data.diseases;
                      self.initselectattr();
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
                this.$set(this.patientlist, index, patient)

            },
            initPage: function() {
                var self = this;
                var query = this.$route.query
                var params = this.$route.params
                self.diseaseid = query.diseaseid;
                self.projectid = params.projectid;
                self.centerid = params.centerid;
                self.currentdisease = self.diseaseid;
                self.pagenum = query.pagenum || 1;
                self.path = '/doctorgroup/' + self.projectid + '/project/' + self.centerid + '/importpatients';
                self.fetchData();
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
