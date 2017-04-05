<template>
    <div class="papertpllist">
        <div class="paper-item" v-for="papertpl in papertpls" @touchstart="clickPaperTplItem(papertpl)">
            <div>
                <span style="font-weight: bold">量表名称:&nbsp;{{papertpl.title}}</span>
                <span class="paper-cnt">{{papertpl.paper_cnt}}份</span>
            </div>
            <div class="paper-lasttime">
                最近更新日期:&nbsp;&nbsp;{{papertpl.last_paper_time}}
            </div>
        </div>
        <div class="noData" v-if="papertpls.length == 0">
            <span>暂无量表信息</span>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    module.exports = {
        data: function() {
            return {
                openid: '',
                patientid: '',

                papertpls: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.patientid = this.$route.query.patientid;
            console.log(this.patientid);
            var url = api.get('paper.tpllist4onepatient');
            var params = {
                openid: this.openid,
                patientid: this.patientid,
            }
            common.post(url, params, function(response){
                self.papertpls = response.data.papertpls;
            })
        },
        mounted: function() {
            document.title = "量表";
        },
        methods:{
            clickPaperTplItem: function(papertplitem) {
                this.$router.push({name: 'paper-list', params: {'papertplid': papertplitem.id}, query: {'patientid': this.patientid}})
            }
        }
    }
</script>
<style scoped>
    .paper-item {
        border: 1px solid #1996ea;
        text-align: left;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 4px;
    }
    .paper-item .paper-cnt {
        float: right;
        color: #aaa;
    }
    .paper-item .paper-lasttime {
        color: #666;
    }
    .noData {
        position: absolute;
        width: 100%;
        top: 40%;
    }
</style>