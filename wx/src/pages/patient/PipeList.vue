<template>
    <div class="pipe-list" style="margin-top:-60px;">
        <!-- <mt-header fixed title="医助交流">
            <router-link :to="{name: 'active-patient', query: {'thedate':thedate}}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="body" @click="clickBody">
            <div style="margin: 5px; padding: 5px;border-radius: 4px; text-align: left">
                <span>{{patient.name}}&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;{{patient.agestr}}</span>
            </div>
            <div class="filterArea">
                <a :class="{'filterActive': filterActive == 'all'}" href="javascript:" @click="clickAll">全部</a><a :class="{'filterActive': filterActive == 'patient'}" href="javascript:" @click="clickPatient">患者</a><a :class="{'filterActive': filterActive == 'auditor'}" href="javascript:" @click="clickAudit">医助</a>
            </div>
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" style="list-style-type: none; padding:0px">
                <li v-for="pipe in pipes">
                    <div :class="{'pipe-from-audit': pipe.owner_type == 'Auditor', 'pipe-from-patient': pipe.owner_type == 'Patient'}" style="padding: 10px 10px 10px 0px">
                        <div>
                            <span class="pipe-title">{{pipe.title}}</span>
                            <span style="padding:5px 10px 10px 10px; float: right; color: #555">{{pipe.createtime}}</span>
                            <div style="clear: both;"></div>
                        </div>
                        <div v-if="pipe.type=='text'">
                            <p style="clear: both;word-break: break-all; text-align: left; margin-left: 10px;padding: 10px 5px 5px 0px">{{pipe.content}}</p>
                        </div>
                        <div v-if="pipe.type == 'picture'" style="margin-top: 15px; width: 100%;">
                            <img :src="pipe.picture.thumb_url" style="width: 90%;margin: auto;">
                        </div>
                    </div>
                </li>
            </ul>
            <div style="position: none;margin-top: 200px; background-color: #fff">
                <span v-if="pipes.length == 0" style="margin-top:400px;width:80%; background-color: #fcf8e3; padding: 15px">暂无数据</span>
            </div>
        </div>
        <div style="width: 100%; height: 100%; margin-left: -8px; box-sizing: border-box">
            <div id="footer" style="position: absolute;bottom: 0px; width: 100%; background-color: #ddd; text-align: left;padding: 5px 0px">
                <div style="margin-left: 10px">
                    <input type="text" name="" style="padding: 8px;width: 85%; border-radius: 4px; border: none; box-sizing:border-box;vertical-align: middle; font-size: 16px" v-model="content" @focus="doSomething" v-on:keyup.13="sendMsg">
                    <img src="../../../static/more.png" style="width: 35px; vertical-align: middle; margin: auto" @touchstart="clickMoreType">
                </div>
                <div v-if="moreType" style="border-top: 1px solid #ccc; margin-top: 10px;padding-top: 10px;margin:0px 10px;">
                    <!-- <a href="javascript:" class="a-input-file a-input-file-picbg">
                        <input class="input-file" type="file"  name="imgfile" value="浏览"/>
                    </a> -->
                    <a href="javascript:" class="a-input-file a-input-file-photobg">
                        <input id="input-pic-file" class="input-file" type="file"  name="imgfile" value="浏览" @click="uploadImg" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    import lodash from 'lodash'
    module.exports = {
        data: function() {
            return {
                content: '',

                moreType: false,

                thedate: '',
                openid: '',
                filter: 'all',
                filterActive: 'all',
                patient:{},
                pipes: [
                    {
                        owner_type: 'Patient',
                        title: '患者回复',
                        type: 'picture',
                        picture:{
                            thumb_url: 'http://photo.fangcunyisheng.com/8/20/820114d19871d260431fc0620a429fe5.300_300.jpeg',
                        }
                    }
                ]
            }
        },
        created: function() {
            var windowHeight = $(window).height(); //浏览器当前的高度
            var self = this;
            
            var currHeight = 0;
            var resizeTimer = null;
            function handleWindow() {
                currHeight = $(window).height();
                if (currHeight < windowHeight) {
                    self.input = currHeight;
                }
                self.input = currHeight;
            };
            var func1 = lodash.debounce(handleWindow, 400);
            $(window).on('resize', func1);
        },
        beforeRouteEnter(to, from, next) {
            var openid = localStorage.getItem('_openid_');
            var thedate = to.query.thedate;
            console.log(thedate);
            $.ajax({
                url: api.get('pipe.pipelist'),
                type: 'post',
                dataType: 'json',
                data: {
                    openid: openid,
                    patientid: to.params.patientid,
                }
            }).done(function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    console.log(data.patient);
                    next(vm => {
                        vm.pipes = data.pipes;
                        vm.patient = data.patient;
                        vm.openid = openid;
                        vm.thedate = thedate;
                    })
                }
            })
        },
        methods: {
            uploadImg: function(e) {
                // var files = e.target.files || e.dataTransfer.files;
                // if (!files.length) {
                //     console.log('111111');
                //     return;
                // }
                var self = this;
                var url = api.get('picture.addjson');
                var inputfile = $('#input-pic-file');
                inputfile.fileupload({
                    url:url,
                    formData:{
                    },
                    dataType:"json",
                    // add: function(e,result){
                        // $(".picBox-upload-" + bindtype).show();
                        // result.submit();
                    // },
                    success: function(response) {
                        console.log(response);
                        if (response.errno == 0) {
                            self.uploadImgId(response.data.pictureid);
                        }
                    }
                });
            },
            uploadImgId: function(pictureid) {
                var self = this;
                var url = api.get('wxpicmsgmgr.sendpic2onepatient');
                var params = {
                    openid: this.openid,
                    patientid: this.patient.patientid,
                    pictureid: pictureid,
                }
                common.post(url, params, function(response){
                    console.log(response);
                    if (response.errno == 0) {
                        let instance = self.$toast('发送成功');
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                        self.content = '';
                        self.moreType = false;
                        self.fetchData();
                        $('input').blur();
                        $(".body").animate({
                            scrollTop: 0,
                        }, 0);
                    }
                })
            },
            sendMsg: function() {
                var self = this;
                if (this.content.trim() == '') {
                    $('input').blur();
                    return ;
                }
                var url = api.get('pushmsg.sendmsg2onepatient');
                var params = {
                    openid: this.openid,
                    content: this.content,
                    patientid: this.patient.patientid,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        let instance = self.$toast('发送成功');
                        setTimeout(() => {
                            instance.close();
                        }, 1000);
                        self.content = '';
                        self.fetchData();
                        $('input').blur();
                        $(".body").animate({
                            scrollTop: 0,
                      }, 0);
                    }
                })
            },
            clickBody: function() {
                $('input').blur();
            },
            doSomething: function() {
                // console.log('1111111');
                // var self = this;
                // setTimeout(function(){
                //     // self.input = $('.body').scrollTop();
                //     // self.input = $('#footer').offset().top;
                //     // self.input += ' ' + $('#footer').height();
                //     // self.input += ' ' + $(window).scrollTop();
                //     // var height = $(window).innerHeight();
                //     // self.input += ' ' + height;
                //     $('#footer').css('position', 'fixed').css('bottom', '0px');
                // },200)
            },
            clickMoreType: function() {
                this.moreType = !this.moreType;
            },
            clickAll: function() {
                if ($.trim(this.filter) == "all") {
                    return ;
                }
                this.filter = 'all';
                this.filterActive = 'all';
                this.fetchData();
            },
            clickPatient: function() {
                if ($.trim(this.filter) == "patient") {
                    return ;
                }
                this.filter = 'patient';
                this.filterActive = 'patient';
                this.fetchData();
            },
            clickAudit: function() {
                if ($.trim(this.filter) == "auditor") {
                    return ;
                }
                this.filter = 'auditor';
                this.filterActive = 'auditor';
                this.fetchData();
            },
            loadMore: function(){
                this.loading = true;
                this.loadMoreData();
            },
            fetchData: function() {
                var self = this;
                var pipeid = '';
                if (self.pipes.length != 0 && self.pipes[self.pipes.length -1].pipeid != 'undefined') {
                    pipeid = self.pipes[self.pipes.length-1].pipeid;
                }
                var openid = localStorage.getItem('_openid_');
                self.openid = openid,
                $.ajax({
                    url: api.get('pipe.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: self.openid,
                        patientid: self.patient.patientid,
                        filter: self.filter,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.pipes = data.pipes;
                    }
                })
            },
            loadMoreData: function() {
                var self = this;
                var pipeid = '';
                if (self.pipes.length != 0 && self.pipes[self.pipes.length -1].pipeid != 'undefined') {
                    pipeid = self.pipes[self.pipes.length-1].pipeid;
                }
                $.ajax({
                    url: api.get('pipe.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: self.openid,
                        lastpipeid: pipeid,
                        patientid: self.patient.patientid,
                        filter: self.filter,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.pipes = self.pipes.concat(data.pipes);
                        self.loading = false;
                    }
                })
            }
        },
        mounted: function() {
            document.title = "医助交流";
        }
    }
