<template>
    <app-header active = 'doctorgroup'></app-header>
    <div class="container-fluid content">
        <div class="row" style="margin: 0px;border-bottom: 1px solid #ccc; padding-bottom: 0px">
            <div class="col-sm-12"  style="padding-left:0px; padding-right: 0px">
                <h4>{{dg_project.title}}项目</h4>
                <a v-dg-privilege="projectid + '-1'" href="javascript:" class="btn btn-default" style="margin-left: 10px" v-link="{name: 'doctorgroup-addcenter'}">添加中心</a>
                <ol class="breadcrumb" style="margin: 5px 0px 0px 0px">
                    <li>返回</li>
                    <li><a href="#" v-link="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</a></li>
                </ol>
            </div>
        </div>
        <div class="row" style="margin: 10px 0px 0px 0px">
            <div class="well">
                <p>项目名称:&nbsp;&nbsp;{{project_all.project_title}}</p>
                <p>项目目标:&nbsp;&nbsp;{{project_all.project_content}}</p>
                <p>项目发起人:&nbsp;&nbsp;{{project_all.project_creater}}</p>
                <p>项目负责人:&nbsp;&nbsp;{{project_all.project_masters | filterProjecter}}</p>
            </div>
        </div>
        <table class="table table-bordered" style="margin-top: 10px">
            <tr class="light-tr">
                <th>中心id</th>
                <th>中心名称</th>
                <th>中心负责人</th>
                <th>医生数</th>
                <th>患者数</th>
                <th>创建时间</th>
                <th>操作</th>
            </tr>
            <tr v-for="center in centerlist">
                <td>{{center.dg_centerid}}</td>
                <td>{{center.title}}</td>
                <td>{{center.masters.join('、')}}</td>
                <td><a class="scale" href="javascript:" v-link="{name:'doctorgroup-centerdetail', params: {'centerid': center.dg_centerid}}">{{center.doctorcnt}}</a></td>
                <td><a class="scale" v-dg-privilege="projectid + '-1 | ' + center.dg_centerid + '-x | clearlink'" href="javascript:" style="text-decoration: none" v-link="{name: 'doctorgroup-patientlist', query:{'projectid': projectid, 'centerid': center.dg_centerid, 'doctorid': ''}}">{{center.patientcnt}}</a></td>
                <td>{{center.createtime}}</td>
                <td>
                    <a class="scale" href="javascript:" v-link="{name:'doctorgroup-centerdetail', params: {'centerid': center.dg_centerid}}">查看成员</a>
                    <a class="scale" v-dg-privilege="projectid + '-1 | ' + center.dg_centerid + '-1'" href="javascript:" v-link="{name:'doctorgroup-modifycenter', params: {'centerid': center.dg_centerid, 'projectid': projectid}}">设置</a>
                </td>
            </tr>
            <tr v-if="centerlist.length == 0">
                <td colspan="7" style="text-align: center">暂无数据</td>
            </tr>
        </table>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
    h4 {
        padding-left: 10px;
        border-left: 3px solid #008db9;
        display: inline-block;
    }
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
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
        route: {
            data: function(transition) {
                var self = this;
                console.log(transition.to);
                self.projectid = transition.to.params.projectid;
                $.ajax({
                    url: api.get('doctorgroup.dg_centerlist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.centerlist = data.dg_centers;
                        self.dg_project.title = data.dg_project_title;
                        self.dg_project.content = data.dg_project_content;
                        self.project_role = data.project_role;
                        self.project_all = data.project_all;
                        console.log(data);
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
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
        }
    }
</script>