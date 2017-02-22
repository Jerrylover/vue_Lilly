<template>
    <div>
    <app-header active='patient'></app-header>
    <div class="container-fluid content">
        <visit-header v-if="routepath == 'patient-revisitrecord'" :patientname='patientname' active='revisitrecords' :patientid="patientid"></visit-header>
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
        <div class="row" v-if="isCancer">
            <div class="mg-t-20">
                <div class="checkbox checkbox-inline checkbox-success">
                    <input type="checkbox" id="menzhen" value="门诊" v-model="filterTypes"/>
                    <label for="menzhen">门诊</label>
                </div>
                <div class="checkbox checkbox-inline checkbox-success">
                    <input type="checkbox" id="zhuyuan" value="住院" v-model="filterTypes"/>
                    <label for="zhuyuan">住院</label>
                </div>
                <div class="checkbox checkbox-inline checkbox-success">
                    <input type="checkbox" id="chuyuan" value="出院" v-model="filterTypes"/>
                    <label for="chuyuan">出院</label>
                </div>
                <div class="checkbox checkbox-inline checkbox-success">
                    <input type="checkbox" id="zhiliao" value="治疗" v-model="filterTypes"/>
                    <label for="zhiliao">治疗</label>
                </div>
            </div>
        </div>
        <div class="row" v-if="revisitrecords.length > 0">
            <div class="col-sm-12" v-for="revisitrecord in revisitrecords" style="padding:0" :key="revisitrecord.id">
                <template v-if="revisitrecord.typestr == '治疗'">
                    <div class="header header-1" @click="clickChemoHeader(revisitrecord, $event)">
                        <span class="fa" :class="{'fa-minus-square-o': chemoMaps[revisitrecord.id] == true, ' fa-plus-square-o': chemoMaps[revisitrecord.id] == false}" aria-hidden="true"></span><span>&nbsp;&nbsp;{{revisitrecord.startdate}}</span><span style="color:#3c763d"> 治疗 {{revisitrecord.hospital}}</span>
                    </div>
                    <transition name="toggle">
                    <div class="checkup-data" v-if="chemoMaps[revisitrecord.id]">
                        <table class="table table-bordered" style="border-top:0">
                            <thead>
                                <tr style="background-color:#f5f6fa;">
                                    <th>医院/时间/方案/性质/疗程</th>
                                    <th>进展原因</th>
                                    <th width="25%">具体用药</th>
                                    <th>疗效</th>
                                    <th>评价依据</th>
                                    <th width="15%">不良反应</th>
                                    <th>放疗</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>化疗医院：{{revisitrecord.hospital}}</p>
                                        <p>开始时间：{{revisitrecord.startdate}}</p>
                                        <p>化疗方案：{{revisitrecord.pkg_name}}</p>
                                        <p>化疗性质：{{revisitrecord.type}}</p>
                                        <p>化疗疗程：{{revisitrecord.stage}}</p>
                                    </td>
                                    <td>{{revisitrecord.progress_reason}}</td>
                                    <td class="mytd" v-html="formatePkgItems(revisitrecord.pkg_items)"></td>
                                    <td>{{revisitrecord.effect_name}}</td>
                                    <td>{{revisitrecord.effect_content}}</td>
                                    <td class="mytd" v-html="formteSideEffectItems(revisitrecord.sideeffect_items)"></td>
                                    <td class="mytd" v-html="formateXContent(revisitrecord)"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </transition>
                </template>
                <template v-else>
                    <div class="header header-1" @click="clickHeader(revisitrecord, $event)">
                        <span class="fa" :class="{'fa-minus-square-o': dates[revisitrecord.thedate] == true, ' fa-plus-square-o': dates[revisitrecord.thedate] == false}" aria-hidden="true"></span><span v-html="getNewSpanContent1(revisitrecord)"></span>
                        <span class="title" v-for="(title, index) in getCheckupTitles(revisitrecord)" :key="index">{{title}}</span>
                    </div>
                    <transition name="toggle">
                    <div class="checkup-data" v-if="dates[revisitrecord.thedate]">
                        <template v-for="checkup in revisitrecord.checkup">
                            <div class="header header-2">
                                <span>{{checkup.checkuptpl.title}}({{checkup.check_date}}) {{checkup.hospitalstr}}</span>
                            </div>
                            <div class="container-fluid div1">
                                <div class="row trdiv" v-for="rowdata in getData4Row(checkup.xanswersheet.answers)">
                                    <div class="tddiv" v-for="(answer, index) in rowdata" :class="getClass(index, rowdata)">
                                        <span class="col-sm-6" :style="getStyle(1, index, rowdata)">{{answer.xquestionname}}</span>
                                        <span class="col-sm-6" :style="getStyle(2, index, rowdata)" @click="lookFullAnswer($event, answer)" v-html="getContent(answer)">
                                            <!-- <a href="javascript:" class="btn btn-danger btn-xs look-full-a collapse" @click="lookFullAnswer(answer)">查看</a> -->
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    </transition>
                </template>
            </div>
        </div>
        <div v-else class="row text-center">
            <div style="padding:20px;">{{msg}}</div>
        </div>
    </div>
    <app-footer></app-footer>
    </div>
