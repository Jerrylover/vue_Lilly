<template>
<div class="form-group  question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <div>
                <!-- <input class="form-control controls" :ename='checkuptpl.ename' type="text" @click="showCalendar" v-model="value" placeholder="请输入日期" :disabled='ismodify' :name="name"> -->
                <input type="hidden" :ename="checkuptpl.ename" :value="value" :name="name" />
                <!-- <span :class="{'no-error fa fa-calendar-check-o fa-lg form-control-feedback': !iserror, 'glyphicon glyphicon-remove form-control-feedback': iserror}" style="right:0"></span>
                <span class="help-block" v-show="iserror">日期错误</span> -->
                <!-- <calendar :show="show" :defaultdate='isShowDefaultDate(value)' :value="value" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar> -->
                <el-moment v-model="value" format="YYYY-MM-DD">
                    <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                </el-moment>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.fa {
    padding: 10px;
    color: #008DB9;
}
</style>
<script>
import util from '../../lib/util.js'
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            error: false,
            ismodify: false,
            isShowComponent: true,
            value: "", //日期

        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {
        'iserror': function() {
            return this.error && !this.ismodify;
        },
        'name': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][content]';
        }
    },
    methods: {
        isShowDefaultDate: function() {
            if (this.question.content == '停药时间' || (this.checkuptpl.ename == "zhongdianshijian" && this.question.content == '死亡时间')) {
                return false;
            }
            return true;
        },
        'modifyData': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            this.value = this.answer.content;
            return true;
        },
        'modifyDone': function() {
            this.value = util.getFormatDate();
            if (this.question.content == '停药时间') {
                this.value = '';
            }
            this.isShowComponent = !this.question.isdefaulthide;
            return true;
        },
        'showComponentNotify': function(ename) {
            if (this.question.ename == ename) {
                this.isShowComponent = true;
            }
        },
        'hideComponentNotify': function(ename) {
            if (this.question.ename == ename) {
                this.isShowComponent = false;
            }
        }
    },
    components: {
    },
    watch: {
        value: function(new1, old) {
        }
    },
    created: function() {
        Bus.$on('modify-done', this.modifyDone)
        Bus.$on('modify-data', this.modifyData)
        Bus.$on('show-component-notify', this.showComponentNotify)
        Bus.$on('hide-component-notify', this.hideComponentNotify)
    },
    mounted: function() {
        this.$nextTick(function() {
            this.isShowComponent = !this.question.isdefaulthide;
        })
        if (this.isShowDefaultDate()) {
            this.value = util.getFormatDate();
        }
    }
}
</script>
