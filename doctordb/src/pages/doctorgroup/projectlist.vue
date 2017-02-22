<template>
    <app-header active = 'doctorgroup'></app-header>
    <div class="container-fluid content">
        <div class="row table-header">
            <h4>项目列表</h4>
            <a class="header-a btn btn-default btn-sm" href="javascript:" v-link="{name: 'doctorgroup-addproject'}"><i class="fa fa-plus fa">&nbsp;添加项目</i></a>
        </div>
        <div class="row">
        <table class="table table-bordered">
            <tr class="light-tr">
                <th>项目名称</th>
                <th>创建时间</th>
                <th>项目负责人(不分先后)</th>
                <th>自己的患者</th>
                <th>患者人数</th>
                <th>医生人数</th>
                <th>操作</th>
            </tr>
            <tr v-for="dg_project in dg_projectlist">
                <td>{{dg_project.title}}</td>
                <td>{{dg_project.createtime}}</td>
                <td>{{dg_project.masters.join('、')}}</td>
                <td>
                    <a class="scale" href="javascript:" v-link="{name: 'doctorgroup-patientlist', query: {'projectid':dg_project.dg_projectid, 'centerid': dg_project.mydoctor.dg_centerid, 'doctorid': dg_project.mydoctor.doctorid}}">{{dg_project.thedoctor_patientcnt}}</a>
                </td>
                <td>
                    <a class="scale" v-dg-privilege="dg_project.dg_projectid + '-1 | clearlink'" href="javascript:" v-link="{name: 'doctorgroup-patientlist', query: {'projectid':dg_project.dg_projectid, 'centerid': '', 'doctorid': ''}}">{{dg_project.theproject_patientcnt}}</a>
                </td>
                <td>{{dg_project.theproject_doctorcnt}}</td>
                <td>
                    <a class="scale" href="javascript:" v-link="{name: 'doctorgroup-centerlist', params:{'projectid': dg_project.dg_projectid}}" style="text-decoration: none">查看中心</a>&nbsp;&nbsp;&nbsp;
                    <a class="scale" v-dg-privilege="dg_project.dg_projectid + '-1'" href="javascript:" v-link="{name: 'doctorgroup-modifyproject', params: {'projectid': dg_project.dg_projectid}}" style="text-decoration:none">设置</a>
                </td>
            </tr>
            <tr>
                <td v-if="dg_projectlist.length == 0" colspan="7" style="text-align: center">暂无项目数据</td>
            </tr>
        </table>
    </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
    h4 {
        float: left;
        padding-left: 10px;
        border-left: 3px solid #008db9;
        display: inline-block;
    }
    .table {
        margin-top: 15px;
    }
</style>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    module.exports = {
        data: function(){
            return {
                dg_projectlist: [],
            }
        },
        route: {
            data: function() {
                var self = this;
                $.ajax({
                    url: api.get('doctorgroup.dg_projectlist'),
                    type: "POST",
                    dataType: 'json',
                    data: {
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.dg_projectlist = data.dg_projectlist;
                        console.log(self.dg_projectlist);
                        var roles = {};
                        $.each(self.dg_projectlist, function(index, one) {
                            roles[one.dg_projectid] = {};
                            roles[one.dg_projectid].project_role = one.project_role;
                            roles[one.dg_projectid].center_roles = one.center_roles;
                        })
                        console.log(roles);
                        localStorage.setItem('_project_role_', JSON.stringify(roles));
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            }
        },
        components: {
            'appHeader': function(resolve){
                require(['../../components/Header.vue'], resolve);
            },
            'appFooter': function(resolve){
                require(['../../components/Footer.vue'], resolve);
            }
        },
        methods: {
        }
    }
</script>
