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
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>基本资料</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img class="openorclose" src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event,'baseinfo')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.baseinfo">
                <tr>
                    <td width="40%">姓名</td>
                    <td>{{patient.name}}</td>
                </tr>
                <tr>
                    <td>病历号</td>
                    <td>{{patient.out_case_no}}</td>
                </tr>
                <tr>
                    <td>性别</td>
                    <td>{{patient.sexstr}}</td>
                </tr>
                <tr>
                    <td>生日</td>
                    <td>{{patient.birthday}}</td>
                </tr>
                <tr>
                    <td>民族</td>
                    <td>{{patient.native}}</td>
                </tr>
                <tr>
                    <td>职业</td>
                    <td>{{patient.career}}</td>
                </tr>
                <tr>
                    <td>身份证号码</td>
                    <td>{{patient.prcrid}}</td>
                </tr>
                <tr>
                    <td>就诊卡号</td>
                    <td>{{patient.patientcardno}}</td>
                </tr>
                <tr>
                    <td>患者ID</td>
                    <td>{{patient.id}}</td>
                </tr>
                <tr>
                    <td>医保类型</td>
                    <td>{{patient.fee_type}}</td>
                </tr>
                <tr>
                    <td>婚姻</td>
                    <td>{{patient.marrystatus}}</td>
                </tr>
                <tr>
                    <td>血型</td>
                    <td>{{patient.blood_type}}</td>
                </tr>
                <tr>
                    <td>出生地</td>
                    <td>{{patient.blood_type}}</td>
                </tr>
                <tr>
                    <td>籍贯</td>
                    <td>{{patient.blood_type}}</td>
                </tr>
                <tr>
                    <td>目前居住地</td>
                    <td>{{patient.blood_type}}</td>
                </tr>
                <tr>
                    <td>本人手机号</td>
                    <td>{{patient.blood_type}}</td>
                </tr>
                <tr>
                    <td>邮箱</td>
                    <td>{{patient.blood_type}}</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>备用联系人</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img class="openorclose" src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'other_contacts')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.other_contacts">
                <tr>
                    <td width="40%">手机/姓名/关系</td>
                    <td>{{patient.name}}</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>病历信息</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'out_case_info')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.out_case_info">
                <tr>
                    <td width="40%">建档日期</td>
                    <td>{{patient.createdate}}</td>
                </tr>
                <tr>
                    <td>主治医师</td>
                    <td>{{patient.doctor}}</td>
                </tr>
                <tr>
                    <td>医院</td>
                    <td>{{patient.createdate}}</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>既往病史</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'disease_history')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.disease_history">
                <tr>
                    <td width="40%">常见疾病</td>
                    <td>{{patient.disease_history}}</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>家族史</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'family_history')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.family_history">
                <tr>
                    <td width="40%">详细情况</td>
                    <td>{{patient.family_history}}</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>个人史</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'self_history')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.self_history">
                <tr>
                    <td width="40%">毒物接触</td>
                    <td>1111</td>
                </tr>
                <tr>
                    <td width="40%">饮酒</td>
                    <td>1111</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>吸烟史</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'smoke_history')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.smoke_history">
                <tr>
                    <td width="40%">是否吸烟</td>
                    <td>1111</td>
                </tr>
                <tr>
                    <td>环境接触</td>
                    <td>1111</td>
                </tr>
                <tr>
                    <td>吸烟指数</td>
                    <td>1111</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>月经史</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'menstruation_history')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.menstruation_history">
                <tr>
                    <td width="40%">初次月经</td>
                    <td>1111</td>
                </tr>
                <tr>
                    <td>月经状况</td>
                    <td>1111</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>生育史</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'birth_history')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.birth_history">
                <tr>
                    <td width="40%">生育</td>
                    <td>1111</td>
                </tr>
                <tr>
                    <td>怀孕时间</td>
                    <td>1111</td>
                </tr>
                <tr>
                    <td>剩余时间</td>
                    <td>1111</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>过敏史</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'alergy_history')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.alergy_history">
                <tr>
                    <td width="40%">药物</td>
                    <td>1111</td>
                </tr>
            </table>
        </div>
        <div style="margin-top: 10px;">
            <div style="text-align: left">
                <h4>其他</h4>
                <div style="display: inline-block; float: right; line-height: 2">
                    <img src="../../../static/close.png" width="23" height="23" style="padding: 5px;" @touchstart="openOrClose($event, 'other')">
                </div>
                <div style="clear: both"></div>
            </div>
            <table class="table" v-show="status.other">
                <tr>
                    <td width="40%">药物</td>
                    <td>1111</td>
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
                labelStatusText: '收起全部',
                labelStatus: 1,

                status: {
                    baseinfo: true,
                    other_contacts: true,
                    out_case_info: true,
                    disease_history: true,
                    family_history: true,
                    self_history: true,
                    smoke_history: true,
                    menstruation_history: true,
                    birth_history: true,
                    alergy_history: true,
                    other: true,
                },

                patient: {
                    name: '张三',
                    sexstr: '男',
                    agestr: '35岁',
                    disease: '肺癌',  //多疾病的情况没考虑
                },
            }
        },
        methods: {
            changeLabelStatus: function() {
                var that = this;
                this.labelStatus  = this.labelStatus == 0 ? 1: 0;
                this.labelStatusText = this.labelStatusText == '展开全部' ? '收起全部' : '展开全部';

                console.log(this.labelStatus, '-----', this.labelStatusText);
                if (this.labelStatus == 1) {
                    console.log('xxx');
                    $("img").each(function(index, ele){
                        ele.src = '../../../static/close.png';
                    })
                    Object.keys(that.status).map(function(one){
                        that.status[one] = true;
                    })
                }else {
                    console.log('yyyy');
                    $("img").each(function(index, ele){
                        ele.src = '../../../static/open.png';
                    })
                    Object.keys(that.status).map(function(one){
                        that.status[one] = false;
                    })
                }
            },
            openOrClose: function(e, itemname){
                console.log('e:',e, '---itemname:', itemname);
                this.status[itemname] = !this.status[itemname];
                if (this.status[itemname]) {
                    e.srcElement.src = '../../../static/close.png';
                }else {
                    e.srcElement.src = '../../../static/open.png';
                }
            },
        },
        created: function() {
            var openid = localStorage.getItem('_openid_');
            var patientid = this.$route.params.patientid;
            var url = api.get('patient.allinfo');
            var params = {
                openid: openid,
                patientid: patientid,
            }
            common.post(url, params, function(response){
                // console.log('3333');
                console.log(response);
            })
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