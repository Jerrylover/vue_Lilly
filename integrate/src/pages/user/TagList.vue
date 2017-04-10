<template>
    <div class="tag-config container-fluid content">
        <breadcrumb pagetitle="标签列表">
            <div name="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
            <div class="page-content-header">
                <router-link :to="{name: 'user-tagadd'}" class="btn btn-default btn-success btn-sm"><i class="fa fa-plus fa">&nbsp;新建标签</i></router-link>
            </div>
            <table class="table table-bordered mg-t-10">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>标签名称</th>
                        <th>标签描述</th>
                        <th>创建时间</th>
                        <th>创建人</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(patienttagtpl, index) in patienttagtpllist">
                        <td>
                            <input type="text" name="" v-model="patienttagtpl.pos" size="3" style="text-align: center">
                        </td>
                        <td>{{patienttagtpl.name}}</td>
                        <td>{{patienttagtpl.content}}</td>
                        <td>{{patienttagtpl.createtime}}</td>
                        <td>{{patienttagtpl.creator}}</td>
                        <td style="text-align: center">
                            <a href="javascript:" @click="modifytag(patienttagtpl.id)">修改</a>
                            <a href="javascript:" @click="deletetag(patienttagtpl, index)" style="color: #f0ad4e">删除</a>
                        </td>
                    </tr>
                    <tr v-if="patienttagtpllist.length != 0">
                        <td colspan="6" style="text-align: left">
                            <a href="javascript:" class="btn btn-default btn-success" @click="posModify">保存序号更改</a>
                        </td>
                    </tr>
                    <tr v-if="patienttagtpllist.length == 0" style="text-align: center">
                        <td colspan="6">暂无标签数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    export default {
        data: function() {
            return {
                patienttagtpllist: [],
            }
        },
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
        },
        methods: {
            modifytag: function(tagtplid) {
                this.$router.push({name: 'user-tagmodify', query: {'patienttagtplid': tagtplid}});
            },
            deletetag: function(patienttagtpl, index) {
                var self = this;
                this.$confirm('共有' + patienttagtpl.patientcnt + '人被标注了该标签,您确认要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.http({
                        url: 'patienttagtpl.deletepost',
                        data: {
                            patienttagtplid: patienttagtpl.id,
                        },
                        successCallback: function(d) {
                            self.patienttagtpllist.splice(index, 1);
                            self.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '删除成功'
                            });
                        }
                    })
                }).catch(() => {

                });
            },
            posModify: function() {
                var self = this;
                api.http({
                    url: 'patienttagtpl.posmodifypost',
                    data: {
                        list: self.patienttagtpllist,
                    },
                    successCallback: function(d){
                        self.fetchData();
                        self.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '序号保存成功',
                        })
                    }
                })
            },
            fetchData: function() {
                var self = this;
                api.http({
                    url: 'patienttagtpl.list',
                    data: {
                    },
                    successCallback: function(d) {
                        var data = d.data;
                        self.patienttagtpllist = data.patienttagtpllist;
                    }
                })
            }
        },
        created: function() {
            this.fetchData();
        }
    }
</script>
<style scoped>
    .page-content-content {
        margin-top: 10px;
    }
    table thead tr {
    background-color: #F5F6FA;
    }

    table thead th {
        border-bottom-width: 0;
        font-weight: normal;
    }
    table a {
        padding: 5px;
    }
</style>