<template>
    <div class="borderstyle">
        <div class="bg-gray">
            <a href="javascript:" v-link="{path: '/patient/list/' + patientid + '/visitinfo?pagenum=' + pagenum + '&patient_name=' + patient_name}"><strong>门诊</strong></a>
            <a class="active" href="javascript:"><strong>诊后</strong></a>
        </div>
        <div class="colorBox" style="margin-top:10px;">
            <a href="javascript:" style="margin:2px" class="btn-info btn header-a" @click="clickMedicalPic">病历图</a>
            <a href="javascript:" style="margin:2px" class="btn btn-info" @click="patientPaperList">数据量表</a>
        </div>
        <div>
            <baseinfo :patient="patient"></baseinfo>
        </div>
        <div class="colorBox">
            <span>医护人员代填量表</span>
            <a class="btn btn-warning btn-sm" @click="clickpaperbtndescribe">{{{paperbtndescribe | filterPaperBtnDesc}}}</a>
        </div>
        <div v-show="showOtherWrite">
            <table class="table table-bordered">
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
            <div v-for="pipe in pipelist" style="border:1px solid #ccc;margin-bottom:5px;">
                <div class="pipetitle" style="background-color: #eee;padding: 5px">
                    <span style="font-size: 14px">{{pipe.typestr}}</span>&nbsp;&nbsp;&nbsp;
                    <span style="color: #888">{{pipe.createtime}}&nbsp;&nbsp;&nbsp;{{pipe.writer}}&nbsp;&nbsp;&nbsp;{{pipe.shipstr}}</span>
                </div>
                <div style="padding: 5px">
                    <component :is="pipe.objtype" :obj="pipe"></component>
                </div>
                <div v-show="pipe.response == true" class="row" style="margin: 0 0 5px 5px;">
                    <div class="col-sm-6" style="padding:0">
                        <textarea id="textareapipe{{$index}}" rows="5" v-model="pipe.responseData" class="form-control"></textarea>
                    </div>
                </div>
                <button v-show="pipe.response != true" class="btn btn-default btn-sm" style="margin: 0px 0px 10px 5px" @click="responsePipe(pipe,$index)">回复</button>
                <button v-show="pipe.response == true" class="btn btn-info btn-sm" style="margin: 0px 0px 10px 5px" @click="submitResponsePipe($index)">提交回复</button>
                <button v-show="pipe.response == true" class="btn btn-default btn-sm" style="margin: 0px 0px 10px 5px" @click="stopResponsePipe($index)">收起</button>
            </div>
        </div>
        <div v-show="!moredata" class="row" style="margin: 0px; padding: 20px 0px 20px 0px; text-align: center; font-size: 18px; color: red">无更多数据</div>
        <div class="row" style="text-align: center">
            <a href="javascript:"  class="btn btn-info" style="margin-top: 20px" @click='loadMore'>加载更多 <i class="fa fa-angle-double-down"></i></a>
        </div>
    </div>
    <photo-gallery :photourls="photourls" :show.sync="showPhotoGallery" :currentindex.sync="currentPhotoIndex"></photo-gallery>
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
    module.exports = {
        data: function() {
            return {
                showPhotoGallery: false,
                currentPhotoIndex: 0,
                photourls: [],

                pagenum: 0,
                patient_name: '',

                moredata: true,
                patientid: '',
                patient: '',
                pipelist: '',

                paperbtndescribe: '展开',
                showOtherWrite: false,

                sendtoopenid: '',
                content: '',
            }
        },
        route: {
            data: function(transition) {
                var self = this;
                self.moredata = true;
                this.patientid = transition.to.params.patientid;
                this.pagenum = transition.to.query.pagenum;
                this.patient_name = transition.to.query.patient_name;
                console.log(transition.to.name);
                console.log('after');
                if (!this.patient_name) {
                    this.patient_name = '';
                }
                if (this.patientid == 0) {
                    return ;
                }

                $.ajax({
                    url: api.get('patient.baseinfo'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                    }
                })
                .done(function(response){
                    var data = response.data;
                    self.patient = data;
                    self.sendtoopenid = self.patient.users[0].openid;
                });

                $.ajax({
                    url: api.get('patient.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid
                    }
                })
                .done(function(response){
                    self.pipelist = response.data.list;
                    for (var i = 0; i < self.pipelist.length; i++) {
                        self.pipelist[i].responseData = '';
                        self.pipelist[i].response = false;
                    }
                })
            }
        },
        components: {
            'baseinfo':  require('../../components/Baseinfo.vue'),
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
            'PhotoGallery': require('../../components/PhotoGallery.vue'),
        },
        methods: {
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
                $.ajax({
                    url: api.get('patient.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                        offsetpipetime: self.pipelist[self.pipelist.length-1].createtime,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        if (response.data.list.length > 0) {
                            self.pipelist=self.pipelist.concat(response.data.list);
                        }else {
                            self.moredata = false;
                        }
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
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
                var self = this;
                $.ajax({
                    url: api.get('pipe.pushmsg'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        open_id: self.sendtoopenid,
                        content: self.content,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', "发送成功");
                        self.content = "";
                    }else {
                        self.$dispatch('show-alert', errmsg);
                    }
                })
            },
            responsePipe: function(pipe, index) {
                pipe.response = true;
                pipe = Object.assign({}, pipe);
                this.pipelist.$set(index, pipe);

                setTimeout(function(){
                    $('#textareapipe' + index ).focus();
                }, 0);
            },
            stopResponsePipe: function(index) {
                this.pipelist[index].response = false;
                this.pipelist[index] = Object.assign(index, this.pipelist[index]);
                this.pipelist.$set(index, this.pipelist[index]);
            },
            submitResponsePipe: function(index) {
                var self = this;
                if (self.pipelist[index].responseData.trim() == '') {
                    return ;
                }
                $.ajax({
                    url: api.get('pipe.pushmsg'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        open_id: self.pipelist[index].master_wxuser_openid,
                        content: self.pipelist[index].responseData,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.pipelist[index].responseData = '';
                        self.$dispatch('show-popup', '回复成功');
                        // self.stopResponsePipe(index);
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            patientPaperList: function() {
                sessionStorage.setItem('patientid', this.patientid);
                sessionStorage.setItem('patient_name', this.patient.name);
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
            }
        },
        filters: {
            filterPaperBtnDesc: function(value) {
                var str = value;
                if (value == '展开') {
                    str += " <i class='fa fa-caret-down'></i>";
                } else {
                    str += " <i class='fa fa-caret-up'></i>";
                }
                return str;
            }
        },
        events: {
            'showPhotoGallery': function(e) {
                this.clickPhoto(e);
            },
            'closePhotoGallery': function() {
                this.hideGallery();
            }
        }
    }
</script>
