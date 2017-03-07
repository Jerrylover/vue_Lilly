<template>
    <div class="container-fluid content">
        <breadcrumb pagetitle="诊后管理">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
        <div>
            <baseinfo :patient="patient"></baseinfo>
        </div>
        <div class="colorBox">
            <span>医护人员代填量表</span>
            <a class="btn btn-warning btn-sm" @click="clickpaperbtndescribe" v-html="filterPaperBtnDesc(paperbtndescribe)"></a>
        </div>
        <div v-show="showOtherWrite">
            <table class="table table-bordered">
                <tbody>
                <tr>
                    <td>分组</td>
                    <td>标题</td>
                    <td>填写</td>
                </tr>
                <tr v-for="papertpl in patient.papertpls">
                    <td>{{papertpl.groupstr}}</td>
                    <td>{{papertpl.title}}</td>
                    <td><a href="javascript:" @click="clickWrite(papertpl.id)">填写</a></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="border: 1px solid #ccc; background-color: #f5f5f5">
            <div class="row" style="margin: 0px">
                <div class="col-sm-12" style="padding: 10px">
                    <span><strong>回复给:</strong></span>
                    <select v-model="sendtoopenid">
                        <option v-for="user in patient.users" :value="user.openid">{{user.shipstr}}</option>
                    </select>
                </div>
            </div>
            <div class="row" style="margin: 0px; padding: 0px 0px 10px 10px">
                <div class="col-sm-10" style="padding-left: 0px">
                    <textarea class="form-control" rows="4" v-model="content"></textarea>
                </div>
                <div class="col-sm-2">
                    <button class="btn btn-default btn-sm" @click="pushMsg">回复</button>
                </div>
            </div>
        </div>
        <div style="margin: 15px 0px 15px 0px;">
            <div v-for="(pipe, index) in pipelist" style="border:1px solid #ccc;margin-bottom:5px;">
                <div class="pipetitle" style="background-color: #eee;padding: 5px">
                    <span style="font-size: 14px">{{pipe.typestr}}</span>&nbsp;&nbsp;&nbsp;
                    <span style="color: #888">{{pipe.createtime}}&nbsp;&nbsp;&nbsp;{{pipe.writer}}&nbsp;&nbsp;&nbsp;{{pipe.shipstr}}</span>
                </div>
                <div style="padding: 5px">
                    <component :is="pipe.objtype" :obj="pipe"></component>
                </div>
                <div v-show="pipe.response == true" class="row" style="margin: 0 0 5px 5px;">
                    <div class="col-sm-6" style="padding:0">
                        <textarea :id="'textareapipe' + index" rows="5" v-model="pipe.responseData" class="form-control"></textarea>
                    </div>
                </div>
                <button v-show="pipe.response != true" class="btn btn-default btn-sm" style="margin: 0px 0px 10px 5px" @click="responsePipe(pipe,index)">回复</button>
                <button v-show="pipe.response == true" class="btn btn-info btn-sm" style="margin: 0px 0px 10px 5px" @click="submitResponsePipe(index)">提交回复</button>
                <button v-show="pipe.response == true" class="btn btn-default btn-sm" style="margin: 0px 0px 10px 5px" @click="stopResponsePipe(index)">收起</button>
            </div>
        </div>
        <div v-show="!moredata" class="row" style="margin: 0px; padding: 20px 0px 20px 0px; text-align: center; font-size: 18px; color: red">无更多数据</div>
        <div class="row" style="text-align: center">
            <a href="javascript:"  class="btn btn-info" style="margin-top: 20px" @click='loadMore'>加载更多 <i class="fa fa-angle-double-down"></i></a>
        </div>
        <photo-gallery :photourls="photourls" :show="showPhotoGallery" :currentindex="currentPhotoIndex"></photo-gallery>
    </div>
