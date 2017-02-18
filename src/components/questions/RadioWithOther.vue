<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                <input type="hidden" class="input-special" v-if="isshow" v-model="dvalue" :name="name">
                <input v-for="option in question.options" type="radio" :id="'inlineRadio' + option.id" :name="name" :value='option.id' v-model='picked'>
                <label v-for="option in question.options" :for="'inlineRadio' + option.id" :data-value="option.content" @click="clickLabel(option, $event)" :class="{active1: optionActive(option)}">{{option.content}}</label>
            </div>
        </div>
    </div>
    <div class="col-sm-4" v-if="showOther" style="padding-right:0">
        <input type="text" class="form-control" :name="otherName" v-model='otherContent'>
    </div>
</div>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            picked: '',
            showOther: false,
            otherContent: '',
            isshow: false,
            dvalue: '',
            isShowComponent: true
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {
        name: function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][options][]';
        },
        className: function() {
            var length = this.question.content.visualLength();
            // console.log('name length', length);
        },
        otherName: function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][content]';
        }
    },
    events: {
        'modify-data': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            if (this.answer.options.length > 0) {
                var option = this.answer.options[0];
                this.picked = option.id;
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
        'modify-done': function() {
            this.picked = '';
            this.otherContent = '';
            this.showOther = false;
            this.isShowComponent = !this.question.isdefaulthide;
        },
        'show-component-notify': function(ename) {
            if (this.checkuptpl.ename == ename) {
                this.isShowComponent = true;
            }
        },
        'hide-component-notify': function(ename) {
            if (this.checkuptpl.ename == ename) {
                this.isShowComponent = false;
            }
        }
    },
    methods: {
        isLastOption: function(option) { //判断点击的是最后一个
            var len = this.question.options.length;
            return this.question.options[len - 1].id == option.id;
        },
        clickLabel: function(option, e) {
            e.preventDefault();
            var len = this.question.options.length;
            if (this.isLastOption(option)) {
                this.showOther = true;
            } else {
                this.showOther = false;
            }

            if (this.picked == option.id && !this.showOther) {
                this.picked = '';
                this.$set('isshow', true);
                this.$set('dvalue', -1);
            } else {
                this.picked = option.id;
                this.$set('isshow', false);
                this.$set('dvalue', '');
            }
            this.showHide(option);
        },
        optionActive: function(option) {
            if (this.picked != '') {
                if (this.picked == option.id) {
                    return true;
                }
            } else {
                if (option.checked == 1) {
                    this.picked = option.id;
                    return true;
                }
            }

            return false;
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
        mounted: function() {
            this.$nextTick(function(){
                this.isShowComponent = !this.question.isdefaulthide;
            })

        }
    }
}
</script>
