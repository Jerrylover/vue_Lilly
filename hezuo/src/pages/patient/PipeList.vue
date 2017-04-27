<template>
    <div class="pipe-list" style="margin-top:-60px;">
        <div class="body">
            <div style="margin: 5px; padding: 5px; border:#ccc solid 1px; border-radius: 1px; text-align: left">
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
                patientid: 0,
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
            $.ajax({
                url: api.get('pipe.pipelist'),
                type: 'post',
                dataType: 'json',
                data: {
                    patientid: to.params.patientid
                }
            }).done(function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    console.log(data.patient);
                    next(vm => {
                        vm.pipes = data.pipes;
                        vm.patient = data.patient;
                    })
                }
            })
        },
        methods: {
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
                $.ajax({
                    url: api.get('pipe.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
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
