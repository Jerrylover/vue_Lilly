<template>
    <div class="PatientHistory">
        <div style="text-align: left; border: 1px solid #ccc;padding: 5px; border-radius: 4px;display: block; margin-top: -50px">
            <div style="display: inline-block; padding: 5px">
                <span>{{patient.name}}&nbsp;&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;&nbsp;{{patient.agestr}}&nbsp;&nbsp;&nbsp;{{patient.disease}}</span>
            </div>
        </div>
        <div v-for="bedtkt in bedtktlist" :style="{border: bedtkt.color,borderWidth: '1px', borderStyle: 'solid'}" style="text-align: left; border-radius: 4px; margin-top: 10px; padding: 10px 10px 10px 0px; box-sizing: border-box" @touchstart="clickItem(bedtkt)">
            <span :style="{backgroundColor: bedtkt.color}" style="color: #fff; padding: 5px 15px 5px 5px; box-sizing: border-box; border-top-right-radius: 18px; border-bottom-right-radius: 18px; display: inline-block">{{bedtkt.title}}</span>
            <div style="padding: 10px">
                <span v-html="bedtkt.content"></span>
            </div>
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
                        content: 'hahahahahaah123',
                        title: '已拒绝',
                        color: 'blue',
                    },
                    {
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
        methods: {
            clickItem: function() {

            }
        }
    }
</script>
<style scoped>
</style>