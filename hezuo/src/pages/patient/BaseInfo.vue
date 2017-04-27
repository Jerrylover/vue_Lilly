<template>
    <div class="BaseInfo">
        <div style="text-align: left; border: 1px solid #ccc;padding: 5px; border-radius: 4px;display: block; margin-top: -50px">
            <div style="display: inline-block; padding: 5px">
                <span>{{patient.name}}&nbsp;&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;&nbsp;{{patient.agestr}}&nbsp;&nbsp;&nbsp;{{patient.disease}}</span>
            </div>
            <div style="display: inline-block; float: right">
                <a class="aforclick" href="javascript:" style="text-decoration: none;float: right; padding: 5px" @touchstart="changeLabelStatus">{{labelStatusText}}</a>
            </div>
        </div>
        <div style="margin-top: 10px;" v-for="(group, index) in groups">
            <div style="text-align: left">
                <h4>{{group.title}}</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img class="openorclose" src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, group, index)">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="group.openstatus">
                <tr v-for="item in group.items">
                    <td width="40%">{{item.title}}</td>
                    <td>{{item.value}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    module.exports = {
        data: function() {
            return {
                groups:[],

                labelStatusText: '收起全部',
                labelStatus: 1,
                patient: {},
            }
        },
        methods: {
            changeLabelStatus: function() {
                var that = this;
                this.labelStatus  = this.labelStatus == 0 ? 1: 0;
                this.labelStatusText = this.labelStatusText == '展开全部' ? '收起全部' : '展开全部';

                // console.log(this.labelStatus, '-----', this.labelStatusText);
                if (this.labelStatus == 1) {
                    console.log('xxx');
                    $(".openorclose").each(function(index, ele){
                        ele.src = '../../../static/close.png';
                    })
                    console.log('111111');
                    this.groups.map(function(one){
                        one.openstatus = true;
                    })
                }else {
                    console.log('yyyy');
                    $(".openorclose").each(function(index, ele){
                        ele.src = '../../../static/open.png';
                    })
                    this.groups.map(function(one){
                        one.openstatus = false;
                    })
                }
            },
            openOrClose: function(e, group, index){
                // console.log(index);
                // console.log(group);
                group.openstatus = !group.openstatus;
                this.$set(this.groups, index, group);
                if (group.openstatus) {
                    e.srcElement.src = '../../../static/close.png';
                }else {
                    e.srcElement.src = '../../../static/open.png';
                }
            },
        },
        created: function() {
            var self = this;
            var patientid = this.$route.params.patientid;
            var url = api.get('patient.allinfo');
            var params = {
                patientid: patientid,
            }
            common.post(url, params, function(response){
                self.groups = response.data.info_arr;
                self.groups.map(function(one){
                    one.openstatus = true;
                })
            })
            var url = api.get('patient.info');
            var params = {
                patientid: patientid,
            }
            common.post(url, params, function(response){
                console.log(response);
                var data = response.data;
                self.patient = data;
            })
        },
        mounted: function() {
            document.title = "基本资料";
        }
    }
</script>
<style scoped>
    .aforclick {
        -webkit-tap-highlight-color:transparent;
    }
    .table {
        border: 1px solid #ccc;
        border-collapse: collapse;
        width: 100%;
    }
    .table td {
        padding: 5px;
        border: 1px solid #ccc;
    }
    .table tr {
        text-align: center
    }
    h4 {
        display: inline-block;
        padding-left: 5px;
        border-left: 4px solid #1996ea;
        margin: 5px;
    }
</style>
