<template>
    <div class="PatientHistory">
        <div style="text-align: left; border: 1px solid #ccc;padding: 5px; border-radius: 4px;display: block; margin-top: -50px">
            <div style="display: inline-block; padding: 5px">
                <span>{{patient.name}}&nbsp;&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;&nbsp;{{patient.agestr}}&nbsp;&nbsp;&nbsp;{{patient.disease}}</span>
            </div>
        </div>
        <div v-for="bedtkt in bedtktlist">
            
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
                bedtktlist: '',
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

            url = api.get('bedtkt.patienthistory');
            common.post(url, params, function(response){
                console.log('response2', response);
                self.bedtktlist = response.data.bedtktlist;
            })
        }
    }
</script>