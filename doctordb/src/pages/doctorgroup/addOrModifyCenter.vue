<template>
    <app-header active = 'doctorgroup'></app-header>
    <div class="container-fluid content">
        <div class="row" style="border-bottom: 1px solid #ccc;">
            <h4>{{dg_project.title}}项目&nbsp;&nbsp;&nbsp;{{pagetitle}}</h4>
            <ol class="breadcrumb" style="margin: 5px 0px 0px 0px">
                <li>返回</li>
                <li><a class="scale" href="javascript:" v-link="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</a></li>
                <li><a class="scale" href="javascript:" v-link="{name: 'doctorgroup-centerlist', params:{'projectid': projectid}}" style="text-decoration: none">中心列表</a></li>
            </ol>
        </div>
        <div class="row mg-t-20">
            <div class="col-sm-6" style="padding: 0">
                <div class="form-group">
                    <label for="projecttitle" style="float: left">中心名称&nbsp;&nbsp;&nbsp;</label>
                    <span style="float: left; line-height: 2.1; color: red">*</span>
                    <input id="projecttitle" class="form-control" type="text" name="dg_project_title" v-model='dg_center.title'>
                </div>
                <div class="form-group">
                    <label for="projectcontent" style="float: left">中心目标&nbsp;&nbsp;&nbsp;</label>
                    <span style="float: left; line-height: 2.1; color: red">*</span>
                    <textarea name="dg_project_content" class="form-control" rows="4" v-model='dg_center.content'></textarea>
                </div>
                <div class="form-group">
                    <a href="javascript:" class="btn btn-primary" style="margin-top: 10px" @click="addormodifycenter">{{pagepostbuttonname}}</a>
                </div>
            </div>
        </div>
        
    </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
    h4 {
        display: inline-block;
        border-left: 3px solid #008db9;
        padding-left: 10px;
    }
    label {
        font-weight: normal;
    }
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                projectid: '',
                centerid: '',
                routeFrom: '',
                pagetitle: '',
                pagepostbuttonname: '',

                dg_center: {
                    title: '',
                    content: '',
                },
                dg_project: {
                    title: '肺间质纤维化'
                }
            }
        },
        route: {
            data: function(transition) {
                var self = this;
                var url = '';
                self.routeFrom = transition.to.name;
                if (self.routeFrom == 'doctorgroup-addcenter') {
                    self.pagetitle = '添加中心';
                    self.pagepostbuttonname = "确认并添加中心";
                    self.projectid = transition.to.params.projectid;
                }
                if (self.routeFrom == 'doctorgroup-modifycenter') {
                    url = api.get('doctorgroup.dg_centermodify');
                    self.projectid = transition.to.params.projectid;
                    self.centerid = transition.to.params.centerid;
                    self.pagetitle = '修改中心';
                    self.pagepostbuttonname = '确认并保存修改';
                }
                if (url.trim() == '') {
                    return ;
                }
                $.ajax({
                    url: api.get('doctorgroup.dg_centerone'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_centerid: self.centerid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.dg_project.title = data.dg_project.title;
                        self.dg_center.title = data.dg_center.title;
                        self.dg_center.content = data.dg_center.content;
                    } else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
        },
        methods: {
            addormodifycenter: function() {
                var self = this;
                if (self.routeFrom.trim() == 'doctorgroup-addcenter') {
                    self.addcenter();
                }
                if (self.routeFrom.trim() == 'doctorgroup-modifycenter') {
                    self.modifycenter();
                }

            },
            addcenter: function() {
                var self = this;
                var url = api.get('doctorgroup.dg_centeradd');
                if (self.dg_center.title.trim() == '') {
                    self.$dispatch('show-alert', "中心名称不能为空", function(){
                        $("input[name='title']").focus();
                    })
                    return ;
                }
                if (self.dg_center.content.trim() == '') {
                    self.$dispatch('show-alert', '中心项目目标不能为空', function() {
                        $("textarea[name='content']").focus();
                    })
                    return ;
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        title: self.dg_center.title,
                        content: self.dg_center.content,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', '添加成功', function() {
                            self.goCenterlist();
                        })
                    } else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            modifycenter: function() {
                var self = this;
                var url = api.get('doctorgroup.dg_centermodify');
                if (self.dg_center.title.trim() == '') {
                    self.$dispatch('show-alert', "中心名称不能为空", function(){
                        $("input[name='title']").focus();
                    })
                    return ;
                }
                if (self.dg_center.content.trim() == '') {
                    self.$dispatch('show-alert', '中心项目目标不能为空', function() {
                        $("textarea[name='content']").focus();
                    })
                    return ;
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        dg_projectid: self.projectid,
                        dg_centerid: self.centerid,
                        title: self.dg_center.title,
                        content: self.dg_center.content,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', '修改成功', function() {
                            self.goCenterlist();
                        })
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })

            },
            goCenterlist: function() {
                var self = this;
                self.$route.router.go({
                    name: 'doctorgroup-centerlist',
                    params: {
                        projectid: self.projectid,
                    }
                })
            }
        }
    }
</script>
