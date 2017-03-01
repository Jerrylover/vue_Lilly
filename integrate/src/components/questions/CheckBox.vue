<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label question-label" v-html="content"></label>
        <div class="col-lg-9 col-sm-8">
            <input type="hidden" class="input-special" v-if="isshow" v-model="dvalue" :name="name">
            <div v-for="option in question.options" class="checkbox checkbox-inline checkbox-info">
                <input type="checkbox" :id="'inlineCheckbox' + option.id" :name="name" :value='option.id' v-model='checked'>
                <label :for="'inlineCheckbox' + option.id">{{option.content}}</label>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.checkbox-inline {
    margin-left: 0;
    margin-right: 10px;
}
</style>
<script>
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            checked: [],
            isshow: false,
            dvalue: '',
            isShowComponent: true
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {
        'name': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][options][]';
        },
        content: function() {
            return this.question.content
        }
    },
    methods: {
        'modifyData': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            var checked = [];
            for (var i = 0; i < this.answer.options.length; i++) {
                checked.push(this.answer.options[i].id);
            }
            this.checked = checked;
            return true;
        },
        'modifyDone': function() {
            this.checked = [];
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
    watch: {
        checked: function(newVal, oldVal) {
            if (newVal == '') {
                this.isshow = true;
                this.dvalue = -1;
            } else {
                this.isshow = false;
                this.dvalue = -1;
            }
            var len = this.question.options.length;
            //显示与隐藏
            var that = this;
            for (var i = 0; i < len; i++) {
                var option = this.question.options[i];
                var enameArr = option.showenames.split(',');
                if (enameArr.length > 0) {
                    if ($.inArray(option.id, newVal) > -1) {
                        enameArr.forEach(function(ename) {
                            if (ename) {
                                Bus.$emit('show-component', ename);
                            }
                        });
                    } else {
                        enameArr.forEach(function(ename) {
                            if (ename) {
                                Bus.$emit('hide-component', ename);
                            }
                        });
                    }
                }

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
