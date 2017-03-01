<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <select :name="name" class="form-control" v-model='selected' @change="doChange()" :id="questionhtmlid">
                    <option v-for="option in question.options" :value='option.id'>{{option.content}}</option>
                </select>
        </div>
    </div>
    <div class="col-sm-1 question" v-if="isEdssMove">
        <i class="fa fa-question-circle" @click="faClick($event)"></i>
        <div class="popover right" v-show="showPopover">
            <div class="arrow"></div>
            <h3 class="popover-title">行动能力说明<i class="fa fa-times-circle fa-lg" @click="faClick($event)"></i></h3>
            <div class="popover-content">
                <moving></moving>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.fa {
    line-height: 2.3em;
    cursor: pointer;
    color: #008DB9;
}

.question {
    padding-left: 0;
}

.popover {
    position: absolute;
    display: block;
    margin-left: 23px;
    font-family: 'microsoft Yahei', 'Montserrat', 'sans-serif';
    max-width: 1000px;
}

.fa-times-circle {
    color: #666;
    float: right;
    margin-top: -10px
}

.fa-times-circle:hover {
    color: #333;
}
</style>
<style>
div.edss-tip {
    height: 400px;
    width: 400px;
    overflow-y: auto;
}
@media (min-width:768px) and (max-width: 1200px) {
    div.edss-tip {
        width: 315px;
    }
}

div.edss-tip>p {
    border-bottom: 1px dashed #ccc;
}
</style>
<script>
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            selected: '',
            showPopover: false,
            isShowComponent: true,
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {
        'name': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][options][]';
        },
        isEdssMove: function() {
            return this.checkuptpl.ename == 'edss' && this.question.content == '行动';
        },
        questionhtmlid: function() {
            return this.checkuptpl.ename + '-' + this.question.ename;
        }
    },
    components: {
        'moving': require('./edss/行动.vue')
    },
    events: {

    },
    methods: {
        faClick: function(e) {
            if (this.showPopover == false) {
                Bus.$emit('edss-hide-popover');
                var target = e.target;
                var popover = $(e.target).siblings('div');
                var height = popover.outerHeight();
                var top = -height / 2 + target.offsetHeight / 2;
                var top = top + 'px';
                popover.css({
                    'top': top
                });
                this.showPopover = true;
            } else {
                this.showPopover = false;
            }
        },
        doChange: function() {
            if (this.isEdssMove) {
                var score = 0;
                for (var i = 0; i < this.question.options.length; i++) {
                    if (this.selected == this.question.options[i].id) {
                        score = this.question.options[i].content.split(' ')[0];
                        break;
                    }
                }
                Bus.$emit('edss-moving-change', score)
            }
            for (var i = 0; i < this.question.options.length; i++) {
                var option = this.question.options[i];
                if (this.selected == option.id) {
                    this.showHide(option);
                }
            }
        },
        showHide: function(option) {
            var that = this;
            if (option.showenames != '') {
                var enameArr = option.showenames.split(',');
                enameArr.forEach(function(ename) {
                    Bus.$emit('show-component', ename);
                })
            }
            if (option.hideenames != '') {
                var enameArr = option.hideenames.split(',');
                enameArr.forEach(function(ename) {
                    Bus.$emit('hide-component', ename);
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
                this.showHide(option);
            }
            return true;
        },
        'modifyDone': function() {
            this.selected = '';
            this.isShowComponent = !this.question.isdefaulthide;
            return true;
        },
        'edssHidePopoverChild': function() {
            this.showPopover = false;
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
        Bus.$on('edss-hide-popover-child', this.edssHidePopoverChild)
    },
    mounted: function() {
        this.$nextTick(function() {
            this.isShowComponent = !this.question.isdefaulthide;
        })
    }
}
</script>
