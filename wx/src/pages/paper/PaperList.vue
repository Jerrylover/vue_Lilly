<template>
    <div class="paperlist">
        <div class="paper-item" v-for="paper in papers" @click="clickPaperItem(paper)">
            {{paper.thedate}}
        </div>
        <div class="noData" v-if="papers.length == 0">
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
                papertplid: '',
                patientid: '',
                papers: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.papertplid = this.$route.params.papertplid;
            this.patientid = this.$route.query.patientid;
            var url = api.get('paper.list');
            var params = {
                openid: this.openid,
                patientid: this.patientid,
                papertplid: this.papertplid,
            }
            common.post(url, params, function(response) {
                console.log(response);
                self.papers = response.data.papers;
                document.title = response.data.title;
            })
        },
        methods: {
            clickPaperItem: function(paper) {
                this.$router.push({name: 'paper-one', params: {'paperid': paper.id}})
            }
        },
    }
</script>
<style scoped>
    .paper-item {
        border: 1px solid #1996ea;
        text-align: left;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 4px;
        font-weight: bold;
    }
    .noData {
        position: absolute;
        width: 100%;
        top: 40%;
    }
</style>