</script>
<style scoped>
    /*.pipe-list {
        width: 100%;
        height: 100%;
    }*/
    .body {
        height: 100%;
        width: 100%;
        position: absolute;
        margin-left: -8px;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
    .pipe-from-audit {
        border: 1px solid #ccc;
        border-radius: 0px;
        margin:5px;
    }
    .pipe-from-patient {
         border: 1px solid #ccc;
        border-radius: 0px;
        margin:5px;
    }
    .filterArea {
        margin-top: 10px;
    }
    .filterArea a {
        border: 1px solid #bbb;
        display: inline-block;
        width: 32%;
        color: #17a0ff;
        /*color: #17a0ff;*/
        /*margin-right: -2px;*/
        margin-left: -1px;
        text-decoration: none;
        padding: 10px 0px;
        /*border-radius: 4px;*/
    }
    .pipe-from-audit .pipe-title {
        float: left;
        margin: 0px 0px 0px 0px;
        padding: 5px 10px; 
        background-color: #37b031; 
        border-top-right-radius: 16px; 
        border-bottom-right-radius: 16px; 
        color: #fff
    }
    .pipe-from-patient .pipe-title {
        float: left;
        margin: 0px 0px 0px 0px;
        padding: 5px 10px; 
        background-color: #17a0ff; 
        border-top-right-radius: 16px; 
        border-bottom-right-radius: 16px; 
        color: #fff
    }
    .filterArea a.filterActive {
        background-color: #17a0ff;
        color: #fff;
    }
    a.a-input-file{
        display:inline-block; 
        width:50px; 
        height:50px; 
        background-color:#ccc; 
        border: 1px solid #bbb;
        position:relative; 
        overflow:hidden;
    }
    .a-input-file-picbg {
        background-image: url('../../../static/picture.png');
        background-repeat: no-repeat;
    }
    .a-input-file-photobg {
        background-image: url('../../../static/photo.png');
        background-repeat: no-repeat;
    }
    .input-file {
        position:absolute;
        right:0; top:0;
        font-size:100px;
        opacity:0;
        filter:alpha(opacity=0);
    }
</style>