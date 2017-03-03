<template>
    <div class="container-fluid content">
        <breadcrumb :data="breadcrumbData" :pagetitle="'量表' + papertpltitle">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content" style="margin: 0px;">
            <div class="row" style="margin: 0px 0px 10px 0px; background-color: #f5f5f5; border: 1px solid #ccc; padding: 5px">
                <div>
                    <span>患者姓名:&nbsp;&nbsp;&nbsp;{{patient.name}}</span>
                </div>
                <div>
                    <span>填写时间:&nbsp;&nbsp;&nbsp;{{paper.createtime}}</span>
                </div>
            </div>
            <div v-if="paper.ename == 'medicine_parent'">
                <div v-for='item in medicine_parent'>
                    <div>{{item.title}}</div>
                    <div style="background-color: #f5f5f5">{{item.content}}</div>
                </div>
            </div>
            <div v-for="xanswer in xanswerlist">
                <div style="padding: 5px">{{xanswer.question}}</div>
                <div style="background-color: #e5e5e5; padding: 5px">{{xanswer.xanswer}}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    h4 {
        float: left;
        padding-left: 10px;
        border-left: 3px solid #008db9;
    }
</style>
<script>
    import api from '../../config/api.js';
    import libpatient from '../../lib/patient.js'
    export default {
        data: function() {
            return {
                xanswerlist: '',
                patient: '',
                papertpltitle: '',
                paper: '',
                medicine_parent: '',
                breadcrumbData: [
                {
                    name: '评估量表',
                    link: {name: 'patient-paperlist'}
                }
            ],

            }
        },
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
        },
        computed: {
            paperid: function() {
                return this.$route.query.paperid || ''
            },
            patientid: function() {
                return this.$route.params.patientid || ''
            },
            patientname: function() {
                return libpatient.getPatientName(this.patientid) || ''
            },
        },
        methods: {
            fetchData: function() {
                var self = this
                api.http({
                  url: 'patient.paperone',
                  data: {
                    paperid: self.paperid,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.xanswerlist = data.xanswerlist;
                      self.patient = data.patient;
                      self.paper = data.paper;
                      self.papertpltitle = data.papertpltitle;
                      self.medicine_parent = data.medicine_parent;
                  }
                })
            }
        },
        created: function() {
            this.fetchData()
            Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '评估量表')
            this.breadcrumbData[0].link = {
                name: 'patient-paperlist',
                params: {
                    patientid: this.patientid
                }
            }
        },
        watch: {
            '$route': function(to, from, next) {
                this.fetchData()
                Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '评估量表')
            }
        }
    }
</script>
