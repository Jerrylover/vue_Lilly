<template>
    <app-header active="patient"></app-header>
    <div class="container-fluid content">
        <div class="row">
            <div class="col-sm-5 leftstyle">
                <div class="form-group">
                    <div class="input-group">
                        <input class="input-search form-inline form-control" type="text" name="" placeholder="请输入您要搜索的姓名/手机号/病历号" v-model="patient_name" @keyup.enter='doSearch($event)'>
                        <span class="input-group-btn">
                            <button class="btn btn-primary" type="submit" @click="doSearch">
                                <span class="glyphicon glyphicon-search"></span>
                            </button>
                        </span>
                    </div>
                </div>
                <div>
                    <table class="table table-bordered table-hover fctable">
                        <tr class="active">
                            <td><strong>姓名</strong></td>
                            <td><strong>资料</strong></td>
                            <td><strong>入组</strong></td>
                            <td><strong>详情</strong></td>
                        </tr>
                        <tr :class="{'selectedtr': patient.patient_id == curpatientid}" v-for="patient in patients" @click="clicktr($index, $event)">
                            <td>{{patient.name}}</td>
                            <td>{{patient.sex}}&nbsp;{{patient.age}}<br/>{{{patient.mobile}}}</td>
                            <td>{{patient.group_date}}<br/>{{patient.out_case_no}}</td>
                            <td>查看&nbsp;&nbsp;<span v-show="patient.has_update == 1" style="color: white; background-color: #d9534f; border-radius: 5px; padding: 3px 7px">new</span><br/><span style="font-size: 14px">{{patient.status}}</span></td>
                        </tr>
                        <tr v-if="patients.length == 0">
                            <td colspan="4" style="text-align: center">
                                暂无数据
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <pagination :cur='pagenum' :pagesize='pagesize' :total='total' path='/patient/list'></pagination>
                    </div>
                </div>
            </div>
            <div class="col-sm-7">
                <router-view></router-view>
            </div>
            <div style="border: 1px solid #ccc; border-radius: 4px; position: fixed; bottom: 50%; right:10px;width: 30px; padding: 5px; cursor: pointer; text-align: center;user-select:none" @click="goTop(500)">
                回到顶部
            </div>
        </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
    .leftstyle {
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    .form-group {
        margin-top: 15px;
        margin-bottom: 5px;
    }
    .table tr td {
        font-size: 14px;
    }
    .selectedtr {
        background-color: #dbedf8;
    }
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                patient_name: '',
                pathname: '',
                pagenum: 1,
                pagesize: 10,
                total: 100,
                patient_name: '',
                active: false,
                curpatientid: '',
                patients: [
                ]
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'pagination': require('../../components/Pagination.vue'),
        },
        route: {
            data: function(transition) {
                var self = this;
                var queryString = transition.to.query;
                var params = transition.to.params;
                var routefrom = transition.to.name;
                console.log(routefrom);
                console.log('list');
                if (routefrom == 'patient-list' || self.patients.length == 0) {
                    console.log('i am comming');
                    var self = this;
                    self.patient_name = queryString.patient_name;
                    $.ajax({
                        url: api.get('patient.list'),
                        type: 'POST',
                        dataType: 'json',
                        data: queryString,
                    }).done(function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            self.pagenum = data.page;
                            self.pagesize = data.pagesize;
                            self.total = data.total;
                            self.patients = data.list;

                            if (routefrom == 'patient-list') {
                                transition.to.query.pagenum = self.pagenum;
                                if (self.patients.length != 0) {
                                    self.curpatientid = self.patients[0].patient_id;
                                    transition.redirect({
                                        path: '/patient/list/' +  self.curpatientid + '/visitinfo/',
                                        query: queryString,
                                    })
                                }else{
                                    transition.redirect({
                                        path: '/patient/list/0/visitinfo/',
                                        query: queryString,
                                    })
                                }
                            }else {
                                self.curpatientid = params.patientid;
                                var flag = 0;
                                for (var i = 0; i < self.patients.length; i++) {
                                    if(self.patients[i].patient_id == self.curpatientid){
                                        flag = 1;
                                        break;
                                    }
                                }
                                if (flag == 0) {
                                    $.ajax({
                                        url: api.get('patient.list'),
                                        type: 'POST',
                                        dataType: 'json',
                                        data: {
                                            patient_name: queryString.patient_name,
                                            pagenum: Number(queryString.pagenum) + 1,
                                        }
                                    })
                                    .done(function(response){
                                        if (response.errno == 0) {
                                            var data = response.data;
                                            console.log('--------');
                                            console.log(data);
                                            console.log('--------');
                                            console.log('selfcurpatientid', self.curpatientid);
                                            if (data.list.length != 0) {
                                                var flag1 = 0;
                                                for (var i = 0; i < data.list.length; i++) {
                                                    if(data.list[i].patient_id == self.curpatientid){
                                                        queryString.pagenum = Number(queryString.pagenum) + 1;
                                                        console.log('++++++++++', queryString, '-----', params);
                                                        self.patients = [];
                                                        self.$route.router.go({
                                                            name: self.$route.name,
                                                            query: queryString,
                                                            params: params,
                                                        })
                                                        return ;
                                                    }
                                                }
                                                self.patient_name = self.curpatientid;
                                                self.doSearch();
                                            }
                                        }else {
                                            self.$dispatch('show-alert', response.errmsg);
                                        }
                                    })
                                }
                            }
                        }else {
                            self.$dispatch('show-alert', response.errmsg);
                        }
                    })
                }else {
                    for (var i = 0; i < self.patients.length; i++) {
                        if(self.patients[i].patient_id == transition.to.params.patientid){
                            self.curpatientid = transition.to.params.patientid;
                            return ;
                        }
                    }
                    self.patient_name = transition.to.params.patientid;
                    self.doSearch();
                }
                transition.next();
            }
        },
        methods: {
            getData: function() {

            },
            clicktr: function(index,e) {
                e.preventDefault();
                this.curpatientid = this.patients[index].patient_id;
                this.$route.query.pagenum = this.pagenum;
                this.$route.query.patient_name = this.patient_name;
                if (this.$route.name == 'patient-list-visitinfo') {
                    this.$route.router.go({
                        path: '/patient/list/'+ this.curpatientid + '/visitinfo',
                        query: this.$route.query
                    })
                }else {
                    this.$route.router.go({
                        path: '/patient/list/'+ this.curpatientid + '/aftertreatment',
                        query: this.$route.query
                    })
                }

            },
            doSearch: function() {
                self = this;
                self.$route.router.go({
                    name: 'patient-list',
                    query: {
                        patient_name: self.patient_name,
                    }
                })
            },
            loadMore: function() {

            },
            goTop: function(times) {
                if (!!!times) {
                    $(window).scrollTop(0);
                    return ;
                }
                var sh = $('body').scrollTop();
                var inter = 13.333;
                var forCount = Math.ceil(times/inter);
                var stepL = Math.ceil(sh/forCount);
                var timeId = null;
                // console.log(sh,'--',inter,'---',forCount,'----',stepL,'----',timeId);
                function ani() {
                    !!timeId && clearTimeout(timeId);
                    timeId = null;
                    if ($('body').scrollTop() <= 0 || forCount <= 0) {
                        $('body').scrollTop(0);
                        return ;
                    }
                    forCount--;
                    sh-=stepL;
                    $('body').scrollTop(sh);
                    timeId=setTimeout(function(){ani();},inter);
                }
                ani();
                // $('body').scroll(100);
            }
        },
        events: {
            'n-changeNew': function(patientid, isnew) {
                var that = this;
                $.each(that.patients, function(index, patient){
                    if (patient.patient_id == patientid) {
                        patient.has_update = isnew;
                        that.patients.$set(index, patient);
                        return false;
                    }
                })
            }
        }
    }
</script>
