<template>
<div v-if="revisitrecords">
    <div v-for="revisitrecord in revisitrecords" style="margin-bottom:10px;">
        <div class="row" style="padding: 5px 5px 5px 0px; margin: 0 0px 0px 0px;background-color:#eee;border:1px solid #ddd;">
            <div class="col-sm-2" style="width: 18px; padding: 0px;line-height:1.7;margin-left:10px;">
                <!-- <img src="http://img.fangcunyisheng.com/static/img/ipad/Time.png"> -->
                <i class="fa fa-clock-o fa-lg" style="color:#05CDA4;"></i>
            </div>
            <template v-if="revisitrecord['list'].length > 0">
                <div v-if="revisitrecord['list'][0].type=='revisitrecord'" class="col-sm-10">
                    <span style="font-size: 14px"><strong>{{revisitrecord.date}}</strong></span>
                    <span style="font-size: 14px">就诊</span>
                </div>
            </template>
        </div>
        <div v-for="revisit in revisitrecord.list" style="border-left:1px solid #ddd;border-right:1px solid #ddd;border-bottom:1px solid #ddd;">
            <div v-if="revisit.type=='revisitrecord'" class="revistrecord">
                    <div v-for="visititem in revisit.list">
                        <div v-if="visititem.symptom != '' ">
                            <div class="row" style="margin:0px">
                                <div class="col-sm-2" style="width: 18px; padding: 0px">
                                    <img src="../../assets/appointment.png">
                                </div>
                                <div class="col-sm-10" style="padding: 0px 0px 0px 5px;">
                                    <span style="color: #5999cf; font-size: 16px; line-height: 1.4">症状体征</span>
                                </div>
                            </div>
                            <div style="border-top: 1px dashed #ccc; margin-top: 10px; margin-bottom: 10px"></div>
                            <div>
                                <div v-for="list in visititem.symptom | visititem">
                                    <div class="dot-blue"></div>
                                    <div style="display: inline-block;">{{list}}</div><br/>
                                </div>
                            </div>
                        </div>
                        <div v-if="visititem.durg != undefined" style="">
                            <div class="row" style="margin: 0px">
                                <div class="col-sm-2" style="width: 18px; padding: 0px">
                                    <img src="../../assets/drug.png">
                                </div>
                                <div class="col-sm-10" style="padding: 0px 0px 0px 5px">
                                    <span style="color: #5999cf; font-size: 16px;">用药医嘱</span>
                                </div>
                            </div>
                            <div style="border-top: 1px dashed #ccc; margin-top: 10px; margin-bottom: 10px"></div>
                            <div v-for="drugitem in visititem.durg">
                                <div class="dot-blue"></div>
                                <span>{{drugitem.medicine_name}}&nbsp;&nbsp;&nbsp;&nbsp;{{drugitem.drug_dose}}&nbsp;&nbsp;&nbsp;&nbsp;{{drugitem.drug_frequencystr}}&nbsp;&nbsp;&nbsp;&nbsp;{{drugitem.drug_change}}</span>
                            </div>
                        </div>
                        <div v-if="visititem.revisit != undefined" style="margin-top: 15px">
                            <div class="row" style="margin: 0px">
                                <div class="col-sm-2" style="width: 18px; padding: 0px">
                                    <img src="../../assets/appointment.png">
                                </div>
                                <div class="col-sm-10" style="padding: 0px 0px 0px 5px">
                                    <span style="color: #5999cf; font-size: 16px">预约详情</span>
                                </div>
                            </div>
                            <div style="border-top: 1px dashed #ccc; margin-top: 10px; margin-bottom: 10px"></div>
                            <div class="dot-blue"></div>
                            <span>下次预约时间:&nbsp;&nbsp;&nbsp;&nbsp;{{visititem.revisit.revisitdate}}</span>
                            <div>
                                <div class="dot-blue"></div>
                                <span>下次检查项目:&nbsp;&nbsp;&nbsp;</span>
                                <span v-for="checkitem in visititem.revisit.tktlist">{{checkitem}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            </div>
                        </div>
                    </div>
            </div>
            <div v-if="revisit.type=='checkup'">
                <div v-for="checkupitem in revisit.list" class="revistrecord">
                    <div class="row" style="margin: 5px 0px 5px 0px;">
                        <div class="col-sm-2" style="width: 18px; padding: 0px;line-height:1.8">
                            <img src="../../assets/check.png" style="width: 14px; height: 14px">
                        </div>
                        <div class="col-sm-10" style="padding: 0;line-height: 1.7">
                            <span style="color: #2f64af;font-size:16px;padding-left:5px;">{{checkupitem.checkuptpl.title}}</span>
                            <span style="color: #aaa">&nbsp;&nbsp;&nbsp;&nbsp;{{checkupitem.check_date}}</span>
                        </div>
                    </div>
                    <div style="border-top: 1px dashed #ccc; margin-top: 10px; margin-bottom: 10px"></div>
                    <div v-if="checkupitem.xanswersheet != undefined">
                        <div class="div-checkup">
                            <table class="table table-bordered" style="margin:0">
                                <tr>
                                    <th class="light-th" v-for="answer in checkupitem.xanswersheet.answers">{{{answer.xquestionname}}}</th>
                                </tr>
                                <tr>
                                    <td  v-for="answer in checkupitem.xanswersheet.answers">&nbsp;{{{getAnswerContent(answer)}}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div v-if="checkupitem.checkuppictures !=undefined">
                        <div v-for="picture in checkupitem.checkuppictures" style="display: inline-block; margin: 15px 0px 0px 15px">
                            <a class="photo-a" data-url="{{picture.url}}" href="javascript:" @click="clickPhoto"><img :src="picture.thumb_url" style="width:100px; height: 100px; cursor:pointer"></a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="revisit.type=='checkuppic_ng'">
                <div v-for="checkupitem in revisit.list" class="revistrecord">
                    <div class="row" style="margin:0px">
                        <div class="col-sm-2" style="width: 18px; padding: 0px;line-height:1.8">
                            <img src="../../assets/check.png" style="width: 14px; height: 14px">
                        </div>
                        <div class="col-sm-10" style="padding: 0;line-height: 1.7">
                            <span style="color: #2f64af;font-size:16px;padding-left:5px;">其他</span>
                            <span style="color: #aaa">&nbsp;&nbsp;&nbsp;&nbsp;{{checkupitem.fromdate}}到{{checkupitem.todate}}</span>
                        </div>
                    </div>
                    <div style="border-top: 1px dashed #ccc; margin-top: 10px; margin-bottom: 10px"></div>
                    <div v-if="checkupitem.checkuppictures !=undefined">
                        <div v-for="picture in checkupitem.checkuppictures" style="display: inline-block; margin: 15px 0px 0px 15px">
                            <a class="photo-a" data-url="{{picture.picture.url}}" href="javascript:" @click="clickPhoto"><img :src="picture.picture.thumb_url" style="width:100px; height: 100px; cursor:pointer"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<photo-gallery :photourls="photourls" :show.sync="showPhotoGallery" :currentindex.sync="currentPhotoIndex"></photo-gallery>
</template>
<style scoped>
    .revistrecord {
        /*background-color: #f4f9fc;*/
        padding: 15px;
    }

    img {
        width: 18px;
        height: 18px;
    }
    .revistrecord img {
        width: 14px;
        height: 14px;
    }
    .zhengzhuang {
        margin: 15px;
    }
    .yongyao {
        margin: 15px;
    }
    .yuyue {
        margin: 15px;
    }
    .dot-blue {
        background-color: #3bacf9;
        width: 5px;
        height: 5px;
        display: inline-block;
        padding: 4px;
        position: relative;
        border-radius: 5px;
        top: -3px;
    }
    .div-checkup {
        max-width:700;
        overflow-x: auto;
    }
</style>
<script>
import util from '../../lib/util.js'
    export default {
        data: function() {
            return {
                visititemallinfo: '',
                photourls: [],
                showPhotoGallery: false,
                currentPhotoIndex: 0,
            }
        },
        props:['revisitrecords'],
        components: {
            'photoGallery': function(resolve) {
                require(['../../components/PhotoGallery.vue'], resolve);
            },
        },
        computed: {

        },
        methods: {
            getAnswerContent: function(answer) {
                var optionstr = '';
                if (answer.options.length > 0) {
                    for (var i = 0; i < answer.options.length; i++) {
                        var str = answer.options[i].content;
                        if (str.indexOf('阳性') > -1) {
                            str = '<span style="color:red;">' + str + '</span>';
                        }
                        optionstr += str + ' ';
                    }
                }
                var content = answer.content;
                var qualitative = answer.qualitative != '请选择' ? answer.qualitative : '';
                if (qualitative == '其他') {
                    qualitative += ' ' + content;
                    content = '';
                } else if (qualitative == '升高' || qualitative == '降低') {
                    qualitative = '<span style="color:red;">' + qualitative + '</span>';
                }
                return optionstr + ' ' + content + ' ' + qualitative;
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
        events: {
            'closePhotoGallery': function() {
                this.hideGallery();
            }
        }
    }
</script>
