<template>
    <div class="container-fluid content">
        <breadcrumb :data="breadcrumbData" :pagetitle="pagetitle">
            <div slot="other-content">
            </div>
        </breadcrumb>

        <div class="page-content">
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
</template>
<style scoped>
    label {
        font-weight: normal;
    }
</style>
<script>
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                breadcrumbData: [
                    {
                        name: '项目列表',
                        link: {name: 'doctorgroup-projectlist'}
                    },
                    {
                        name: '中心列表',
                        link: {name: 'doctorgroup-centerlist'}
                    }
                ],
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
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
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
                if (self.dg_center.title.trim() == '') {
                    self.$message({
                        type: 'error',
                        message: '中心名称不能为空',
                        duration: 1500,
                        onClose: function() {
                            $("input[name='title']").focus();
                        }
                    })
                    return ;
                }
                if (self.dg_center.content.trim() == '') {
                    self.$message({
                        type: 'error',
                        message: '中心项目目标不能为空',
                        duration: 1500,
                        onClose: function() {
                            $("textarea[name='content']").focus();
                        }
                    })
                    return ;
                }
                api.http({
                  url: 'doctorgroup.dg_centeradd',
                  data: {
                      dg_projectid: self.projectid,
                      title: self.dg_center.title,
                      content: self.dg_center.content,
                  },
                  successCallback: function(d) {
                      self.$message({
                          type: 'success',
                          message: '添加成功',
                          duration: 1500,
                          onClose: function() {
                              self.goCenterlist();
                          }
                      })
                  }
                })
            },
            modifycenter: function() {
                var self = this;
                if (self.dg_center.title.trim() == '') {
                    self.$message({
                        type: 'error',
                        message: '中心名称不能为空',
                        duration: 1500,
                        onClose: function() {
                            $("input[name='title']").focus();
                        }
                    })
                    return ;
                }
                if (self.dg_center.content.trim() == '') {
                    self.$message({
                        type: 'error',
                        message: '中心项目目标不能为空',
                        duration: 1500,
                        onClose: function() {
                            $("textarea[name='content']").focus();
                        }
                    })
                    return ;
                }
                api.http({
                  url: 'doctorgroup.dg_centermodify',
                  data: {
                      dg_projectid: self.projectid,
                      dg_centerid: self.centerid,
                      title: self.dg_center.title,
                      content: self.dg_center.content,
                  },
                  successCallback: function(d) {
                      self.$message({
                          type: 'success',
                          message: '修改成功',
                          duration: 1500,
                          onClose: function() {
                              self.goCenterlist();
                          }
                      })
                  }
                })
            },
            goCenterlist: function() {
                var self = this;
                self.$router.push({
                    name: 'doctorgroup-centerlist',
                    params: {
                        projectid: self.projectid,
                    }
                })
            },
            fetchData: function() {
                var self = this;
                var url = '';
                self.routeFrom = this.$route.name;
                var params = this.$route.params;
                if (self.routeFrom == 'doctorgroup-addcenter') {
                    self.pagetitle = '添加中心';
                    self.pagepostbuttonname = "确认并添加中心";
                    self.projectid = params.projectid;
                }
                if (self.routeFrom == 'doctorgroup-modifycenter') {
                    url = api.get('doctorgroup.dg_centermodify');
                    self.projectid = params.projectid;
                    self.centerid = params.centerid;
                    self.pagetitle = '修改中心';
                    self.pagepostbuttonname = '确认并保存修改';
                }
                if (url.trim() == '') {
                    return ;
                }
                api.http({
                  url: 'doctorgroup.dg_centerone',
                  data: {
                      dg_centerid: self.centerid,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.dg_project.title = data.dg_project.title;
                      self.dg_center.title = data.dg_center.title;
                      self.dg_center.content = data.dg_center.content;
                  }
                })
            }
        },
        created: function() {
            this.fetchData()
            this.breadcrumbData[1].link = {
                name: 'doctorgroup-centerlist',
                params: {
                    projectid: this.$route.params.projectid,
                }
            }
        },
        watch: {
            '$route': function() {
                this.fetchData()
                this.breadcrumbData[1].link = {
                    name: 'doctorgroup-centerlist',
                    params: {
                        projectid: this.$route.params.projectid,
                    }
                }
            }
        }
    }
</script>