</template>
<style scoped>
    h4 {
        padding-left: 10px;
        border-left: 3px solid #008db9;
    }
    .div-table {
        padding: 0;
    }

    .header {
        margin-top: 20px;
        background-color: #F5F6FA;
        font-weight: bold;
        line-height: 1.4285;
        padding: 8px;
        border: 1px solid #ddd;
    }

    .header-1 span {
        color: #008DB9;
    }

    .header-2 {
        margin-top: 0;
        border-top: 0;
        border-bottom: 0;
    }

    .header-2 span {
        color: #333;
    }

    .checkup-data {
        width: 100%;
    }

    .table th {
        font-weight: normal;
        border-bottom: 0;
    }

    .div1 {
        border: 1px solid #ccc;
    }

    .tddiv {
        padding: 0;
        border-bottom: 1px dashed #ccc;
        border-right: 1px solid #ccc;
        height: 50px;
    }

    .tddiv span {
        padding: 10px 10px 10px 10px;
        height: 49px;
    /*    line-height: 2em;
    */
    overflow: hidden;
}

.tddiv span:first-of-type {
    border-right: 1px solid #ccc;
    background-color: #FBFBFB;
}

.trdiv div:last-of-type {
    border-right: 0;
}

.trdiv:last-of-type div {
    border-bottom: 0;
}

span.title {
    padding-left: 10px;
    padding-right: 10px;
    color: #999;
    font-weight: 500;
}

.look-full-a {
    position: absolute;
    bottom: 0;
    right: 0;
}


/*动画*/

.toggle-enter-active {
    transform-origin: center top;
    animation: showAnimation .2s linear;
    -moz-animation: showAnimation .2s linear;
    -webkit-animation: showAnimation .2s linear;
}

.toggle-leave-active {
    transform-origin: center top;
    animation: hideAnimation .2s linear;
    -moz-animation: hideAnimation .2s linear;
    -webkit-animation: hideAnimation .2s linear;
}

