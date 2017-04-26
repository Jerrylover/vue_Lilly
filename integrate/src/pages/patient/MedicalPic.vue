<template>
<!--暂时不用-->
    <div class="container-fluid content">
        <breadcrumb :data="breadcrumbData" pagetitle="就诊记录">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
        <div class="row" style="margin:0">
            <div class="col-sm-12" style="border: 1px solid #ccc; background: #eee; padding: 10px">
                <span>患者姓名:&nbsp;&nbsp;&nbsp;{{patient.name}}&nbsp;&nbsp;&nbsp;电话:&nbsp;&nbsp;&nbsp;{{patient.mobile}}&nbsp;&nbsp;&nbsp;&nbsp;所属医生:&nbsp;&nbsp;&nbsp;{{doctorname}}</span>
            </div>
        </div>
        <div class="row" style="border: 1px solid #ccc;background-color: #eee; margin:10px 0">
            <div class="col-sm-12" style="padding: 10px;">
                <div class="form-horizontal">
                    <span class="control-label" style="float: left; padding-left: 0px; padding-right: 0px; text-align: left">按标签筛选病历图:&nbsp;&nbsp;&nbsp;</span>
                <!-- <a href="javascript:" class="" style="margin: 0 20px 0 0; text-decoration: none" @click="picfilter(-1)">全部</a>
                <a href="javascript:" v-for="(tag, index) in tags" class="" style="margin: 0 20px 0 0; text-decoration: none" @click="picfilter(index)">{{tag.name}}</a> -->
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
        <div class="row" v-if="isUploading == true" style="margin:0">
            <uploadimage :prop-imgurls="imgurls" :prop-pictureids="pictureids"></uploadimage>
            <div class="col-sm-12 text-right" style="margin-bottom:10px;padding:0">
                <a href="javascript:" class="btn btn-primary" @click="uploadCase" :disabled="pictureids.length < 1">提&nbsp;&nbsp;交</a>
            </div>
        </div>
        <div class="row" style="margin:0">
            <div class="col-sm-12" style="padding: 0">
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <th class="light-th">缩略图</th>
                        <th class="light-th">图片标签(点击选中)</th>
                        <th class="light-th" style="text-align: center">操作</th>
                    </tr>
                    <tr v-for="(wxpicmsg, pIndex) in wxpicmsgs">
                        <td>
                            <a class="photo-a" :data-url="wxpicmsg.url" href="javascript:" @click="clickPhoto">
                                <img :src="wxpicmsg.img">
                            </a>
                        </td>
                        <td>
                            <div v-for="(tag, index) in tags" class="checkbox checkbox-inline checkbox-info" style="margin-left:0;">
                                <input :id="wxpicmsg.id + index" type="checkbox" name="" :value="tag.id" v-model="wxpicmsg.tagids" @change="addOrRemoveTags($event, pIndex, index)">
                                <label :for="wxpicmsg.id + index">{{tag.name}}</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </div>
                        </td>
                        <td width="5%" style="text-align: center;">
                            <a href="javascript:" @click="deletePicture(pIndex)" style="text-decoration: none;">删除</a>
                        </td>
                    </tr>
                    <tr v-show="wxpicmsgs.length == 0">
                        <td colspan="3" style="text-align: center">
                            <span style="">暂无数据</span>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        </div>
        <photo-gallery :photourls="photourls" :show="showPhotoGallery" :currentindex="currentPhotoIndex"></photo-gallery>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    import libpatient from '../../lib/patient.js'
    export default {
        data: function() {
            return {
                breadcrumbData: [
                    {
                        name: '患者列表',
                        link: {name: 'patient-list'}
                    }
                ],
                patient: '',
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
        components: {
            'breadcrumb': require('../../components/BreadCrumb.vue'),
            'photoGallery': function(resolve) {
                    require(['../../components/PhotoGallery.vue'], resolve);
            },
            'uploadimage': function(resolve) {
                require(['../../components/UploadImage.vue'], resolve)
            }
        },
        methods: {
            fetchData: function() {
                var that = this;
                api.http({
                  url: 'patient.medicalpic',
                  data: {
                    patientid: that.patientid
                  },
                  successCallback: function(d) {
                      var data = d.data;
                      that.tags = data.tags;
                      that.wxpicmsgs = data.wxpicmsgs;
                      that.patient = data.patient;
                  }
                })
            },
            deletePicture: function(index) {
                var that = this;
                this.$confirm("是否确认删除此病例图片？", '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    api.http({
                      url: 'patient.deletemedicalpic',
                      data: {
                        wxpicmsgid: that.wxpicmsgs[index].id,
                      },
                      successCallback: function(d) {
                          that.wxpicmsgs.splice(index, 1);
                          that.$message({
                            type: 'success',
                            message: '删除成功!'
                          });
                      }
                    })
                }).catch(() => {

                });
            },
            addOrRemoveTags: function(e, wxpicmsgindex, tagsindex) {
                if (e.target.checked == true) {
                    this.addTags(wxpicmsgindex, tagsindex);
                }else {
                    this.removeTags(wxpicmsgindex, tagsindex);
                }
            },
            addTags: function(wxpicmsgindex, tagsindex) {
                var that = this;
                api.http({
                  url: 'patient.addtag',
                  data: {
                      wxpicmsgid: that.wxpicmsgs[wxpicmsgindex].id,
                      tagid: that.tags[tagsindex].id,
                  },
                  successCallback: function(d) {
                    //   that.$message({
                    //     type: 'success',
                    //     message: '添加成功!'
                    //   });
                  }
                })
            },
            removeTags: function(wxpicmsgindex, tagsindex) {
                var that = this;
                api.http({
                  url: 'patient.removetag',
                  data: {
                      wxpicmsgid: that.wxpicmsgs[wxpicmsgindex].id,
                      tagid: that.tags[tagsindex].id,
                  },
                  successCallback: function(d) {
                    //   that.$message({
                    //     type: 'success',
                    //     message: '删除成功!'
                    //   });
                  }
                })
            },
            picfilter: function(e) {
                var index = e.target.selectedIndex - 1;
                var that = this;
                var tagid = "";
                if (index != -1) {
                    tagid = this.tags[index].id;
                }
                api.http({
                  url: 'patient.medicalpic',
                  data: {
                      patientid: that.patientid,
                      tagid: tagid,
                  },
                  successCallback: function(d) {
                      that.wxpicmsgs = d.data.wxpicmsgs;
                  }
                })
            },
            uploadCase: function(e) {
                var that = this;
                api.http({
                  url: 'common.uploadcase',
                  data: {
                      patientid: that.patientid,
                      pictureids: that.pictureids,

                  },
                  successCallback: function(d) {
                      that.isUploading = false;
                      that.$message({
                        type: 'success',
                        message: '提交成功!'
                      });
                      that.fetchData();
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
            },
            changePictrueIds: function(ids) {
                this.pictureids = ids
            },
            initPage: function() {
                let that = this
                this.patientid = this.$route.params.patientid;
                let patientname = libpatient.getPatientName(this.patientid)
                this.fetchData();
                Bus.$emit('show-patient-third-level-menu', this.patientid, patientname, '病历图')
                Bus.$on('change-pictureids', this.changePictrueIds)
                Bus.$on('close-photogallery', function() {
                    that.hideGallery()
                })
            }
        },
        computed: {
            doctorname: function() {
                return common.getName()
            },
            patientid: function() {
                return this.$route.params.patientid
            }
        },
        created: function() {
            this.initPage()
        },
        watch: {
          '$route': function(to, from) {
              this.initPage()
          }
        }
    }
</script>
