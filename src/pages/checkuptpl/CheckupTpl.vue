<template>
    <div>
<div class="question-content container-fluid">
    <form class="form-horizontal">
        <div class="form-group  question-group" v-if='isShowDate'>
            <div class="col-sm-7 row">
                <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label">{{dateTitle}}</label>
                <div class="col-lg-9 col-sm-8">
                    <div :class="{'has-error has-feedback': iserror, 'has-feedback': !iserror}">
                        <el-date-picker v-model="value" type="date" placeholder="请选择日期"></el-date-picker>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group question-group" v-if='isShowHospital'>
            <div class="col-sm-7 row">
                <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label question-label">{{hospitalTitle}}</label>
                <div class="col-lg-9 col-sm-8">
                    <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                        <input v-for="(option, index) in hospitals" type="radio" :id="'hospitalRadio' + index" v-model='hospital' name="_hospital" :value="option">
                        <label v-for="(option, index) in hospitals" :for="'hospitalRadio' + index" @click="clickLabel(option, $event)" :class="{active1: hospital == option}">{{option}}</label>
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-sm-3" v-if="hospital == '其他'">
                <input type='text' class="form-control" v-model='hospitalother' name="_hospitalother" :value="hospitalother">
            </div>
        </div>
        <component v-for="question in questions" :is='question.type2' :question='question' :checkuptpl='checkuptpl' :questionsheet='questionsheet' :answer='answers[question.id]'></component>
        <div class="form-group" style="margin-top:10px">
            <div class="col-sm-7 row">
                <div class="col-lg-9 col-lg-offset-3 col-sm-8 col-sm-offset-4">
                    <button v-privilege="'数据库-量表-添加和修改'" :disabled='iserror' type="submit" class="btn btn-success btn-save" @click="save($event)">保存</button>
                </div>
            </div>
        </div>
</div>
<div class="history" style="width:100%;max-width:100%;overflow-x:auto">
    <div class='header'>
        历史记录
    </div>
    <div class='div-table'>
        <table class="table table-bordered table-hover mytable">
            <thead>
                <tr>
                    <th class="col-lg-1 col-sm-2" v-if="isShowDate">{{dateTitle}}</th>
                    <th class="col-lg-1 col-sm-2" v-if='isShowHospital'>{{hospitalTitle}}</th>
                    <th v-for="xquestion in data.xquestions">{{xquestion.content}}</th>
                    <th class="col-lg-1 col-sm-2">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="checkup in data.checkups">
                    <td v-if="isShowDate">{{checkup.check_date}}</td>
                    <td v-if='isShowHospital'>{{checkup.hospitalstr}}</td>
                    <td v-for="xquestion in data.xquestions" v-html="getContent(xquestion, checkup)"></td>
                    <td>
                        <a v-privilege="'数据库-量表-添加和修改'" href="javascript:" @click="modifyCheckup(checkup, $event)">修改</a>&nbsp;&nbsp;
                        <a v-privilege="'数据库-量表-删除'" href="javascript:" @click="deleteCheckup(checkup, $event)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="col-sm-12 text-center" v-if="page * pagesize < total">
            <button class="btn btn-default" @click="showMore($event)">查看更多</button>
        </div>
    </div>
</div>
</form>
</div>
</template>
<style scoped>
.btn-save {
    width: 100px;
}

.fa {
    padding: 10px;
    color: #008DB9;
}

.header {
    margin-top: 20px;
    background-color: #F5F6FA;
    font-weight: bold;
    line-height: 1.4285;
    padding: 8px;
    border: 1px solid #ddd;
    border-bottom: 0;
}

