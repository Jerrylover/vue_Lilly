<template>
    <app-header active='manager'></app-header>
    <div class="container-fluid content">
        <div class="row table-header">
            <h4>助理账号管理</h4>
            <a class="header-a btn btn-default btn-sm" href="javascript:"  class="btn btn-primary" v-link="{name:'assistant-add'}"><i class="fa fa-plus fa">&nbsp;新增助理账号</i></a>
            <div class="form-group">
                <div class="input-group">
                    <input class="input-search form-inline form-control" type="text" placeholder="输入名称" v-model='name' @keyup.enter='clickSearch'>
                    <span class="input-group-btn" style="width: 1%;">
                        <button class="btn btn-primary" type="submit" @click="clickSearch">
                        <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </button>
                    </span>
                </div>
            </div>
        </div>
        <div class="row mg-t-20">
            <table class="table table-bordered">
                <tr class="light-tr">
                    <th>名称</th>
                    <th>创建时间</th>
                    <th>登录名</th>
                    <th>手机号</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-if="assistants.length > 0" v-for="assistant in assistants" track-by="$index" :class="{'bg-gray':islock(assistant.status)}">
                    <td>{{assistant.name}}</td>
                    <td>{{assistant.createtime}}</td>
                    <td>{{assistant.username}}</td>
                    <td>{{assistant.mobile}}</td>
                    <td>{{{assistant.status | filterStatus}}}</td>
                    <td>
                        <template v-if="!islock(assistant.status)">
                            <a href="javascript:" class="mg-r-20" v-link="{name:'assistant-modify', query:{assistantid:assistant.id}}">修改</a>
                            <a href="javascript:" class="mg-r-20" v-link="{name:'assistant-privilege', query:{assistantid:assistant.id}}">权限管理</a>
                            <a class="mg-r-20" href="javascript:" v-link="{name:'assistant-forcemodifypassword', query:{assistantid:assistant.id}}">重置密码</a>
                            <a class="mg-r-20" href="javascript:" @click="clickLock(assistant)">锁定</a>
                        </template>
                        <template v-else>
                            <a class="mg-r-20" href="javascript:" @click="clickUnlock(assistant)">解锁</a>
                        </template>
                        <a class="text-danger" href="javascript:" @click="clickDelete(assistant)">删除</a>
                    </td>
                </tr>
                <tr v-if="assistants.length < 1">
                    <td colspan="6" class='text-center'>暂无数据</td>
                </tr>
            </table>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/manager'></pagination>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
h4 {
    float: left;
    padding-left: 10px;
    border-left: 3px solid #008db9;
}
.header-a {
    margin: 5px 0 10px 20px;
    float: left;
}
.input-group {
    float: right;
    width: 30%;
    margin-top: 3px;
}

.form-group {
    margin-bottom: 0;
}
</style>
<script>
import api from '../../config/api.js'
import common from '../../lib/common.js'
module.exports = {
    data: function() {
        return {
            pagenum: 1,
            pagesize: 20,
            total: 1,
            assistants: [],
            name: '',//搜索词
        }
    },
    computed: {

    },
    route: {
        data: function(transition) {
            var queryStrings = transition.to.query;
            this.fetchAssistantData(queryStrings);
            transition.next();
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'pagination': require('../../components/Pagination.vue'), //翻页组件
        'modal': function(resolve) {
            require(['../../components/Modal.vue'], resolve);
        },
    },
    methods: {
        islock: function(status) {
            return status == 2;
        },
        clickSearch: function(e) {
            e.preventDefault();
            this.$route.router.go({
                path: '/manager',
                query: {
                    'name': this.name
                }
            });
        },
        clickLock: function(assistant) {
            var that = this;
            this.$dispatch('show-prompt', "确定要锁定 "+assistant.name+" 吗？", function(){
                that.lock(assistant);
            })
        },
        clickUnlock: function(assistant) {
            var that = this;
            this.$dispatch('show-prompt', "确定要解除对 "+assistant.name+" 的锁定吗？", function(){
                that.unlock(assistant);
            })
        },
        clickDelete: function(assistant) {
            var that = this;
            this.$dispatch('show-prompt', "确定要删除 "+assistant.name+" 吗？", function(){
                that.doDelete(assistant);
            })
        },
        lock: function(assistant) {
            var that = this;
            $.ajax({
                url: api.get('assistant.lock'),
                type: 'POST',
                dataType: 'json',
                data: {
                    assistantid: assistant.id,
                },
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$dispatch('show-alert', d.errmsg);
                } else {
                    var query = that.$route.query;
                    that.fetchAssistantData(query);
                    that.$dispatch('show-popup', '锁定成功', function() {

                    });
                }
            })
        },
        unlock: function(assistant) {
            var that = this;
            $.ajax({
                url: api.get('assistant.unlock'),
                type: 'POST',
                dataType: 'json',
                data: {
                    assistantid: assistant.id,
                },
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$dispatch('show-alert', d.errmsg);
                } else {
                    var query = that.$route.query;
                    that.fetchAssistantData(query);
                    that.$dispatch('show-popup', '解锁成功', function() {
                    });
                }
            })
        },
        doDelete: function(assistant) {
            var that = this;
            $.ajax({
                url: api.get('assistant.delete'),
                type: 'POST',
                dataType: 'json',
                data: {
                    assistantid: assistant.id,
                },
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$dispatch('show-alert', d.errmsg);
                } else {
                    var query = that.$route.query;
                    that.fetchAssistantData(query);
                    that.$dispatch('show-popup', '删除成功', function() {
                    });
                }
            })
        },
        fetchAssistantData: function(querys) {
            var that = this;
            $.ajax({
                url: api.get('assistant.list'),
                type: 'POST',
                dataType: 'json',
                data: querys,
            }).done(function(d) {
                if (d.data) {
                    that.pagenum = d.data.pagenum;
                    that.total = d.data.total;
                    that.assistants = d.data.list;
                    that.name = d.data.name;
                    that.pagesize = d.data.pagesize;
                    that.pagenum = d.data.pagenum;
                }
            })
        },
    },
    filters: {
        filterStatus: function(value) {
            var str = '';
            if (value == 1) {
                str = "<span class='text-success'>有效</span>";
            } else if (value == 2) {
                str = "<span class='color-gray'>锁定</span>";
            }
            return str;
        }
    },
    ready: function() {

    }
}
</script>
