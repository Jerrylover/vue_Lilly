<template>
    <div class="container-fluid content">
        <breadcrumb :data="breadcrumbData" pagetitle="数据录入">
            <div name="other-content">
            </div>
        </breadcrumb>

        <div class="page-content">
            <div class="container col-lg-2 col-sm-3 container-left" style="width:160px">
                <div class="div1">
                    <ul class="list-unstyled">
                        <fcmenu v-for="model in treeData" :model="model" :patientid="patientid" :ename="ename"></fcmenu>
                    </ul>
                </div>
            </div>
            <div class="container col-lg-10 col-sm-9 container-right">
                <router-view></router-view>
            </div>
        </div>

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
            <div><router-link   :to="{path: '/'}" @click="showModal = false">返回首页</router-link></div>
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
import Bus from '../../lib/bus.js'
export default {
    data: function() {
        return {
            breadcrumbData: [
                {
                    name: '患者列表',
                    link: {name: 'patient-list'}
                }
            ],
            treeData: [],
            name: '',
            showModal: false
        }
    },
    computed: {
        patientid: function() {
            return this.$route.params.patientid;
        },
        patientname: function() {
            return libpatient.getPatientName(this.patientid)
        },
        diseaseid: function() {
            return libpatient.getDiseaseId(this.patientid)
        },
        ename: function() {
            return this.$route.params.ename;
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'visitHeader': require('../../components/VisitHeader.vue'),
        'appFooter': require('../../components/Footer.vue'), //尾组件
        'navmenu': require('../../components/NavMenu.vue'),
        'breadcrumb': require('../../components/BreadCrumb.vue'),
        'fcmenu': function(resolve) {
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
            api.http({
              url: 'doctor.menu',
              data: {
                  patientid: self.patientid
              },
              successCallback: function(d) {
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
              }
            })
        })
    },
    methods: {
        fetchPatient: function() {
            if (!this.patientname) {
                var self = this;
                api.http({
                  url: 'patient.baseinfo',
                  data: {
                      patientid: self.patientid
                  },
                  successCallback: function(d) {
                      libpatient.setPatientName(self.patientid, self.patientname);
                  }
                })
            }
        }
    },
    created: function() {
        Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '数据录入')
    },
    watch: {
        '$route': function(to, from) {
            Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '数据录入')
        }
    }
}
</script>
