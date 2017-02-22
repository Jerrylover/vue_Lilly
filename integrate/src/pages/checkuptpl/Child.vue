<template>
<div>
    <ul class="nav nav-tabs bg-gray" id="nav-tabs-1">
        <li class="active" for="div_visit">
            <a href="javascript:"> &nbsp;&nbsp;<strong>{{title | filterTitle}}（{{action}}）</strong>&nbsp;&nbsp;</a>
        </li>
    </ul>
    <div class="ck-content">
        <template v-if="ename == 'zhusu'">
            <zhusu :patientid="patientid" :ename="ename" :action='action' v-on:change-action="changeAction"></zhusu>
        </template>
        <template v-if="fwzhiliao == true">
            <zhiliao :patientid="patientid" :ename="ename" :action='action' v-on:change-action="changeAction"></zhiliao>
        </template>
        <template v-if="iscommon">
          <checkuptpl :ename='ename' :patientid='patientid' :patientname='patientname' :checkuptpl='checkuptpl' :questionsheet="questionsheet" :questions="questions" :action='action' v-on:change-action="changeAction">
          </checkuptpl>
        </template>
      </div>
</div>
<!--     <div id="gotop" onclick="goTop()" style="z-index: 999999; font-size: 18px; display: block; color: rgb(230, 230, 230); cursor: pointer; width: 42px; height: 42px; border: 1px solid rgb(221, 221, 221); line-height: 42px; text-align: center; position: fixed; right: 20px; bottom: 200px; border-radius: 50%; box-shadow: rgb(204, 204, 204) 0px 0px 0px 1px; background: rgba(91, 192, 222, 0.8);">
T
</div> -->
</template>
<style>
.question-content {
    border: 1px solid #ddd;
    min-height: 200px;
    padding-top: 20px;
}
</style>
<style scoped>
.bg-gray {
    background-color: #F5F6FA;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 0;
}

li.active {
    margin-bottom: -2px !important;
}

li.active a {
    border-top: 5px solid #008DB9 !important;
    border-bottom: 0;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    margin-top: -1px;
    border-radius: 0;
}

li.active a:hover {
    border: 0;
    border-top: 5px solid #008DB9 !important;
    border-bottom: 0;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    margin-top: -1px;
    border-radius: 0;
}
</style>
<script>
import api from '../../config/api.js'
import common from '../../lib/common.js'
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            action: '添加',
            patientname: '',
            checkuptpl: '',
            questionsheet: '',
            questions: '',
            diseaseid: '',
        }
    },
    computed: {
        patientid: function() {
            return this.$route.params.patientid;
        },
        ename: function() {
            return this.$route.params.ename;
        },
        iscommon: function() {
            return this.ename != 'zhusu' && !this.fwzhiliao;
        },
        title: function() {
            return this.$route.params.name
        },
        fwzhiliao: function() {
            return (common.isCancerDisease(this.diseaseid)) && this.ename == 'zhiliao';
        }
    },
    methods: {
        fetchCheckTpl: function() {
            var self = this;
            $.ajax({
                url: api.get('checkuptpl.one'),
                type: 'post',
                dataType: 'json',
                data: {
                    ename: self.ename
                },
            }).done(function(d) {
                self.checkuptpl = d.data.checkuptpl;
                self.questionsheet = d.data.questionsheet;
                self.questions = d.data.questions;

                self.$nextTick(function() {
                    console.log('emit e-checkuptpl-ready')
                    Bus.$emit('e-checkuptpl-ready')
                });
                // self.$nextTick(function(){
                //     self.$emit('e-checkuptpl-ready')
                // })

            })
        },
        changeAction: function(action) {
            this.action = action;
        }
    },
    components: {
        'zhusu': function(resolve) {
            require(['./Zhusu.vue'], resolve);
        },
        'zhiliao': function(resolve) {
            require(['../../components/cancer/Zhiliao.vue'], resolve);
        },
        'checkuptpl': require('./CheckupTpl.vue')
    },
    filters: {
        filterTitle: function(value) {
            return value.replace(/\(.*?\)/, '')
        }
    },
    mounted: function() {

    },
    created: function() {
        this.fetchCheckTpl();
        this.action = '添加';
        this.diseaseid = common.getDiseaseId();
    },
    watch: {
        '$route': function() {
            this.fetchCheckTpl();
            this.action = '添加';
            this.diseaseid = common.getDiseaseId();
        }
    }
}
</script>
