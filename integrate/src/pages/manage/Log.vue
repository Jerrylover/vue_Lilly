<template>
    <div class="container-fluid content">
        <breadcrumb pagetitle="操作日志">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
            <div class="fr" style="">
                <div class="form-inline text-right">
                    <div class="form-group">
                        <select class="form-control" style="" v-model="assistantname">
                            <option value="">全部</option>
                            <option v-for="assistant in assistants" :value="assistant.name">{{assistant.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input class="input-search form-inline form-control" type="text" placeholder="输入患者名称" v-model='patientname' @keyup.enter='clickSearch'>
                    </div>
                    <a href="javascript:" class="btn btn-primary" @click="clickSearch">搜索</a>
                </div>
            </div>
            <table class="table table-bordered mg-t-10">
                <tbody>
                <tr class="light-tr">
                    <th>操作时间</th>
                    <th>患者</th>
                    <th>操作内容</th>
                    <th>操作人</th>
                </tr>
                <tr v-if="oplogs.length > 0" v-for="(oplog, index) in oplogs" :key="index">
                    <td class="col-sm-2">{{oplog.createtime}}</td>
                    <td class="col-sm-1">{{oplog.patientname}}</td>
                    <td class="col-sm-7">{{oplog.content}}</td>
                    <td class="col-sm-2">{{oplog.username}}</td>
                </tr>
                <tr v-if="oplogs.length < 1">
                    <td colspan="6" class='text-center'>暂无数据</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/log'></pagination>
            </div>
        </div>
    </div>
</template>
<style scoped>
.header-a {
    margin: 5px 0 10px 20px;
    float: left;
}
.input-group {
    float: right;
    /*width: 30%;*/
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
            oplogs: [],
            assistants: [],
            assistantname: '',
            patientname: '',//搜索词
        }
    },
    computed: {

    },
    route: {
        data: function(transition) {
            var queryStrings = transition.to.query;
            this.patientname = queryStrings.patientname;
            this.assistantname = queryStrings.assistantname;
            this.fetchLogData(queryStrings);
            transition.next();
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
        'pagination': require('../../components/Pagination.vue'), //翻页组件
    },
    methods: {
        clickSearch: function(e) {
            e.preventDefault();
            this.$router.push({
                name: 'log',
                query: {
                    'patientname': this.patientname,
                    'assistantname': this.assistantname
                }
            });
        },
        fetchLogData: function(querys) {
            var that = this;
            api.http({
              url: 'doctordboplog.list',
              data: querys,
              successCallback: function(d) {
                  if (d.data) {
                      that.total = d.data.total - '';
                      that.oplogs = d.data.list;
                      that.pagesize = d.data.pagesize - '';
                      that.pagenum = d.data.pagenum - '';
                      that.patientname = d.data.patientname;//患者名称
                      that.assistantname = d.data.assistantname;//助理账号
                      that.assistants = d.data.assistants;
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
        var queryStrings = this.$route.query;
        this.patientname = queryStrings.patientname;
        this.assistantname = queryStrings.assistantname;
        this.fetchLogData(queryStrings);
    },
    watch: {
        '$route': function(to, from) {
            var queryStrings = to.query;
            this.patientname = queryStrings.patientname;
            this.assistantname = queryStrings.assistantname;
            this.fetchLogData(queryStrings);
        }
    }
}
</script>
