<template>
    <div class="container-fluid content">
        <div class="breadcrumbs" style="border-bottom: 1px solid #ccc;">
            <h4>{{dg_project.title}}项目</h4>
            <router-link  v-dg-privilege="projectid + '-1'" href="javascript:" class="btn btn-default" style="margin-left: 10px"  :to="{name: 'doctorgroup-addcenter'}">添加中心</router-link>
        </div>
        <div class="page-content">
        <div class="" style="margin: 10px 0px 0px 0px">
            <div class="well">
                <p>项目名称:&nbsp;&nbsp;{{project_all.project_title}}</p>
                <p>项目目标:&nbsp;&nbsp;{{project_all.project_content}}</p>
                <p>项目发起人:&nbsp;&nbsp;{{project_all.project_creater}}</p>
                <p>项目负责人:&nbsp;&nbsp;{{project_all.project_masters | filterProjecter}}</p>
            </div>
        </div>
        <table class="table table-bordered" style="margin-top: 10px">
            <thead>
            <tr class="light-tr">
                <th>中心id</th>
                <th>中心名称</th>
                <th>中心负责人</th>
                <th>医生数</th>
                <th>患者数</th>
                <th>创建时间</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="center in centerlist">
                <td>{{center.dg_centerid}}</td>
                <td>{{center.title}}</td>
                <td>{{center.masters.join('、')}}</td>
                <td><router-link  class="scale" href="javascript:"  :to="{name:'doctorgroup-centerdetail', params: {'centerid': center.dg_centerid}}">{{center.doctorcnt}}</router-link></td>
                <td><router-link  class="scale" v-dg-privilege="projectid + '-1 | ' + center.dg_centerid + '-x | clearlink'" href="javascript:" style="text-decoration: none"  :to="{name: 'doctorgroup-patientlist', query:{'projectid': projectid, 'centerid': center.dg_centerid, 'doctorid': ''}}">{{center.patientcnt}}</router-link></td>
                <td>{{center.createtime}}</td>
                <td>
                    <router-link  class="scale" href="javascript:"  :to="{name:'doctorgroup-centerdetail', params: {'centerid': center.dg_centerid}}">查看成员</router-link>
                    <router-link  class="scale" v-dg-privilege="projectid + '-1 | ' + center.dg_centerid + '-1'" href="javascript:"  :to="{name:'doctorgroup-modifycenter', params: {'centerid': center.dg_centerid, 'projectid': projectid}}">设置</router-link>
                </td>
            </tr>
            <tr v-if="centerlist.length == 0">
                <td colspan="7" style="text-align: center">暂无数据</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<style scoped>
</style>
<script>
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                projectid: '',
                dg_project: {
                    title: '肺间质纤维化',
                    content: '这就是一个搞笑的项目，大家随意看看，不要太在意',
                },
                project_all: {
                    // project_masters:[],
                },
                project_role: 0,
                centerlist: [{
                    dg_centerid: '',
                    title: '',
                    masters: [],
                    doctorcnt: 0,
                    patientcnt: 0,
                    createtime: '2016-10-20',
                    mydoctor:{
                        dg_centerid: '',
                        dg_projectid: '',
                        doctorid: '',
                    }
                }]
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
        },
        filters: {
            filterProjecter: function(val) {
                if (val == undefined) {
                    return '';
                }
                return val.join('、');
            }
        },
        methods: {
            fetchData: function() {
                var self = this;
                self.projectid = this.$route.params.projectid;
                api.http({
                  url: 'doctorgroup.dg_centerlist',
                  data: {
                      dg_projectid: self.projectid,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.centerlist = data.dg_centers;
                      self.dg_project.title = data.dg_project_title;
                      self.dg_project.content = data.dg_project_content;
                      self.project_role = data.project_role;
                      self.project_all = data.project_all;
                  }
                })
            }
        },
        created: function() {
            this.fetchData()
        },
        watch: {
            '$route': function() {
                this.fetchData()
            }
        }
    }
</script>
