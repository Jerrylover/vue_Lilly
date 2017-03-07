<template>
<div class="container-fluid content">
    <breadcrumb :data="breadcrumbData" :pagetitle="pageTitle">
        <div slot="other-content">
        </div>
    </breadcrumb>

    <div class="page-content">
        <div class="col-sm-6" style="padding:0">
            <div class="form-group">
                <label class="control-label">名称</label>
                <input type="text" class="form-control" v-model="name" placeholder="张三"/>
            </div>
            <div class="form-group">
                <label class="control-label">登录名</label><span v-if="!ismodify" class="text-danger">（建议使用姓名全拼，一旦创建就不能被修改）</span>
                <input type="text" class="form-control" v-model="username" :disabled="ismodify" placeholder="zhangsan"/>
            </div>
            <div class="form-group">
                <label class="control-label">手机</label>
                <input type="text" class="form-control" v-model="mobile" />
            </div>
            <div class="form-group" v-if="!ismodify">
                <label class="control-label">密码</label>
                <input type="password" class="form-control" v-model="password1" />
            </div>
            <div class="form-group" v-if="!ismodify">
                <label class="control-label">重复密码</label>
                <input type="password" class="form-control" v-model="password2" />
            </div>
            <div class="form-group">
                <a href="javascript:" class="btn btn-primary" @click="clickSave">提交</a>
            </div>
        </div>
    </div><!--end of  page-content-->
</div>
</template>
<style scoped>
.control-label {
    font-weight: normal;
}
</style>
<script>
import api from '../../config/api.js'
import common from '../../lib/common.js'
import rule from '../../config/rule.js'
export default {
    data: function() {
        return {
            breadcrumbData: [
                {
                    name: '助理账号列表',
                    link: {name: 'manager'}
                }
            ],
            name: '',
            username: '',
            mobile: '',
            password1: '',
            password2: '',
            ismodify: false,
            assistantid: '',
        }
    },
    computed: {
        pageTitle: function() {
            var str = '';
            if (this.ismodify) {
                str = '修改账号';
            } else {
                str = '添加账号';
            }
            return str;
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
        'navmenu': require('../../components/NavMenu.vue'),
    },
    methods: {
        fetchAssistant: function() {
            var that = this;
            api.http({
              url: 'assistant.one',
              data: {
                assistantid: that.assistantid
              },
              successCallback: function(d) {
                  if (d.data) {
                      that.name = d.data.name;
                      that.username = d.data.username;
                      that.mobile = d.data.mobile;
                  }
              }
            })
        },
        clickSave: function() {
            if ($.trim(this.name) == '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '名称不能为空'
                })
                return false;
            }
            if ($.trim(this.username) == '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '登录名不能为空'
                })
                return false;
            }
            if (this.mobile == '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '手机号不能为空'
                })
                return false;
            }
            if (!rule.checkPhone(this.mobile)) {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '手机号格式不正确'
                })
                return false;
            }
            if (!this.ismodify) {
                if ($.trim(this.password1) == '') {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: '密码不能为空'
                    })
                    return false;
                }
                if (this.password1 != this.password2) {
                    this.$message({
                        showClose: true,
                        type: 'error',
                        message: '两次输入的密码不一致'
                    })
                    return false;
                }
            }

            var data = {};
            data.name = this.name;
            data.username = this.username;
            data.mobile = this.mobile;
            data.assistantid = this.assistantid;
            if (!this.ismodify) {
                data.password1 = this.password1;
                data.password2 = this.password2;
            }

            var that = this;
            var url = this.ismodify ? 'assistant.modify' : 'assistant.add'
            api.http({
              url: url,
              data: data,
              successCallback: function(d) {
                  that.$message({
                      showClose: true,
                      type: 'success',
                      message: '保存成功',
                      onClose: function() {
                          that.$router.push({
                              name: 'manager'
                          })
                      }
                  })
              }
            })
        },
        initPage: function() {
            if (this.$route.name == 'assistant-modify') {
                this.ismodify = true;
            }
            this.assistantid = this.$route.query.assistantid;
            if (this.assistantid != undefined && this.assistantid != '' && this.ismodify) {
                this.fetchAssistant();
            }
        }
    },
    created: function() {
        this.initPage()
        Bus.$emit('make-menu-mini', '设置', '助理账号')
    },
    watch: {
        '$route': function(to, from) {
            this.initPage()
        }
    }
}
</script>
