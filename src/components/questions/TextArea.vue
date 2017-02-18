<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <textarea class="form-control" :name="name" rows="8" v-model='text'></textarea>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            text: '',
            isShowComponent: true
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {
        'name': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][content]';
        }
    },
    events: {
        'modify-data': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            this.text = this.answer.content;
            console.log(' textarea modify-data', this.answer)
            return true;
        },
        'modify-done': function() {
            this.text = '';
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
    mounted: function() {
        this.$nextTick(function() {
            this.isShowComponent = !this.question.isdefaulthide;
        })
    }
}
</script>
