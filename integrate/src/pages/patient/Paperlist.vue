<template>
    <div class="container-fluid content">
        <breadcrumb  pagetitle="患者数据量表">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
        <div class="row" style="margin: 0px 0px 10px 0px">
            <div class="col-sm-12" style="padding:0">
                <div class="well" style="border-radius:2px;margin:0;">患者姓名:{{patientname}}&nbsp;&nbsp;&nbsp;&nbsp;电话: {{mobile}}</div>
            </div>
        </div>
        <div class="row" style="margin: 0px">
            <div class="col-sm-12" style="padding:0">
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <th class="light-th">创建时间</th>
                        <th class="light-th">填写人</th>
                        <th class="light-th">量表标题</th>
                        <th class="light-th">操作</th>
                    </tr>
                    <tr v-for="paper in paperlist">
                        <td>{{paper.createtime}}</td>
                        <td>{{paper.writer}}</td>
                        <td><a href="javascript:" @click="doone(paper)">{{paper.title}}</a></td>
                        <td>
                            <a href="javascript:" @click="doone(paper)">查看</a>
                            <a href="javascript:" @click="modifyone(paper)">修改</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
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
                paperlist: '',
                mobile: '',
            }
        },
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
        },
        computed: {
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
                  url: 'patient.paperlist',
                  data: {
                    patientid: this.patientid
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.paperlist = data.papers;
                      self.mobile = data.patientid.mobile;
                  }
                })
            },
            doone: function(paper) {
                this.$router.push({
                    name: 'patient-paperone',
                    params: {
                        patientid: this.patientid
                    },
                    query: {
                        paperid: paper.paperid
                    },
                });
            },
            modifyone: function(paper) {
                // var url = '';
                // console.log(paper);
                // if (document.domain == 'localhost') {
                //     url = 'http://admin.fangcunhulian.cn/xanswersheetmgr/modify?xanswersheetid=' + paper.xanswersheetid;
                // }else {
                //     url = '/api/xanswersheetmgr/modify?xanswersheetid=' + paper.xanswersheetid;
                // }
                // window.open(url);
            }
        },
        created: function() {
            this.fetchData()
            Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '评估量表')
        },
        watch: {
            '$route': function() {
                this.fetchData()
                Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '评估量表')
            }
        }
    }
</script>
