<template>
<div class="container-fluid content">
    <breadcrumb :data="breadcrumbData" pagetitle="重置密码">
        <div slot="other-content">
        </div>
    </breadcrumb>
    <div class="page-content">
        <div class="col-sm-6" style="padding:0">
            <div class="form-group">
                <label class="control-label">名称</label>
                <input type="text" disabled="disabled" class="form-control" v-model="name" />
            </div>
            <div class="form-group">
                <label class="control-label">新密码</label>
                <input type="password" class="form-control" v-model="password1" />
            </div>
            <div class="form-group">
                <label class="control-label">重复新密码</label>
                <input type="password" class="form-control" v-model="password2" />
            </div>
            <div class="form-group">
                <a href="javascript:" class="btn btn-primary" @click="clickSave">提交</a>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>

.control-label {
    font-weight: normal;
}
</style>
<script>
import api from '../../config/api.js'
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
            password1: '',
            password2: '',
            assistantid: '',
        }
    },
    computed: {
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        fetchAssistant: function() {
            var that = this;
            api.http({
              url: 'assistant.one',
              data: {
                  assistantid: that.assistantid,
              },
              successCallback: function(d) {
                  if (d.data) {
                      that.name = d.data.name;
                  }
              }
            })
        },
        clickSave: function() {
            if ($.trim(this.password1) == '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '密码不能为空',
                })
                return false;
            }
            if (this.password1 != this.password2) {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '两次输入的密码不一致',
                })
                return false;
            }

            var data = {};
            data.assistantid = this.assistantid;
            data.password1 = this.password1;
            data.password2 = this.password2;

            var that = this;
            api.http({
              url: 'assistant.forcemodifypassword',
              data: data,
              successCallback: function(d) {
                  that.$message({
                      showClose: true,
                      type: 'success',
                      message: '重置成功',
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
            Bus.$emit('make-menu-mini')
            this.assistantid = this.$route.query.assistantid;
            if (this.assistantid != undefined && this.assistantid != '') {
                this.fetchAssistant();
            }
        }
    },
    created: function() {
        this.initPage()
    },
    watch: {
        '$route': function(to, from) {
            this.initPage()
        }
    }
}
</script>
