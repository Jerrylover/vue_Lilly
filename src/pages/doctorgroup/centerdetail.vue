<template>
    <div>
    <app-header active='doctorgroup'></app-header>
    <div class="container-fluid content">
        <div class="row" style="border-bottom: 1px solid #ccc; padding-bottom: 0px">
            <div style="padding-left: 0px; display: inline-block; margin-right: 20px">
                <h4>{{dg_center.title}}</h4>
            </div>
            <div style="display: inline-block;">
                <select class="form-control" v-model="currcenterid" @change="changeCenter">
                    <option v-for="center in dg_centers" :value="center.id">{{center.title}}</option>
                </select>
            </div>
            <div style="display: inline-block;">
                <a v-dg-privilege="dg_project.id + '-1 |' + currcenterid +'-1'" href="javascript:" class="btn btn-info" style="margin-left: 15px; margin-right: 10px" @click="addmember"><i class="fa fa-plus fa">&nbsp;添加医生</i></a>
                <router-link  v-dg-privilege="dg_project.id + '-2 |' + currcenterid + '-x'" href="javascript:" class="btn btn-warning"  :to="{name: 'doctorgroup-importpatients',query:{'diseaseid': getDiseaseid()}}" ><i class="fa fa-sign-in fa">&nbsp;批量导入患者</i></router-link>
            </div>
            <ol class="breadcrumb" style="margin: 5px 0px 0px 0px">
                <li>返回</li>
                <li><router-link  class="scale" href="javascript:"  :to="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</router-link></li>
                <li><router-link  class="scale" href="javascript:"  :to="{name: 'doctorgroup-centerlist', params:{'projectid': projectid}}" style="text-decoration: none">中心列表</router-link></li>
            </ol>
        </div>
        <div class="row" style="margin-top:10px">
            <div class="well">
                <p>项目名称:&nbsp;&nbsp;&nbsp;{{dg_project.title}}</p>
                <div v-show="currcenterid != 0">
                    <p>中心名称:&nbsp;&nbsp;&nbsp;{{dg_center.title}}</p>
                    <p>中心目标:&nbsp;&nbsp;&nbsp;{{dg_center.content}}</p>
                    <p>中心负责人:&nbsp;&nbsp;&nbsp;{{dg_center.members | filterCenterMaster}}</p>
                </div>
            </div>
        </div>
        <div class="row">
        <table class="table table-bordered">
            <tr class="light-tr">
                <th>医生Id</th>
                <th>医生名称</th>
                <th>所在中心</th>
                <th>患者数</th>
                <th>操作</th>
            </tr>
            <tr v-for="member in dg_center.members">
                <td>{{member.doctorid}}</td>
                <td>{{member.name}}</td>
                <td>{{member.center_name}}</td>
                <td class="linkstyle"><router-link  class="scale" v-dg-privilege="projectid + '-1 | ' + member.center_id + '-x | clearlink'" href="javascript:"  :to="{name: 'doctorgroup-patientlist', query: {'projectid': projectid, 'centerid': currcenterid, 'doctorid': member.doctorid}}">{{member.patientcnt}}</router-link></td>
                <td class="linkstyle">
                    <router-link  class="scale" v-dg-privilege="projectid + '-1 | ' + member.center_id + '-x'" href="javascript:"  :to="{name: 'doctorgroup-patientlist', query: {'projectid': projectid, 'centerid': currcenterid, 'doctorid': member.doctorid}}" style="padding: 5px; text-decoration: none">查看患者</router-link>
                    <template v-if="is_create == 1">
                        <a class="scale" v-if="member.is_project_master == 0"  href="javascript:" style="padding: 5px; text-decoration: none" @click="setprojectmaster(member)">设置为项目负责人</a>
                        <a class="scale" v-if="member.is_project_master == 1 && member.is_create == 0" href="javascript:" @click="removeprojectmaster(member)">取消项目负责人权限</a>
                    </template>
                    <div v-dg-privilege="projectid + '-1'" style="display: inline-block">
                        <a class="scale" v-if="member.is_center_master == 0" href="javascript:" style="padding: 5px; text-decoration: none" @click="setcentermaster(member)">设置为中心负责人</a>
                        <a class="scale" v-if="member.is_center_master == 1" href="javascript:" @click="removecentermaster(member)">取消中心负责人权限</a>
                    </div>
                </td>
            </tr>
            <tr v-if="dg_center.members.length == 0">
                <td colspan="5" style="text-align: center">
                    <span>暂无数据</span>
                </td>
            </tr>
        </table>
    </div>
        <modal :show="showModal" :showheader="false" width="500px">
            <div slot="body">
                <div class="form-horizontal">
                <div class="form-group " style="margin-top: 20px">
                    <span class="col-sm-3 control-label">医生姓名:</span>
                    <div class="col-sm-7">
                        <input class="form-control" type="text" name="doctorname" v-model="doctornameForSearch" @click="clearsearchresult">
                    </div>
                </div>
                <div class="form-group">
                    <span class="col-sm-3 control-label">医生电话:</span>
                    <div class="col-sm-7">
                        <input class="form-control" type="text" name="doctormobile" v-model="doctormobileForSearch" @click="clearsearchresult">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-7 col-sm-offset-3">
                        <a class="btn btn-primary col-sm-12" href="javascript:" @click="doSearch">搜索</a>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-3 control-label">
                        <span></span>
                    </div>
                    <div class="col-sm-7" style="min-height:35px;">
                        <div style="border:1px dashed #ccc;padding:5px" v-show="canShowSRDiv">
                            <span style="color: red;float:left;">{{searchresult}}</span>
                            <span>{{searchresultdoctor.name}}&nbsp;&nbsp;&nbsp;</span>
                            <span>{{searchresultdoctor.mobile}}&nbsp;&nbsp;&nbsp;</span>
                            <span>{{searchresultdoctor.hospital}}</span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div slot="footer">
                <a class="btn btn-default" href="javascript:" @click="closeModal">取消</a>
                <a class="btn btn-primary" href="javascript:" @click="addmemberpost">确认添加</a>
            </div>
        </modal>
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
    .linkstyle a {
        padding: 5px;
        margin-right: 10px;
    }
