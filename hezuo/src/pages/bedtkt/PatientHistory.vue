<template>
    <div class="PatientHistory">
        <div style="text-align: left; border: 1px solid #ccc;padding: 5px; border-radius: 4px;display: block; margin-top: -50px">
            <div style="display: inline-block; padding: 5px">
                <span>{{patient.name}}&nbsp;&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;&nbsp;{{patient.agestr}}&nbsp;&nbsp;&nbsp;{{patient.disease}}</span>
            </div>
        </div>
        <div v-for="bedtkt in bedtktlist" :style="{borderColor: '#'+bedtkt.lastlog_color,borderWidth: '1px', borderStyle: 'solid'}" style="text-align: left; border-radius: 4px; margin-top: 10px; padding: 10px 10px 10px 0px; box-sizing: border-box" @touchstart="clickItem(bedtkt)">
            <span :style="{backgroundColor: '#'+bedtkt.lastlog_color}" style="color: #fff; padding: 5px 15px 5px 5px; box-sizing: border-box; border-top-right-radius: 18px; border-bottom-right-radius: 18px; display: inline-block;
            ">{{bedtkt.lastlog_title}}</span>
            <div style="padding: 10px">
                <span v-html="bedtkt.lastlog_content"></span>
            </div>
        </div>
        <div class="noData" v-if="bedtktlist.length == 0">
            <span>该患者暂无约住院记录。</span>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    module.exports =  {
        data: function()  {
            return {
                patient: '',
                bedtktlist: [
                    {
                        lastlog_color: '#ccc',
                        lastlog_title: '开玩笑',
                        content: 'hahahahahaah123',
                        title: '已拒绝',
                        color: 'blue',
                    },
                    {
                        lastlog_color: '#ccc',
                        content: 'hahahahahaah123',
                        title: '已拒绝',
                        color: 'blue',
                    }
                ],
            }
        },
        created: function() {
            var self = this;
            var openid = localStorage.getItem('_openid_');
            var patientid = this.$route.params.patientid;
            var url = api.get('patient.info');
            var params = {
                patientid: patientid,
                openid: openid,
            }
            common.post(url, params, function(response){
                console.log('response1', response);
                self.patient = response.data;
            })

            url = api.get('bedtkt.history4onepatient');
            common.post(url, params, function(response){
                console.log('response2', response);
                self.bedtktlist = response.data.bedtktlist;
                console.log(self.bedtktlist);
            })
        },
        mounted: function() {
            document.title = "住院预约记录";
        },
        methods: {
            clickItem: function(bedtkt) {
                this.$router.push({name: 'bedtkt-main', params: {'bedtktid': bedtkt.id}});
            }
        },
        filters: {
            filterColor: function(val) {
                console.log('1111111');
                return 'red';
            }
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