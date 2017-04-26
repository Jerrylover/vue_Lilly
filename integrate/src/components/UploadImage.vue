<template>
<!--暂时不用-->
<div class="row" style="margin:0;padding-bottom:10px;margin-bottom:10px;border:1px solid #ccc;">
    <div style="margin-bottom: 20px">
        <input type="file" @change="onFileChange" multiple style="display: none;">
    </div>
    <div v-if="images.length >0">
        <div class="row">
            <div class="col-sm-12" style="margin: 0 5px 0 5px;">
                <ul class="list-unstyled list-inline">
                    <li v-for="(image, key) in images" v-bind:key="image.key">
                        <div class="div-img" @mouseenter="doMouseenter($event)" @mouseleave="doMouseleave($event)">
                            <img :src="image" />
                            <div class="menubar">
                                <i class="fa fa-trash-o trash" @click='delImage(key)'></i>
                            </div>
                            <div class="statusbar-suc" v-if="statusArr[key] == 1">
                                <i class="fa fa-check-circle check-circle"></i>
                            </div>
                            <div class="statusbar-fail" v-if="statusArr[key] == 0">
                                <i class="fa fa-times-circle times-circle"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row text-right" style="padding-top:10px;border-top:1px solid #ccc;margin:0px;">
            <div class="col-sm-6">
                <div class="row">
                    <div class="col-sm-8" style="padding-right:0">
                        <div class="progress progress-striped">
                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" :style="progressBarStyle">
                                <span class="">{{progressBarWidth}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 text-left" style="padding-right:0">
                        <span class="text-left">已上传{{uploadSucCnt}}张</span>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <a v-show="uploadStatus == 0 " class="btn btn-primary btn-sm" href="javascript:" @click="addPic">继续添加</a>
                <a class="btn btn-warning btn-sm" href="javascript:" @click='uploadImage' style="margin-right:20px;" :disabled="uploadStatus == 1" v-html="filterUploadStatus(uploadStatus)"></a>
            </div>
        </div>

    </div>
    <div v-else class="col-sm-12">
        <div class="row text-center">
            <img style="width:88px;height:75px;user-select:none" src="../assets/image.png" />
        </div>
        <div class="row upload-container text-center">
            <a href="javascript:" class="btn btn-info" @click="addPic">点击选择图片</a>
        </div>
    </div>
</div>
</template>
<style scoped>
.times-circle {
    position: absolute;
    right: 40%;
    top: 30%;
    color: #C9302C;
}
.check-circle {
    position: absolute;
    right: 40%;
    top: 30%;
    color: #21e221;
}

.trash {
    position: absolute;
    right: 10%;
    top: 30%;
    color: #fff;
    cursor: pointer;
}

.statusbar-suc {
    width: 100%;
    height: 30%;
    position: absolute;
    bottom: 0;
}

.statusbar-fail {
    width: 100%;
    height: 30%;
    position: absolute;
    bottom: 0;
}

.menubar {
    width: 100%;
    height: 30%;
    position: absolute;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    display: none;
}

.div-img {
    width: 100px;
    height: 100px;
    display: inline-block;
    margin-bottom: 10px;
    position: relative;
    text-align: center;
    border: 1px solid #ccc;
    vertical-align: middle;
    overflow: hidden;
    line-height: 100px;
}

img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>
<script>
import api from '../config/api.js'
export default {
    data: function() {
        return {
            images: [],
            files: [],
            uploadSucCnt: 0,
            uploadFailCnt: 0,
            uploadStatus: 0, //0 未开始 1正在进行中 2上传完毕
            statusArr: [], //已上传成功的图片索引数组
            pictureids: this.propPictureids,
            imgurls: this.propImgurls
        }
    },
    props: {
        propImgurls: {
            type: Array,
            require: true,
            twoway: true,
            default: function() {
                return [];
            },
        },
        propPictureids: {
            type: Array,
            require: true,
            twoway: true,
            default: function() {
                return [];
            },
        }
    },
    computed: {
        progressBarWidth: function() {
            var total = this.images.length;
            if (total < 1) {
                return 0;
            }
            var p = Math.floor(this.uploadSucCnt / total * 100) + '%';
            return p;
        },
        progressBarStyle: function() {
            var style = "width:" + this.progressBarWidth;
            return style;
        }
    },
    filters: {

    },
    methods: {
        filterUploadStatus: function(val) {
            if (val == 0) {
                return "开始上传";
            } else if (val == 1) {
                return "正在上传 <i class='fa fa-spinner fa-spin'></i>";
            } else if (val == 2) {
                return "重新上传";
            }
            return "未知";
        },
        addPic(e) {
            e.preventDefault();
            $('input[type=file]').trigger('click');
            return false;
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            for (var i=0;i<files.length;i++) {
                this.files.push(files[i]);
            }
            this.createImage(files);
        },
        createImage(files) {
            if (typeof FileReader === 'undefined') {
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            var image = new Image();
            var that = this;
            var len = files.length;
            for (var i = 0; i < len; i++) {
                var reader = new FileReader();
                var file = files[i];
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    that.images.push(e.target.result);
                };
            }
        },
        delImage: function(index) {
            this.images.splice(index, 1)
            this.imgurls.splice(index, 1)
            this.pictureids.splice(index, 1)
            this.files.splice(index, 1)
        },
        removeImage: function(e) {
            this.images = [];
        },
        uploadImage: function() {
            var that = this;
            this.imgurls = [];
            this.pictureids = [];

            this.uploadSucCnt = 0;
            this.uploadFailCnt = 0;
            this.uploadStatus = 1;
            this.statusArr = [];
            $.each(this.files, function(i, file) {
                var data = new FormData();
                data.append('imgurl', file);
                $.ajax({
                    type: 'post',
                    url: api.get('common.uploadimage'),
                    processData: false,
                    contentType: false,
                    data: data,
                    dataType: "json",
                }).done(function(d) {
                    if (d.thumb != undefined) {
                        that.uploadSucCnt += 1;
                        that.imgurls.push(d.thumb);
                        that.pictureids.push(d.pictureid);
                        that.statusArr[i] = 1
                    } else {
                        that.uploadFailCnt += 1;
                        that.statusArr[i] = 0
                    }
                }).fail(function() {
                    that.uploadFailCnt += 1;
                    that.statusArr[i] = 0
                    //todo
                }).always(function() {
                    if (i >= that.files.length - 1) {
                        that.uploadStatus = 2;
                        $('#modal-loading').hide();
                    }
                })
            })
        },
        doMouseenter: function(e) {
            if (this.uploadStatus != 0) {
                return ;
            }
            $(e.target).find('.menubar').slideDown('fast', function() {
                //nothing;
            });;
        },
        doMouseleave: function(e) {
            if (this.uploadStatus != 0) {
                return ;
            }
            $(e.target).find('.menubar').slideUp('fast', function() {
                //nothing;
            });;
        }
    },
    watch: {
        pictureids: function(newVal, oldVal) {
            Bus.$emit('change-pictureids', newVal)
        }
    }
}
</script>
