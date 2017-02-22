<template>
    <app-header></app-header>
    <div class="container-fluid content">
        <div class="row" style="margin: 0px">
            <div class="col-sm-12">
                <h4>患者数据量表</h4>
            </div>
        </div>
        <div class="row" style="margin: 0px 0px 10px 0px">
            <div class="col-sm-12">
                <div class="well" style="border-radius:2px;margin:0;">患者姓名:{{patientname}}&nbsp;&nbsp;&nbsp;&nbsp;电话: {{mobile}}</div>
            </div>
        </div>
        <div class="row" style="margin: 0px">
            <div class="col-sm-12">
                <table class="table table-bordered">
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
                </table>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
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
    module.exports = {
        data: function() {
            return {
                patientid: '',
                paperlist: '',
                patientname: '',
                mobile: '',
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
        },
        route: {
            data: function(transition) {
                var self = this;
                console.log(transition);
                self.patientid = transition.to.params.patientid;
                $.ajax({
                    url: api.get('patient.paperlist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                    }
                }).done(function(response){
                    console.log(response);
                    if (response.errno == 0) {
                        var data = response.data;
                        self.paperlist = data.papers;
                        self.patientname = data.patientid.name;
                        self.mobile = data.patientid.mobile;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            }
        },
        methods: {
            doone: function(paper) {
                var url = '#!/patient/'+this.patientid + '/paperone?paperid=' + paper.paperid;
                // console.log(url);
                // window.open(url);
                this.$route.router.go({
                    name: 'patient-paperone',
                    params: {patientid: this.patientid},
                    query: {paperid: paper.paperid},
                });
            },
            modifyone: function(paper) {
                var url = '';
                console.log(paper);
                if (document.domain == 'localhost') {
                    url = 'http://admin.fangcunhulian.cn/xanswersheetmgr/modify?xanswersheetid=' + paper.xanswersheetid;
                }else {
                    url = '/api/xanswersheetmgr/modify?xanswersheetid=' + paper.xanswersheetid;
                }
                window.open(url);
            }
        }
    }
</script>
