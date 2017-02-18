<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <input class="form-control" type="text" :name="name" v-model='text'>
        </div>
    </div>
    <div class="col-sm-2 select-unit" v-if="isShowUnits">
        <select class="form-control" v-if="units.length>1" :name="unitname" v-model="selectedUnit">
                <option v-for="(unit, index) in units" :selected="index == 0" v-html="unit"></option>
            </select>
        <span v-else class="" v-html="units[0]"></span>
    </div>
    <div class="col-lg-2 col-sm-3 select" v-if="isShowQualitatives">
        <select class="form-control" v-if="qualitatives.length>1" :name="qualitativename" v-model="selectedQualitative">
                <option v-for="(qualitative, index) in qualitatives" :selected="index == 0" v-html="qualitative"></option>
            </select>
        <span v-else class="" v-html="qualitatives[0]"></span>
    </div>
</div>
</template>
<style scoped>
div.select-unit {
    width: 7%;
    padding-left: 0;
}

div.select-unit span {
    line-height: 2.5em;
}
</style>
<script>
export default {
    data: function() {
        return {
            text: '',
            selectedUnit: '',
            selectedQualitative: '',
            isShowComponent: true,
        }
    },
    props: ['checkuptpl', 'questionsheet', 'question', 'checkuptpl', 'questionsheet', 'answer'],
    computed: {
        'name': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][content]';
        },
        'unitname': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][unit]';
        },
        'qualitativename': function() {
            return 'sheets[XQuestionSheet][' + this.questionsheet.id + '][' + this.question.id + '][qualitative]';
        },
        'units': function() {
            if (!this.question.units) {
                return '';
            }
            return this.question.units.split(',');
        },
        'qualitatives': function() {
            if (!this.question.qualitatives) {
                return '';
            }
            return this.question.qualitatives.split(',');
        },
        isShowUnits: function() {
            return this.units instanceof Array && this.units[0] != '';
        },
        isShowQualitatives: function() {
            return this.qualitatives instanceof Array && this.qualitatives[0] != '';
        },
    },
    events: {
        'modify-data': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            this.text = this.answer.content;
            this.selectedUnit = this.answer.unit;
            this.selectedQualitative = this.answer.qualitative;
            return true;
        },
        'modify-done': function() {
            this.text = '';
            this.selectedUnit = '';
            this.selectedQualitative = '';
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
