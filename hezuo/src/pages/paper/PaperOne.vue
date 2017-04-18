<template>
    <div class="paperone">
        <div class="xanswer-item" v-for="(xanswer, index) in xanswerlist">
            <span class="xanswer-question">{{index + 1}}:{{xanswer.question}}</span><br/>
            <div class="xanswer-answer">{{xanswer.xanswer}}</div>
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
                paperid: '',

                xanswerlist: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.paperid = this.$route.params.paperid;
            var url = api.get('paper.one');
            var params = {
                openid: this.openid,
                paperid: this.paperid,
            }
            common.post(url, params, function(response){
                console.log(response);
                if (response.errno == 0) {
                    self.xanswerlist = response.data.xanswerlist;
                }
            })
        },
        methods:{

        }
    }
</script>
<style scoped>
    .xanswer-item {
        text-align: left;
        padding: 5px 10px;
    }
    .xanswer-question {
        padding: 5px;
    }
    .xanswer-answer {
        padding: 5px;
        background-color: #eee;
    }
</style>