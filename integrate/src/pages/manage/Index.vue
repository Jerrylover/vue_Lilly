<template>
    <div class="container-fluid content">
        <breadcrumb pagetitle="助理账号列表">
            <div slot="other-content">

            </div>
        </breadcrumb>

        <div class="page-content">
            <div class="row">
                <div class="col-sm-12">
                    <router-link  class="header-a btn btn-success btn-sm" href="javascript:"  :to="{name:'assistant-add'}"><i class="fa fa-plus fa">&nbsp;新增助理账号</i></router-link>
                </div>
            </div>
            <table class="table table-bordered">
                <tbody>
                <tr class="light-tr">
                    <th>名称</th>
                    <th>创建时间</th>
                    <th>登录名</th>
                    <th>手机号</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-if="assistants.length > 0" v-for="(assistant, index) in assistants" :key="index" :class="{'bg-gray':islock(assistant.status)}">
                    <td>{{assistant.name}}</td>
                    <td>{{assistant.createtime}}</td>
                    <td>{{assistant.username}}</td>
                    <td>{{assistant.mobile}}</td>
                    <td v-html="filterStatus(assistant.status)"></td>
                    <td>
                        <template v-if="!islock(assistant.status)">
                            <router-link  class="mg-r-20"  :to="{name:'assistant-modify', query:{assistantid:assistant.id}}">修改</router-link>
                            <router-link  class="mg-r-20"  :to="{name:'assistant-privilege', query:{assistantid:assistant.id}}">权限管理</router-link>
                            <router-link  class="mg-r-20"  :to="{name:'assistant-forcemodifypassword', query:{assistantid:assistant.id}}">重置密码</router-link>
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
            </tbody>
            </table>
        </div>
        <div class="text-center">
            <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/manager'></pagination>
        </div>
    </div>
</template>
<style scoped>
.header-a {
    margin: 5px 0 10px 0;
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
export default {
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
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
        'pagination': require('../../components/Pagination.vue'), //翻页组件
        'navmenu': require('../../components/NavMenu.vue'),
        'modal': function(resolve) {
            require(['../../components/Modal.vue'], resolve);
        },
    },
    methods: {
        filterStatus: function(value) {
            var str = '';
            if (value == 1) {
                str = "<span class='text-success'>有效</span>";
            } else if (value == 2) {
                str = "<span class='color-gray'>锁定</span>";
            }
            return str;
        },
        islock: function(status) {
            return status == 2;
        },
        clickSearch: function(e) {
            e.preventDefault();
            this.$router.push({
                path: '/manager',
                query: {
                    'name': this.name
                }
            });
        },
        clickLock: function(assistant) {
            this.$confirm("确定要锁定 "+assistant.name+" 吗？", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.lock(assistant);
            }).catch(() => {

            });
        },
        clickUnlock: function(assistant) {
            var that = this;
            this.$confirm("确定要解除对 "+assistant.name+" 的锁定吗？", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.unlock(assistant);
            }).catch(() => {

            });
        },
        clickDelete: function(assistant) {
            this.$confirm("确定要删除 "+assistant.name+" 吗？", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.doDelete(assistant);
            }).catch(() => {

            });
        },
        lock: function(assistant) {
            var that = this;
            api.http({
              url: 'assistant.lock',
              data: {
                  assistantid: assistant.id,
              },
              successCallback: function(d) {
                  var query = that.$route.query;
                  that.$message({
                      type: 'success',
                      message: '锁定成功!'
                  });
                  that.fetchAssistantData(query);
              }
            })
        },
        unlock: function(assistant) {
            var that = this;
            api.http({
              url: 'assistant.unlock',
              data: {
                  assistantid: assistant.id,
              },
              successCallback: function(d) {
                  var query = that.$route.query;
                  that.$message({
                      type: 'success',
                      message: '解锁成功!'
                  });
                  that.fetchAssistantData(query);
              }
            })
        },
        doDelete: function(assistant) {
            var that = this;
            api.http({
              url: 'assistant.delete',
              data: {
                  assistantid: assistant.id,
              },
              successCallback: function(d) {
                  var query = that.$route.query;
                  that.fetchAssistantData(query);
                  that.$message({
                      type: 'success',
                      message: '删除成功'
                  });
              }
            })
        },
        fetchAssistantData: function(querys) {
            var that = this;
            api.http({
              url: 'assistant.list',
              data: querys,
              successCallback: function(d) {
                  if (d.data) {
                      that.pagenum = d.data.pagenum - '';
                      that.total = d.data.total - '';
                      that.assistants = d.data.list;
                      that.name = d.data.name;
                      that.pagesize = d.data.pagesize - '';
                      that.pagenum = d.data.pagenum - '';
                  }
              }
            })
        },
    },
    filters: {

    },
    mounted: function() {

    },
    created: function() {
        var queryStrings = this.$route.query
        this.fetchAssistantData(queryStrings)
        Bus.$emit('make-menu-mini')
    },
    watch: {
        '$route': function(to, from) {
            var queryStrings =to.query;
            this.fetchAssistantData(queryStrings);
        }
    }
}
</script>
