<template>
    <div class="container-fluid content">
        <breadcrumb pagetitle="项目列表">
            <div slot="other-content">

            </div>
        </breadcrumb>

        <div class="row page-content">
            <div class="row">
                <div class="col-sm-12">
                    <router-link class="header-a btn btn-success btn-sm" href="javascript:"  :to="{name: 'doctorgroup-addproject'}"><i class="fa fa-plus fa">&nbsp;添加项目</i></router-link>
                </div>
            </div>
        <table class="table table-bordered mg-t-10">
            <thead>
            <tr class="light-tr">
                <th>项目名称</th>
                <th>创建时间</th>
                <th>项目负责人(不分先后)</th>
                <th>自己的患者</th>
                <th>患者人数</th>
                <th>医生人数</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="dg_project in dg_projectlist">
                <td>{{dg_project.title}}</td>
                <td>{{dg_project.createtime}}</td>
                <td>{{dg_project.masters.join('、')}}</td>
                <td>
                    <router-link  class="scale"  :to="{name: 'doctorgroup-patientlist', query: {'projectid':dg_project.dg_projectid, 'centerid': dg_project.mydoctor.dg_centerid, 'doctorid': dg_project.mydoctor.doctorid}}">{{dg_project.thedoctor_patientcnt}}</router-link>
                </td>
                <td>
                    <router-link  class="scale" v-dg-privilege="dg_project.dg_projectid + '-1 | clearlink'" href="javascript:"  :to="{name: 'doctorgroup-patientlist', query: {'projectid':dg_project.dg_projectid, 'centerid': '', 'doctorid': ''}}">{{dg_project.theproject_patientcnt}}</router-link>
                </td>
                <td>{{dg_project.theproject_doctorcnt}}</td>
                <td>
                    <router-link  class="scale" :to="{name: 'doctorgroup-centerlist', params:{'projectid': dg_project.dg_projectid}}" style="text-decoration: none">查看中心</router-link>&nbsp;&nbsp;&nbsp;
                    <router-link  class="scale" v-dg-privilege="dg_project.dg_projectid + '-1'" :to="{name: 'doctorgroup-modifyproject', params: {'projectid': dg_project.dg_projectid}}" style="text-decoration:none">设置</router-link>
                </td>
            </tr>
            <tr>
                <td v-if="dg_projectlist.length == 0" colspan="7" style="text-align: center">暂无项目数据</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</template>
<style scoped>
.header-a {
    margin-top: 5px;
}
</style>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function(){
            return {
                dg_projectlist: [],
            }
        },
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
        },
        methods: {
            fetchData: function() {
                var self = this;
                api.http({
                  url: 'doctorgroup.dg_projectlist',
                  data: {
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.dg_projectlist = data.dg_projectlist;
                      var roles = {};
                      self.dg_projectlist.forEach(function(one) {
                          roles[one.dg_projectid] = {};
                          roles[one.dg_projectid].project_role = one.project_role;
                          roles[one.dg_projectid].center_roles = one.center_roles;
                      })
                      localStorage.setItem('_project_role_', JSON.stringify(roles));
                  }
                })
            }
        },
        created: function() {
            this.fetchData();
        },
        watch: {
            '$route': function() {
                this.fetchData()
            }
        }
    }
</script>