@keyframes showAnimation {
    0% {
        transform: scaleY(0.1);
        -moz-transform: scaleY(0.1);
        -webkit-transform: scaleY(0.1);
    }
    100% {
        transform: scaleY(1.0);
        -moz-transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
}

@keyframes hideAnimation {
    0% {
        transform: scaleY(1);
        -moz-transform: scaleY(1);
        -webkit-transform: scaleY(1);
    }
    100% {
        transform: scaleY(0);
        -moz-transform: scaleY(0);
        -webkit-transform: scaleY(0);
    }
}
</style>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    import libpatient from '../../lib/patient.js'
    import util from '../../lib/util.js'
    export default {
        data: function() {
            return {
                projectid: '',
                centerid: '',
                doctorid: '',
                dg_group: '0',
                routepath: '',
                patientname: '',
                revisitrecords: [],
                chemos: [],
                c: 4, //必须能被12整除
                dates: {},
                chemoMaps: {},
                msg: '',
                filterTypes:['门诊', '住院', '出院', '治疗'],
                all: [],
            }
    },
    computed: {
        patientid: function() {
            return this.$route.params.patientid;
        },
        isCancer: function() {
            var diseaseid = common.getDiseaseId();
            return common.isCancerDisease(diseaseid);
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'),
        'appFooter': require('../../components/Footer.vue'),
        'visitHeader': require('../../components/VisitHeader.vue'),
    },
    methods: {
        initPage: function() {
            this.routepath = this.$route.name;
            var query = this.$route.query;
            if (this.routepath == 'doctorgroup-revisitinfo') {
                this.projectid = query.projectid;
                this.centerid = query.centerid;
                this.dg_group = '1';
                this.doctorid = query.doctorid;
            }
            this.fetchData();
            this.fetchPatient();
        },
        formatePkgItems: function(pkgitems) {
            if (pkgitems == '') {
                return '';
            }
            // var html = '<table class="table table-bordered"><tr><td width="20%">药品名</td><td width="25%">实际用量</td><td width="20%">用药途径</td><td width="20%">用药时长</td><td>备注</td></tr>';
            var html = '<table class="table mytable"><tbody>'
            $.each(pkgitems, function(index, pkgitem) {
                html += '<tr><td style="border-top:0;">' + pkgitem.name + '</td><td style="border-top:0;">' + pkgitem.method3 + '</td><td style="border-top:0;">' + pkgitem.pickedmethod4 + '</td><td style="border-top:0;">' + pkgitem.pickedtime + '</td><td style="border-top:0;">' + pkgitem.remark + '</td></tr>';
            })
            html += '</tbody></table>';
            return html;
        },
        formteSideEffectItems: function(sideeffect_items) {
            if (sideeffect_items == '') {
                return '';
            }
            // var html = '<table class="table table-bordered"><tr><td width="20%">名称</td><td width="80%">程度</td></tr>';
            var html = '<table class="table mytable"><tbody>';
            $.each(sideeffect_items, function(index, sideeffect_item) {
                html += '<tr><td style="border-top:0;">' + sideeffect_item[0] + '</td><td style="border-top:0;">' + sideeffect_item[1] + '</td></tr>';
            })
            html += '</tbody></table>';
            return html;
        },
        formateXContent: function(medicine) {
            if (medicine.x_yes == 0 || medicine == '') {
                return '';
            }
            var html = '<table class="table mytable"><tbody>';
            html += '<tr><th style="font-weight:normal;border-top:0;">开始日期</th><td style="border-top:0;">' + medicine.x_startdate + '</td></tr><tr><th style="font-weight:normal;border-top:0;">部位</th><td style="border-top:0;">' + medicine.x_part + '</td></tr>';
            html += '<tr><th style="font-weight:normal;border-top:0;">模式</th><td style="border-top:0;">' + medicine.x_type + '</td></tr><tr><th style="font-weight:normal;border-top:0;">剂量</th><td style="border-top:0;">' + medicine.x_dose + '</td></tr>';
            html += '<tr><th style="font-weight:normal;border-top:0;">持续时间</th><td style="border-top:0;">' + medicine.x_timespan + '天</td></tr>';
            html += '</tbody></table>';
            return html;
        },
        formateTypeStr: function(value) {
            if (common.getDiseaseId() == 3) {
                return '就诊';
            }
            if (value == '' || value == '门诊') {
                return '门诊';
            }
            return '<span style="color:#da0a0a;">' + value + '</span>';
        },
        getNewSpanContent1: function(revisitrecord) {
            return '&nbsp;&nbsp;' + revisitrecord.thedate + this.formateTypeStr(revisitrecord.typestr)
        },
        lookFullAnswer: function(e, answer) {
            if (e.target.scrollHeight > e.target.clientHeight) {
                var str = this.getContent(answer);
                this.$alert(str, '完整内容')
            }
        },
        isFold: function(date) {
            return this.dates[date];
        },
        clickHeader: function(revisitrecord, e) {
            e.preventDefault();
            var obj = {};
            this.dates[revisitrecord.thedate] = !this.dates[revisitrecord.thedate]
            this.dates = Object.assign({}, this.dates);
        },
        clickChemoHeader: function(chemo, e) {
            e.preventDefault();
            var obj = {};
            this.chemoMaps[chemo.id] = !this.chemoMaps[chemo.id];
            this.chemoMaps = Object.assign({}, this.chemoMaps);
        },
        getD: function(index, rowdata) {
            var a = 12 / this.c;
            var l = rowdata.length;
            var d = a;
            if (index == l - 1) {
                d = a + (this.c - l) * a;
            }
            return d;
        },
        getWidth: function(pos, index, rowdata) {
            var width = '';
            var d = this.getD(index, rowdata);
            if (d == 3) {
                return '50%';
            } else if (d == 6) {
                if (pos == 1) {
                    return '24.9%';
                } else if (pos == 2) {
                    return '75.1%';
                }
            } else if (d == 9) {
                if (pos == 1) {
                    return '16.66667%';
                } else if (pos == 2) {
                    return '83.33333%';
                }
            } else if (d == 12) {
                if (pos == 1) {
                    return '12.5%';
                } else if (pos == 2) {
                    return '87.5%';
                }
            }
        },
        getStyle: function(pos, index, rowdata) {
            var width = this.getWidth(pos, index, rowdata);
            var style = 'width:' + width;
            return style;
        },
        getClass: function(index, rowdata) {
            var d = this.getD(index, rowdata);
            var className = 'col-sm-' + d;
            return className;
        },
        getData4Row: function(answers) {
            //删除小标题caption类型
            for (var i=0;i<answers.length;i++) {
                if (answers[i].xquestiontype == 'Caption') {
                    answers.splice(i, 1);
                }
            }
            var data = [];
            var c = this.c;
            var l = answers.length;
            if (l <= c) {
                data.push(answers);
            } else {
                for (var j = 0; j < l; j += c) {
                    data.push(answers.slice(j, j + c));
                }
            }
            return data;
        },
        getContent: function(answer) {
            var optionstr = '';
            if (answer.options.length > 0) {
                for (var i = 0; i < answer.options.length; i++) {
                    var str = answer.options[i].content;
                    if (str.indexOf('阳性') > -1) {
                        str = '<span style="color:red;">' + str + '</span>';
                    }
                    optionstr += str + ' ';
                }
            }
            var content = answer.content;
            var qualitative = answer.qualitative != '请选择' ? answer.qualitative : '';
            if (qualitative == '其他') {
                qualitative += ' ' + content;
                content = '';
            } else if (qualitative == '升高' || qualitative == '降低') {
                qualitative = '<span style="color:red;">' + qualitative + '</span>';
            }
            return optionstr + ' ' + content + ' ' + qualitative;
        },
        getCheckupTitles: function(revisitrecord) {
            var checkups = revisitrecord.checkup;
            var titles = [];
            if (checkups) {
                for (var i = 0; i < checkups.length; i++) {
                    titles.push(checkups[i].checkuptpl.title);
                }
            }
            return titles;
        },
        fetchData: function() { //获取量表数据
            var self = this;
            $.ajax({
                url: api.get('patient.checkuphistory'),
                type: 'post',
                dataType: 'json',
                data: {
                    patientid: self.patientid,
                    doctorid: self.doctorid,
                    dg_group: self.dg_group,
                },
            }).done(function(d) {
                if (d.data == '') {
                    self.msg = '暂无数据';
                }
                self.revisitrecords = d.data.revisitrecords;
                self.chemos = d.data.chemos;
                for (var i = 0; i < self.revisitrecords.length; i++) {
                    if (i == 0) {
                        self.dates[self.revisitrecords[i].thedate] = true;
                    } else {
                        self.dates[self.revisitrecords[i].thedate] = false;
                    }
                }
                for (var i = 0; i < self.chemos.length; i++) {
                    var chemo = self.chemos[i];
                    chemo.thedate = chemo.startdate;
                    chemo.typestr = '治疗';
                    if (self.revisitrecords.length == 0 && i == 0) {
                        self.chemoMaps[chemo.id] = true;
                    } else {
                        self.chemoMaps[chemo.id] = false;
                    }
                    self.revisitrecords.push(chemo);
                }

                self.revisitrecords.sort(function(x, y){
                    var dx = new Date(x.thedate);
                    var dy = new Date(y.thedate);
                    var tx = dx.getTime();
                    var ty = dy.getTime()
                    if (tx > ty) {
                        return -1;
                    } else if (tx < ty) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
                self.all = self.revisitrecords;
            })
        },
        fetchPatient: function() {
            var patientname = libpatient.getPatientName(this.patientid)
            if (patientname) {
                this.patientname = patientname
            } else {
                var self = this;
                $.ajax({
                    url: api.get('patient.baseinfo'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid
                    },
                }).done(function(d) {
                    self.patientname = d.data.name;
                    libpatient.setPatientName(self.patientid, self.patientname);
                })
            }
        }
    },
    filters: {

    },
    created: function() {
        this.initPage()
    },
    watch: {
        filterTypes: function(newVal, oldVal) {
            var that = this;
            var arr = [];
            $.each(that.all, function(index, one) {
                if (util.inArray(newVal, one.typestr)) {
                    arr.push(one)
                }
            })
            that.revisitrecords = arr;
        },
        '$route': 'initPage'
    },
    mounted: function() {

    }
}
</script>
