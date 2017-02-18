<template>
    <div>
    <app-header active='patient'></app-header>
    <div class="container-fluid content">
        <visit-header :patientname='patientname' active='addcheck' visitdesc='录数据' :patientid="patientid"></visit-header>
        <div class="row row-content">
            <div class="container col-lg-2 col-sm-3 container-left">
                <div class="div1">
                    <ul class="list-unstyled">
                        <menu v-for="model in treeData" :model="model" :patientid="patientid" :ename="ename"></menu>
                    </ul>
                </div>
            </div>
            <div class="container col-lg-10 col-sm-9 container-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
    <modal :show="showModal">
        <div slot="header">
            <span class="header-span">提示信息</span>
        </div>
        <div slot="body">
            <span style="">
                <i class="fa fa-info-circle" style="color:#42b983"></i>&nbsp;&nbsp;
                    您还没有开通数据库服务，请联系运营人员开通，谢谢！
                </span>
        </div>
        <div slot="footer">
            <div><router-link to="{path: '/'}" @click="showModal = false">返回首页</router-link></div>
        </div>
    </modal>
    </div>
</template>
<style scoped>
.container-left {
    padding: 0;
}
.container-right {
    padding-right: 0;
}
@media (min-width:768px) and (max-width: 1200px) {
    .container-left {
        width:20%;
    }
    .container-right {
        width: 80%;
    }
}
.header-span {
    color: #fff;
}

div.row-content {
    margin-top: 20px;
}

.div1 {
    width: 100%;
    background-color: #f5f6fa;
    padding: 10px 0 10px 0;
}

.list-unstyled {
    width: 60%;
    margin: auto;
}
</style>
<script>
import api from '../../config/api.js'
import libpatient from '../../lib/patient.js'
import common from '../../lib/common.js'
module.exports = {
    data: function() {
        return {
            patientname: '',
            menu: '',
            treeData: [],
            name: '',
            showModal: false
        }
    },
    computed: {
        patientid: function() {
            return this.$route.params.patientid;
        },
        ename: function() {
            return this.$route.params.ename;
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'visitHeader': require('../../components/VisitHeader.vue'),
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'calendar': function(resolve) {
            require(['../../components/calendar.vue'], resolve);
        },
        'menu': function(resolve) {
            require(['../../components/Menu.vue'], resolve);
        },
        'modal': function(resolve) {
            require(['../../components/Modal.vue'], resolve);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.fetchPatient();
            var self = this;
            $.ajax({
                url: api.get('doctor.menu'),
                type: 'POST',
                dataType: 'json',
                data: {
                    patientid: self.patientid
                },
            }).done(function(d) {
                if (d.data == '') {
                    self.showModal = true;
                    return;
                }
                self.treeData = d.data;
                if (!self.ename) {
                    if (d.data[0].link != "") {
                        self.ename = d.data[0].link;
                        self.name = d.data[0].name;
                    } else if (d.data[0].submenus[0].link != "") {
                        self.ename = d.data[0].submenus[0].link;
                        self.name = d.data[0].submenus[0].name;
                    } else {
                        self.ename = d.data[0].submenus[0].submenus[0].link;
                        self.name = d.data[0].submenus[0].submenus[0].name;
                    }
                }
            });
        })
    },
    methods: {
        fetchPatient: function() {
            var patientname = libpatient.getPatientName(this.patientid)
            var diseaseid = libpatient.getDiseaseId(this.patientid)
            if (patientname && diseaseid) {
                this.patientname = patientname
                // if (diseaseid != common.getDiseaseId()) {
                //     localStorage.setItem('_diseaseid_', diseaseid)
                //     window.location.reload();
                // }
            } else {
                var self = this;
                $.ajax({
                    url: api.get('patient.baseinfo'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid
                    },
                }).done(function(d) {
                    self.patientname = d.data.name;
                    libpatient.setPatientName(self.patientid, self.patientname);
                })
            }
        }
    }
}
</script>
