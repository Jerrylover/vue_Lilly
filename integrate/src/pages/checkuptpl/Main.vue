<template>
    <div class="container-fluid content" :class="{'fullscreen': isfullscreen}">
        <breadcrumb :data="breadcrumbData" pagetitle="数据录入">
            <div slot="other-content">
                <button class="btn-fullscreen btn btn-success btn-sm" @click.prevent="letFullScreen" v-if="showFullScreenIcon"><i :class="{'glyphicon glyphicon-resize-full': !isfullscreen, 'glyphicon glyphicon-resize-small': isfullscreen}" style=""><span style="padding-left:5px;">{{screenTitle}}</span></i></button>
            </div>
        </breadcrumb>

        <div class="page-content" v-if="!showModal">
            <div class="container col-lg-2 col-sm-3 container-left" :class="{'fixed-width': !isfullscreen}">
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
        <div v-else style="width:100%;text-align:center;padding-top:100px">
            <h4>您还没有开通数据库服务，请联系运营人员开通，谢谢！</h4>
        </div>


    <!-- <modal :show="showModal">
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
            <div><a href="javascript:"  @click.prevent="goBackIndex">返回首页</a></div>
        </div>
    </modal> -->
    </div>
</template>
<style scoped>
.btn-fullscreen {
    margin-right: 50px;
}
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
.fixed-width {
    width: 160px;
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
            showModal: false,
            isfullscreen: false,
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
        },
        showFullScreenIcon: function() {
            return this.$route.name == 'checkuptpl-child' && this.showModal == false
        },
        screenTitle: function() {
            return this.isfullscreen ? '取消全屏' : '全屏'
        }
    },
    components: {
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
            var isfullscreen = localStorage.getItem('_checkup-isfullscreen_') == 1 ? true : false
            if (isfullscreen) {
                this.isfullscreen = true
                Bus.$emit('let-fullscreen', this.isfullscreen)
            }
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
        goBackIndex: function() {
            this.$router.push({
                name: 'webindex'
            })
            Bus.$emit('hide-patient-third-level-menu')
        },
        letFullScreen: function() {
            this.isfullscreen = !this.isfullscreen
            Bus.$emit('let-fullscreen', this.isfullscreen)
            localStorage.setItem('_checkup-isfullscreen_', this.isfullscreen ? 1 : 0)
        },
        fetchPatient: function() {
            if (!this.patientname) {
                var self = this;
                api.http({
                  url: 'patient.patientinfo',
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
