<template>
    <div class="container-fluid content">
        <div class="breadcrumbs" style="border-bottom: 1px solid #ccc; padding-bottom: 0px">
            <h4>{{pagetitle}}</h4>
        </div>
        <div class="row page-content">
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
</template>
<style scoped>
    .form-control option {
        padding: 8px;
    }
    label {
        font-weight: normal;
    }
</style>
<script>
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
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
                    self.$message({
                        type: 'error',
                        message: '项目名称不能为空,请重新填写',
                        duration: 1500,
                        onClose: function() {
                            $("input[name='dg_project_title']").focus();
                        }
                    })
                    return ;
                }
                if (self.content.trim() == '') {
                    self.$message({
                        type: 'error',
                        message: '项目目标不能为空,请重新填写',
                        duration: 1500,
                        onClose: function() {
                            $("textarea[name='dg_project_content']").focus();
                        }
                    })
                    return ;
                }
                var url = '';
                var projectid = '';
                if (self.routeFrom == 'doctorgroup-addproject') {
                    url = 'doctorgroup.dg_projectadd'
                    projectid = '';
                } else if(self.routeFrom == 'doctorgroup-modifyproject') {
                    url = 'doctorgroup.dg_projectmodify'
                    projectid = self.projectid;
                }
                api.http({
                  url: url,
                  data: {
                      title: self.title,
                      content: self.content,
                      dg_projectid: projectid,
                  },
                  successCallback: function(d) {
                      var msg = '项目添加成功'
                      if (self.routeFrom == 'doctorgroup-modifyproject') {
                          msg = '项目修改成功';
                      }
                      self.$message({
                          type: 'success',
                          message: msg,
                          duration: 1500,
                          onClose: function() {
                              self.goProjectList()
                          }
                      })
                  }
                })
            },
            goProjectList: function() {
                this.$router.push({
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
                var currcenterIndex = e.target.selectedIndex > -1 ? e.target.selectedIndex : 0;
                this.currmemberlist = this.centerlist[currcenterIndex].memberlist;
                if (this.currmemberlist.length != 0) {
                    this.currmembername = this.currmemberlist[0].name;
                }
            },
            fetchData: function() {
                var self = this;
                this.routeFrom = this.$route.name;
                if (this.routeFrom == 'doctorgroup-addproject') {
                    this.pagetitle = '添加团队项目';
                    this.pagepostbuttonname = '确认并添加项目';
                } else if(this.routeFrom == 'doctorgroup-modifyproject') {
                    // this.pagetitle = '';
                    // console.log('1111111');
                    self.projectid = this.$route.params.projectid;
                    // console.log('projectid', projectid);
                    api.http({
                      url: 'doctorgroup.dg_projectone',
                      data: {
                          dg_projectid: self.projectid,
                      },
                      successCallback: function(d) {
                          var data = d.data;
                          self.title = data.dg_project.title;
                          self.content = data.dg_project.content;
                          self.pagetitle = self.title + '项目-修改';
                      }
                    })
                    this.pagepostbuttonname = '保存修改';
                }
            }
        },
        created: function() {
            this.fetchData()
        },
        watch: {
            '$route': function(to, from) {
                this.fetchData()
            }
        }
    }
</script>
