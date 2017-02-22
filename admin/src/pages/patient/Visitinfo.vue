<template>

    <div class="borderstyle">
        <div class="bg-gray">
            <a class="active" href="javascript:" ><strong>门诊</strong></a>
            <a href="javascript:" v-link="{path: '/patient/list/' + patientid + '/aftertreatment?pagenum=' + pagenum + '&patient_name=' + patient_name}"><strong>诊后</strong></a>
        </div>
        <div v-show="active=='invisit'">
            <div class="colorBox">
                <!-- <a  xhref="/patientmedicinepkgmgr/list?patientid=102351569" href="javascript:" target="_blank" class="btn btn-success header-a">开用药</a> -->
                <a href="javascript:" class="btn btn-success header-a" @click="goPrescription">开用药</a>
                <a href="javascript:" class="btn btn-success header-a" @click="goAppointment">约复诊</a>
                <!-- <button class="btn btn-success addModifySymptom">录入症状体征</button>
                <button class="btn btn-success">录入检查</button>
                <button class="btn btn-success">个人资料</button>
                <button class="btn btn-success">就诊信息</button>
                <button class="btn btn-success">病史信息</button> -->
                <a href="javascript:" class="btn btn-danger changeNew" @click="changeNew">{{patient.has_update | formateHasUpdate}}</a>
            </div>
            <div id="visitContent" style="-webkit-overflow-scrolling: touch;">
            <div>
                <baseinfo :patient='patient'></baseinfo>
            </div>
            <div>
                <checkup :revisitrecords="revisitrecords"></checkup>
            </div>
            <div v-show="!moredata" class="row" style="margin: 0px; padding: 20px 0px 20px 0px; text-align: center; font-size: 18px; color: red">
                无更多数据
            </div>
            <div class="row" style="text-align: center">
                <a href="javascript:" class="btn btn-info" style="margin-top: 20px" @click='loadMore'>加载更多 <i class="fa fa-angle-double-down"></i></a>
            </div>
            </div>
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
        background-color: #ededed;
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
        margin-top: 10px;
        padding: 10px;
        /*background-color: #e0defa;*/
        background-color: #eee;
    }
    .colorBox .btn {
        margin: 2px;
    }
    .baseinfo {
        margin-top: 10px;
        background-color: #eee;
        padding: 15px;
    }

</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                pagenum: 0,
                patient_name: '',

                moredata: true,
                pagenum: 1,
                patient: '',
                active: "invisit",
                patientid: "",
                name: "",
                sex: "",
                age: "",
                provincestr: "",
                mobile: "",
                complication: "",
                out_case_no: "",
                visitno: "",
                firstvisittime: "",
                firstsymptom: "",

                revisitrecord: "",
                revisitrecords: "",
                revisitrecorddate: "",
                revisitrecordlistdata: "",
                revisitrecordlisttype: "",
            }
        },
        components: {
            'Baseinfo': require('../../components/Baseinfo.vue'),
            'Checkup': require('./Checkup.vue')
        },
        methods: {
            clickinvisit: function() {
                this.active = "invisit";
            },
            clickaftervisit: function() {
                this.active = "aftervisit";
            },
            goPrescription: function() {
                sessionStorage.setItem('patientid', this.patientid);
                sessionStorage.setItem('patient_name', this.patient.name);
                var url = '/#!/patient/' + this.patientid + '/prescription';
                window.open(url);
                // this.$route.router.go({
                //     name: 'patient-prescription',
                //     params: {patientid: this.patientid}
                // })
            },
            goAppointment: function() {
                sessionStorage.setItem('patientid', this.patientid);
                sessionStorage.setItem('patient_name', this.patient.name);
                var url = '/#!/patient/' + this.patientid + '/appointment';
                window.open(url);
                // this.$route.router.go({
                //     name: 'patient-appointment',
                //     params: {patientid: this.patientid}
                // })
            },
            loadMore: function() {
                var self = this;
                self.pagenum++;
                $.ajax({
                    url: api.get('patient.revisitrecordlist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                        page: self.pagenum,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        if (response.data.list.length != 0) {
                            self.revisitrecords=self.revisitrecords.concat(response.data.list);
                        }else {
                            self.moredata = false;
                        }
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            changeNew: function(e) {
                var that = this;
                var isnew = that.patient.has_update == 1 ? 0 : 1;
                $.ajax({
                    url: api.get('common.changenewjson'),
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        patientid: that.patientid,
                        isnew: isnew
                    }
                }).done(function(d) {
                    that.patient.has_update = isnew;
                    that.$dispatch('showPopup', '操作成功')
                    that.$dispatch('e-changeNew', that.patientid, isnew);
                })
                $(e.target).blur();
            }
        },
        route: {
            data: function(transition) {
                var that = this;
                that.moredata = true;
                that.pagenum = 1;
                that.patientid = transition.to.params.patientid;
                // console.log(that.patientid);
                that.pagenum = transition.to.query.pagenum;
                that.patient_name = transition.to.query.patient_name;
                if (!that.patient_name) {
                    that.patient_name = '';
                }
                if (that.patientid == 0) {
                    return ;
                }
                $.ajax({
                    url: api.get('patient.baseinfo'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: that.patientid,
                    }
                }).done(function(response){
                    var data = response.data;
                    that.patient = data;
                });

                $.ajax({
                    url: api.get('patient.revisitrecordlist'),
                    type: "POST",
                    dataType: 'json',
                    data: {
                        patientid: that.patientid,
                    }
                })
                .done(function(response){
                    that.revisitrecords = response.data.list;
                })
            }
        },
        filters: {
            formateHasUpdate: function(value) {
                var str = '';
                if (value == 1) {
                    str = '去new!';
                } else {
                    str = '加new';
                }
                return str;
            }
        },
        ready: function() {
            // var divContent = document.getElementById('visitContent');
            // var userInfo = navigator.userAgent;
            // if (userInfo.indexOf('iPad') == -1) {
            //     divContent.style.paddingRight="15px";
            // }
            // divContent.style.maxHeight = screen.availHeight * 0.75 + 'px';
        }
    }
</script>
