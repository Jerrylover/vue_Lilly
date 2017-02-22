<template>
    <app-header active='sickbed-order'></app-header>
    <div class="container-fluid content">
        <div class="row" style="margin: 0px;">
            <div class="col-sm-12" style="padding: 0px">
                <h4>住院预约历史记录</h4>
                <a href="javascript:" class="btn btn-default" style="float: right" v-link="{name: 'sickbed-listofpendingoperation'}">住院预约名单</a>
            </div>
        </div>
        <div class="row" style="margin: 0px; background-color: #eee">
            <div class="form-horizontal" style="border: 1px solid #ccc; margin:0px;padding: 10px">
                <div class="form-group">
                    <span class="col-sm-1 control-label">日期选择:</span>
                    <div class="col-sm-2">
                        <input id="fromdate" class="form-control" type="text" @click="showCalendar" name="" v-model="fromdate">
                        <calendar :defaultdate="false" :show.sync="showForFromdate" :value.sync="fromdate" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                    </div>
                    <span style="line-height: 2.3; float: left;">到</span>
                    <div class="col-sm-2">
                        <input id="todate" class="form-control" type="text" @click="showCalendar" name="" v-model="todate">
                        <calendar :defaultdate="false" :show.sync="showForTodate" :value.sync="todate" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
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
                <tr class="light-tr">
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>手机号</th>
                    <th>诊断</th>
                    <th>所在省份</th>
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
                    <td>{{patient.submit_date}}</td>
                    <td>{{patient.audit_operate_time}}</td>
                    <td>{{patient.notify_date}}</td>
                    <td>{{patient.group_date}}</td>
                    <td :class="{pass: patient.result_type == '确认入住', refuse: patient.result_type == '拒绝入住'}">{{patient.result_type}}</td>
                </tr>
                <tr v-if="bedtkts.length == 0">
                    <td colspan="11" style="text-align: center">暂无数据</td>
                </tr>
            </table>
        </div>
        <div class="row" style="text-align:center">
            <pagination :cur="pagenum" :pagesize="pagesize" :total="total" path="/sickbed/operation-history"></pagination>
        </div>
    </div>
    <app-footer></app-footer>
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
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                pagenum: 1,
                pagesize: 10,
                total: 200,

                value: "",
                begin: "",
                x: 0,
                y: 0,
                range: false, //是否多选
                showForFromdate: false,
                showForTodate: false,


                patient_name: '',
                fromdate: '',
                todate: '',
                sex: '',
                result_type: '',

                bedtkts: [
                ]
            }
        },
        route: {
            data: function(transition) {
                var queryString = transition.to.query;
                if (queryString.pagenum != undefined) {
                    this.pagenum = queryString.pagenum;
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
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'pagination': require('../../components/Pagination.vue'),
            'calendar': function(resolve) {
                require(['../../components/Calendar.vue'], resolve);
            }
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
                        self.total = data.total;
                        self.bedtkts = data.bedtkts;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            doSearch: function(e) {
                e.preventDefault();
                var self = this;
                this.$route.query.fromdate = this.fromdate;
                this.$route.query.todate = this.todate;
                this.$route.query.sex = this.sex;
                this.$route.query.result_type = this.result_type;
                this.$route.query.patient_name = this.patient_name;
                this.$route.router.go({
                    name: 'operation-history',
                    query: this.$route.query,
                })
            },
            showCalendar: function(e) {
                e.stopPropagation();
                var that = this;
                if (e.target.id == "fromdate") {
                    that.showForFromdate = true;
                } else if (e.target.id == "todate") {
                    that.showForTodate = true;
                } 
                that.xN = e.target.offsetLeft;
                that.y = e.target.offsetTop + e.target.offsetHeight + 8;
                var bindHide = function(event) {
                    if (event.target == e.target) {
                        return;
                    }
                    // console.log('----document----', event);
                    event.stopPropagation();
                    that.showForFromdate = false;
                    that.showForTodate = false;
                    document.removeEventListener('click', bindHide, false);
                    document.removeEventListener('touchstart', bindHide, false);
                };
                setTimeout(function() {
                    document.addEventListener('click', bindHide, false);
                    document.addEventListener('touchstart', bindHide, false);
                }, 500);
            },
        }
    }
</script>