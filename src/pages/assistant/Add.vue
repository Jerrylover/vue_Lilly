<template>
    <div>
<app-header active='manager'>
</app-header>
<div class="container-fluid content">
    <div class="row table-header" style="border-bottom:1px solid #ccc;">
        <page-header :pagetitle="pageTitle"></page-header>
    </div>
    <div class="row mg-t-20">
        <div class="col-sm-6">
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
    </div>
</div>
<app-footer></app-footer>
</div>
</template>
<style scoped>
h4 {
    float: left;
    padding-left: 10px;
    border-left: 3px solid #008db9;
}

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
    route: {
        data: function(transition) {
            if (this.$route.name == 'assistant-modify') {
                this.ismodify = true;
            }
            this.assistantid = transition.to.query.assistantid;
            if (this.assistantid != undefined && this.assistantid != '' && this.ismodify) {
                this.fetchAssistant();
            }
            transition.next();
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'pageHeader': require('./Header.vue'),
    },
    methods: {
        fetchAssistant: function() {
            var that = this;
            $.ajax({
                url: api.get('assistant.one'),
                type: 'POST',
                dataType: 'json',
                data: {
                    assistantid: that.assistantid
                },
            }).done(function(d) {
                if (d.data) {
                    that.name = d.data.name;
                    that.username = d.data.username;
                    that.mobile = d.data.mobile;
                }
            })
        },
        clickSave: function() {
            if ($.trim(this.name) == '') {
                this.$emit('show-alert', '名称不能为空');
                return false;
            }
            if ($.trim(this.username) == '') {
                this.$emit('show-alert', '登录名不能为空');
                return false;
            }
            if (this.mobile == '') {
                this.$emit('show-alert', '手机号不能为空');
                return false;
            }
            if (!rule.checkPhone(this.mobile)) {
                this.$emit('show-alert', '请输入正确的手机号');
                return false;
            }
            if (!this.ismodify) {
                if ($.trim(this.password1) == '') {
                    this.$emit('show-alert', '密码不能为空');
                    return false;
                }
                if (this.password1 != this.password2) {
                    this.$emit('show-alert', '两次输入的密码不一致');
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
            var url = this.ismodify ? api.get('assistant.modify') : api.get('assistant.add')
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$emit('show-alert', d.errmsg);
                } else {
                    that.$emit('show-popup', '保存成功', function() {
                        that.$router.push({
                            name: 'manager'
                        })
                    });
                }
            })
        }
    }
}
</script>