</style>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                showModal: false,
                doctornameForSearch: '',
                doctormobileForSearch: '',
                searchresult: '',
                searchresultdoctor: {
                    name: '',
                    mobile: '',
                    hospital: '',
                },

                projectid: '',
                currcenterid: '',
                pagetitle: '肺间质纤维化项目-北京研究中心',
                project_role: 0,
                is_create: 0,
                is_bat_input: 0,

                dg_project: '',
                dg_center: {
                    content: '解决肺间质纤维化中的一部分问题',
                    members: [
                        {   mydoctor_center:
                            {
                                center_name: '',
                                center_role: '',
                            },
                            id: '101',
                            name: '王茜',
                            patientcnt: '101',
                        },
                        {
                            mydoctor_center:
                            {
                                center_name: '',
                                center_role: '',
                            },
                            id: '102',
                            name: '李四',
                            patientcnt: '102',
                        },
                        {
                            mydoctor_center:
                            {
                                center_name: '',
                                center_role: '',
                            },
                            id: '103',
                            name: '王五',
                            patientcnt: '103',
                        }
                    ]
                },
                dg_centers: [],
                title: '',

            }
        },
        route: {
            data: function(transition) {
                var self = this;
                var centerid = transition.to.params.centerid;
                self.currcenterid = centerid;
                self.projectid = transition.to.params.projectid;
                self.fetchData();
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'modal': function(resolve) {
                require(['../../components/Modal.vue'], resolve);
            }
        },
        computed: {
            canShowSRDiv: function() {
                return this.searchresult || this.searchresultdoctor.name != '';
            }
        },
        methods: {
            changeCenter: function(e) {
                var self = this;
                // console.log(e.target.selectedIndex);
                var index = e.target.selectedIndex;
                self.currcenterid = self.dg_centers[index].id;
                self.$router.push({
                    name: 'doctorgroup-centerdetail',
                    params: {
                        centerid: self.currcenterid,
                    }
                })
                // $.ajax({
                //     url: api.get('doctorgroup.dg_memberlist'),
                //     type: 'POST',
                //     dataType: 'json',
                //     data: {
                //         dg_projectid: self.projectid,
                //         dg_centerid: self.currcenterid,
                //     }
                // }).done(function(response){
                //     if (response.errno == 0) {
                //         var data = response.data;
                //         self.dg_center = data.dg_center;
                //         self.dg_centers = data.dg_centers;
                //     } else {
                //         self.$emit('show-alert', response.errmsg);
                //     }
                // })
            },
            setprojectmaster: function(member) {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_membersetprojectmaster'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_memberid: member.id,
                        dg_projectid: self.projectid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$emit('show-popup', '设置成功', function() {
                            self.fetchData();
                        });
                    }else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            removeprojectmaster: function(member) {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_memberremoveprojectmaster'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        dg_memberid: member.id,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(data);
                        self.$emit('show-popup', "设置成功", function(){
                            self.fetchData();
                        })
                    } else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            setcentermaster: function(member) {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_membersetcentermaster'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_memberid: member.id,
                        dg_projectid: self.projectid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$emit('show-popup', "设置成功", function(){
                            self.fetchData();
                        })
                    }else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            removecentermaster: function(member) {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_memberremovecentermaster'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        dg_memberid: member.id,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(data);
                        self.$emit('show-popup', "设置成功", function(){
                            self.fetchData();
                        })
                    } else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            addmember: function() {
                this.showModal = true;
            },
            closeModal: function() {
                this.showModal = false;
                this.doctornameForSearch = '';
                this.doctormobileForSearch = '';
                this.searchresult = '';
                this.searchresultdoctor.name = '';
                this.searchresultdoctor.mobile = '';
                this.searchresultdoctor.hospital = '';
            },
            importPatients: function() {

            },
            doSearch: function() {
                var self = this;
                self.searchresult = '';
                self.searchresultdoctor.name = '';
                self.searchresultdoctor.mobile = '';
                self.searchresultdoctor.hospital = '';
                if (this.doctornameForSearch.trim() == '') {
                    this.searchresult = '医生姓名不能为空';
                    $("input[name='doctorname']").focus();
                    return ;
                }
                if (this.doctormobileForSearch.trim() == '') {
                    this.searchresult = '医生电话不能为空';
                    $("input[name='doctormobile']").focus();
                    return ;
                }
                $.ajax({
                    url: api.get('doctorgroup.dg_membersearch'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        doctorname: self.doctornameForSearch,
                        doctormobile: self.doctormobileForSearch,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(data);
                        self.searchresultdoctor = data.doctor;
                    } else if(response.errno == -5){
                        self.searchresult = "姓名或电话有误,请核查后输入。";
                        self.searchresultdoctor.name = '';
                        self.searchresultdoctor.mobile = '';
                        self.searchresultdoctor.hospital = '';
                    } else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            addmemberpost: function() {
                var self = this;
                if (this.searchresultdoctor.name.trim() == '') {
                    this.$message({
                        type: 'error',
                        message: '请先搜索医生'
                    })
                    return ;
                }
                $.ajax({
                    url: api.get('doctorgroup.dg_memberadd'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        dg_centerid: self.currcenterid,
                        doctorid: self.searchresultdoctor.doctorid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$emit('show-popup', "添加成功", function(){
                            self.doctornameForSearch = '';
                            self.doctormobileForSearch = '';
                            self.searchresult = '';
                            self.searchresultdoctor.name = '';
                            self.searchresultdoctor.mobile = '';
                            self.searchresultdoctor.hospital = '';
                        });
                        self.showModal = false;
                        self.dg_center.members.push(response.data.dg_member);
                    } else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            getDiseaseid: function() {
                return common.getDiseaseId();
            },
            clearsearchresult: function() {
                this.searchresult = '';
            },
            fetchData: function() {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_memberlist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        dg_centerid: self.currcenterid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(data);
                        self.dg_project = data.dg_project;
                        self.dg_center = data.dg_center;
                        self.dg_centers = data.dg_centers;
                        self.project_role = data.project_role;
                        self.is_create = data.is_create;
                        self.is_bat_input = data.is_bat_input;
                    } else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            }
        },
        filters: {
            filterCenterMaster: function(val) {
                var str = '';
                $.each(val, function(index, one){
                    if (one.is_center_master == 1) {
                        str+=one.name + '、';
                    }
                })
                str = str.substring(0,str.length-1);
                return str;
            }
        }
    }
</script>
