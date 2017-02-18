<template>
    <div>
<app-header active='info'>
</app-header>
<div class="container-fluid content">
    <page-nav active="modifypassword"></page-nav>
    <div class="row mg-t-20">
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
<app-footer></app-footer>
</div>
</template>
<style scoped>
label {
    font-weight: normal;
}
</style>
<script>
import api from '../../config/api.js'
module.exports = {
    data: function() {
        return {
            password: '',
            newpassword: '',
            newpasswordrepeat: '',
        }
    },
    computed: {
    },
    route: {
        data: function(transition) {
            transition.next();
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'pageNav': require('./Nav.vue'),
    },
    methods: {
        clickSave: function() {
            if (this.password == '') {
                this.$emit('show-alert', '密码不能为空');
                return false;
            }
            if ($.trim(this.newpassword) == '') {
                this.$emit('show-alert', '新密码不能为空');
                return false;
            }
            if (this.newpassword != this.newpasswordrepeat) {
                this.$emit('show-alert', '两次输入的密码不一致');
                return false;
            }
            var that = this;
            $.ajax({
                url: api.get('user.modifypassword'),
                type: 'POST',
                dataType: 'json',
                data: {
                    password: that.password,
                    newpassword: that.newpassword,
                    newpasswordrepeat: that.newpasswordrepeat,
                },
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$emit('show-alert', d.errmsg);
                } else {
                    that.$emit('show-popup', '修改成功', function() {
                        that.password = '';
                        that.newpassword = '';
                        that.newpasswordrepeat = '';
                    });
                }

            })
        },
    }
}
</script>
