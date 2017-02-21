<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <input type="hidden" class="input-special" v-if="isshow" v-model="dvalue" :name="name">
            <div class="col-sm-6 row">
                <select :name="name" class="form-control" v-model='selected' @change="change($event)">
                        <option v-for="option in question.options" :value='option.id'>{{option.content}}</option>
                    </select>
            </div>
            <div class="col-sm-6" v-show="showOther">
                <input type="text" class="form-control" :name="otherName" v-model='otherContent'>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            selected: '',
            showOther: false,
            otherContent: '',
            isshow: false,
            dvalue: '',
            isShowComponent: true,
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {
        'name': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][options][]';
        },
        otherName: function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][content]';
        }
    },
    methods: {
        isLastOption: function(option) { //判断点击的是最后一个
            var len = this.question.options.length;
            return this.question.options[len - 1].id == option.id;
        },
        change: function(e) {
            e.preventDefault();
            var len = this.question.options.length;
            var option = ''

            for (var i = 0; i < this.question.options.length; i++) {
                if (this.question.options[i].id == this.selected) {
                    option = this.question.options[i];
                    this.showHide(option);
                }
            }
            if (this.isLastOption(option)) {
                this.showOther = true;
            } else {
                this.showOther = false;
            }

            if (this.picked == option.id && !this.showOther) {
                this.picked = '';
                this.isshow = true;
                this.dvalue = -1;
            } else {
                this.picked = option.id;
                this.isshow = false;
                this.dvalue = '';
            }
        },
        showHide: function(option) {
            var that = this;
            if (option.showenames != '') {
                var enameArr = option.showenames.split(',');
                $.each(enameArr, function(index, ename) {
                    that.$emit('show-component', ename);
                })
            }
            if (option.hideenames != '') {
                var enameArr = option.hideenames.split(',');
                $.each(enameArr, function(index, ename) {
                    that.$emit('hide-component', ename);
                })
            }
        },
        'modifyData': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            if (this.answer.options.length > 0) {
                var option = this.answer.options[0];
                this.selected = option.id;
                if (this.isLastOption(option)) {
                    this.showOther = true;
                } else {
                    this.showOther = false;
                }
                this.otherContent = this.answer.content;
                this.showHide(option);
            }

            return true;
        },
        'modifyDone': function() {
            this.selected = '';
            this.otherContent = '';
            this.showOther = false;
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
    }
}
</script>
