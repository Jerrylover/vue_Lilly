<template>
    <div class="container-fluid content">
        <!-- <visit-header :patientname='pagetitle' :patientid='patientid'></visit-header> -->
        <breadcrumb :data="breadcrumbData" :pagetitle="pagetitle">
        <div name="other-content">
        </div>
        </breadcrumb>
            <div class="page-content">
        <div class="patientinfo">
            <div class="baseinfo">
                <div class="bg-caption-padding">
                    基本信息
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">姓名</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-name" class="form-control" type="text" :value="patientinfo.name" v-model="patientinfo.name">
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4">*</span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">病历号</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="out-case-no" class="form-control" type="text" :value="patientinfo.out_case_no" v-model="patientinfo.out_case_no">
                                <!-- <span style="color: red">*</span> -->
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">性别</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <span class="col-lg-6 col-sm-6 radioButtonStyle leftRadioButtonRadius" :class="{'radioSelectStyle':maleStyle}" @click="maleSelectClick">男</span>
                                <span class="col-lg-6 col-sm-6 radioButtonStyle rightRadioButtonRadius" :class="{'radioSelectStyle':femaleStyle}" @click="femaleSelectClick">女</span>
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4">*</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">生日</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <fc-date v-model="patientinfo.birthday" format="YYYY-MM-DD">
                                    <el-date-picker type="date" :placeholder="getDefaultDate(patientinfo.birthday, 'birthday')"></el-date-picker>
                                </fc-date>
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4">*</span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">民族</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" :value="patientinfo.nation" v-model="patientinfo.nation">
                                    <option v-for="xx in nations" :value="xx">{{xx}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">职业</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input class="form-control" type="text" name="" v-model="patientinfo.career">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">身份证号</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-prcrid" class="form-control" type="text" v-model="patientinfo.prcrid" placeholder="含有X的请大写">
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4">*</span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">就诊卡号</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-prcrid" class="form-control" type="text" v-model="patientinfo.patientcardno">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">患者ID</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input class="form-control" type="text" v-model="patientinfo.patientcard_id">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">医保类型</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" :value="patientinfo.fee_type.select" v-model="patientinfo.fee_type.select">
                                    <option value="北京医保">北京医保</option>
                                    <option value="京外医保">京外医保</option>
                                    <option value="公费">公费</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">婚姻</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" v-model="patientinfo.marry_status">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option value="已婚">已婚</option>
                                    <option value="未婚">未婚</option>
                                    <option value="丧偶">丧偶</option>
                                    <option value="离异">离异</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">血型</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" style="width:48%;display:inline-block;" v-model="patientinfo.blood_type.first">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                </select>
                                <select class="form-control clearMargin" style="width:49%;display:inline-block;float:right" v-model="patientinfo.blood_type.second">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option value="Rh阴性">Rh阴性</option>
                                    <option value="Rh阳性">Rh阳性</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">出生地</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select id="selectProvince" class="form-control clearMargin" style="width:48%;display:inline-block" v-model="patientinfo.birth_place.provincestr" v-on:change="selectChangeBirthPlace">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="province in provinceAndCities" :value="province.province">{{province.province}}</option>
                                </select>
                                <select class="form-control clearMargin" style="width:49%;display:inline-block;float:right" v-model="patientinfo.birth_place.citystr">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="city in provinceAndCities[currentBirthPlaceProvinceIndex].cities" :value="city">{{city}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">籍贯</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select id="selectProvince" class="form-control clearMargin" style="width:48%;display:inline-block" v-model="patientinfo.native_place.provincestr" v-on:change="selectChangeNativePlace">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="province in provinceAndCities" :value="province.province">{{province.province}}</option>
                                </select>
                                <select class="form-control clearMargin" style="width:49%;display:inline-block;float:right;" v-model="patientinfo.native_place.citystr">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="city in provinceAndCities[currentNativePlaceProvinceIndex].cities" :value="city">{{city}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">目前居住地</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" style="width:48%;display:inline-block;" v-model="patientinfo.address.provincestr" v-on:change="selectChangeAddress">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="province in provinceAndCities" :value="province.province">{{province.province}}</option>
                                </select>
                                <select class="form-control clearMargin" style="width:49%;display:inline-block;float:right;" v-model="patientinfo.address.citystr">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="city in provinceAndCities[currentAddressProvinceIndex].cities" :value="city">{{city}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">本人手机</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-mobile" class="form-control" type="text" :value="patientinfo.mobile" v-model="patientinfo.mobile">
                                <span v-if="0" style="color: red">*</span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">邮箱</label>
                            <div class="col-lg-8 col-sm-8 clearPadding" >
                                <input name="patient-email"  type="text" class="form-control" :value="patientinfo.email" v-model="patientinfo.email">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">备用联系人</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input class="form-control" type="text" v-model="patientinfo.other_contacts[0].name">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">关系</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" v-model="patientinfo.other_contacts[0].shipstr">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option value="配偶">配偶</option>
                                    <option value="父子">父子</option>
                                    <option value="父女">父女</option>
                                    <option value="母子">母子</option>
                                    <option value="母女">母女</option>
                                    <option value="兄弟姐妹">兄弟姐妹</option>
                                    <option value="祖孙">祖孙</option>
                                    <option value="朋友">朋友</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">手机</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="other_contacts_mobile" class="form-control" type="text" v-model="patientinfo.other_contacts[0].mobile">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pcardinfo">
                <div class="bg-caption-padding">病历信息</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-5">建档日期</label>
                            <div class="col-lg-8 col-sm-7 clearPadding">
                                <fc-date v-model="patientinfo.create_doc_date" format="YYYY-MM-DD">
                                    <el-date-picker type="date" :placeholder="getDefaultDate(patientinfo.create_doc_date, 'create_doc_date')"></el-date-picker>
                                </fc-date>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-5 clear-padding-left">主治医生</label>
                            <span style="margin-top:4px;line-height: 1.8em" class="col-lg-8 col-sm-7 clearPadding">{{doctorname}}</span>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-5 clear-padding-left">医院</label>
                            <span style="margin-top: 4px;line-height: 1.8em" class="col-lg-8 col-sm-7 clearPadding">{{hospital}}</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="diseasehistory">
                <div class="bg-caption-padding">既往病史</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">常见疾病</label>
                            <div class="col-lg-11 col-sm-10">
                                    <div class="checkbox checkbox-inline checkbox-info">
                                        <input type="checkbox" id="value1" value="高血压" v-model.lazy="past_main_history_checkboxs">&nbsp;
                                        <label for="value1">高血压</label>
                                    </div>

                                    <div class="checkbox checkbox-inline checkbox-info">
                                        <input type="checkbox" id="value2" value="糖尿病" v-model.lazy="past_main_history_checkboxs">&nbsp;
                                        <label for="value2">糖尿病</label>
                                    </div>

                                    <div class="checkbox checkbox-inline checkbox-info">
                                        <input type="checkbox" id="value3" value="心脏病" v-model.lazy="past_main_history_checkboxs">&nbsp;
                                        <label for="value3">心脏病</label>
                                    </div>
                                    <div class="checkbox checkbox-inline checkbox-info">
                                        <input type="checkbox" id="value4" value="脑血管病" v-model.lazy="past_main_history_checkboxs">&nbsp;
                                        <label for="value4">脑血管病</label>
                                    </div>

                                    <div class="checkbox checkbox-inline checkbox-info">
                                        <input type="checkbox" id="value9" value="" v-model="other_input_checkbox">&nbsp;
                                        <label for="value9">其他</label>
                                    </div>
                                    <div style="display:inline-block;margin-left:10px;">
                                        <input class="form-control" :class="{'other_input_style': !other_input_checkbox}" type="text" name="other_input" v-model="other_input">
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="familyDiseaseHistory">
                <div class='bg-caption-padding'>家族病史</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">详细描述</label>
                            <div class="col-lg-11 col-sm-10">
                                <div class="row checkbox checkbox-info">
                                    <div class="col-lg-2 col-sm-2">
                                        <input type="checkbox" id="family-weiai" value="癌症" v-model="family_history_diseases">
                                        <label for="family-weiai">癌症</label>
                                    </div>
                                    <div class="col-lg-5 col-sm-6" v-show="isShowFamilyDisease('癌症')">
                                    <input class="form-control" type="text" v-model="family_history_contents[0]"  />
                                    </div>
                                </div>
                                <div class="row checkbox checkbox-info">
                                    <div class="col-lg-2 col-sm-2">
                                    <input type="checkbox" id="family-feiai" value="遗传病史" v-model="family_history_diseases">
                                    <label for="family-feiai">遗传病史</label>
                                </div>
                                    <div class="col-lg-5 col-sm-6" v-show="isShowFamilyDisease('遗传病史')">
                                    <input class="form-control" type="text"  v-model="family_history_contents[1]"/>
                                    </div>
                                </div>
                                <div class="row checkbox checkbox-info">
                                    <div class="col-lg-2 col-sm-2">
                                        <input type="checkbox" id="family-cancer" value="其他" v-model="family_history_diseases">
                                        <label for="family-cancer">其他</label>
                                    </div>
                                    <div class="col-lg-5 col-sm-6" v-show="isShowFamilyDisease('其他')">
                                    <input class="form-control" type="text" v-model="family_history_contents[2]" />
                                    </div>
                                </div>
                                <textarea v-show="0" cols="50" rows="4" :value="patientinfo.family_history" v-model="patientinfo.family_history"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="selfHistory">
                <div class='bg-caption-padding'>个人史</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">毒物接触</label>
                            <div class="col-lg-11 col-sm-10">
                                <div class="col-lg-2 col-sm-2" style="line-height:1.3;padding:0">
                                    <div class="form-group patient-group">
                                        <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                                            <input v-for="option in ['是', '否']" type="radio" :id="'inlineRadio1' + option" :value='option' v-model='patientinfo.self_history.first'>
                                            <label v-for="option in ['是', '否']" :for="'inlineRadio1' + option" :class="{active1: patientinfo.self_history.first == option}" style="margin-top: 0px; text-align: center; padding: 2px 0 2px 0">{{option}}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5 col-sm-5">
                                    <div class="form-group">
                                        <input class="form-control" v-show="patientinfo.self_history.first == '是'" type="text" name="" v-model="patientinfo.self_history.second">
                                    </div>
                                </div>
                            </div>
                            <label class="col-lg-1 col-sm-2">饮酒</label>
                            <div class="col-lg-11 col-sm-10">
                                <div class="col-lg-2 col-sm-2" style="line-height:1.3;padding:0">
                                    <div class="form-group patient-group">
                                        <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                                            <input v-for="option in ['是', '否']" type="radio" :id="'inlineRadio2' + option" :value='option' v-model='patientinfo.self_history.third'>
                                            <label v-for="option in ['是', '否']" :for="'inlineRadio2' + option" :class="{active1: patientinfo.self_history.third == option}" style="margin-top: 0px; text-align: center; padding: 2px 0 2px 0">{{option}}</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5 col-sm-5">
                                    <div class="form-group">
                                    <input class="form-control" v-show="patientinfo.self_history.third == '是'" type="text" name="" v-model="patientinfo.self_history.fourth">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="smokeHistory">
                <div class="bg-caption-padding">吸烟史</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">吸烟</label>
                            <div class="col-lg-11 col-sm-10">
                                <div class="form-group patient-group">
                                    <div class="col-sm-2" style="line-height:1.3;padding:0">
                                        <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                                            <input v-for="option in ['是', '否']" type="radio" :id="'inlineRadio' + option" :value='option' v-model='patientinfo.smoke_history.first'>
                                            <label v-for="option in ['是', '否']" :for="'inlineRadio' + option" :class="{active1: patientinfo.smoke_history.first == option}" style="margin-top: 0px; text-align: center; padding: 2px 0 2px 0">{{option}}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="patientinfo.smoke_history.first == '是'" class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">环境接触</label>
                            <div class="col-lg-11 col-sm-10">
                                <div class="checkbox checkbox-inline checkbox-info">
                                    <input type="checkbox" id="value5" value="二手" v-model.lazy="environment_touch_checkbox">&nbsp;<label for="value5">二手</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info">
                                    <input type="checkbox" id="value6" value="三手"  v-model.lazy="environment_touch_checkbox">&nbsp;<label for="value6">三手</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info">
                                    <input type="checkbox" id="value7" value="厨房油烟" v-model.lazy="environment_touch_checkbox">&nbsp;<label for="value7">厨房油烟</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info">
                                    <input type="checkbox" id="value10" value="其他" v-model="environment_touch_checkbox" >&nbsp;<label for="value10">其他</label>
                                </div>
                                <div style="display:inline-block;margin-left:10px;">
                                    <input class="form-control" v-show="showSmokeOther" type="text" name="other_input2" v-model="patientinfo.smoke_history.third">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="patientinfo.smoke_history.first == '是'" class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">吸烟指数</label>
                            <div class="col-lg-5 col-sm-6">
                                <input type="text" name="" class="form-control" style="width:15%;display:inline-block" v-model="smoke_one">
                                <label>支 / 天&nbsp;&nbsp;&nbsp;X</label>
                                <input type="text" name="" class="form-control" style="width:15%;display:inline-block" v-model="smoke_two">
                                <label>年&nbsp;&nbsp;&nbsp;=</label>
                                <input type="text" name="" class="form-control" style="width:20%;display:inline-block" v-model="smoke_three">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menstruationHistory" :class="{'hidden':maleStyle}">
                <div class="bg-caption-padding">月经史</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-6 col-sm-6">
                            <label class="col-lg-2 col-sm-4">初次月经</label>
                            <div class="col-lg-5 col-sm-7">
                                <input id="menstruationHistory" class="form-control" style="display:inline-block" type="text" v-model="firstMenstruationAge">
                            </div>
                            <label>岁</label>
                        </div>
                    </div>
                    <div class="row padding-5px">
                        <div class="col-lg-6 col-sm-6">
                            <label class="col-lg-2 col-sm-4">月经状况</label>
                            <div class="col-lg-5 col-sm-7">
                                <div class="none-gap-span">
                                    <span class="radioButtonStyle leftRadioButtonRadius" :class="{'radioSelectStyle': menstruationNormalStyle}" @click="menstruationNormalClick">正常</span>
                                    <span class="radioButtonStyle rightRadioButtonRadius" :class="{'radioSelectStyle': menstruationStopStyle}" @click="menstruationStopClick">停经</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row padding-5px"  v-if="menstruationNormalStyle">
                        <div class="col-lg-6 col-sm-6">
                            <label class="col-lg-2 col-sm-4">月经周期</label>
                            <div class="col-lg-5 col-sm-7">
                                <div class="row" style="padding-left:15px;">
                                    <div class="col-lg-3 col-sm-3 clearPadding">
                                        <input class="form-control" type="text" :value="menstruationHoldOnDays" v-model="menstruationHoldOnDays">
                                    </div>
                                    <div class="col-lg-3 col-sm-3 clearPadding" style="width:auto;padding-left:5px;padding-right:5px;">
                                        <span style="line-height:2.3;">天/</span>
                                    </div>
                                    <div class="col-lg-3 col-sm-3 clearPadding">
                                        <input class="form-control" type="text" :value="menstruationPeriod" v-model="menstruationPeriod">
                                    </div>
                                    <div class="col-lg-3 col-sm-3">
                                        <span style="line-height:2.3">天</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row padding-5px" v-if="menstruationStopStyle">
                        <div class="col-lg-6 col-sm-6">
                            <label class="col-lg-2 col-sm-4">停经原因</label>
                            <div class="col-lg-5 col-sm-5">
                                <div class="form-patient-group">
                                    <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                                        <input v-for="option in ['生理性', '病理性']" type="radio" :id="'inlineRadio' + option" :value='option' v-model='picked1'>
                                        <label v-for="option in ['生理性', '病理性']" :for="'inlineRadio' + option" :class="{active1: picked1 == option}" style="margin-top: 0px; text-align: center;">{{option}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row padding-5px" v-if="menstruationStopStyle">
                        <div v-show="picked1 == '生理性'" class="col-lg-6 col-sm-6">
                            <label class="col-lg-2 col-sm-4" >停经年龄</label>
                            <div class="col-lg-6 col-sm-7">
                                <input class="form-control" type="text" :value="menstruationStopTime" v-model="menstruationStopTime">
                            </div>
                            <span style="line-height:2.3;">岁</span>
                        </div>
                        <div v-show="picked1 == '病理性'" class="col-lg-6 col-sm-6">
                            <label class="col-lg-2 col-sm-4" >病理原因</label>
                            <div class="col-lg-6 col-sm-8">
                                <input class="form-control" type="text" name="" v-model="menstruationStopReason">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="birthHistory" :class="{'hidden':maleStyle}">
                <div class="bg-caption-padding">生育史</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <div class="col-lg-4 col-sm-4">
                                <div class="row">
                                    <label class="col-lg-3 col-sm-3">生育</label>
                                    <div class="col-lg-8 col-sm-8">
                                        <div class="col-lg-1 col-sm-1 clearPadding">
                                            <span style="line-height:2.3">孕</span>
                                        </div>
                                        <div class="col-sm-4 clearPadding" style="padding-left:5px;">
                                            <input class="form-control" type="text" v-model="pregnantTimes">
                                        </div>
                                        <div class="col-lg-1 col-sm-1 col-lg-offset-1 col-sm-offset-1 clearPadding">
                                            <span style="line-height:2.3">产</span>
                                        </div>
                                        <div class="col-sm-4 clearPadding" style="padding-left:5px;">
                                            <input class="form-control" type="text" v-model="childbirthTimes">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-4">
                                <div class="row">
                                    <label class="col-lg-3 col-sm-4">怀孕时间</label>
                                    <div class="col-lg-8 col-sm-7 clearPadding">
                                        <input class="form-control" type="text" v-model="pregnantTime">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-4">
                                <div class="row">
                                    <label class="col-lg-3 col-sm-4">生育时间</label>
                                    <div class="col-lg-8 col-sm-7 clearPadding">
                                        <input class="form-control" type="text" v-model="childbirthTime">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="allergyHistory">
                <div class="bg-caption-padding">过敏史</div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-1">药物</label>
                            <div class="col-lg-5 col-sm-8">
                                <textarea class="form-control" cols="50" rows="4" :value="patientinfo.allergy_history" v-model="patientinfo.allergy_history"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="other">
                <div class="bg-caption-padding">其他</div>
                <div>
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-1">其他</label>
                            <div class="col-lg-5 col-sm-8">
                                <textarea class="form-control" cols="50" rows="4" v-model="patientinfo.remark_doctor"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center margin-20px">
        <button class="btn btn-md btn-primary" @click="save">保存</button>
    </div>
    </div>

</template>
<style scoped>
.el-date-editor.el-input {
    width:100%
}

.gray-line {
    clear: left;
    border-top: 1px solid #ccc;
}

.patientinfo {
    margin-top: 10px;
    border: 1px solid #ccc;
}

.bg-caption-padding {
    padding: 10px;
    padding-left: 5px;
    background-color: #f5f6fa;
    border-bottom: 1px solid #ccc;
}

.bottom-dashed {
    border-bottom: 1px dashed #ccc;
}

.bottom-solid {
    border-bottom: 1px solid #ccc;
}

.padding-5px {
    position: relative;
    padding: 5px;
}

.margin-20px {
    margin-top: 20px;
    margin-bottom: 20px;
}

.radioSelectStyle {
    background-color: #008DB9;
    color: white;
}

.radioButtonStyle {
    border: 1px solid #ccc;
    display: -moz-inline-box;
    display: inline-block;
    text-align: center;
    padding: 4px;
    padding-left: 20px;
    padding-right: 20px;
}

.leftRadioButtonRadius {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border-right:0;
}
.rightRadioButtonRadius {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
}


.none-gap-span {
    letter-spacing: -0.5em;
}

.none-gap-span span {
    letter-spacing: normal;
}

.small-input {
    width: 40px;
}

.inner-addon .fa {
    position: absolute;
    padding: 10px;
    pointer-events: none;
}

.left-addon .fa {
    left: 0px;
}

.right-addon .fa {
    right: 0px;
}

.clearPadding {
    padding: 0px;
}

.clearMargin {
    margin: 0px;
}

.btn-primary {
    background-color: #008DB9;
}

.table td {
    border: none;
}

.table input {
    margin: 0;
    vertical-align: middle;
}

.other_input_style {
    visibility: hidden;
}

label {
    font-size: 14px;
    font-weight: 500;
    /*vertical-align: middle;*/
    height: 100%;
    margin-top: 7px;
    margin-bottom: 0px;
    /*align-items: center;*/
    text-align: left;
}

input {
    vertical-align: middle;
    padding-top: 3px;
    padding-left: 8px;
    padding-bottom: 3px;
    border: 1px solid #ccc;
}

textarea {
    border: 1px solid #ccc;
}

select {
    margin-top: 5px;
    padding: 3px 0 4px 0;
    border: 1px solid #ccc;
}

.left-addon input {
    padding-left: 30px;
}

.right-addon input {
    padding-right: 30px;
}

.clear-padding-left {
    padding-left: 0;
}
.clear-padding-right {
    padding-right: 0;
}

.disease-first td {
    padding: 0 8px 8px;
}
</style>
<script type="text/javascript">
import common from '../../lib/common.js';
import api from '../../config/api.js';
import nationlist from '../../config/nationlist.js';
import rule from '../../config/rule.js';
import provinceAndCityList from '../../config/provinceAndCityList.js';
import util from '../../lib/util.js';
export default {
    data: function() {
        return {
            breadcrumbData: [
                {
                    name: '患者列表',
                    link: {name: 'patient-list'}
                }
            ],
            smokeEnvArr: ['二手', '三手', '厨房油烟', '其他'],//环境接触
            pmhArr: ['高血压', '糖尿病', '心脏病', '脑血管病', '其他'],//常见疾病
            family_history_diseases: [],//家族病史疾病
            family_history_contents: ['', '', ''],//家族病史疾病原因
            picked1: '',
            menstruationNormalStyle: false,
            menstruationStopStyle: false,

            showForBirthday: false,
            showForMenstruationHistory: false,
            showForCreateDocDate: false,
            type: "date", //date datetime
            value: "",
            begin: "",
            x: 0,
            y: 0,
            range: false, //是否多选

            currentBirthPlaceProvinceIndex: 0, //select二级联动
            currentNativePlaceProvinceIndex: 0,
            currentAddressProvinceIndex: 0,

            other_input_checkbox: false,

            firstMenstruationAge: "", //初次月经时间
            menstruationStatus: "", //月经状况
            menstruationHoldOnDays: "", //持续时间
            menstruationPeriod: "", //周期
            menstruationStopTime: "",

            pregnantTimes: "", //孕次数
            childbirthTimes: "", //育次数
            pregnantTime: "", //怀孕时间
            childbirthTime: "", //生育时间

            patientinfo: {
                name: "", //患者名称
                out_case_no: "", //病历号
                sex: '', //性别 0未知 1男 二女
                birthday: "", //生日
                nation: "汉族", //民族
                career: "", //职业
                prcrid: "", //身份证号
                patientcardno: '',
                patientcard_id: '',
                fee_type: {select: '', beizhu: ''},
                fee_other: '',
                marry_status: "", //婚姻状态
                blood_type: {
                    first: '',
                    second: '',
                },
                birth_place: {
                    provincestr: '',
                    citystr: '',
                },
                native_place: {
                    provincestr: '',
                    citystr: '',
                },
                address: {
                    provincestr: '',
                    citystr: '',
                },
                addressProvince: "北京市", //居住地省
                addressCityStr: "东城", //居住地市

                mobile: "", //电话号码
                email: "", //邮箱
                create_doc_date: "", //建档日期
                doctor_name: "", //主治医生
                hospital: "", //医院
                past_other_history: "", //其他疾病
                family_history: "", //家族史



                allergy_history: "", //过敏史

                other_contacts: [{
                    name: '',
                    shipstr: "",
                    mobile: '',
                }],
                self_history: {
                    first: '',
                    second: '',
                    third: '',
                    fourth: '',
                },
                smoke_history: {
                    first: '',
                    second: '',
                    third: '',
                    fourth: '',
                },
                remark_doctor: '',

            },
            menstruationStopReason: '',
            past_main_history_checkboxs: [],
            environment_touch_checkbox: [],
            smoke_one: '',
            smoke_two: '',
            smoke_three: '',

            other_input: "",
            provinceAndCities: provinceAndCityList,
            nations: nationlist.nations,
            diseaseid: '',
        }
    },
    watch: {
        '$route': function(to, from) {
            this.initPage(to)
        },
        smoke_one: function(newval, oldval) {
            var one = Number(newval);
            var two = Number(this.smoke_two);
            if (typeof one == 'NaN' || typeof two == 'NaN' || one < 0 || two < 0) {
                return;
            }
            var three = one * two;
            console.log('-----watch one-----', one, two, three);
            if (three == 0) {
                three = '';
            }
            this.smoke_three = three;
        },
        smoke_two: function(newval, oldval) {
            var two = Number(newval);
            var one = Number(this.smoke_one);
            if (typeof one == 'NaN' || typeof two == 'NaN' || one < 0 || two < 0) {
                return;
            }

            var three = one * two;
            console.log('-----watch two-----', one, two, three);
            if (three == 0) {
                three = '';
            }
            this.smoke_three = three;
        }
    },
    computed: {
        pagetitle: function() {
            var title = '';
            if (this.patientid) {
                    title = this.patientinfo.name + '修改';
            } else {
                title = '新增'+ this.diseaseName +'患者';
            }
            return title;
        },
        maleStyle: function() {
            if (this.patientinfo.sex == "1") {
                return true;
            } else {
                return false;
            }
        },
        femaleStyle: function() {
            if (this.patientinfo.sex == "2") {
                return true;
            } else {
                return false;
            }
        },
        menstruation_history: function() {
            var result = '';
            if (this.patientinfo.sex == '2' && this.femaleStyle) {
                result = this.firstMenstruationAge + "|" + this.menstruationStatus + "|";
                if (this.menstruationStatus == "正常") {
                    result += (this.menstruationHoldOnDays + "|" + this.menstruationPeriod);
                }else if (this.menstruationStatus == "停经") {
                    result += (this.picked1 + "|");
                    if (this.picked1 == "生理性") {
                        result += this.menstruationStopTime;
                    }else if(this.picked1 == "病理性") {
                        result += this.menstruationStopReason;
                    }
                }
                return result;
            }else {
                return "|||";
            }
        },
        childbearing_history: function() {
            if (this.patientinfo.sex == '2' && this.femaleStyle) {
                return this.pregnantTimes + "|" + this.childbirthTimes + "|" + this.pregnantTime + "|" + this.childbirthTime;
            }else{
                return "|||";
            }
        },
        past_main_history: function() {
            var result = "";
            result = this.past_main_history_checkboxs.join("|");
            if (this.other_input_checkbox) {
                result += ("+" + this.other_input);
            }
            return result;
        },
        doctorname: function() {
            return common.getName();
        },
        hospital: function() {
            return common.getHospital();
        },
        showSmokeOther: function() {
            if (util.inArray(this.environment_touch_checkbox, '其他')) {
                return true;
            }else {
                return false;
            }
        },
        patientid: function() {
            return this.$route.params.patientid != undefined ? this.$route.params.patientid : '';
        },
        diseaseCount: function() {
            var diseases = common.getDiseases();
            if ($.isArray(diseases)) {
                return diseases.length;
            }

            return 0;
        },
        diseaseName: function() {
            return common.getDiseaseName(this.diseaseid);
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue')
    },
    methods: {
        getFamilyDiseases: function() {
            var family_history = [];
            var that = this;
            this.family_history_diseases.forEach(function(val) {
                var obj = {};
                obj.disease = val;
                if (val == '癌症') {
                    obj.content = that.family_history_contents[0];
                } else if (val == '遗传病史') {
                    obj.content = that.family_history_contents[1];
                } else if (val == '其他') {
                    obj.content = that.family_history_contents[2];
                }
                family_history.push(obj);
            })
            return family_history;
        },
        setFamilyDiseases: function(data) {
            var that = this;
            data.forEach(function(obj) {
                that.family_history_diseases.push(obj.disease);
                if (obj.disease == '癌症') {
                    that.$set(that.family_history_contents, 0, obj.content)
                } else if (obj.disease == '遗传病史') {
                    that.$set(that.family_history_contents, 1, obj.content)
                } else if (obj.disease == '其他') {
                    that.$set(that.family_history_contents, 2, obj.content)
                }
            })
        },
        isShowFamilyDisease: function(val) {
            for (var i=0;i<this.family_history_diseases.length;i++) {
                if (this.family_history_diseases[i] == val) {
                    return true;
                }
            }
            return false;
        },
        maleSelectClick: function() {
            this.patientinfo.sex = "1";
        },
        femaleSelectClick: function() {
            this.patientinfo.sex = "2";
        },
        menstruationNormalClick: function() {
            this.menstruationNormalStyle = true;
            this.menstruationStopStyle = false;
            this.menstruationStatus = "正常";
        },
        menstruationStopClick: function() {
            console.log("-------------456");
            this.menstruationNormalStyle = false;
            this.menstruationStopStyle = true;
            this.menstruationStatus = "停经";
        },
        save: function() {
            var httpurl = this.patientid == '' ? 'patient.addpost' : 'patient.modifypost';
            var that = this;
            switch (true) {
                case this.patientinfo.name.trim() == "":
                    this.$message({
                      showClose: true,
                      message: '请输入患者姓名',
                      type: 'error',
                      onClose: () => {
                          $("input[name='patient-name']").focus();
                      }
                    });
                    return;
                    break;
                case this.patientinfo.sex == 0:
                    this.$message({
                      showClose: true,
                      message: '请输入患者性别',
                      type: 'error',
                      onClose: () => {
                      }
                    });
                    return;
                    break;
                // case this.patientinfo.mobile.trim() == "":
                //     that.$emit('show-alert', "请输入患者本人手机", function() {
                //         $("input[name='patient-mobile']").focus();
                //     });
                //     return;
                //     break;
                case this.patientinfo.birthday.trim() == "":
                    this.$message({
                      showClose: true,
                      message: '请输入患者生日',
                      type: 'error',
                      onClose: () => {
                          $("input[name='patient-birthday']").focus();
                      }
                    });
                    return;
                    break;
                case $.trim(this.patientinfo.prcrid) == "":
                    this.$message({
                      showClose: true,
                      message: '请输入身份证号',
                      type: 'error',
                      onClose: () => {
                          $("input[name='patient-prcrid']").focus();
                      }
                    });
                    return ;
                    break;
                default:
                    break;
            }
            //校验手机号
            if ($.trim(this.patientinfo.mobile) != '' && !rule.checkPhone(this.patientinfo.mobile)) {
                this.$message({
                  showClose: true,
                  message: '请输入正确的手机号',
                  type: 'error',
                  onClose: () => {
                      $("input[name='patient-mobile']").focus();
                  }
                });
                return;
            }
            //校验邮箱号
            if ($.trim(this.patientinfo.email) != "" && !rule.checkEmail(this.patientinfo.email)) {
                this.$message({
                  showClose: true,
                  message: '请输入正确的邮箱',
                  type: 'error',
                  onClose: () => {
                      $("input[name='patient-email']").focus();
                  }
                });
                return;
            }
            //校验身份证号
            if ($.trim(this.patientinfo.prcrid) != "" && !rule.checkIDcard(this.patientinfo.prcrid)) {
                this.$message({
                  showClose: true,
                  message: '请输入正确的身份证号',
                  type: 'error',
                  onClose: () => {
                      $("input[name='patient-prcrid']").focus();
                  }
                });
                return;
            }
            //校验备用联系人手机号
            if ($.trim(this.patientinfo.other_contacts[0].mobile) != "" && !rule.checkPhone(this.patientinfo.other_contacts[0].mobile)) {
                this.$message({
                  showClose: true,
                  message: '请输入正确的备用联系人号码',
                  type: 'error',
                  onClose: () => {
                      $("input[name='spare_contacts_mobile']").focus();
                  }
                });
                return;
            }

            this.patientinfo.smoke_history.second = this.environment_touch_checkbox.join(',');
            this.patientinfo.smoke_history.fourth = this.smoke_one + "," + this.smoke_two + "," + this.smoke_three;

            // console.log('smoke_history', this.patientinfo.smoke_history);
            // console.log('self_history', this.patientinfo.self_history);
            // console.log('past_main_history', this.past_main_history);
            // console.log('past_other_history', this.patientinfo.past_other_history);

            var family_history = this.getFamilyDiseases();

            // return ;
            api.http({
              url: httpurl,
              data: {
                  patientid: this.patientid,
                  name: this.patientinfo.name,
                  out_case_no: this.patientinfo.out_case_no,
                  sex: this.patientinfo.sex,
                  birthday: this.patientinfo.birthday,
                  nation: this.patientinfo.nation,
                  career: this.patientinfo.career,
                  prcrid: this.patientinfo.prcrid,
                  marry_status: this.patientinfo.marry_status,
                  mobile: this.patientinfo.mobile,
                  email: this.patientinfo.email,
                  create_doc_date: this.patientinfo.create_doc_date,
                  past_other_history: this.patientinfo.past_other_history,
                  family_history: family_history,
                  allergy_history: this.patientinfo.allergy_history,

                  //计算属性
                  past_main_history: this.past_main_history,
                  menstruation_history: this.menstruation_history,
                  childbearing_history: this.childbearing_history,
                  other_contacts: this.patientinfo.other_contacts,
                  blood_type: this.patientinfo.blood_type,
                  birth_place: this.patientinfo.birth_place,
                  native_place: this.patientinfo.native_place,
                  address: this.patientinfo.address,
                  self_history: this.patientinfo.self_history,
                  smoke_history: this.patientinfo.smoke_history,
                  remark_doctor: this.patientinfo.remark_doctor,
                  patientcardno: this.patientinfo.patientcardno,
                  patientcard_id: this.patientinfo.patientcard_id,
                  fee_type: this.patientinfo.fee_type,
              },
              successCallback: function(d) {
                  var data = d.data;
                  that.$message({
                    showClose: true,
                    message: '保存成功',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                        if (typeof data.patientid != ``) {
                            that.$router.push({
                                path: '/patient/' + data.patientid + '/baseinfo-lungcancer'
                            })
                        }
                    }
                  });
              },
              errorCallback: function(d) {
                  that.$message({
                    showClose: true,
                    message: d.errmsg,
                    type: 'error',
                    onClose: () => {
                        $("input[name='out-case-no']").focus();
                    }
                  });
              }
            })
        },
        selectChange: function(e) {
            this.currentProvinceIndex = e.target.selectedIndex-1;
            if (this.currentProvinceIndex < 0) {
                this.currentProvinceIndex = 0;
            }
            this.patientinfo.citystr = this.provinceAndCities[this.currentProvinceIndex].cities[0];
        },
        selectChangeAddress: function(e) {
            this.currentAddressProvinceIndex = e.target.selectedIndex-1;
            if (this.currentAddressProvinceIndex < 0) {
                this.currentAddressProvinceIndex = 0;
            }
            this.patientinfo.address.citystr = this.provinceAndCities[this.currentAddressProvinceIndex].cities[0];
        },
        selectChangeBirthPlace: function(e) {
            this.currentBirthPlaceProvinceIndex = e.target.selectedIndex-1;
            if (this.currentBirthPlaceProvinceIndex < 0) {
                this.currentBirthPlaceProvinceIndex = 0;
            }
            this.patientinfo.birth_place.citystr = this.provinceAndCities[this.currentBirthPlaceProvinceIndex].cities[0];
        },
        selectChangeNativePlace: function(e) {
            this.currentNativePlaceProvinceIndex = e.target.selectedIndex-1;
            if (this.currentNativePlaceProvinceIndex < 0) {
                this.currentNativePlaceProvinceIndex = 0;
            }
            this.patientinfo.native_place.citystr = this.provinceAndCities[this.currentNativePlaceProvinceIndex].cities[0];
        },
        showAlertMsg: function(msg) {},
        show: function() {

        },
        getDefaultDate: function(birthday, type) {
            var today = util.getFormatDate();
            if (this.isModify()) {
                if (birthday == undefined || birthday == '' || birthday == null) {
                    return '';
                }
            } else {
                if (type == 'birthday') {
                    return '';
                }
                return today;
            }
            return today;
        },
        isModify: function() {
            return !!this.patientid;
        },
        handleSuccessData: function(that, response) {
                that.patientinfo = response.data;
                //既往病史处理
                if ($.trim(that.patientinfo.past_main_history) != "") {
                    var other_input  = '';
                    var index = that.patientinfo.past_main_history.indexOf("+");
                    if (index > -1) {
                        that.other_input_checkbox = true;
                        that.other_input = that.patientinfo.past_main_history.substring(index + 1, that.patientinfo.past_main_history.length);
                    }else {
                        that.other_input_checkbox = false;
                        that.other_input = "";
                    }
                    index = index > -1 ? index : that.patientinfo.past_main_history.length;
                    var tempString = that.patientinfo.past_main_history.substring(0, index);
                    var arr = tempString.split("|");
                    var pickedArr = util.getInterOf2Arr(that.pmhArr, arr);

                    that.past_main_history_checkboxs = pickedArr;
                }
                //处理三个地区的二级数据
                for (var i = 0; i < provinceAndCityList.length; i++) {
                    if (provinceAndCityList[i].province == that.patientinfo.birth_place.provincestr) {
                        that.currentBirthPlaceProvinceIndex = i;
                    }
                    if (provinceAndCityList[i].province == that.patientinfo.native_place.provincestr) {
                        that.currentNativePlaceProvinceIndex = i;
                    }
                    if (provinceAndCityList[i].province == that.patientinfo.address.provincestr) {
                        that.currentAddressProvinceIndex = i;
                    }
                }
                //吸烟史处理
                that.environment_touch_checkbox = that.patientinfo.smoke_history.second.split(',');
                var pickedEnvArr = util.getInterOf2Arr(that.environment_touch_checkbox, that.smokeEnvArr);
                that.environment_touch_checkbox = pickedEnvArr;
                if (!util.inArray(pickedEnvArr, '其他')) {
                    that.patientinfo.smoke_history.third = '';
                }
                var arr = that.patientinfo.smoke_history.fourth.split(',');
                that.smoke_one = arr[0] == undefined ? '' : arr[0];
                that.smoke_two = arr[1] == undefined ? '' : arr[1];
                that.smoke_three = arr[2] == undefined ? '' : arr[2];

                if (that.patientinfo.birthday == '0000-00-00') {
                    that.patientinfo.birthday = '';
                }
                if (that.patientinfo.create_doc_date == '0000-00-00') {
                    that.patientinfo.create_doc_date = '';
                }

                for (var i = 0; i < provinceAndCityList.length; i++) {
                    if (provinceAndCityList[i].province == that.patientinfo.provincestr) {
                        that.currentProvinceIndex = i;
                        break;
                    }
                }
                if ($.trim(that.patientinfo.menstruation_history) != "") {
                    var menstruation_historyArr = that.patientinfo.menstruation_history.split('|');
                    console.log(menstruation_historyArr);
                    if (menstruation_historyArr[0] != undefined) {
                        that.firstMenstruationAge = menstruation_historyArr[0];
                    } else {
                        that.firstMenstruationAge = " ";
                    }
                    if (menstruation_historyArr[1] != undefined) {
                        that.menstruationStatus = menstruation_historyArr[1];
                        if (that.menstruationStatus == '正常') {
                            that.menstruationNormalClick();
                        }else {
                            that.menstruationStopClick();
                        }
                    } else {
                        that.menstruationStatus = " ";
                    }

                    if (menstruation_historyArr[2] != undefined && menstruation_historyArr[1] == '正常') {
                        that.menstruationHoldOnDays = menstruation_historyArr[2];
                        that.menstruationPeriod = menstruation_historyArr[3];
                    } else if (menstruation_historyArr[2] != undefined && menstruation_historyArr[1] == "停经"){
                        that.picked1 = menstruation_historyArr[2];
                        if (menstruation_historyArr[2] == '生理性') {
                            that.menstruationStopTime = menstruation_historyArr[3];
                        }else if(menstruation_historyArr[2] == '病理性') {
                            that.menstruationStopReason = menstruation_historyArr[3];
                        }
                    }
                }
                if ($.trim(that.patientinfo.childbearing_history) != "") {
                    var childbearing_historyArr = that.patientinfo.childbearing_history.split('|');

                    if (childbearing_historyArr[0] != undefined) {
                        that.pregnantTimes = childbearing_historyArr[0];
                    } else {
                        that.childbirth = " ";
                    }
                    if (childbearing_historyArr[1] != undefined) {
                        that.childbirthTimes = childbearing_historyArr[1];
                    } else {
                        that.childbirthTimes = " ";
                    }

                    if (childbearing_historyArr[2] != undefined) {
                        that.pregnantTime = childbearing_historyArr[2];
                    } else {
                        that.pregnantTime = " ";
                    }

                    if (childbearing_historyArr[3] != undefined) {
                        that.childbirthTime = childbearing_historyArr[3];
                    } else {
                        that.childbirthTime = " ";
                    }
                }

                if ($.isArray(that.patientinfo.family_history)) {
                    that.setFamilyDiseases(that.patientinfo.family_history);
                }
                that.patientinfo = Object.assign({}, that.patientinfo);

        },
        initPage: function(to) {
            var that = this;
            to = to || this.$route
            this.diseaseid = to.query.diseaseid != undefined ?to.query.diseaseid : '';
            if (!this.isModify()) {
                if (this.diseaseCount > 1 && !this.diseaseid) {
                    this.$router.replace({
                        path: '/patient/selectdisease',
                        query: {from: to.path}
                    });
                }
            }
            if (this.isModify()) {
                api.http({
                  url: 'patient.patientinfo',
                  data: {
                      patientid: that.patientid,
                  },
                  successCallback: function(d) {
                      that.handleSuccessData(that, d);
                  }
                })
            }

            if (!util.isObject(that.patientinfo.birth_place)) {
                that.patientinfo.birth_place = {provincestr: "", citystr: ''};
            }
            if (!util.isObject(that.patientinfo.address)) {
                that.patientinfo.address = {provincestr: '', citystr: ''};
            }
            if (!util.isArray(that.patientinfo.other_contacts)) {
                that.patientinfo.other_contacts = [{name: '', shipstr: '', mobile: ''}];
            }
            if (!util.isObject(that.patientinfo.native_place)) {
                that.patientinfo.birth_place = {provincestr: '', citystr: ''};
            }
            if (!util.isObject(that.patientinfo.blood_type)) {
                that.patientinfo.blood_type = {first: '', second: ''};
            }
            if (!util.isObject(that.patientinfo.self_history)) {
                that.patientinfo.self_history = {first: '', second: '', third: '', fourth: ''};
            }
            if (!util.isObject(that.patientinfo.smoke_history)) {
                that.patientinfo.self_history = {first: '', second: '', third: '', fourth: ''};
            }
        }

    },
    created: function() {
        this.initPage()
    }
}
</script>
