<template>
  <div class="container-fluid content">
    <!-- <visit-header :patientname='patientname' :patientid='patientid' active='addvist' class="collapse"></visit-header> -->
        <breadcrumb :data="breadcrumbData" pagetitle="就诊记录">
            <div slot="other-content">
            </div>
        </breadcrumb>

        <div class="page-content">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">添加就诊记录</h3>
            </div>
            <div class="panel-body">
              <div class="inner-addon right-addon">
                <fc-date v-model="value" format="YYYY-MM-DD">
                  <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
                </fc-date>
              </div>
              <div class="col-lg-2 col-sm-2 form-group" v-show="isShowTypeStr">
                <el-select v-model="typestr" placeholder="">
                  <el-option label="门诊" value="门诊"></el-option>
                  <el-option label="住院" value="住院"></el-option>
                  <el-option label="出院" value="出院"></el-option>
                </el-select>
              </div>
              <div class="form-group">
                <button class="btn btn-primary" style="margin-left:10px;" @click="addVisit($event)">添加</button>
              </div>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">就诊记录历史</h3>
            </div>
            <div class="panel-body">
              <table class="table table-hover table-bordered fctable">
                <thead>
                  <tr>
                    <th>就诊日期</th>
                    <th v-show="isShowTypeStr">类型</th>
                    <th>主诉</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="revisitrecord in revisitRecords">
                    <td class="col-lg-2 col-sm-2">{{revisitrecord.date}}</td>
                    <td v-show="isShowTypeStr">{{revisitrecord.typestr | formateTypeStr}}</td>
                    <td>{{revisitrecord.content}}</td>
                    <td>
                      <a v-show="!revisitrecord.content" href="javascript:" @click="doDelete(revisitrecord, $event)">删除</a>
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
.panel {
  /*margin-top: 20px;*/
}
.panel-heading h3 {
    font-weight: normal;
}

.panel-title {
  font-weight: bold;
}

.input-group {
  width: 350px;
  float: left;
}

.form-control {
  width: 100%;
}


/*日历控件样式*/

.inner-addon {
  position: relative;
  float: left;
  /*width: 28%;*/
}


/* style icon */

.inner-addon .fa {
  position: absolute;
  padding: 10px;
  pointer-events: none;
  color: #008DB9;
}


/* align icon */

.left-addon .fa {
  left: 0px;
}

.right-addon .fa {
  right: 0px;
}


/* add padding  */

.left-addon input {
  padding-left: 30px;
}

.right-addon input {
  padding-right: 30px;
}


/***日历控件样式结束***/

button {
  float: left;
  /*margin-left: 50px;*/
}
</style>
<script>
import api from '../config/api.js'
import common from '../lib/common.js'
import libpatient from '../lib/patient.js'
import util from '../lib/util.js'
import Bus from '../lib/bus.js'
export default {
  data: function() {
    return {
        breadcrumbData: [
            {
                name: '患者列表',
                link: {name: 'patient-list'}
            }
        ],
      diseaseid: '',
      typestr: '门诊',
      patientname: '',
      revisitRecords: '',
      value: '',
    }
  },
  components: {
    'breadcrumb': require('../components/BreadCrumb.vue'),
  },
  computed: {
    patientid: function() {
      return this.$route.params.patientid;
    },
    isShowTypeStr: function() {
      return this.diseaseid != 3;
    }
  },
  methods: {
    addVisit: function(e) {
      e.preventDefault();
      var that = this;
      api.http({
        url: 'revisitrecord.add',
        data: {
          date: this.value,
          patientid: that.patientid,
          typestr: that.typestr
        },
        successCallback: function(d) {
          var path = '/checkuptpl/' + that.patientid + '/child/zhusu/主诉';
          var diseaseid = libpatient.getDiseaseId(that.patientid);
          if (common.isGastricCancer(diseaseid)) {
            path = '/checkuptpl/' + that.patientid + '/child/zhusu1/主诉';
          }
          that.$router.push({
            path: path,
            query: {
              date: that.value
            }
          })
        }
      })

    },
    fetchData: function() {
      var that = this;
      //获取
      api.http({
        url: 'revisitrecord.list',
        data: {
          patientid: that.patientid
        },
        successCallback: function(d) {
          that.revisitRecords = d.data;
        }
      })
    },
    fetchPatient: function() {
      var patientname = libpatient.getPatientName(this.patientid)
      if (patientname) {
        this.patientname = patientname
      } else {
        var that = this;
        api.http({
          url: 'patient.patientinfo',
          data: {
            patientid: that.patientid
          },
          successCallback: function(d) {
            that.patientname = d.data.name;
            libpatient.setPatientName(that.patientid, that.patientname);
          }
        })
      }
    },
    doDelete: function(revisitrecord, e) {
      e.preventDefault();
      var that = this;
      this.$confirm("确定要删除吗？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          api.http({
            url: 'revisitrecord.delete',
            data: {
              revisitrecordid: revisitrecord.revisitrecordid
            },
            successCallback: function(d) {
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                that.fetchData();
            }
          })
      }).catch(() => {

      });
    }
  },
  filters: {
    formateTypeStr: function(value) {
      if (value == '') {
        return '门诊';
      }
      return value;
    }
  },
  mounted: function() {

  },
  created: function() {
    this.fetchPatient();
    this.fetchData();
    this.diseaseid = common.getDiseaseId();
    this.value = util.getFormatDate();
    Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '就诊记录')
  },
  watch: {
    '$route': function(to, from) {
      this.fetchPatient();
      this.fetchData();
      this.diseaseid = common.getDiseaseId();
      this.value = util.getFormatDate();
      Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '就诊记录')
    }
  }
}
</script>
