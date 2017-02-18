<template>
    <div>
    <app-header active = 'doctorgroup'></app-header>
    <div class="container-fluid content">
        <div class="row" style="border-bottom: 1px solid #ccc; padding-bottom: 0px">
            <h4>{{pagetitle}}</h4>
            <ol class="breadcrumb" style="margin: 5px 0px 0px 0px">
                <li>返回</li>
                <li><router-link href="#" to="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</router-link></li>
            </ol>
        </div>
        <div class="row mg-t-20">
            <!-- <div class="row" style="margin: 15px 0px 0px -15px">
                <div class="col-sm-12">
                    <span style="float: left; font-size: 16px;"><strong>项目名称&nbsp;&nbsp;</strong></span>
                    <span style="float: left; line-height: 2; color: red">*</span>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <input class="form-control" type="text" name="dg_project_title" v-model='title'>
                </div>
            </div> -->
            <div class="col-sm-6" style="padding: 0">
                <div class="form-group">
                    <label for="projecttitle" style="float: left">项目名称&nbsp;&nbsp;&nbsp;</label>
                    <span style="float: left; line-height: 2.1; color: red">*</span>
                    <input id="projecttitle" class="form-control" type="text" name="dg_project_title" v-model='title'>
                </div>
                <div class="form-group">
                    <label for="projectcontent" style="float: left">项目目标&nbsp;&nbsp;&nbsp;</label>
                    <span style="float: left; line-height: 2.1; color: red">*</span>
                    <textarea name="dg_project_content" class="form-control" rows="4" v-model='content'></textarea>
                </div>
                <div class="form-group">
                    <a href="javascript:" class="btn btn-primary" style="margin: 10px 0px 0px 0px" @click="addOrModifyProject">{{pagepostbuttonname}}</a>
                </div>
            </div>
        <!-- <div v-if="routeFrom == 'doctorgroup-modifyproject'">
            <div class="row" style="margin: 10px 0px 10px -15px">
                <div class="col-sm-12">
                    <span style="float: left; font-size: 16px;line-height: 2.2;margin-right: 15px"><strong>项目负责人</strong></span>
                    <a href="javascript:" class="btn btn-default" @click="addprojectmaster">添加项目负责人</a>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div  style=" border: 1px solid #ccc; min-height: 30px">

                    </div>
                </div>
            </div>
        </div> -->

        </div>
        <modal :show="showModal" :showHeader='false' width="600px">
            <div slot="header"></div>
            <div slot="body">
                <div class="row" style="margin: 10px 0px 0px 0px">
                    <div class="col-sm-6" style="border: 1px solid #ccc;padding: 0px; min-height: 350px;">
                        <select class="form-control" size="13" style="padding: 0px" v-model="currcentertitle" @change="changeCenter($event)">
                            <option v-for="center in centerlist" :value="center.title">{{center.title}}</option>
                        </select>
                    </div>
                    <div class="col-sm-6" style="border: 1px solid #ccc;padding: 0px; min-height: 350px">
                        <select class="form-control" size="13" style="padding: 0px" v-model="currmembername">
                            <option v-for="member in currmemberlist" :value="member.name">{{member.name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <a href="javascript:" class="btn btn-default" @click="closeModal($event)">取消</a>
                <a href="javascript:" class="btn btn-default" @click="addprojectmasterpost($event)">确定</a>
            </div>
        </modal>
    </div>
    <app-footer></app-footer>
    </div>
</template>
<style scoped>
    h4 {
        padding-left: 10px;
        border-left: 3px solid #008db9;
        display: inline-block;
    }
    .form-control option {
        padding: 8px;
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
                alertError: '',
                routeFrom: '',
                pagetitle: '',
                pagepostbuttonname: '',
                projectid: '',

                currcentertitle: '',
                currmembername: '',
                showModal: false,
                title: '',
                content: '',
                centerlist: [
                    {
                        title: '北京研究中心',
                        memberlist: [
                            {
                                name: '王迁',
                            },
                            {
                                name: '张三',
                            },
                            {
                                name: '李四',
                            },
                            {
                                name: '王五',
                            },
                            {
                                name: '赵六',
                            },
                        ]
                    },
                    {
                        title: '天津研究中心',
                        memberlist: [
                            {
                                name: '王迁',
                            },
                            {
                                name: '浊气',
                            },
                            {
                                name: '凌老大',
                            },
                            {
                                name: '王八蛋',
                            },
                            {
                                name: '方汉文',
                            },
                        ]
                    },
                    {
                        title: '石家庄研究中心',
                        memberlist: [
                            {
                                name: '王迁',
                            },
                            {
                                name: '陈世刚',
                            },
                            {
                                name: '李杰',
                            },
                            {
                                name: '徐喆',
                            },
                            {
                                name: '史建平',
                            },
                        ]
                    },
                    {
                        title: '合肥研究中心',
                        memberlist: [
                            {
                                name: '王迁',
                            },
                            {
                                name: '老金',
                            },
                            {
                                name: '陈翔',
                            },
                            {
                                name: '王春生',
                            },
                            {
                                name: '陈萍',
                            },
                        ]
                    }
                ],
                currmemberlist: [
                    {
                        name: '王迁',
                    },
                    {
                        name: '徐雁',
                    },
                    {
                        name: '王颖轶',
                    }
                ]
            }
        },
        route: {
            data: function(transition) {
                var self = this;
                this.routeFrom = transition.to.name;
                console.log(this.routeFrom);
                console.log(transition.to);
                if (this.routeFrom == 'doctorgroup-addproject') {
                    console.log('11111');
                    this.pagetitle = '添加团队项目';
                    this.pagepostbuttonname = '确认并添加项目';
                }else if(this.routeFrom == 'doctorgroup-modifyproject') {
                    // this.pagetitle = '';
                    // console.log('1111111');
                    self.projectid = transition.to.params.projectid;
                    // console.log('projectid', projectid);
                    $.ajax({
                        url: api.get('doctorgroup.dg_projectone'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            dg_projectid: self.projectid,
                        }
                    }).done(function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            self.title = data.dg_project.title;
                            self.content = data.dg_project.content;
                            self.pagetitle = self.title + '项目-修改';
                        }else {
                            self.$emit('show-alert', response.errmsg);
                        }
                    })
                    this.pagepostbuttonname = '保存修改';
                }
            }
        },
        components: {
            'appHeader': function(resolve) {
                require(['../../components/Header.vue'], resolve);
            },
            'appFooter': function(resolve) {
                require(['../../components/Footer.vue'], resolve);
            },
            'modal': function(resolve) {
                require(['../../components/Modal.vue'], resolve);
            }
        },
        methods: {
            'addOrModifyProject': function(e) {
                e.preventDefault();
                var self = this;
                if (self.title.trim() == '') {
                    self.alertError = "项目名称不能为空,请重新填写";
                    self.$emit('show-alert', self.alertError, function(){
                        $("input[name='dg_project_title']").focus();
                    })
                    return ;
                }
                if (self.content.trim() == '') {
                    self.alertError = "项目目标不能为空,请重新填写";
                    self.$emit('show-alert', self.alertError, function(){
                        $("textarea[name='dg_project_content']").focus();
                    })
                    return ;
                }
                var url = '';
                var projectid = '';
                if (self.routeFrom == 'doctorgroup-addproject') {
                    url = api.get('doctorgroup.dg_projectadd');
                    projectid = '';
                }else if(self.routeFrom == 'doctorgroup-modifyproject') {
                    url = api.get('doctorgroup.dg_projectmodify');
                    projectid = self.projectid;
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        title: self.title,
                        content: self.content,
                        dg_projectid: projectid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$emit('show-popup', '项目添加成功', function(){self.goProjectList();});
                    }else {
                        self.$emit('show-alert', response.errmsg);
                    }
                })
            },
            goProjectList: function() {
                this.$route.router.push({
                    name: 'doctorgroup-projectlist',
                })
            },
            addprojectmaster: function(e) {
                e.preventDefault();
                this.showModal=true;
                // if (this.centerlist.length != 0) {
                //     this.currcentertitle = this.centerlist[0].title;
                //     if (this.centerlist[0].memberlist.length != 0) {
                //         this.currmembername = this.centerlist[0].memberlist[0].name;
                //     }
                // }

            },
            addprojectmasterpost: function(e) {
                e.preventDefault();
            },
            closeModal: function(e) {
                e.preventDefault();
                this.showModal = false;
                this.currcentertitle = '';
                this.currmembername = '';
            },
            changeCenter: function(e) {
                console.log(e.target.selectedIndex);
                var currcenterIndex = e.target.selectedIndex;
                this.currmemberlist = this.centerlist[currcenterIndex].memberlist;
                if (this.currmemberlist.length != 0) {
                    this.currmembername = this.currmemberlist[0].name;
                    console.log(this.currcentertitle);
                    console.log(this.currmembername);
                }
            }
        }
    }
</script>
