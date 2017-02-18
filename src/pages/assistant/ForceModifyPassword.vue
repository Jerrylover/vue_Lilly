<template>
    <div>
<app-header active='manager'>
</app-header>
<div class="container-fluid content">
    <div class="row table-header" style="border-bottom:1px solid #ccc;">
        <page-header pagetitle="重置密码"></page-header>
    </div>
    <div class="row mg-t-20">
        <div class="col-sm-6">
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
export default {
    data: function() {
        return {
            name: '',
            password1: '',
            password2: '',
            assistantid: '',
        }
    },
    computed: {
    },
    route: {
        data: function(transition) {
            this.assistantid = transition.to.query.assistantid;
            if (this.assistantid != undefined && this.assistantid != '') {
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
                }
            })
        },
        clickSave: function() {
            if ($.trim(this.password1) == '') {
                this.$emit('show-alert', '密码不能为空');
                return false;
            }
            if (this.password1 != this.password2) {
                this.$emit('show-alert', '两次输入的密码不一致');
                return false;
            }

            var data = {};
            data.assistantid = this.assistantid;
            data.password1 = this.password1;
            data.password2 = this.password2;

            var that = this;
            var url = api.get('assistant.forcemodifypassword');
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
