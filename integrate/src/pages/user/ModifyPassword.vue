<template>
<div class="container-fluid content">
    <div class="breadcrumbs">
        <h4>修改密码</h4>
    </div>
    <div class="page-content">
        <div class="col-lg-6 col-sm-6" style="padding:0">
            <div class="form-group">
                <label class="control-label">当前密码</label>
                <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="form-group">
                <label class="control-label">新密码</label>
                <input type="password" class="form-control" v-model="newpassword" />
            </div>
            <div class="form-group">
                <label class="control-label">重复新密码</label>
                <input type="password" class="form-control" v-model="newpasswordrepeat" />
            </div>
            <div class="form-group">
                <a href="javascript:" class="btn btn-primary" @click="clickSave">提交</a>
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
import api from '../../config/api.js'
export default {
    data: function() {
        return {
            password: '',
            newpassword: '',
            newpasswordrepeat: '',
        }
    },
    computed: {
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'pageNav': require('./Nav.vue'),
    },
    methods: {
        clickSave: function() {
            if (this.password == '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '密码不能为空'
                })
                return false;
            }
            if ($.trim(this.newpassword) == '') {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '新密码不能为空'
                })
                return false;
            }
            if (this.newpassword != this.newpasswordrepeat) {
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: '两次输入的密码不一致'
                })
                return false;
            }
            var that = this;
            api.http({
              url: 'user.modifypassword',
              data: {
                  password: that.password,
                  newpassword: that.newpassword,
                  newpasswordrepeat: that.newpasswordrepeat,
              },
              successCallback: function(d) {
                  that.$message({
                      showClose: true,
                      type: 'success',
                      duration: 1500,
                      message: '修改成功',
                      onClose: function() {
                          that.password = '';
                          that.newpassword = '';
                          that.newpasswordrepeat = '';
                      }
                  })
              }
            })
        },
    },
    created: function() {
        Bus.$emit('make-menu-mini')
    },
    watch: {
        '$route': function() {
            Bus.$emit('make-menu-mini')
        }
    }
}
</script>
