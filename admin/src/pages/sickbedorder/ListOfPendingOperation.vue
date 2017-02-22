<template>
    <app-header active='sickbed-order'></app-header>
    <div class="container-fluid content">
        <div class="row" style="margin: 0px; border-bottom: 1px solid #ccc">
            <div class="col-sm-12" style="padding: 0px">
                <h4>住院预约名单</h4>
                <a href="javascript:" class="btn btn-default" style="float: right" v-link="{name: 'operation-history', query:{pagenum: 1, fromdate: '', todate: '', patient_name: '', sex: '', result_type: ''}}">住院预约操作记录</a>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <span style="padding: 5px; display: inline-block; font-size: 16px; margin-top: 10px">男性患者住院预约列表</span>
                <div v-if="tktlist_male.length != 0">
                <div v-for="tkt_male in tktlist_male" class="row" style="background-color: #eee; margin: 5px 0px 10px 0px; padding: 15px; border-radius: 4px">
                    <div class="row">
                        <div class="col-sm-4">
                            <span>患者姓名:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.name}}</span><br/>
                            <span>性别:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.sex}}</span>
                        </div>
                        <div class="col-sm-5">
                            <span>提交日期:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.submit_time}}</span>
                            <br/>
                            <span>审核日期:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.auditor_operate_time}}</span>
                        </div>
                        <div class="col-sm-3" style="margin-top: 4px">
                            <a href="javascript:" class="btn btn-warning" @click="refuseOrder($event,tktlist_male, $index)">拒绝入院</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <span>年龄:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.age}}</span><br/>
                            <span>医保类型:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.fee_type | filterFeetype}}</span>
                        </div>
                        <div class="col-sm-5">
                            <span>手机号码:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.mobile}}</span><br/>
                            <span>应住院日期:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_male.plan_date}}</span>
                        </div>
                        <div class="col-sm-3" style="margin-top: 4px">
                            <a href="javascript:" class="btn btn-success" @click="confirmOrder($event, tktlist_male, $index)">确认入院</a>
                        </div>
                    </div>
                </div>
                </div>
                <div v-else>
                    <span style="padding: 5px">暂无男性患者申请住院</span>
                </div>
            </div>
            <div class="col-sm-6">
                <span style="padding: 5px; display: inline-block; font-size: 16px; margin-top: 10px">女性患者住院预约列表</span>
                <div v-if="tktlist_female.length != 0">
                <div v-for="tkt_female in tktlist_female" class="row" style="background-color: #eee; margin: 5px 0px 10px 0px; padding: 15px; border-radius: 4px">
                    <div class="row">
                        <div class="col-sm-4">
                            <span>患者姓名:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.name}}</span><br/>
                            <span>性别:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.sex}}</span>
                        </div>
                        <div class="col-sm-5">
                            <span>提交日期:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.submit_time}}</span>
                            <br/>
                            <span>审核日期:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.auditor_operate_time}}</span>
                        </div>
                        <div class="col-sm-3" style="margin-top: 4px">
                            <a href="javascript:" class="btn btn-warning" @click="refuseOrder($event, tktlist_female, $index)">拒绝入院</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-4">
                            <span>年龄:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.age}}</span><br/>
                            <span>医保类型:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.fee_type | filterFeetype}}</span>
                        </div>
                        <div class="col-sm-5">
                            <span>手机号码:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.mobile}}</span><br/>
                            <span>应住院日期:&nbsp;&nbsp;&nbsp;</span>
                            <span>{{tkt_female.plan_date}}</span>
                        </div>
                        <div class="col-sm-3" style="margin-top: 4px">
                            <a href="javascript:" class="btn btn-success" @click="confirmOrder($event, tktlist_female, $index)">确认入院</a>
                        </div>
                    </div>
                </div>
                </div>
                <div v-else>
                    <span style="padding: 5px">暂无女性患者申请住院</span>
                </div>
            </div>
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
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                tktlist_male: [
                ],
                tktlist_female: [
                ],
            }
        },
        route: {
            data: function(transition) {
                var self = this;
                $.ajax({
                    url: api.get('sickbedorder.tktlist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {

                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.tktlist_male = data.tktlist_male;
                        self.tktlist_female = data.tktlist_female;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
        },
        methods: {
            refuseOrder: function(e, tktlist, index) {
                var self = this;
                e.preventDefault();
                self.$dispatch('show-prompt', "确认要拒绝" + tktlist[index].name +"入院吗?", function(){
                    self.refuseOrderPost(tktlist, index);
                });
            },
            confirmOrder: function(e, tktlist, index) {
                var self = this;
                e.preventDefault();
                self.$dispatch('show-prompt', "确认同意" + tktlist[index].name + "入院吗?", function(){
                    self.confirmOrderPost(tktlist, index);
                })
            },
            refuseOrderPost: function(tktlist, index) {
                var self = this;
                $.ajax({
                    url: api.get('sickbedorder.refuse'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        bedtktid: tktlist[index].id,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', '拒绝成功');
                        tktlist.splice(index, 1);
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            confirmOrderPost: function(tktlist, index) {
                var self = this;
                $.ajax({
                    url: api.get('sickbedorder.pass'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        bedtktid: tktlist[index].id,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', '入院成功');
                        tktlist.splice(index, 1);
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            }
        },
        filters: {
            filterFeetype: function(val) {
                if (val.trim() == 'beijing') {
                    return "北京";
                }else {
                    return "非北京";
                }
            }
        }
    }
</script>