<template>
    <div class="form-group question-group caption" v-if="isShowComponent">
        <div class="col-sm-7 col-md-7">
            <h5 v-html="question.content">
            </h5>
        </div>
    </div>
</template>
<style scoped>
.caption {
    padding-top: 2px;
    padding-bottom: 2px;
    background-color: #F5F6FA;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top: -1px;
}

.caption h5 {
    font-weight: 600;
}
</style>
<script>
module.exports = {
    data: function() {
        return {
            selected: '',
            isShowComponent: true
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {

    },
    events: {
      'modify-done': function() {
          this.isShowComponent = !this.question.isdefaulthide;
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
