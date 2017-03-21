<template>
    <app-header></app-header>
    <div class="container-fluid content">
        <div class="row" style="border-bottom: 1px solid #ccc;">
            <h4>开用药&nbsp;&nbsp;&gt;&nbsp;&nbsp;{{name}}</h4>
        </div>
        <div class="row" style="margin-top: 5px">
            <div class="col-sm-6" style=" padding: 0 10px 0 0;">
                <div class="col-sm-12" style="border: 1px solid #ccc;padding-top:10px;">
                <div class="row" style="margin: 0px">
                    <div class="col-sm-3" style="padding:0;width:23px;line-height: 2.2; width: 5%">
                        <img class="" src="../../assets/candaler.png" style="display: inline-block;box-align: center">
                    </div>
                    <div class="col-sm-5" style="padding-left:5px;line-height: 1.6;">
                        <span class="" style="font-size: 20px">药品列表</span>
                    </div>

                    <div class="col-sm-3 " style="padding: 0px;float:right" >
                        <a class="btn btn-warning" href="javascript:" style="float: right" @click="addmedicine">新增药物</a>
                    </div>
                </div>
                <div class="row" style="margin: 10px 0px">
                    <div class="form-group">
                        <div class="input-group">
                            <input class="input-search form-inline form-control" type="text" name="" placeholder="请输入药名/首字母拼音"  @keyup.enter='doSearch' v-model="medicinekeyword">
                            <span class="input-group-btn">
                                <button class="btn btn-primary" @click="doSearch">
                                    <span class="glyphicon glyphicon-search"></span>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div v-for="medicinegroup in doctorMedicineRefs_group" class="row" style="margin: 0px; line-height:2.2; border-top: 1px solid #ccc;">
                    <div class="row" style="margin: 0px;cursor: pointer" @click="showDetail($index, medicinegroup)">
                        <div class="col-sm-1" style="line-height: 3.0;">
                            <div class="div-item"></div>
                        </div>
                        <div class="col-sm-9">
                            <span style="font-size: 17px">{{medicinegroup.medicinegroup}}</span>
                        </div>
                        <div class="col-sm-2" style="line-height:3.0">
                            <div class="col-sm-1 col-sm-offset-11" style="padding:0">
                                <i class="fa fa-angle-right fa-lg " style="color:#91C1EE;" v-show="doctorMedicineRefs_group[$index]['status'] === false"></i>
                                <i class="fa fa-angle-down fa-lg " style="color:#91C1EE;" v-show="doctorMedicineRefs_group[$index]['status'] === true"></i>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="border-top: 1px solid #ccc; padding: 10px; margin: 0px" v-show="doctorMedicineRefs_group[$index].status == true">
                        <a v-for="medicine in medicinegroup.medicines" class="btn btn-success" style="margin: 5px 0 5px 5%;width: 27%" href="javascript:" @click="clickMedicine($parent.$index, $index, $event)">{{medicine.title}}</a>
                    </div>
                </div>
                <modal :show.sync="showMedicineDetail" width="600px">
                    <div slot="header">
                        <span style="color: #fff">{{title}}</span>
                        <i class="fa fa-times-circle fa-lg" @click.stop="closeModal"></i>
                    </div>
                    <div slot="body" style="padding: 10px 20px 10px 20px">
                        <div class="row" style="margin: 0px 0px 15px 0px; border-bottom: 1px dashed #ccc; padding: 0px 0px 10px 0px">
                            <div class="row" style="margin: 0px;">
                                <div class="col-sm-2" style="padding: 0px; line-height: 2.3">
                                    <div class="circle-blue" style=""></div>
                                    <span>剂量</span>
                                </div>
                                <div class="col-sm-10" style="padding: 0">
                                    <input class="form-control" type="" name="" v-model="medicine_dose">
                                </div>
                            </div>
                            <div class="row" style="margin: 0px">
                                <div v-if="medicineDetail.drug_dose_arr != ''" class="col-sm-10 col-sm-offset-2" style="padding: 10px 0 10px 0">
                                    <div v-for="drug_dose in medicineDetail.drug_dose_arr | toArray" class="choose_item" href="javascript:" style="margin: 0px 5px 5px 0px" @click="modifyMedicineDose(drug_dose)">{{drug_dose}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin: 0px 0px 15px 0px; border-bottom: 1px dashed #ccc;padding: 0px 0px 10px 0px">
                            <div class="row" style="margin: 0px;">
                                <div class="col-sm-2" style="padding: 0px; line-height: 2.3">
                                    <div class="circle-blue" style=""></div>
                                    <span>频率</span>
                                </div>
                                <div class="col-sm-10" style="padding: 0">
                                    <input class="form-control" type="" name="" v-model="medicine_frequency">
                                </div>
                            </div>
                            <div class="row" style="margin: 0px">
                                <div v-if="medicineDetail.drug_frequency_arr != ''" class="col-sm-10 col-sm-offset-2" style="padding: 10px 0 10px 0">
                                    <div v-for="drug_frequency in medicineDetail.drug_frequency_arr | toArray" class="choose_item" href="javascript:" style="margin: 0px 5px 5px 0px" @click="modifyMedicineFrequency(drug_frequency)">{{drug_frequency}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin: 0px 0px 15px 0px; border-bottom: 1px dashed #ccc;padding: 0px 0px 10px 0px">
                            <div class="row" style="margin: 0px;">
                                <div class="col-sm-2" style="padding: 0px; line-height: 2.3">
                                    <div class="circle-blue" style=""></div>
                                    <span>调药</span>
                                </div>
                                <div class="col-sm-10" style="padding: 0">
                                    <input class="form-control" type="" name="" v-model="medicine_change">
                                </div>
                            </div>
                            <div class="row" style="margin: 0px">
                                <div v-if="medicineDetail.drug_change_arr != ''" class="col-sm-10 col-sm-offset-2" style="padding: 10px 0 10px 0;">
                                    <div class="choose_item" v-for="drug_change in medicineDetail.drug_change_arr | toArray" href="javascript:" @click="modifyMedicineChange(drug_change)">{{drug_change}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer">
                        <div class="row" style="margin: 0px">
                            <div class="col-sm-12">
                                <a class="btn btn-default" href="javascript:" @click="closeModal">取消</a>
                                <a class="btn btn-primary" href="javascript:" @click="addmodifypost">保存</a>
                            </div>
                        </div>
                    </div>
                </modal>
                <modal :show.sync="addMedicineModal" width="500px">
                    <div slot="header">
                        <span style="color: #fff">新增药物</span>
                        <i class="fa fa-times-circle fa-lg" @click.stop="closeAddMedicineModal"></i>
                    </div>
                    <div slot="body">
                        <div class="row form-horizontal" style= "padding: 10px">
                            <div class="form-group" style="margin: 0px">
                                <div class="row" style="margin: 0px">
                                    <span class="col-sm-3 control-label">药物名称</span>
                                    <div class="col-sm-8">
                                        <input class="form-control" type="text" v-model="newMedicineName">
                                    </div>
                                </div>
                                <div class="row" style="margin: 5px 0px 5px 0px">
                                    <span class="col-sm-3 control-label">药物剂量</span>
                                    <div class="col-sm-8">
                                        <input class="form-control" type="text" v-model="newMedicineDose">
                                    </div>
                                </div>
                                <div class="row" style="margin: 5px 0px 5px 0px">
                                    <span class="col-sm-3 control-label">服药频率</span>
                                    <div class="col-sm-8">
                                        <input class="form-control" type="text" v-model="newMedicineFrequency">
                                    </div>
                                </div>
                                <div class="row" style="margin: 5px 0px 5px 0px">
                                    <span class="col-sm-3 control-label">调药规则</span>
                                    <div class="col-sm-8">
                                        <input class="form-control" type="text" v-model="newMedicineChange">
                                    </div>
                                </div>
                                <div class="row" style="margin: 5px 0px 5px 0px">
                                    <span class="col-sm-3 control-label">药物分组</span>
                                    <div class="col-sm-8">
                                        <!-- <input class="form-control" type="text" model="newMedicineGroup"> -->
                                        <select class="form-control" v-model="newMedicineGroupStr">
                                            <option v-for="medicinegroup in newMedicineGroup" :value="medicinegroup">{{medicinegroup}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div slot="footer">
                        <div class="row" style="margin: 0px">
                            <div class="col-sm-12">
                                <a class="btn btn-default" href="javascript:" @click="closeAddMedicineModal">取消</a>
                                <a class="btn btn-primary" href="javascript:" @click="submitAddMedicineModal">保存</a>
                            </div>
                        </div>
                    </div>
                </modal>
            </div>
        </div>
            <!----end--->
            <div class="col-sm-6" style="border: 1px solid #ccc; padding:10px;min-height:200px;">
                <!--begin-->
                <div class="row" style="border-bottom: 1px solid #ccc; margin: 0px;padding: 0 0 10px 0">
                    <div class="col-lg-5" style="padding:0">
                        <a :class="{'activebar': active == 'currentPrescription'}" href="javascript:" style="text-decoration: none; font-size: 20px;margin: 5px 35px 5px 0px;padding-bottom:5px;" @click="clickCurrentPrescription">当前开药</a>
                        <a :class="{'activebar': active == 'prescriptionHistory'}" href="javascript:" style="text-decoration: none; font-size: 20px;padding-bottom:5px;" @click='clickPrescriptionHistory'>用药历史</a>
                    </div>
                    <div class="col-lg-2 col-lg-offset-5" style="line-height: 2.2">
                        <span v-if="revisitrecord.issend == '1'" style="color: green">[已发送]</span>
                        <span v-else style="color:red">[未发送]</span>
                    </div>
                </div>
                <div v-show="active == 'currentPrescription'" class="row" style="margin: 0px">
                    <div v-for="patientmedicinepkgitem in patientmedicinepkgitems" class="row" style="margin: 10px 15px 0px 0">
                        <div class="col-sm-10 choose_item" style="display: inline; margin: 0px; padding: 8px" @click="modifyMedicine($index, $event)">
                            <span>{{patientmedicinepkgitem.medicinename}}&nbsp;&nbsp;&nbsp;{{patientmedicinepkgitem.drug_dose}}&nbsp;&nbsp;&nbsp;{{patientmedicinepkgitem.drug_frequency}}&nbsp;&nbsp;&nbsp;{{patientmedicinepkgitem.drug_change}}</span>
                        </div>
                        <div class="col-sm-2" style="display: inline; margin: 0px">
                            <a href="javascript:" style="text-decoration: none;line-height: 2.7" @click="deletemedicine($index, patientmedicinepkgitem)">删除</a>
                        </div>
                    </div>
                    <div v-show="patientmedicinepkgitems.length > 0" class="row" style="margin: 30px 0px 10px 0px;">
                        <div class="col-sm-10" style="padding:0; text-align: center">
                            <a class="btn btn-default" href="javascript:" @click="saveAndSendToPatient">保存并发送给患者</a>
                        </div>
                    </div>
                </div>
                <div v-show="active == 'prescriptionHistory'" class="row" style="margin: 10px 0px 0px 0px">
                    <div v-for="medicinehistoryrecord in patientmedicinepkgitems_arr_before" class="col-lg-10">
                        <label><strong><B>{{medicinehistoryrecord.thedate}}</B></strong></label>
                        <table class="table table-bordered">
                            <tr v-for="medicine in medicinehistoryrecord.medicines">
                                <td width="15%">{{medicine.medicinename}}</td>
                                <td width="10%">{{medicine.drug_dose}}</td>
                                <td width="10%">{{medicine.drug_frequency}}</td>
                                <td>{{medicine.drug_change}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!--end-->
            </div>

        </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
    .div-item {
        background:url('../../assets/item.png');
        background-repeat: no-repeat;
        background-position:0 14px;
        width:20px;
        height:35px;
    }
    h4 {
        float: left;
        padding-left: 10px;
        border-left: 3px solid #008db9;
    }
    .activebar {
        border-bottom: 4px solid #3b8bbc;
    }
    .circle-blue {
        display: inline-block;
        border: 1px solid #1996ea;
        height: 10px;
        width: 10px;
        border-radius: 5px;
    }
    .choose_item {
        display: inline-block;
        margin: 10px 5px 0px 0px;
        border: 1px solid #ddd;
        background: #eff9ff;
        padding: 5px 10px 5px 10px;
        color: #777;
        cursor: pointer;
    }
    .fa-times-circle {
        float: right;
        color: white;
        cursor: pointer;
        margin-top: 3px;
        margin-right: 5px;
    }
    /*动画*/

    .toggle-transition {
        /*display: inline-block;*/
        /* 否则 scale 动画不起作用 */
        transform-origin: center top;
    }

    .toggle-enter {
        animation: showAnimation .1s linear;
        -moz-animation: showAnimation .1s linear;
        -webkit-animation: showAnimation .1s linear;
    }

    .toggle-leave {
        animation: hideAnimation .1s linear;
        -moz-animation: hideAnimation .1s linear;
        -webkit-animation: hideAnimation .1s linear;
    }

    @keyframes showAnimation {
        0% {
            transform: scaleY(0.1);
            -moz-transform: scaleY(0.1);
            -webkit-transform: scaleY(0.1);
        }
        100% {
            transform: scaleY(1.0);
            -moz-transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
    }

    @keyframes hideAnimation {
        0% {
            transform: scaleY(1);
            -moz-transform: scaleY(1);
            -webkit-transform: scaleY(1);
        }
        100% {
            transform: scaleY(0);
            -moz-transform: scaleY(0);
            -webkit-transform: scaleY(0);
        }
    }
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                addMedicineModal: false,
                active: 'currentPrescription',
                showMedicineDetail: false,
                title: '',
                medicineDetail: '',
                patientid: '',
                name: this.getPatientName(),
                medicinekeyword: '',
                doctorMedicineRefs_group: '',
                patientmedicinepkgitems: '',
                patientmedicinepkgitems_arr_before: '',
                revisitrecord: '',
                revisitrecordid: '',
                medicine_dose: '',
                medicine_frequency: '',
                medicine_change: '',

                newMedicineName: '',
                newMedicineDose: '',
                newMedicineFrequency: '',
                newMedicineChange: '',
                newMedicineGroupStr: '',
                newMedicineGroup: [],
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'modal': function(resolve) {
                require(['../../components/Modal.vue'], resolve);
            }
        },
        route: {
            data: function() {
                var patientid = sessionStorage.getItem('patientid');
                if (typeof patientid != 'undefined') {
                    this.patientid = patientid;
                    this.fetchData();
                }
            }
        },
        methods: {
            hideMedicineModal: function() {
                this.showMedicineDetail = false;
                $('body').removeClass('hide-scroll')
            },
            showMedicineModal: function() {
                this.showMedicineDetail = true;
                $('body').addClass('hide-scroll')
            },
            getPatientName: function() {
                var that = this;
                var name = sessionStorage.getItem('patient_name');
                if (typeof name != 'undefined') {
                    return name;
                }else {
                    return "";
                }
            },
            showDetail: function(index, medicinegroup) {
                medicinegroup.status = !medicinegroup.status;
                this.doctorMedicineRefs_group.$set(index, medicinegroup);
            },
            clickCurrentPrescription: function() {
                this.active = 'currentPrescription';
            },
            clickPrescriptionHistory: function() {
                this.active = 'prescriptionHistory';
            },
            clickMedicine: function(parentIndex, index, e) {
                e.preventDefault();
                this.medicineDetail = this.doctorMedicineRefs_group[parentIndex].medicines[index];
                this.title = this.medicineDetail.title;
                this.showMedicineModal();
            },
            modifyMedicineDose: function(drug_dose) {
                console.log(drug_dose);
                this.medicine_dose = drug_dose;
            },
            modifyMedicineFrequency: function(drug_frequency) {
                this.medicine_frequency = drug_frequency;
            },
            modifyMedicineChange: function(drug_change) {
                this.medicine_change = drug_change;
            },
            closeModal: function() {
                this.medicine_dose = '';
                this.medicine_frequency = '';
                this.medicine_change = '';
                this.hideMedicineModal();
            },
            fetchData: function() {
                var self = this;
                $.ajax({
                    url: api.get('patient.prescription'),
                    type: "POST",
                    dataType: 'json',
                    data: {
                        patientid: self.patientid
                    }
                }).done(function(response){
                    var data = response.data;
                    if (response.errno == 0) {
                        self.doctorMedicineRefs_group = data.doctorMedicineRefs_group;
                        self.patientmedicinepkgitems = data.patientmedicinepkgitems;
                        self.patientmedicinepkgitems_arr_before = data.patientmedicinepkgitems_arr_before;
                        self.revisitrecord = data.revisitrecord;
                        self.revisitrecordid = self.revisitrecord.id;
                        console.log(response);
                        console.log(self.revisitrecord);
                        for (var i = 0; i < self.doctorMedicineRefs_group.length; i++) {
                            self.doctorMedicineRefs_group[i].status = true;
                        }
                    }
                })
            },
            addmodifypost: function() {
                var self = this;
                if ($.trim(this.medicine_dose) == '') {
                    this.$dispatch('show-alert', "用药剂量不能为空,请重新填写");
                    return ;
                }
                if ($.trim(this.medicine_frequency) == '') {
                    this.$dispatch('show-alert', '用药频率不能为空,请重新填写');
                    return ;
                }
                $.ajax({
                    url: api.get('patient.addmodifymedicinepost'),
                    type: "POST",
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                        medicineid: self.medicineDetail.medicineid,
                        drug_dose: self.medicine_dose,
                        drug_frequency: self.medicine_frequency,
                        drug_change: self.medicine_change
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.medicine_dose = '';
                        self.medicine_frequency = '';
                        self.medicine_change = '';
                        self.revisitrecordid = response.data.revisitrecordid;
                        self.hideMedicineModal();
                        self.$dispatch('show-popup', "新增用药成功!");
                        $.ajax({
                            url: api.get('patient.prescription'),
                            type: "POST",
                            dataType: 'json',
                            data: {
                                patientid: self.patientid
                            }
                        }).done(function(response){
                            var data = response.data;
                            if (response.errno == 0) {
                                self.patientmedicinepkgitems = data.patientmedicinepkgitems;
                            }
                        })
                    } else {
                        this.$dispatch('show-alert', 'response.errmsg');
                    }
                })
            },
            deletemedicine: function(index, patientmedicinepkgitem) {
                var self = this;
                self.$dispatch('show-prompt', '是否确认删除'+patientmedicinepkgitem.medicinename, function() {
                    $.ajax({
                        url: api.get('patient.deletemedicinepost'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            patientmedicinepkgitemid: self.patientmedicinepkgitems[index].id,
                        }
                    }).done(function(response){
                        if (response.errno == 0) {
                            self.$dispatch('show-popup', '删除成功');
                            self.patientmedicinepkgitems.splice(index, 1);
                        } else {
                            self.$dispatch('show-alert', response.errmsg);
                        }
                    })
                })
            },
            modifyMedicine: function(index, e) {
                e.preventDefault();
                var self = this;
                this.$log('medicineDetail');
                this.medicine_dose = this.patientmedicinepkgitems[index].drug_dose;
                this.medicine_frequency = this.patientmedicinepkgitems[index].drug_frequency;
                this.medicine_change = this.patientmedicinepkgitems[index].drug_change;
                this.title = this.patientmedicinepkgitems[index].medicinename;
                outerloop:
                for (var i = 0; i < self.doctorMedicineRefs_group.length; i++) {
                    innerloop:
                    for (var j = 0; j < self.doctorMedicineRefs_group[i].medicines.length; j++) {
                        if (this.title == self.doctorMedicineRefs_group[i].medicines[j].title) {
                            this.medicineDetail = self.doctorMedicineRefs_group[i].medicines[j];
                            break outerloop;
                        }
                    }

                }
                this.showMedicineModal();
            },
            closeAddMedicineModal: function() {
                this.addMedicineModal = false;
            },
            submitAddMedicineModal: function() {
                var self = this;
                console.log(self.newMedicineName);
                if (self.newMedicineName.trim() == '') {
                    self.$dispatch('show-alert', "药名不能为空,请重新填写");
                    return ;
                }
                $.ajax({
                    url: api.get('patient.addmedicine'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                        medicinename: self.newMedicineName,
                        drug_dose: self.newMedicineDose,
                        drug_frequency: self.newMedicineFrequency,
                        drug_change: self.newMedicineChange,
                        groupstr: self.newMedicineGroupStr
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', '新增药品成功');
                        self.newMedicineName = '';
                        self.newMedicineDose = '';
                        self.newMedicineFrequency = '';
                        self.newMedicineChange = '';
                        self.addMedicineModal = false;
                        self.refreshData();
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            refreshData: function() {
                var self = this;
                $.ajax({
                    url: api.get('patient.prescription'),
                    type: "POST",
                    dataType: 'json',
                    data: {
                        patientid: self.patientid,
                        keyword: self.medicinekeyword,
                    }
                }).done(function(response){
                    var data = response.data;
                    if (response.errno == 0) {
                        self.doctorMedicineRefs_group = data.doctorMedicineRefs_group;
                        self.patientmedicinepkgitems = data.patientmedicinepkgitems;
                        self.patientmedicinepkgitems_arr_before = data.patientmedicinepkgitems_arr_before;
                        for (var i = 0; i < self.doctorMedicineRefs_group.length; i++) {
                            self.doctorMedicineRefs_group[i].status = true;
                        }
                    }
                })
            },
            addmedicine: function() {
                var self = this;
                self.addMedicineModal = true;
                $.ajax({
                    url: api.get('patient.addmedicinehtml'),
                    type: 'POST',
                    dataType: 'json',
                    data: {

                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        console.log(data);
                        self.newMedicineGroup = data.groupstrarr;
                        if (self.newMedicineGroup.length > 0) {
                            self.newMedicineGroupStr = self.newMedicineGroup[0];
                        }
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })

            },
            doSearch: function(e) {
                console.log('todo search medicines')
                this.refreshData();
            },
            saveAndSendToPatient: function() {
                var self = this;
                $.ajax({
                    url: api.get('patient.sendmsgmedicinepost'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        revisitrecordid: self.revisitrecordid,
                    }
                }).done(function(response){
                    console.log(response);
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', '保存并发送成功');
                        self.revisitrecord.issend = 1;
                        self.revisitrecord = Object.assign({}, self.revisitrecord);
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            },
            clickBack: function() {
                window.history.go(-1);
            }
        },
        filters: {
            toArray: function(value) {
                if (typeof value != 'undefined') {
                    var arr = value.split('|');
                    return arr;
                }
            }
        }
    }
</script>
