<template>
    <div class="bedtktloglist">
        <!-- <div style="text-align: left; border: 1px solid #ccc;padding: 5px; border-radius: 4px;display: block; margin-top: -50px">
            <div style="display: inline-block; padding: 5px">
                <span>{{patient.name}}&nbsp;&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;&nbsp;{{patient.agestr}}&nbsp;&nbsp;&nbsp;{{patient.disease}}</span>
            </div>
        </div> -->
        <div v-for="bedtktlog in bedtktloglist" :style="{borderColor: '#'+bedtktlog.lastlog_color,borderWidth: '1px', borderStyle: 'solid'}" style="text-align: left; border-radius: 4px; margin-top: 10px; padding: 10px 10px 10px 0px; box-sizing: border-box">
            <div>
                <span :style="{backgroundColor: '#'+bedtktlog.lastlog_color}" style="color: #fff; padding: 5px 15px 5px 5px; box-sizing: border-box; border-top-right-radius: 18px; border-bottom-right-radius: 18px; display: inline-block;
                ">{{bedtktlog.lastlog_title}}</span>
                <span style="float: right; line-height: 2.2; color: #555">{{bedtktlog.lastlog_thedate}}</span>
            </div>
            <div style="padding: 10px 0px 10px 10px">
                <span v-html="contentHandle(bedtktlog.lastlog_content)"></span>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="noData" v-if="bedtktloglist.length == 0">
            <span>记录为空</span>
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
                bedtktid: '',
                bedtktloglist: '',
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            console.log(this.openid);
            // return ;
            this.bedtktid = this.$route.params.bedtktid;
            var url = api.get('bedtktlog.list');
            var params = {
                openid: this.openid,
                bedtktid: this.bedtktid,
            }
            common.post(url, params, function(response){
                // console.log(response);
                self.bedtktloglist = response.data.logs;
            })
        },
        methods: {
            contentHandle: function(content) {
                if (typeof content != 'undefined' && content != null) {
                    return content.replace(/\n/g, '<br/>');
                }
            }
        },
        mounted: function() {
            document.title = "住院状态查询";
        }

    }
</script>
<style scoped>
    .noData {
        position: absolute;
        width: 100%;
        top: 40%;
    }
</style>