</div>
</template>
<style scoped>
    .borderstyle {
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 15px;
    }
    .bg-gray {
        background-color: #eee;
        line-height: 40px;
        display: block;
        height: 40px;
    }
    .bg-gray a {
        padding: 0px 15px;
        font-size: 16px;
        display: inline-block;
        text-decoration: none;
        height: 40px;
    }
    .bg-gray a:hover {
        background-color: none;
    }
    .active {
        background-color: #fff;
        border:1px solid #ccc;
        border-bottom: none;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .colorBox {
        /*background-color: #E6E5FB;*/
        background-color: #eee;
        padding: 10px;
    }
</style>
<script>
    import api from '../../config/api.js';
    import libpatient from '../../lib/patient.js'
    export default {
        data: function() {
            return {
                showPhotoGallery: false,
                currentPhotoIndex: 0,
                photourls: [],

                pagenum: 0,

                moredata: true,
                patient: '',
                pipelist: '',

                paperbtndescribe: '展开',
                showOtherWrite: false,

                sendtoopenid: '',
                content: '',
            }
        },
        components: {
            'baseinfo':  require('../../components/Baseinfo.vue'),
            'breadcrumb': require('../../components/BreadCrumb.vue'),
            'courseuserref': function(resolve){
                require(['../../components/pipelist/Courseuserref.vue'], resolve);
            },
            'DrugItem': function(resolve) {
                require(['../../components/pipelist/Drugitem.vue'], resolve);
            },
            'LessonUserRef': function(resolve) {
                require(['../../components/pipelist/Lessonuserref.vue'], resolve);
            },
            'Paper': function(resolve) {
                require(['../../components/pipelist/Paper.vue'], resolve);
            },
            'Patient': function(resolve) {
                require(['../../components/pipelist/Patient.vue'], resolve);
            },
            'PatientNote': function(resolve) {
                require(['../../components/pipelist/Patientnote.vue'], resolve);
            },
            'PatientPgroupRef': function(resolve) {
                require(['../../components/pipelist/Patientpgroupref.vue'], resolve);
            },
            'PushMsg': function(resolve) {
                require(['../../components/pipelist/Pushmsg.vue'], resolve);
            },
            'RevisitTkt': function(resolve) {
                require(['../../components/pipelist/Revisittkt.vue'], resolve);
            },
            'User': function(resolve) {
                require(['../../components/pipelist/User.vue'], resolve);
            },
            'WxOpMsg': function(resolve) {
                require(['../../components/pipelist/Wxopmsg.vue'], resolve);
            },
            'WxTxtMsg': function(resolve) {
                require(['../../components/pipelist/Wxtxtmsg.vue'], resolve);
            },
            'WxPicMsg': function(resolve) {
                require(['../../components/pipelist/Wxpicmsg.vue'], resolve);
            },
            'WxUser': function (resolve) {
                require(['../../components/pipelist/WxUser.vue'], resolve);
            },
            'PatientMedicineSheet': function(resolve) {
                require(['../../components/pipelist/PatientMedicineSheet.vue'], resolve);
            },
            'WxVoiceMsg': function(resolve) {
                require(['../../components/pipelist/WxVoiceMsg.vue'], resolve);
            },
            'CdrMeeting': function(resolve) {
                require(['../../components/pipelist/CdrMeeting.vue'], resolve);
            },
            'PhotoGallery': require('../../components/PhotoGallery.vue'),
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
            initPage: function() {
                var self = this;
                self.moredata = true;
                this.pagenum = this.$route.query.pagenum;
                api.http({
                  url: 'patient.baseinfo',
                  data: {
                    patientid: self.patientid,
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      self.patient = data;
                      self.sendtoopenid = self.patient.users[0].openid;
                  }
                })
                api.http({
                  url: 'patient.pipelist',
                  data: {
                    patientid: self.patientid,
                  },
                  successCallback: function(d) {
                      self.pipelist = d.data.list;
                      for (var i = 0; i < self.pipelist.length; i++) {
                          self.pipelist[i].responseData = '';
                          self.pipelist[i].response = false;
                      }
                  }
                })
            },
            clickpaperbtndescribe: function() {
                if (this.paperbtndescribe == "展开") {
                    this.paperbtndescribe = "收起";
                    this.showOtherWrite = true;
                }else if(this.paperbtndescribe == "收起"){
                    this.paperbtndescribe = "展开";
                    this.showOtherWrite = false;
                }
            },
            loadMore: function() {
                var self = this;
                if (self.pipelist.length == 0) {
                    return ;
                }
                api.http({
                  url: 'patient.pipelist',
                  data: {
                      patientid: self.patientid,
                      offsetpipetime: self.pipelist[self.pipelist.length-1].createtime,
                  },
                  successCallback: function(d) {
                      if (d.data.list.length > 0) {
                          self.pipelist = self.pipelist.concat(d.data.list);
                      }else {
                          self.moredata = false;
                      }
                  }
                })
            },
            clickWrite: function(papertplid) {
                var url = '';
                if (document.domain == 'localhost') {
                    url = 'http://admin.fangcunhulian.cn/papertplmgr/one4patient?papertplid=' + papertplid + '&patientid=' + this.patientid;
                }else {
                    var url = '/api/papertplmgr/one4patient?papertplid=' + papertplid + '&patientid=' + this.patientid;
                }
                window.open(url);
            },
            pushMsg: function() {
                if ($.trim(this.content) == '') {
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '请输入内容'
                    })
                    return
                }
                var self = this;
                api.http({
                  url: 'pipe.pushmsg',
                  data: {
                      open_id: self.sendtoopenid,
                      content: self.content,
                  },
                  successCallback: function(d) {
                      self.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '发送成功!'
                      });
                      self.content = "";
                  }
                })
            },
            responsePipe: function(pipe, index) {
                pipe.response = true;
                pipe = Object.assign({}, pipe);
                this.$set(this.pipelist, index, this.pipelist[index])

                setTimeout(function(){
                    $('#textareapipe' + index ).focus();
                }, 0);
            },
            stopResponsePipe: function(index) {
                this.pipelist[index].response = false;
                this.pipelist[index] = Object.assign(index, this.pipelist[index]);
                this.$set(this.pipelist, index, this.pipelist[index])
            },
            submitResponsePipe: function(index) {
                var self = this;
                if (self.pipelist[index].responseData.trim() == '') {
                    return ;
                }
                api.http({
                  url: 'pipe.pushmsg',
                  data: {
                      open_id: self.pipelist[index].master_wxuser_openid,
                      content: self.pipelist[index].responseData,
                  },
                  successCallback: function(d) {
                      self.pipelist[index].responseData = '';
                      self.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '回复成功!'
                      });
                  }
                })
            },
            patientPaperList: function() {
                var url = '/#!/patient/' + this.patientid + '/paperlist';
                window.open(url);
            },
            clickMedicalPic: function() {
                var url = '#!/patient/' + this.patientid + '/medicalpic';
                window.open(url);
            },
            clickPhoto: function(e) {
                var index = 0;
                $('#visitContent').css('-webkit-overflow-scrolling', '');
                $('.photo-a').each(function(){
                    if ($(this).get(0) == $(e.target).parent().get(0)) {
                        return false;
                    }
                    index ++;
                })
                var photourls = [];
                var that = this;
                that.photourls = [];
                $('.photo-a').each(function() {
                    that.photourls.push($(this).data('url'));
                });
                this.showGallery(index);
            },
            showGallery: function(index) {
                this.showPhotoGallery = true;
                this.currentPhotoIndex = index - '';
                $('body').addClass('hide-scroll');
            },
            hideGallery: function() {
                this.showPhotoGallery = false;
                $('body').removeClass('hide-scroll');
            },
            filterPaperBtnDesc: function(value) {
                var str = value;
                if (value == '展开') {
                    str += " <i class='fa fa-caret-down'></i>";
                } else {
                    str += " <i class='fa fa-caret-up'></i>";
                }
                return str;
            },
            showPhotoGalleryFn: function(e) {
                this.clickPhoto(e);
            },
            closePhotoGalleryFn: function() {
                this.hideGallery();
            },
            changePhotoIndex: function(index) {
                this.currentPhotoIndex = index
            }
        },
        created: function() {
            this.initPage()
            Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '诊后管理')
            Bus.$on('show-photogallery', this.showPhotoGalleryFn)
            Bus.$on('close-photogallery', this.closePhotoGalleryFn)
            Bus.$on('change-photo-index', this.changePhotoIndex)
        },
        watch: {
            '$route': function() {
                this.initPage()
                Bus.$emit('show-patient-third-level-menu', this.patientid, this.patientname, '诊后管理')
                Bus.$on
            }
        }
    }
</script>
