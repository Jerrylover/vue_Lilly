<template>
<div class="row table-header">
    <h4>{{patientname}}</h4>
    <a class="btn btn-md" :class="{'btn-default': active != 'basic', 'btn-primary': active == 'basic'}" href="javascript:" @click="goPatient">基本信息</a>
    <router-link  class="btn btn-md" :class="{'btn-default': active != 'revisitrecords', 'btn-primary': active == 'revisitrecords'}"  :to="{path: '/patient/' + patientid + '/revisitrecords'}">历次就诊</router-link>
    <router-link  v-privilege="'数据库-患者-添加就诊'" class="btn btn-md" :class="{'btn-default': active != 'addvist', 'btn-primary': active == 'addvist'}" href="javascript:"  :to="{path: '/addvisit/' + patientid}">添加就诊</router-link>

    <router-link  v-privilege="'数据库-量表-入口'" class="btn btn-md" :class="{'btn-default': active != 'addcheck', 'btn-primary': active == 'addcheck'}"  :to="{path:'/checkuptpl/' + patientid + '/child/'+ zhusuLink +'/主诉'}">数据录入</router-link>
    <a v-privilege="'数据库-患者-删除'" :class="{'hidden': active != 'basic', '': active=='basic'}" href="javascript: " style="color:#ff0000;float:right;margin:20px 0 0 0;" @click="removePatientClick">删除患者</a>
</div>
</template>
<style scoped>
h4 {
    float: left;
    padding-left: 10px;
    border-left: 3px solid #008db9;
}

a {
    margin: 3px 0 10px 20px;
    float: left;
}


/*a:hover {
        background-color: #008DB9;
        color: #fff;
    }*/

.btn-primary {
    background-color: #008DB9;
}

.table-header {
    border-bottom: 1px solid #ccc;
}
</style>
<script>
import common from '../lib/common.js';
import libpatient from '../lib/patient.js';
import api from '../config/api.js';
export default {
    data: function() {
        return {}
    },
    props: ['patientname', 'patientid', 'active', 'visitdesc'],
    computed: {
        zhusuLink: function() {
            var diseaseId = libpatient.getDiseaseId(this.patientid);
            if (common.isGastricCancer(diseaseId)) {
                return 'zhusu1';
            }
            return 'zhusu';

        }
    },
    methods: {
        goPatient: function() {
            var diseaseId = common.getDiseaseId();
            if (common.isCancerDisease(diseaseId)) {
                this.$router.push({
                    path: '/patient/' + this.patientid + '/baseinfo-lungcancer/',
                })
            } else {
                this.$router.push({
                    path: '/patient/' + this.patientid + '/baseinfo/',
                })
            }
        },
        removePatientClick: function() {
            var that = this;
            this.$confirm("是否删除该患者，患者删除后则连同数据库中的数据及诊后管理数据同时删除。请谨慎处理", '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                $.ajax({
                    url: api.get('patient.delete'),
                    type: "post",
                    dataType: "json",
                    data: {
                        patientid: that.patientid,
                    }
                }).done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                        that.$message({
                            type: 'error',
                            message: d.errmsg
                        });
                    } else {
                        that.$message({
                            type: 'success',
                            message: '删除成功!',
                            onClose: function() {
                                that.$router.push({
                                    path:'/'
                                })
                            }
                        });
                    }
                });
            }).catch(() => {

            });
        }
    }
}
</script>