.table th {
    font-weight: normal;
    border-bottom: 0;
}
</style>
<script>
import common from '../../lib/common.js';
import api from '../../config/api.js';
import util from '../../lib/util.js'
export default {
    data: function() {
        return {
            edssFs: {}, //edss 需要计算的数据
            edssMovingScore: 0,
            edssFsScore: 0,
            bsaData: {}, //bsa 需要计算的数据
            checkupid: '',
            answers: [], //单个问卷的数组
            checkupAnswers: '', //全部checkup的answer数组
            data: '',
            hospitals: ['本院', '外院', '其他'],
            hospital: '本院',
            hospitalother: '',
            error: false,
            page: 1,
            pagesize: 200,
            total: 0,
            //日历参数
            value: "", //日期
            iserror: false,
            myaction: this.action,
            ismodify: false,
        }
    },
    computed: {
        isShowHospital: function() {
            return this.ename != 'fazuoshi' && this.ename != 'edss' && this.ename != 'bencizhenliaoyizhu' && this.ename != 'zhiliao';
        },
        isShowDate: function() {
            return this.ename != 'fazuoshi' && this.ename != 'edss' && this.ename != 'zhiliao' && this.ename != 'zhongdianshijian';
        },
        hospitalTitle: function() {
            var title = '检查医院'
            if (this.ename == 'zhenduan') {
                title = '诊断医院';
            } else if (this.ename == 'bencizhenliaoyizhu') {
                title = '诊疗医院';
            }
            return title;
        },
        dateTitle: function() {
            var title = '检查日期'
            if (this.ename == 'zhenduan') {
                title = '诊断日期';
            } else if (this.ename == 'bencizhenliaoyizhu') {
                title = '诊疗日期';
            }
            return title;
        },
        showShowMore: function() {
            return this.page * this.pagesize < this.total;
        },
        edssScore: function() {
            var edss = 0;
            if (this.edssMovingScore <= 3.5) {
                edss = this.edssFsScore;
            } else if (this.edssMovingScore >= 4 && this.edssMovingScore <= 5) {
                if (this.edssMovingScore >= this.edssFsScore) {
                    edss = this.edssMovingScore;
                } else {
                    edss = this.edssFsScore;
                }
            } else if (this.edssMovingScore > 5) {
                edss = this.edssMovingScore;
            } else {
                edss = -1;
            }
            return edss;
        }
    },
    props: ['action', 'ename', 'patientid', 'patientname', 'checkuptpl', 'questions', 'questionsheet'],
    components: {
        'FCText': function(resolve) {
            require(['../../components/questions/Text.vue'], resolve);
        },
        'Ymd': function(resolve) {
            require(['../../components/questions/Date.vue'], resolve);
        },
        'MultChoice': function(resolve) {
            require(['../../components/questions/CheckBox.vue'], resolve);
        },
        'MultChoiceWithOther': function(resolve) {
            require(['../../components/questions/CheckBoxWithOther.vue'], resolve);
        },
        'SelectOption': function(resolve) {
            require(['../../components/questions/Select.vue'], resolve);
        },
        'SelectOptionWithOther': function(resolve) {
            require(['../../components/questions/SelectOptionWithOther.vue'], resolve);
        },
        'FCTextArea': function(resolve) {
            require(['../../components/questions/TextArea.vue'], resolve);
        },
        'Radio': function(resolve) {
            require(['../../components/questions/Radio.vue'], resolve);
        },
        'RadioWithOther': function(resolve) {
            require(['../../components/questions/RadioWithOther.vue'], resolve);
        },
        'LongNum': function(resolve) {
            require(['../../components/questions/Number.vue'], resolve);
        },
        'Num': function(resolve) {
            require(['../../components/questions/Number.vue'], resolve);
        },
        'SectionFC': function(resolve) {
            require(['../../components/questions/Date.vue'], resolve);
        },
        'calendar': function(resolve) {
            require(['../../components/calendar.vue'], resolve);
        },
        'FCCaption': function(resolve) {
            require(['../../components/questions/Caption.vue'], resolve);
        }
    },
    methods: {
        doSave: function(data, e) {
            data.hospitalstr = this.hospital;
            if (this.hospital == '其他') {
                data.hospitalstr = this.hospitalother;
            }
            data.patientid = this.patientid;
            data.checkuptplid = this.checkuptpl.id;
            var url = '';
            if (this.ismodify) {
                url = api.get('checkup.modify');
                data.checkupid = this.checkupid;
            } else {
                url = api.get('checkup.add');
            }
            var self = this;
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: data
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    self.$emit('show-alert', d.errmsg);
                } else {
                    self.$message({showClose: true,message: '保存成功'});
                    $(e.target).blur();
                    self.ismodify = false;
                    self.myaction = '添加';
                    self.hospital = '本院';
                    self.hospitalother = '';
                    self.fetchData();
                    self.value = util.getFormatDate();
                    self.$nextTick(function() {
                        self.$emit('modify-done');
                    })
                }
            })
        },
        save: function(e) {
            e.preventDefault();

            var data = util.getFormJson($('form'));
            var diseaseid = common.getDiseaseId();
            data.checkdate = this.value;
            if (this.checkuptpl.ename == 'fazuoshi') {
                data.checkdate = $('input[ename="fazuoshi"]').val();
            } else if (this.checkuptpl.ename == 'edss') {
                data.checkdate = $('input[ename="edss"]').val();
            //以下允许一天有多个量表的情况
            } else if (this.checkuptpl.ename == 'zhiliao') {//徐雁治疗
                data.checkdate = -parseInt(Math.random() * 1000000);
            } else if ((common.isCancerDisease(diseaseid) && (this.checkuptpl.ename == 'huojianbingli' || this.checkuptpl.ename == 'shoushubingli'))) {//王颖轶癌症
                data._checkdate = data.checkdate;
                data.checkdate = -parseInt(Math.random() * 1000000);
            }
            console.log('data', data);

            //判断该日期是否已经存在了
            if (!this.ismodify) { //新增
                if (this.isExist(data.checkdate)) {
                    var that = this;
                    this.$emit('show-prompt', '该日期已经存在检查报告，确定要覆盖吗?', function() {
                        //确定
                        that.doSave(data, e);
                    }, function() {
                        //取消
                        $(e.target).blur();
                    });
                } else {
                    this.doSave(data, e);
                }
            } else { //修改
                if (this.data.hasOwnProperty('checkups')) {
                    for (var i = 0; i < this.data.checkups.length; i++) {
                        var checkup = this.data.checkups[i];
                        if (this.checkupid == checkup.id) { //忽略他自己
                            continue;
                        }
                        if (data.checkdate == checkup.check_date) {
                            //todo 想修改日期成已经存在的检查报告，这里禁止
                            this.$emit('show-alert', '您所选择的日期已经存在量表数据，请修改对应日期的量表，谢谢！');
                            return false;
                        }
                    }
                }
                this.doSave(data, e);
            }


        },
        fetchData: function(append) {
            var self = this;
            $.ajax({
                url: api.get('checkup.list'),
                type: 'post',
                dataType: 'json',
                data: {
                    patientid: self.patientid,
                    checkuptplid: self.checkuptpl.id,
                    pagenum: self.page,
                    pagesize: self.pagesize
                }
            }).done(function(d) {
                self.total = d.data.total;
                if (append === true) {
                    for (var i = 0; i < d.data.checkups.length; i++) {
                        self.data.checkups.push(d.data.checkups[i]);
                    }
                } else {
                    self.data = d.data;
                }
                //由于answers的数量可能小于questions数量
                //构建answers questionid的哈希数组
                var checkupAnswers = {}
                if (self.data.hasOwnProperty('checkups')) {
                    for (var j = 0; j < self.data.checkups.length; j++) {
                        var answers = {};
                        var checkup = self.data.checkups[j];

                        if (!checkup.answersheet.hasOwnProperty('answers')) {
                            continue;
                        }
                        for (var i = 0; i < checkup.answersheet.answers.length; i++) {
                            var answer = checkup.answersheet.answers[i];
                            answers[answer.xquestionid] = answer;
                        }
                        for (var i = 0; i < self.data.xquestions.length; i++) {
                            var questionid = self.data.xquestions[i].xquestionid;
                            if (!(questionid in answers)) {
                                answers[questionid] = {};
                            }
                        }
                        checkupAnswers[checkup.id] = answers;
                    }
                    //过滤列表的列（问题）
                    if (self.data.xquestions.length > 0) {
                        var tmpquestions = [];
                        var diseaseid = common.getDiseaseId();
                        for (var i = 0; i < self.data.xquestions.length; i++) {
                            var xquestion = self.data.xquestions[i];
                            if (diseaseid == 19 && self.checkuptpl.ename == 'fenqi7') {
                                if (xquestion.content == '疾病') {
                                    tmpquestions.push(xquestion);
                                }
                            } else {
                                tmpquestions.push(xquestion);
                            }
                        }
                        self.data.xquestions = tmpquestions;
                    }
                }
                self.checkupAnswers = checkupAnswers;
            })
        },
        getContent: function(xquestion, checkup) {
            if (!this.checkupAnswers.hasOwnProperty(checkup.id) || !this.checkupAnswers[checkup.id].hasOwnProperty(xquestion.xquestionid)) {
                return '';
            }
            var answer = this.checkupAnswers[checkup.id][xquestion.xquestionid]
            if ($.isEmptyObject(answer)) {
                return '';
            }
            var optionContent = '';
            var content = answer.content;
            var qualitative = answer.qualitative != '请选择' ? answer.qualitative : '';
            if (qualitative == '其他') {
                qualitative += ' ' + content;
                content = '';
            } else if (qualitative == '升高' || qualitative == '降低') {
                qualitative = '<span style="color:red;">' + qualitative + '</span>';
            }
            if (answer.options.length > 0) {
                if (this.ename == 'edss' && (xquestion.content == '视觉' || xquestion.content == '大小便')) {
                    var option = answer.options[0]; //单选题，直接取了
                    var edss = require('../../config/edss.js');
                    optionContent = option.content; /*+ '<br>转化后: ' + edss.fs[xquestion.content][option.content];*/
                } else if (this.ename == 'edss' && xquestion.content == '行动') {
                    var option = answer.options[0]; //单选题，直接取了
                    optionContent = option.content.split(' ')[0];
                } else {
                    for (var i = 0; i < answer.options.length; i++) {
                        var option = answer.options[i];
                        var str = option.content;
                        if (option.content == '其他') {
                            continue;
                        } else if (option.content.indexOf('阳性') > -1) {
                            str = '<span style="color:red;">' + option.content + '</span>';
                        }
                        optionContent += str + ' ';
                    }
                }
            }
            var ret = optionContent + ' ' + content;
            if (qualitative != '') {
                ret += ' ' + qualitative;
            }
            return ret;
        },
        isOtherHospital: function(hospitalstr) {
            return hospitalstr != '' && hospitalstr != '本院' && hospitalstr != '外院';
        },
        isExist: function(date) {
            if (!this.data.hasOwnProperty('checkups')) {
                return false;
            }
            for (var i = 0; i < this.data.checkups.length; i++) {
                if (this.data.checkups[i].check_date == date) {
                    return true;
                }
            }
            return false;
        },
        modifyCheckup: function(checkup, e) {
            e.preventDefault();
            if (this.isOtherHospital(checkup.hospitalstr)) {
                this.hospital = '其他';
                this.hospitalother = checkup.hospitalstr;
            } else {
                this.hospital = checkup.hospitalstr ? checkup.hospitalstr : '本院';
                this.hospitalother = '';
            }

            this.value = checkup.check_date;
            // var answers = this.checkupAnswers[checkup.id];
            this.ismodify = true;
            this.myaction = '修改';
            this.checkupid = checkup.id;
            this.$nextTick(function() {
                this.$emit('modify-data')
            })
            window.scrollTo(0, 0);
        },
        deleteCheckup: function(checkup, e) {
            e.preventDefault();
            var that = this;
            this.$emit('show-prompt', '确定要删除该量表吗？', function() {
                $.ajax({
                    url: api.get('checkup.delete'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        checkupid: checkup.id
                    }
                }).done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                        self.$emit('show-alert', d.errmsg);
                    } else {
                        that.$emit('show-popup', '删除成功');
                    }
                    that.fetchData();
                });
            });
        },
        showMore: function(e) {
            e.preventDefault();
            if (this.page * this.pagesize < this.total) {
                this.page += 1;
                this.fetchData(true);
            }
        },
        clickLabel: function(option, e) {
            e.preventDefault();
            this.hospital = option;
        },
        getFs: function(obj) {
            var arr = $.map(obj, function(value, index) {
                return [value];
            });
            var len = arr.length;

            if (arr.length < 7) {
                for (var i = 0; i < 7 - len; i++) {
                    arr.push(0);
                }
            }
            var edss = require('../../config/edss.js');
            //寻找最大值
            var max = Math.max(...arr);
            console.log('max', max);
            fs = edss.fsMap[max];
            if (typeof fs == 'number') {
                return fs;
            }

            //寻找最大值个数
            var maxcnt = 0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == max) {
                    maxcnt++;
                }
            }
            console.log('maxcnt', maxcnt);
            var fs = edss.fsMap[max][maxcnt];
            if (typeof fs == 'number') {
                return fs;
            }

            //寻找次大值
            var arr1 = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != max) {
                    arr1.push(arr[i]);
                }
            }
            var _max = Math.max(...arr1);
            console.log('_max', _max)
            fs = edss.fsMap[max][maxcnt][_max];
            if (typeof fs == 'number') {
                return fs;
            }

            //寻找次大值个数
            var _maxcnt = 0;
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] == _max) {
                    _maxcnt++;
                }
            }
            console.log('_maxcnt', _maxcnt);
            fs = edss.fsMap[max][maxcnt][_max][_maxcnt];
            return fs;
        },
        //////消息事件
        'e-checkuptpl-ready': function() {
            this.modify = false;
            this.fetchData();
            this.hospital = '本院';
            this.hospitalother = '';
            this.checkupid = '';
            this.value = util.getFormatDate();
            this.edssFs = {};
            this.edssFsScore = 0;
            this.edssMovingScore = 0;
            var self = this;
            setTimeout(function() {
                var obj = util.getAllFormData();
                //存储表单快照
                sessionStorage.setItem('form-snap', JSON.stringify(obj));
            }, 1000);
            return true;
        },
    },

    events: {
        'edss-fs-change': function(questionName, fs) {
            if (fs == 6) {
                return;
            }
            this.edssFs[questionName] = fs;
            this.edssFsScore = this.getFs(this.edssFs);

            this.$emit('edss-notify', this.edssScore);
        },
        'edss-moving-change': function(moving) {
            this.edssMovingScore = moving;
            this.$emit('edss-notify', this.edssScore)
        },
        'edss-hide-popover': function() {
            this.$emit('edss-hide-popover-child')
        },
        'bsa-wh-change': function(name, value) {
            if (value == '' || value == undefined) {
                value = 0;
            }
            this.bsaData[name] = value;
            var height = 0;
            var weight = 0;
            if (this.bsaData.hasOwnProperty('身高')) {
                height = this.bsaData['身高'] - '';
            }
            if (this.bsaData.hasOwnProperty('体重')) {
                weight = this.bsaData['体重'] - '';
            }

            var bsa = (height + weight - 60) / 100;
            if (bsa < 0) {
                bsa = '';
            }

            this.$emit('bsa-notify', bsa);
        },
        'show-component': function(ename) {
            this.$emit('show-component-notify', ename);
        },
        'hide-component': function(ename) {
            this.$emit('hide-component-notify', ename);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            var diseasdId = common.getDiseaseId();
            var fenqi = '';
            if (common.isLungCancer(diseasdId)) {
              fenqi = require('../js/FeiaiFenqi.js');
              fenqi(this);
            } else if (common.isGastricCancer(diseasdId)) {
              fenqi = require('../js/WeiaiFenqi.js');
              fenqi(this);
            }
        })
    },
    watch: {
        myaction: function(newVal, oldVal) {
            this.$emit('change-action', newVal)
        }
    }
}
</script>
