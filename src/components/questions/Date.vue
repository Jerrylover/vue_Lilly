<template>
<div class="form-group  question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <div :class="{'has-error has-feedback': iserror, 'has-feedback': !iserror}">
                <input class="form-control controls" :ename='checkuptpl.ename' type="text" @click="showCalendar" v-model="value" placeholder="请输入日期" :disabled='ismodify' :name="name">
                <span :class="{'no-error fa fa-calendar-check-o fa-lg form-control-feedback': !iserror, 'glyphicon glyphicon-remove form-control-feedback': iserror}" style="right:0"></span>
                <span class="help-block" v-show="iserror">日期错误</span>
                <calendar :show="show" :defaultdate='isShowDefaultDate(value)' :value="value" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
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
export default {
    data: function() {
        return {
            error: false,
            ismodify: false,
            isShowComponent: true,
            //日历参数
            show: false,
            type: "date", //date datetime
            value: "", //日期
            begin: "",
            x: 0,
            y: 0,
            range: false, //是否多选
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
        showCalendar: function(e) {
            // e.stopPropagation();
            if (this.ismodify) {
                return;
            }
            var that = this;
            that.show = true;
            $(e.target).show();
            that.x = e.target.offsetLeft;
            that.y = e.target.offsetTop + e.target.offsetHeight + 8;
            var bindHide = function(event) {
                if (event.target == e.target) {
                    return;
                }
                event.stopPropagation();
                that.show = false;
                document.removeEventListener('click', bindHide, false);
                document.removeEventListener('touchstart', bindHide, false);
            };
            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
                document.addEventListener('touchstart', bindHide, false);
            }, 500);
        }
    },
    components: {
        'calendar': function(resolve) {
            require(['../calendar.vue'], resolve);
        }
    },
    events: {
        'modify-data': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            this.value = this.answer.content;
            return true;
        },
        'modify-done': function() {
            this.value = util.getFormatDate();
            if (this.question.content == '停药时间') {
                this.value = '';
            }
            this.isShowComponent = !this.question.isdefaulthide;
            return true;
        },
        'show-component-notify': function(ename) {
            if (this.question.ename == ename) {
                this.isShowComponent = true;
            }
        },
        'hide-component-notify': function(ename) {
            if (this.question.ename == ename) {
                this.isShowComponent = false;
            }
        }
    },
    watch: {
        value: function(new1, old) {
            console.log('old', old, 'new', new1);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.isShowComponent = !this.question.isdefaulthide;
        })
    }
}
</script>
