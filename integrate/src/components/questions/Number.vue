<template>
<div class="form-group question-group" v-if="isShowComponent">
    <div class="col-sm-7 col-md-7 row">
        <label for="inputEmail3" class="col-lg-3 col-sm-4 control-label  question-label" v-html="question.content"></label>
        <div class="col-lg-9 col-sm-8">
            <input class="form-control" type="number" step='0.01' :name="name" v-model='number' :id="question.id">
        </div>
    </div>
    <div class="col-sm-2 select-unit" v-if="isShowUnits">
        <select class="form-control" v-if="units.length>1" :name="unitname" v-model="selectedUnit">
                <option v-for="(unit, index) in units" :selected="index == 0" v-html="unit"></option>
            </select>
        <span v-else class="" v-html="units[0]"></span>
    </div>
    <div class="col-sm-2 select" v-if="isShowQualitatives">
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

div.input-group {
    width: 100%;
}

span.input-group-addon {
    /*width:100px;*/
}
</style>
<script>
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            number: '',
            selectedUnit: '',
            selectedQualitative: '',
            isShowComponent: true
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
        getNumber: function() {
            if (this.checkuptpl.ename == 'edss' && this.question.content == '得分' && this.number === '') {
                return 0;
            }
            return this.number;
        }
    },
    methods: {
        'modifyData': function() {
            if ($.isEmptyObject(this.answer)) {
                return true;
            }
            this.number = this.answer.content;
            this.selectedUnit = this.answer.unit;
            this.selectedQualitative = this.answer.qualitative;
            console.log('input number modify-data', this.answer)
            return true;
        },
        'modifyDone': function() {
            this.number = '';
            this.selectedUnit = '';
            this.selectedQualitative = '';
            this.isShowComponent = !this.question.isdefaulthide;
            return true;
        },
        'edssNotify': function(edss) {
            if (this.checkuptpl.ename == 'edss' && this.question.content == '得分') {
                this.number = edss;
            }
        },
        'bsaNotify': function(bsa) {
            if (this.checkuptpl.ename == 'bsa' && this.question.content == 'BSA') {
                this.number = bsa;
            }
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
        Bus.$on('modify-data', this.modifyData)
        Bus.$on('modify-done', this.modifyDone)
        Bus.$on('edss-notify', this.edssNotify)
        Bus.$on('bsa-notify', this.bsaNotify)
        Bus.$on('show-component-notify', this.showComponentNotify)
        Bus.$on('hide-component-notify', this.hideComponentNotify)
    },
    watch: {
        'number': function(newval, oldval) {
            if (this.checkuptpl.ename == 'bsa' && (this.question.content == '身高' || this.question.content == '体重')) {
                Bus.$emit('bsa-wh-change', this.question.content, this.number);
                console.log('dispath bsa-wh-change', this.question.content, this.number);
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
