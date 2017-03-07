<template>
    <div class="container-fluid content">
        <breadcrumb pagetitle="住院预约历史记录">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
        <div class="row" style="margin: 0px; background-color: #f8f8f8">
            <div class="form-horizontal" style="border: 1px solid #f2f2f2; margin:0px;padding: 10px">
                <div class="form-group">
                    <span class="col-sm-1 control-label">日期选择:</span>
                    <!-- <div class="col-sm-2">
                        <input id="fromdate" class="form-control" type="text" @click="showCalendar" name="" v-model="fromdate">
                        <calendar :defaultdate="false" :show.sync="showForFromdate" :value.sync="fromdate" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                    </div> -->
                        <div class="col-sm-2">
                    <fc-date v-model="fromdate" format="YYYY-MM-DD">
                      <el-date-picker type="date" placeholder="开始日期"></el-date-picker>
                    </fc-date>
                    </div>
                    <!-- <div class="col-sm-2">
                        <input id="todate" class="form-control" type="text" @click="showCalendar" name="" v-model="todate">
                        <calendar :defaultdate="false" :show.sync="showForTodate" :value.sync="todate" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                    </div> -->
                    <div class="col-sm-2">
                    <fc-date v-model="todate" format="YYYY-MM-DD">
                      <el-date-picker type="date" placeholder="结束日期"></el-date-picker>
                    </fc-date>
                    </div>
                </div>
                <div class="form-group">
                    <span class="col-sm-1 control-label">性别:&nbsp;&nbsp;</span>
                    <div class="col-sm-2">
                        <select class="form-control" name="" v-model="sex">
                            <option value="0">全部</option>
                            <option value="1">男</option>
                            <option value="2">女</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <span class="col-sm-1 control-label">姓名:&nbsp;&nbsp;</span>
                    <div class="col-sm-2">
                        <input class="form-control" type="text" name="" v-model="patient_name">
                    </div>
                </div>
                <div class="form-group">
                    <span class="col-sm-1 control-label">操作结果:&nbsp;&nbsp;</span>
                    <div class="col-sm-2">
                        <select class="form-control" name="" v-model="result_type">
                            <option value="0">全部</option>
                            <option value="5">同意入院</option>
                            <option value="6">拒绝入院</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-1 col-sm-2">
                        <a href="javascript:" class="form-control btn btn-primary" @click="doSearch($event)">搜索</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin: 10px 0px 0px 0px">
            <table class="table table-bordered">
                <tbody>
                <tr class="light-tr">
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>手机号</th>
                    <th>诊断</th>
                    <th>所在省份</th>
                    <th>操作日期</th>
                    <th>预约日期</th>
                    <th>审核日期</th>
                    <th>确认日期</th>
                    <th>入组日期</th>
                    <th>操作结果</th>
                </tr>
                <tr v-for="patient in bedtkts">
                    <td>{{patient.name}}</td>
                    <td>{{patient.sex}}</td>
                    <td>{{patient.age}}</td>
                    <td>{{patient.mobile}}</td>
                    <td>{{patient.complication}}</td>
                    <td>{{patient.provincestr}}</td>
                    <td>{{patient.notify_date}}</td>
                    <td>{{patient.submit_date}}</td>
                    <td>{{patient.audit_operate_time}}</td>
                    <td>{{patient.notify_date}}</td>
                    <td>{{patient.group_date}}</td>
                    <td :class="{pass: patient.result_type == '确认入住', refuse: patient.result_type == '拒绝入住'}">{{patient.result_type}}</td>
                </tr>
                <tr v-if="bedtkts.length == 0">
                    <td colspan="12" style="text-align: center">暂无数据</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="row" style="text-align:center">
            <pagination :cur="pagenum" :pagesize="pagesize" :total="total" path="/sickbed/operation-history"></pagination>
        </div>
        </div>
    </div>
</template>
<style scoped>
    h4 {
        display: inline-block;
        float: left;
        border-left: 3px solid #008db9;
        padding-left: 10px;
    }
    .pass {
        color: #58b957;
    }
    .refuse {
        color: #f2ae43;
    }
    .el-date-editor {
        width: 100%;
    }
</style>
<script>
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                pagenum: 1,
                pagesize: 10,
                total: 200,

                patient_name: '',
                fromdate: '',
                todate: '',
                sex: '',
                result_type: '',

                bedtkts: [
                ]
            }
        },
        components: {
            'pagination': require('../../components/Pagination.vue'),
            'breadcrumb': require('../../components/BreadCrumb.vue'),
        },
        methods: {
            fetchData: function(){
                var self = this;
                $.ajax({
                    url: api.get('sickbedorder.operatehistorylist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        fromdate: self.fromdate,
                        todate: self.todate,
                        sex: self.sex,
                        patient_name: self.patient_name,
                        result_type: self.result_type,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.total = data.total - '';
                        self.bedtkts = data.bedtkts;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            doSearch: function(e) {
                e.preventDefault();
                var self = this;
                var query = {}
                for (var i in this.$route.query) {
                  query[i] = this.$route.query[i]
                }
                query.fromdate = this.fromdate;
                query.todate = this.todate;
                query.sex = this.sex;
                query.result_type = this.result_type;
                query.patient_name = this.patient_name;

                this.$router.push({
                    name: 'operation-history',
                    query: query,
                })
            },
            initPage: function() {
                var queryString = this.$route.query;
                if (queryString.pagenum != undefined) {
                    this.pagenum = queryString.pagenum - 1;
                }
                if (queryString.fromdate != undefined) {
                    this.fromdate = queryString.fromdate;
                }
                if (queryString.todate != undefined) {
                    this.todate = queryString.todate;
                }
                if (queryString.pateint_name != undefined) {
                    this.patient_name = queryString.pateint_name;
                }
                if (queryString.sex != undefined) {
                    this.sex = queryString.sex;
                }
                if (queryString.result_type != undefined) {
                    this.result_type = queryString.result_type;
                }
                this.fetchData();
            },
        },
        created: function() {
            this.initPage()
            Bus.$emit('make-menu-mini')
        },
        watch: {
            '$route': function(to, from) {
                this.initPage()
            }
        }
    }
</script>
