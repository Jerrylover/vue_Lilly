<template>
    <div class="container-fluid content">
        <breadcrumb pagetitle="住院预约名单">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
            <div class="col-sm-6">
                <span style="padding: 5px; display: inline-block; font-size: 16px; margin-top: 10px">男性患者住院预约列表</span>
                <div v-if="tktlist_male.length != 0">
                <div v-for="(tkt_male, index) in tktlist_male" class="row" style="background-color: #eee; margin: 5px 0px 10px 0px; padding: 15px; border-radius: 4px">
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
                            <a href="javascript:" class="btn btn-warning" @click="refuseOrder($event,tktlist_male, index)">拒绝入院</a>
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
                            <a href="javascript:" class="btn btn-success" @click="confirmOrder($event, tktlist_male, index)">确认入院</a>
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
                <div v-for="(tkt_female, index) in tktlist_female" class="row" style="background-color: #eee; margin: 5px 0px 10px 0px; padding: 15px; border-radius: 4px">
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
                            <a href="javascript:" class="btn btn-warning" @click="refuseOrder($event, tktlist_female, index)">拒绝入院</a>
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
                            <a href="javascript:" class="btn btn-success" @click="confirmOrder($event, tktlist_female,index)">确认入院</a>
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
    export default {
        data: function() {
            return {
                tktlist_male: [
                ],
                tktlist_female: [
                ],
            }
        },
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
        },
        methods: {
            fetchData: function() {
                var self = this;
                api.http({
                  url: 'sickbedorder.tktlist',
                  data: {
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.tktlist_male = data.tktlist_male;
                      self.tktlist_female = data.tktlist_female;
                  }
                })
            },
            refuseOrder: function(e, tktlist, index) {
                var self = this;
                e.preventDefault();
                this.$confirm("确认要拒绝" + tktlist[index].name +"入院吗?", '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    self.refuseOrderPost(tktlist, index);
                }).catch(() => {

                })
            },
            confirmOrder: function(e, tktlist, index) {
                var self = this;
                e.preventDefault();
                this.$confirm("确认同意" + tktlist[index].name +"入院吗?", '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    self.confirmOrderPost(tktlist, index);
                }).catch(() => {

                })
            },
            refuseOrderPost: function(tktlist, index) {
                var self = this;
                api.http({
                  url: 'sickbedorder.refuse',
                  data: {
                    bedtktid: tktlist[index].id,
                  },
                  successCallback: function(d) {
                    self.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '拒绝成功!'
                      });
                    tktlist.splice(index, 1);
                  }
                })
            },
            confirmOrderPost: function(tktlist, index) {
                var self = this;
                api.http({
                  url: 'sickbedorder.pass',
                  data: {
                    bedtktid: tktlist[index].id,
                  },
                  successCallback: function(d) {
                    self.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '入院成功!'
                      });
                    tktlist.splice(index, 1);
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
        },
        created: function() {
            this.fetchData()
            Bus.$emit('make-menu-mini')
        },
        watch: {
            '$route': function(to, from) {
                this.fetchData()
                Bus.$emit('make-menu-mini')
            }
        }
    }
</script>
