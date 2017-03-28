<template>
<!--暂时不用-->
    <app-header></app-header>
    <div class="container-fluid content">
        <div class="row">
            <div class="col-sm-12" style="border: 1px solid #ccc; background: #eee; padding: 10px">
                <span>患者姓名:&nbsp;&nbsp;&nbsp;{{patient.name}}&nbsp;&nbsp;&nbsp;电话:&nbsp;&nbsp;&nbsp;{{patient.mobile}}&nbsp;&nbsp;&nbsp;&nbsp;所属医生:&nbsp;&nbsp;&nbsp;{{doctorname}}</span>
            </div>
        </div>
        <div class="row" style="border: 1px solid #ccc;background-color: #eee; margin-top: 10px; margin-bottom: 10px">
            <div class="col-sm-12" style="padding: 10px;">
                <div class="form-horizontal">
                    <span class="control-label" style="float: left; padding-left: 0px; padding-right: 0px; text-align: left">按标签筛选病历图:&nbsp;&nbsp;&nbsp;</span>
                <!-- <a href="javascript:" class="" style="margin: 0 20px 0 0; text-decoration: none" @click="picfilter(-1)">全部</a>
                <a href="javascript:" v-for="tag in tags" class="" style="margin: 0 20px 0 0; text-decoration: none" @click="picfilter($index)">{{tag.name}}</a> -->
                    <div class="col-sm-3" style="padding-left: 0px; padding-right: 0px">
                        <select class="form-control" @change="picfilter">
                            <option>全部</option>
                            <option v-for="tag in tags">{{tag.name}}</option>
                        </select>
                    </div>
                    <div class="col-sm-2">
                        <div>
                            <a href="javascript:" class="btn btn-warning" @click="isUploading = !isUploading">上传图片</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-if="isUploading == true">
            <uploadimage :imgurls.sync="imgurls" :pictureids.sync="pictureids"></uploadimage>
            <div class="col-sm-12 text-right" style="margin-bottom:10px;padding:0">
                <a href="javascript:" class="btn btn-primary" @click="uploadCase" :disabled="pictureids.length < 1">提&nbsp;&nbsp;交</a>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12" style="padding: 0">
                <table class="table table-bordered">
                    <tr>
                        <th class="light-th">缩略图</th>
                        <th class="light-th">图片标签(点击选中)</th>
                        <th class="light-th" style="text-align: center">操作</th>
                    </tr>
                    <tr v-for="wxpicmsg in wxpicmsgs">
                        <td>
                            <a class="photo-a" data-url="{{wxpicmsg.url}}" href="javascript:" @click="clickPhoto">
                                <img :src="wxpicmsg.img">
                            </a>
                        </td>
                        <td>
                            <div v-for="tag in tags" class="checkbox checkbox-inline checkbox-info" style="margin-left:0;">
                                <input id="{{wxpicmsg.id}}{{$index}}" type="checkbox" name="" :value="tag.id" v-model="wxpicmsg.tagids" @change="addOrRemoveTags($event, $parent.$index, $index)">
                                <label for="{{wxpicmsg.id}}{{$index}}">{{tag.name}}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </td>
                        <td width="5%" style="text-align: center;">
                            <a href="javascript:" @click="deletePicture($index)" style="text-decoration: none;">删除</a>
                        </td>
                    </tr>
                    <tr v-show="wxpicmsgs.length == 0">
                        <td colspan="3" style="text-align: center">
                            <span style="color: red; font-size: 16px">暂无数据</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
    <photo-gallery :photourls="photourls" :show.sync="showPhotoGallery" :currentindex.sync="currentPhotoIndex"></photo-gallery>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    export default {
        data: function() {
            return {
                patient: '',
                doctorname: '',
                tags: '',
                wxpicmsgs: '',
                isUploading: false,
                imgurls: [],
                pictureids: [],

                photourls: [],
                showPhotoGallery: false,
                currentPhotoIndex: 0,
            }
        },
        route: {
            data: function(transition) {
                this.patientid = transition.to.params.patientid;
                this.fetchData();
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'photoGallery': function(resolve) {
                    require(['../../components/PhotoGallery.vue'], resolve);
            },
            'uploadimage': function(resolve) {
                require(['../../components/UploadImage.vue'], resolve)
            }
        },
        methods: {
            fetchData: function() {
                var self = this;
                api.http({
                  url: 'patient.medicalpic',
                  data: {
                    patientid: self.patientid
                  },
                  successCallback: function(d) {
                      var data = response.data;
                      self.tags = data.tags;
                      self.wxpicmsgs = data.wxpicmsgs;
                      self.patient = data.patient;
                  }
                })
            },
            deletePicture: function(index) {
                var self = this;
                self.$dispatch('show-prompt', '是否确认删除此病例图片?', function(){
                    $.ajax({
                        url: api.get('patient.deletemedicalpic'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            wxpicmsgid: self.wxpicmsgs[index].id,
                        }
                    }).done(function(response){
                        if (response.errno == 0) {
                            console.log(response);
                            self.wxpicmsgs.splice(index, 1);
                            self.$dispatch('show-popup', "删除成功");
                        }else {
                            self.$dispatch('show-alert', response.errmsg);
                        }
                    })
                })
            },
            addOrRemoveTags: function(e, wxpicmsgindex, tagsindex) {
                if (e.target.checked == true) {
                    this.addTags(wxpicmsgindex, tagsindex);
                }else {
                    this.removeTags(wxpicmsgindex, tagsindex);
                }
            },
            addTags: function(wxpicmsgindex, tagsindex) {
                var self = this;
                $.ajax({
                    url: api.get('patient.addtag'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        wxpicmsgid: self.wxpicmsgs[wxpicmsgindex].id,
                        tagid: self.tags[tagsindex].id,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(response)
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            removeTags: function(wxpicmsgindex, tagsindex) {
                var self = this;
                $.ajax({
                    url: api.get('patient.removetag'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        wxpicmsgid: self.wxpicmsgs[wxpicmsgindex].id,
                        tagid: self.tags[tagsindex].id,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(response)
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            picfilter: function(e) {
                var index = e.target.selectedIndex - 1;
                var self = this;
                var tagid = "";
                if (index != -1) {
                    tagid = this.tags[index].id;
                }
                $.ajax({
                    url: api.get('patient.medicalpic'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                        tagid: tagid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(data);
                        self.wxpicmsgs = data.wxpicmsgs;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            uploadCase: function(e) {
                var self = this;
                $.ajax({
                    url: api.get('common.uploadcase'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                        pictureids: self.pictureids,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.$dispatch('show-popup', '提交成功', function() {
                            self.isUploading = false;
                        });
                        self.fetchData();
                    } else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            clickPhoto: function(e) {
                var index = 0;
                $('.photo-a').each(function(){
                    if ($(this).get(0) == $(e.target).parent().get(0)) {
                        return false;
                    }
                    index ++;
                })
                console.log('----index---', index)
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
        computed: {
            doctorname: function() {
                return common.getName();
            }
        },
        events: {
            'closePhotoGallery': function() {
                this.hideGallery();
            }
        }
    }
</script>
