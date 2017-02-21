<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-lg-7 col-sm-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label question-label" :a="className" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                <input type="hidden" class="input-special" v-if="isshow" v-model="dvalue" :name="name">
                <input type1="fs-radio" v-for="option in question.options" type="radio" :id="'inlineRadio' + option.id" :name="name" :value='option.id' v-model='picked'>
                <label v-for="option in question.options" :for="'inlineRadio' + option.id" :_id='_id(option)' :_class='_class' :data-value="option.content" @click="clickLabel(option, $event)" :class="{active1: optionActive(option)}"
                    :optionid="option.id">{{option.content}}</label>
            </div>
        </div>
    </div>
    <div class="col-sm-2 select" v-if="isShowQualitatives">
        <select class="form-control" v-if="qualitatives.length>1" :name="qualitativename" v-model="selectedQualitative" @change="change($event)">
                <option v-for="(qualitative, index) in qualitatives" :selected="index == 0" v-html="qualitative"></option>
            </select>
        <span class="" v-else v-html="qualitatives[0]"></span>
    </div>
    <div class="col-sm-2" v-if="showOther" style="padding-right:0">
        <input type="text" class="form-control" :name="otherName" v-model='otherContent'>
    </div>
    <div class="col-sm-1 question" v-if="isEdss">
        <i class="fa fa-question-circle" @click="faClick($event)"></i>
        <div class="popover right" v-show="showPopover">
            <div class="arrow"></div>
            <h3 class="popover-title">{{question.content}}说明<i class="fa fa-times-circle fa-lg" @click="faClose($event)"></i></h3>
            <div class="popover-content">
                <component :is="question.content"></component>
            </div>
        </div>
        <span v-show="fs !== ''" class="span-fs collapse">{{fs}}</span>
    </div>
</div>
</template>
<style scoped>
.span-fs {
    line-height: 2.3em;
    padding-left: 10px;
}

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
import edss from '../../config/edss.js'
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            picked: '',
            isshow: false,
            dvalue: '',
            selectedQualitative: '',
            showOther: false,
            otherContent: '',
            showPopover: false,
            isShowComponent: true,
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'questionsheet', 'answer'],
    computed: {
        name: function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][options][]';
        },
        className: function() {
            var length = this.question.content.visualLength();
            // console.log('name length', length);
        },
        'qualitativename': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][qualitative]';
        },
        'qualitatives': function() {
            if (!this.question.qualitatives) {
                return '';
            }
            return this.question.qualitatives.split(',');
        },
        otherName: function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][content]';
        },
        isShowQualitatives: function() {
            return this.qualitatives instanceof Array && this.qualitatives[0] != '';
        },
        fs: function() {
            var fs = '';
            if (this.picked !== '') {
                for (var i = 0; i < this.question.options.length; i++) {
                    if (this.question.options[i].id == this.picked) {
                        fs = this.question.options[i].content;
                        // if (this.question.content == '视觉' || this.question.content == '大小便') {
                        //     fs = edss.fs[this.question.content][fs];
                        // }
                        // break;
                    }
                }
            }
            return fs;
        },
        isEdss: function() {
            return this.checkuptpl.ename == 'edss';
        },
        questionhtmlid: function() {
            return this.checkuptpl.ename + '-' + this.question.ename;
        },
        _class: function() {
            var ret = '';
            if (this.checkuptpl.ename.indexOf('fenqi') > -1 && this.question.ename == 'fenqi') {
                ret = 'fenqi-label';
            }
            return ret;
        }
    },
    components: {
        // '视觉': function(resolve) {
        //     require(['./edss/视觉.vue'], resolve);
        // },
        // '脑干': function(resolve) {
        //     require(['./edss/脑干.vue'], resolve);
        // },
        // '锥体束': function(resolve) {
        //     require(['./edss/锥体束.vue'], resolve);
        // },
        // '小脑': function(resolve) {
        //     require(['./edss/小脑.vue'], resolve);
        // },
        // '感觉': function(resolve) {
        //     require(['./edss/感觉.vue'], resolve);
        // },
        // '大小便': function(resolve) {
        //     require(['./edss/大小便.vue'], resolve);
        // },
        // '大脑': function(resolve) {
        //     require(['./edss/大脑.vue'], resolve);
        // },
        '视觉': require('./edss/视觉.vue'),
        '脑干': require('./edss/脑干.vue'),
        '锥体束': require('./edss/锥体束.vue'),
        '小脑': require('./edss/小脑.vue'),
        '感觉': require('./edss/感觉.vue'),
        '大小便': require('./edss/大小便.vue'),
        '大脑': require('./edss/大脑.vue'),
    },
    events: {

    },
    methods: {
        _id: function(option) {
            return this.checkuptpl.ename + '-' + this.question.ename + '-' + option.content;
        },
        isLastQualitative: function(qualitative) { //判断点击的是最后一个
            var len = this.qualitatives.length;
            return this.qualitatives[len - 1] == qualitative && qualitative == '其他';
        },
        clickLabel: function(option, e) {
            e.preventDefault();
            if (this.picked == option.id) {
                this.picked = '';
                this.isshow = true;
                this.dvalue = -1;
            } else {
                this.picked = option.id;
                this.isshow = false;
                this.dvalue = '';
            }
            var label = $(e.target);
            var popover = label.parent().parent().parent().siblings('div[class="col-sm-1 question"]').find('div.popover');
            console.log('popover ishidden', popover.is(':hidden'));
            if (popover.is(':hidden')) {
                this.showPopover = false;
                this.$emit('edss-hide-popover');
            }

            this.showHide(option);
        },
        change: function(e) {
            e.preventDefault();
            if (this.isLastQualitative(this.selectedQualitative)) {
                this.showOther = true;
            } else {
                this.showOther = false;
            }
        },
        faClick: function(e) {
            if (this.showPopover == false) {
                this.$emit('edss-hide-popover');
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
        faClose: function(e) {
            e.preventDefault();
            this.showPopover = false;
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
        'modifyData': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            if (this.answer.options.length > 0) {
                var option = this.answer.options[0];
                this.picked = option.id;
                this.selectedQualitative = this.answer.qualitative;
                if (this.isLastQualitative(this.answer.qualitative)) {
                    this.showOther = true;
                } else {
                    this.showOther = false;
                }
                this.otherContent = this.answer.content;
                this.showHide(option);
            }
            // console.log('radio modify-data', this.answer)
            return true;
        },
        'modifyDone': function() {
            this.picked = '';
            this.selectedQualitative = '';
            this.showOther = false;
            this.otherContent = '';
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
    watch: {
        'fs': function(newval, oldval) {
            if (this.isEdss) {
                newval = newval === '' ? 0 : newval - '';
                console.log('xxxxxx---')
                // Bus.$emit('edss-fs-change', this.question.content, newval);
                //todo
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
