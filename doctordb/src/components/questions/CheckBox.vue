<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label question-label">{{{question.content}}}{{{action}}}</label>
        <div class="col-lg-9 col-sm-8">
            <input type="hidden" class="input-special" v-if="isshow" v-model="dvalue" :name="name">
            <div v-for="option in question.options" class="checkbox checkbox-inline checkbox-info">
                <input type="checkbox" id="inlineCheckbox{{option.id}}" :name="name" :value='option.id' v-model='checked'>
                <label for="inlineCheckbox{{option.id}}">{{option.content}}</label>
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
module.exports = {
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
        }
    },
    events: {
        'modify-data': function() {
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
        'modify-done': function() {
            this.checked = [];
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
        checked: function(newVal, oldVal) {
            if (newVal == '') {
                this.$set('isshow', true);
                this.$set('dvalue', -1);
            } else {
                this.$set('isshow', false);
                this.$set('dvalue', '');
            }
            var len = this.question.options.length;
            //显示与隐藏
            var that = this;
            for (var i = 0; i < len; i++) {
                var option = this.question.options[i];
                var enameArr = option.showenames.split(',');
                if (enameArr.length > 0) {
                    if ($.inArray(option.id, newVal) > -1) {
                        $.each(enameArr, function(index, ename) {
                            if (ename) {
                                that.$dispatch('show-component', ename);
                            }
                        });
                    } else {
                        $.each(enameArr, function(index, ename) {
                            if (ename) {
                                that.$dispatch('hide-component', ename);
                            }
                        });
                    }
                }

            }
        }
    },
    methods: {

    },
    ready: function() {
        this.isShowComponent = !this.question.isdefaulthide;
    }
}
</script>
