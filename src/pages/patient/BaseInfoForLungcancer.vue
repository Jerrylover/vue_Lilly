<template>
    <div>
    <app-header :active='headerselected'></app-header>
    <div class="container-fluid content">

        <visit-header v-if="routepath == 'patient-baseinfo-lungcancer'" :patientname="patientname" :patientid="patientid" active='basic'></visit-header>
        <div v-else class="row">
            <h4>{{patientname}}</h4>
            <ol class="breadcrumb" style="margin: 0">
                <li>返回</li>
                <li><router-link   :to="{name: 'doctorgroup-projectlist'}" style="text-decoration: none">项目列表</router-link></li>
                <li><router-link   :to="{name: 'doctorgroup-centerlist', params:{'projectid': projectid}}" style="text-decoration: none">中心列表</router-link></li>
                <li><router-link   :to="{name: 'doctorgroup-centerdetail', params: {'projectid': projectid, 'centerid': centerid}}" style="text-decoration: none">中心详情</router-link></li>
                <li><router-link   :to="{name: 'doctorgroup-patientlist', query: {'projectid': projectid, 'centerid': centerid, 'doctorid': doctorid}}" style="text-decoration: none">患者列表</router-link></li>
            </ol>
        </div>
        <div class="row">
            <table class="table table-bordered margin-top-20px">
                <tr>
                    <tr id="baseinfohead" class="bg-F5F6FA">
                        <th colspan="6">基本信息
                            <template v-if="routepath == 'patient-baseinfo-lungcancer'">
                                <router-link  v-privilege="'数据库-患者-修改'" style="float: right;margin-right: 10px;" href="javascript:"  :to="{path:'/patient/'+patientid + '/modify-lungcancer/'}">基本信息修改</router-link>
                                <a style="float: right;margin-right: 10px;" href="javascript:" @click.stop="clickBind">{{wxtitle}}</a>
                            </template>
                        </th>
                    </tr>
                    <tr>
                        <td class="col-lg-2 col-md-2 col-sm-2">姓名</td>
                        <td class="col-lg-2 col-md-2 col-sm-2">{{patientInfo.name}}</td>
                        <td class="col-lg-2 col-md-2 col-sm-2">病历号</td>
                        <td class="col-lg-2 col-md-2 col-sm-2">{{patientInfo.out_case_no}}</td>
                        <td class="col-lg-2 col-md-2 col-sm-2 ">性别</td>
                        <td>{{patientInfo.sexinfo}}</td>
                    </tr>
                    <tr>
                        <td>生日</td>
                        <td>{{patientInfo.birthday}}</td>
                        <td>民族</td>
                        <td>{{patientInfo.nation}}</td>
                        <td>职业</td>
                        <td>{{patientInfo.career}}</td>
                    </tr>
                    <tr>
                        <td>身份证号</td>
                        <td>{{patientInfo.prcrid}}</td>
                        <td>就诊卡号</td>
                        <td>{{patientInfo.patientcardno}}</td>
                        <td>患者ID</td>
                        <td>{{patientInfo.patientcard_id}}</td>
                    </tr>
                    <tr>
                        <td>医保类型</td>
                        <td>{{patientInfo.fee_type | filterFeetype}}</td>
                        <td>婚姻</td>
                        <td>{{patientInfo.marry_status}}</td>
                        <td>血型</td>
                        <td>{{patientInfo.blood_type.first}}&nbsp;&nbsp;&nbsp;{{patientInfo.blood_type.second}}</td>
                    </tr>
                    <tr>
                        <td>出生地</td>
                        <td>{{patientInfo.birth_place.provincestr}}&nbsp;&nbsp;&nbsp;{{patientInfo.birth_place.citystr}}</td>
                        <td>籍贯</td>
                        <td>{{patientInfo.native_place.provincestr}}&nbsp;&nbsp;&nbsp;{{patientInfo.native_place.citystr}}</td>
                        <td>目前居住地</td>
                        <td>{{patientInfo.address.provincestr}}&nbsp;&nbsp;&nbsp;{{patientInfo.address.citystr}}</td>
                    </tr>
                    <tr>
                        <td>本人手机</td>
                        <td>{{patientInfo.mobile}}</td>
                        <td>邮箱</td>
                        <td>{{patientInfo.email}}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>备用联系人</td>
                        <td>{{patientInfo.other_contacts[0].name}}</td>
                        <td>关系</td>
                        <td>{{patientInfo.other_contacts[0].shipstr}}</td>
                        <td>手机</td>
                        <td>{{patientInfo.other_contacts[0].mobile}}</td>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA">
                        <th colspan="6">病历信息</th>
                    </tr>
                    <tr>
                        <td>建档日期</td>
                        <td>{{patientInfo.create_doc_date}}</td>
                        <td>主治医生</td>
                        <td>{{doctorname}}</td>
                        <td>医院</td>
                        <td>{{hospital}}</td>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA">
                        <th colspan="6">既往病史</th>
                    </tr>
                    <tr>
                        <td>常见疾病</td>
                        <td colspan="3">{{patientInfo.past_main_history | filter_Past_main_history}}</td>
                        <!--
                        <td>其他疾病</td>
                        <td colspan="3">{{patientInfo.past_other_history}}</td>
                    -->
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA">
                        <th colspan="6">家族史</th>
                    </tr>
                    <tr>
                        <td>详细情况</td>
                        <td colspan="5" v-html="filterFamilyHistory(patientInfo.family_history)">
                        </td>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA">
                        <th colspan="6">个人史</th>
                    </tr>
                    <tr>
                        <td>毒物接触</td>
                        <td>{{patientInfo.self_history.first}}&nbsp;&nbsp;&nbsp;{{patientInfo.self_history.second}}</td>
                        <td>饮酒</td>
                        <td colspan="3">{{patientInfo.self_history.third}}&nbsp;&nbsp;&nbsp;{{patientInfo.self_history.fourth}}</td>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA">
                        <th colspan="6">吸烟史</th>
                    </tr>
                    <tr>
                        <td>吸烟</td>
                        <td>{{patientInfo.smoke_history.first}}</td>
                        <td>环境接触</td>
                        <td>{{patientInfo.smoke_history.second | filterSmokeSecond}}&nbsp;&nbsp;{{patientInfo.smoke_history.third}}</td>
                        <td>吸烟指数</td>
                        <td>{{patientInfo.smoke_history.fourth | filterSmokeFourth}}</td>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA" :class="{'hidden':hideFemalePart}">
                        <th colspan="6">月经史</th>
                    </tr>
                    <tr :class="{'hidden':hideFemalePart}">
                        <td>初次月经</td>
                        <td>{{patientInfo.firstMenstruationAge}}</td>
                        <td>月经状况</td>
                        <td>{{patientInfo.menstruationStatus}}</td>
                        <template v-if="patientInfo.menstruationStatus =='正常' ">
                            <td>月经周期</td>
                            <td>{{patientInfo.menstruationPeriod}}</td>
                        </template>
                        <template v-if="patientInfo.menstruationStatus == '停经'">
                            <td>停经原因</td>
                            <td>{{patientInfo.menstruationStopPicked}}&nbsp;&nbsp;&nbsp;{{patientInfo.menstruationStopTime}}&nbsp;&nbsp;&nbsp;{{patientInfo.menstruationStopReason}}</td>
                        </template>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA" :class="{'hidden':hideFemalePart}">
                        <th colspan="6">生育史</th>
                    </tr>
                    <tr :class="{'hidden':hideFemalePart}">
                        <td>生育</td>
                        <td colspan="5">{{patientInfo.childbirth}}</td>
                    </tr>
                    <tr :class="{'hidden':hideFemalePart}">
                        <td>怀孕时间</td>
                        <td colspan="5">{{patientInfo.pregnantTime}}</td>
                    </tr>
                    <tr :class="{'hidden':hideFemalePart}">
                        <td>生育时间</td>
                        <td colspan="5">{{patientInfo.childbirthTime}}</td>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA">
                        <th colspan="6">过敏史</th>
                    </tr>
                    <tr>
                        <td>药物</td>
                        <td colspan="5">{{patientInfo.allergy_history}}</td>
                    </tr>
                </tr>
                <tr>
                    <tr class="bg-F5F6FA">
                        <th colspan="6">其他</th>
                    </tr>
                    <tr>
                        <td>其他</td>
                        <td colspan="5">{{patientInfo.remark_doctor}}</td>
                    </tr>
                </tr>
            </table>
        </div>
    </div>
    <div id="modal">
    <modal :show="showModal" width="800px">
        <div slot="header">
            <span class="header-span">绑定微信号</span>
            <i class="fa fa-times-circle fa-lg" @click.stop="closeModal"></i>
        </div>
        <div slot="body">
            <div class="form-group has-feedback">
                <input type="text" class="form-control" placeholder="请输入微信名" v-model="keyword" @keyup.enter='doSearch($event)'>
                <span class="glyphicon glyphicon-search form-control-feedback" style="color:#ccc"></span>
            </div>
            <table class="table">
                <tr style="background-color: #fff;">
                    <td style="padding-top:0;padding-bottom: 0;border-top:0">
                        <table class="table" style="margin-bottom: 0">
                            <thead>
                                <tr style="background-color: #fff">
                                    <th width="30%">微信名</th>
                                    <th width="30%">关注时间</th>
                                    <th>报到</th>
                                    <th width="10%">操作</th>
                                </tr>
                            </thead>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div id="table-wrapper" style="height:300px;overflow: auto;">
                            <table class="table table-bordered table-hover">
                                <tbody>
                                    <tr v-for="wxuser in wxusers">
                                        <td style="background-color: #fff;" width="30%">{{wxuser.nickname}}</td>
                                        <td style="background-color: #fff;" width="30%">{{wxuser.createtime}}</td>
                                        <td style="background-color: #fff;">{{wxuser.baodao | desc}}</td>
                                        <td style="background-color: #fff;" width="10%">
                                            <a class="scale" href="javascript:" v-if="wxuser.baodao == 0" @click.stop="bindWx(wxuser.wxuserid)">绑定</a>
                                            <span v-else>已绑定</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div slot="footer">
            <div class="text-right">
                <a class="btn btn-primary" @click.stop="closeModal" style="margin-right:20px;">关闭</a>
            </div>
        </div>
    </modal>
    </div>
    <app-footer></app-footer>
    </div>
</template>
<style scoped>
    h4 {
        padding-left: 10px;
        border-left: 3px solid #008db9;
    }
.modal-body {
    margin-top: 0;
}

.header-span {
    color: #fff;
}

.bg-F5F6FA {
    background-color: #F5F6FA;
}

.margin-top-20px {
    margin-top: 20px;
}

table tr:nth-child(1) {
    background-color: #F5F6FA;
}

td:nth-child(2n+1) {
    background-color: #FBFBFB;
}

.bg-F5F6FA {
    background-color: #F5F6FA;
}

#baseinfohead {
    background-color: #F5F6FA;
}

table thead tr {
    background-color: #F5F6FA;
}

table thead th {
    border-bottom-width: 0;
    font-weight: 500;
}

.fa-times-circle {
    float: right;
    color: white;
    cursor: pointer;
    margin-top: 3px;
    margin-right: 5px;
}
</style>
<script>
import util from '../../lib/util.js';
import common from '../../lib/common.js';
import api from '../../config/api.js';
import libpatient from '../../lib/patient.js'
export default {
    data: function() {
        return {
            headerselected: 'patient',
            projectid: '',
            centerid: '',
            doctorid: '',
            dg_group: '',
            routepath: '',

            isbindwx: false,
            wxnickname: '',
            showModal: false,
            wxusers: [],
            keyword: '',
            // doctorname:"",
            // hospital: "",
            // patientname: "",
            hideFemalePart: true,
            patientname: "",
            patientInfo: {
                id: "",
                name: "123",
                out_case_no: "",
                sex: 1,
                sexinfo: "",
                birthday: "",
                nation: "",
                career: "",
                prcrid: "",
                marry_status: "",
                blood_type: {
                    first: '',
                    second: '',
                },
                birth_place: {
                    provincestr: '',
                    citystr: '',
                },
                native_place: {
                    provincestr: '',
                    citystr: '',
                },
                address: {
                    provincestr: '',
                    citystr: '',
                },
                address: "",
                provincestr: "",
                citystr: "",
                native_place: "",
                mobile: "",
                other_contacts: [
                    {
                        name: '',
                        shipstr: '',
                        mobile: '',
                    }
                ],
                create_doc_date: "",
                autoimmune_illness: "",
                other_illness: "",
                family_history: "",
                menstruation_history: "",
                firstMenstruationAge: "",
                menstruationStatus: "",
                menstruationPeriod: "",
                menstruationStopPicked: '',
                menstruationStopReason: '',
                childbearing_history: "",
                menstruationStopTime: "",
                childbirth: "",
                pregnantTime: "",
                childbirthTime: "",
                allergy_history: "",
                self_history: {
                    first: '',
                    second: '',
                    third: '',
                    fourth: '',
                },
                smoke_history: {
                    first: '',
                    second: '',
                    third: '',
                    fourth: '',
                }
            }
        }
    },
    route: {
        data: function(transition) {
            var that = this;
            var patientname = libpatient.getPatientName(that.patientid)
            that.routepath = this.$route.name;
            console.log(transition);
            if (that.routepath == 'doctorgroup-baseinfo-lungcancer') {
                that.headerselected = 'doctorgroup';
                that.projectid = transition.to.query.projectid;
                that.centerid = transition.to.query.centerid;
                that.doctorid = transition.to.query.doctorid;
                that.dg_group = '1';
            }
            if (patientname) {
                that.patientname = patientname;
            }
            //获取wxuser信息
            if (that.routepath != 'doctorgroup-baseinfo-lungcancer') {
                that.fetchWxUser();
            }
            $.ajax({
                url: api.get('patient.baseinfo'),
                type: "post",
                dataType: "json",
                data: {
                    patientid: that.patientid,
                    dg_group: that.dg_group,
                }
            }).done(function(response) {
                var patientInfo = response.data;
                that.patientInfo = patientInfo;
                that.patientname = that.patientInfo.name;

                if ($.trim(that.patientInfo.past_main_history) != '') {
                    var index = that.patientInfo.past_main_history.indexOf('+');
                    var other = '';
                    var past_main_history = "";
                    if (index > -1) {
                        other = that.patientInfo.past_main_history.substring(index + 1, that.patientInfo.past_main_history.length);
                        past_main_history = that.patientInfo.past_main_history.substring(0, index);
                        that.patientInfo.past_main_history = past_main_history.replace(/\|/g, ',') + ',' + other;
                    }else {
                        that.patientInfo.past_main_history = that.patientInfo.past_main_history.replace(/\|/g, ",");
                    }
                }

                if (that.patientInfo.sex == 1) {
                    that.patientInfo.sexinfo = "男";
                    that.hideFemalePart = true;
                } else if (that.patientInfo.sex == 2) {
                    that.patientInfo.sexinfo = "女";
                    that.hideFemalePart = false;
                    if ($.trim(that.patientInfo.menstruation_history) != "") {
                        var menstruationArr = that.patientInfo.menstruation_history.split("|");
                        if (menstruationArr[0] != undefined) {
                            that.patientInfo.firstMenstruationAge = menstruationArr[0];
                        } else {
                            that.patientInfo.firstMenstruationAge = " ";
                        }

                        if (menstruationArr[1] != undefined && menstruationArr[1] == '正常') {
                            that.patientInfo.menstruationStatus = menstruationArr[1];
                            that.patientInfo.menstruationPeriod = menstruationArr[2]+ "天/" + menstruationArr[3]+ "天";
                        } else if(menstruationArr[1] != undefined && menstruationArr[1] == '停经'){
                            that.patientInfo.menstruationStatus = menstruationArr[1];
                            if (menstruationArr[2] != undefined && menstruationArr[2] == "生理性") {
                                that.patientInfo.menstruationStopPicked = menstruationArr[2];
                                that.patientInfo.menstruationStopTime = menstruationArr[3] + '岁';
                            }else if(menstruationArr[2] != undefined && menstruationArr[2] == '病理性') {
                                that.patientInfo.menstruationStopPicked = menstruationArr[2];
                                that.patientInfo.menstruationStopReason = menstruationArr[3];
                            }
                        }
                    }
                    if ($.trim(that.patientInfo.childbearing_history) != "") {
                        var childbirthString = that.patientInfo.childbearing_history.split("|");
                        if (childbirthString[0] != undefined && $.trim(childbirthString[0]) != "" && childbirthString[1] != undefined && $.trim(childbirthString[1]) != "") {
                            that.patientInfo.childbirth = "孕" + childbirthString[0] + "产" + childbirthString[1];
                        } else {
                            that.patientInfo.childbirth = " ";
                        }

                        if (childbirthString[2] != undefined) {
                            that.patientInfo.pregnantTime = childbirthString[2];
                        } else {
                            that.patientInfo.pregnantTime = " ";
                        }

                        if (childbirthString[3] != undefined) {
                            that.patientInfo.childbirthTime = childbirthString[3];
                        } else {
                            that.patientInfo.childbirthTime = " ";
                        }
                    }
                } else if (that.patientInfo.sex == 0) {
                    that.patientInfo.sexinfo = "未知";
                    that.hideFemalePart = false;
                }
            });
            if (!util.isObject(that.patientInfo.birth_place)) {
                that.patientInfo.birth_place = {provincestr: "", citystr: ''};
            }
            if (!util.isObject(that.patientInfo.address)) {
                that.patientInfo.address = {provincestr: '', citystr: ''};
            }
            if (!util.isArray(that.patientInfo.other_contacts)) {
                that.patientInfo.other_contacts = [{name: '', shipstr: '', mobile: ''}];
            }
            if (!util.isObject(that.patientInfo.native_place)) {
                that.patientInfo.birth_place = {provincestr: '', citystr: ''};
            }
            if (!util.isObject(that.patientInfo.blood_type)) {
                that.patientInfo.blood_type = {first: '', second: ''};
            }
            if (!util.isObject(that.patientInfo.self_history)) {
                that.patientInfo.self_history = {first: '', second: '', third: '', fourth: ''};
            }
            if (!util.isObject(that.patientInfo.smoke_history)) {
                that.patientInfo.self_history = {first: '', second: '', third: '', fourth: ''};
            }

        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'),
        'appFooter': require('../../components/Footer.vue'),
        'visitHeader': require('../../components/VisitHeader.vue'),
        'modal': function(resolve) {
            require(['../../components/Modal.vue'], resolve);
        }
    },
    computed: {
        doctorname: function() {
            return common.getName();
        },
        hospital: function() {
            return common.getHospital();
        },
        wxtitle: function() {
            if (this.isbindwx) {
                return '已绑定微信：(' + this.wxnickname + ')';
            }
            return '绑定微信';
        },
        patientid: function() {
            return this.$route.params.patientid != undefined ? this.$route.params.patientid : '';
        }
    },
    methods: {
        filterFamilyHistory: function(val) {
            console.log(val);
            var str = '';
            for (var i=0;i<val.length;i++) {
                var one = val[i];
                str += one.disease + ' ' + one.content + '<br />';
            }
            return str;
        },
        'clickBind': function() {
            if (this.isbindwx) {
                return;
            }
            this.fetchUnbindWxUser();
            this.showModal = true;
            $('#modal').removeClass("hidden");
            $('body').addClass('no-scroll');
        },
        'bindWx': function(wxuserid) {
            if (!window.confirm('确定要绑定吗？')) {
                return;
            }
            var that = this;
            $.ajax({
                url: api.get('patient.bindwxuser'),
                type: "post",
                dataType: "json",
                data: {
                    patientid: that.patientid,
                    wxuserid: wxuserid,
                }
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    alert(d.errmsg);
                } else {
                    alert('绑定成功');
                    that.keyword = '';
                    that.fetchUnbindWxUser();
                    that.fetchWxUser();
                }
            })
        },
        'doSearch': function(e) {
            e.preventDefault();
            this.searchWxUsers();
        },
        'fetchWxUser': function() {
            var that = this;
            $.ajax({
                url: api.get('patient.getwxuser'),
                type: "post",
                dataType: "json",
                data: {
                    patientid: that.patientid,
                }
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$emit('show-alert', d.errmsg);
                } else {
                    if (d.data.isbindwx == 1) {
                        that.isbindwx = true;
                        that.wxnickname = d.data.wxnickname;
                    }
                }
            })

        },
        'fetchUnbindWxUser': function() {
            var that = this;
            $.ajax({
                url: api.get('patient.getunbindwxusers'),
                type: "post",
                dataType: "json",
                data: {}
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$emit('show-alert', d.errmsg);
                } else {
                    that.wxusers = d.data;
                }
            })
        },
        'searchWxUsers': function() {
            if (!this.keyword) {
                this.fetchUnbindWxUser();
            } else {
                var that = this;
                $.ajax({
                    url: api.get('patient.searchwxusers'),
                    type: "post",
                    dataType: "json",
                    data: {
                        'keyword': that.keyword
                    }
                }).done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                        that.$emit('show-alert', d.errmsg);
                    } else {
                        that.wxusers = d.data;
                    }
                })
            }


        },
        'closeModal': function() {
            $('body').removeClass('no-scroll');
            $('#modal').addClass('hidden');
            this.showModal = false;
        }
    },
    filters: {
        'desc': function(value) {
            if (value == 1) {
                return '是';
            } else {
                return '否';
            }
        },
        filterSmokeSecond: function(value) {
            if (typeof value == 'string') {
                var arr = value.split(',');
                var str = arr.join(' ');
                return $.trim(str);
            }
            return value;
        },
        filterSmokeFourth: function(value) {
            if (typeof value == 'string') {
                var str = '';
                var arr = value.split(',');
                if (arr[0] != undefined && arr[0] != '') {
                    str += arr[0] + '支/天';
                }
                if (arr[1] != undefined && arr[1] != '') {
                    str += ' X ' + arr[1] + '年';
                }
                if (arr[2] != undefined && arr[2] != '') {
                    str += ' = ' + arr[2];
                }
                return $.trim(str);
            }
            return value;
        },
        filter_Past_main_history: function(value) {
            if (typeof value == 'string') {
                var arr = value.split(',');
                var str = arr.join(' ');
                return $.trim(str);
            }
            return value;
        },

        filterFeetype: function(val) {
            if (typeof val != 'object') {
                return '';
            }
            return val.select + ' ' + val.beizhu;
        }
    }
}
</script>
