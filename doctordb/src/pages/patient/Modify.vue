<template>
    <app-header active='patient'></app-header>
    <div class="container-fluid content">
        <visit-header :patientname='pagetitle' :patientid='patientid'></visit-header>
        <div class="row patientinfo">
            <div class="baseinfo">
                <div class="bg-caption-padding">
                    基本信息
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">姓名</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-name" class="form-control" type="text" v-model="patientinfo.name">
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4">*</span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">病历号</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="out-case-no" class="form-control" type="text" name="" value="{{patientinfo.out_case_no}}" v-model="patientinfo.out_case_no">
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
                                <input id="birthday" name="patient-birthday" class="form-control" type="text" @click="showCalendar" name="" v-model="patientinfo.birthday">
                                <calendar :defaultdate="isShowDefaultDate(patientinfo.birthday, 'birthday')" :show.sync="showForBirthday" :value.sync="patientinfo.birthday" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4">*</span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">民族</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" value="{{patientinfo.nation}}" v-model="patientinfo.nation">
                                    <option v-for="xx in nations" value="{{xx}}">{{xx}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">职业</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input class="form-control" type="text" name="" value="{{patientinfo.career}}" v-model="patientinfo.career">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">身份证号</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-prcrid" class="form-control" type="text" name="" value="{{patientinfo.prcrid}}" v-model="patientinfo.prcrid" placeholder="含有X的请大写">
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4">*</span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">婚姻</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" value="{{patientinfo.marry_status}}" v-model="patientinfo.marry_status">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option value="已婚">已婚</option>
                                    <option value="未婚">未婚</option>
                                    <option value="丧偶">丧偶</option>
                                    <option value="离异">离异</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">目前居住地</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select style="width:48%;display:inline-block" class="form-control clearMargin" v-model="patientinfo.address.provincestr" v-on:change="selectChangeForCurrentAddress">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="province in provinceAndCities" value="{{province.province}}">{{province.province}}</option>
                                </select>
                                <select style="width:49%;display:inline-block" class="form-control clearMargin" v-model="patientinfo.address.citystr">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="city in provinceAndCities[currentAddressProvinceIndex].cities" value="{{city}}">{{city}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3">出生地</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select id="selectProvince" style="width:48%;display:inline-block;" class="form-control clearMargin" v-model="patientinfo.birth_place.provincestr" v-on:change="selectChangeForBirthPlaceProvince">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="province in provinceAndCities" value="{{province.province}}">{{province.province}}</option>
                                </select>
                                <select style="width:49%;display:inline-block" class="form-control clearMargin" v-model="patientinfo.birth_place.citystr">
                                    <option disabled="disabled" value="">请选择--</option>
                                    <option v-for="city in provinceAndCities[currentBirthPlaceProvinceIndex].cities" value="{{city}}">{{city}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">本人手机</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-mobile" class="form-control" type="text" value="{{patientinfo.mobile}}" v-model="patientinfo.mobile">
                            </div>
                            <div class="col-lg-1 col-sm-1 clearPadding">
                                <span class="padding-5px" style="color:red;line-height:2.4"></span>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clearPadding">邮箱</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input name="patient-email" class="form-control" type="text" value="{{patientinfo.email}}" v-model="patientinfo.email">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="bg-caption-padding"><a class="fa fa-plus-square-o" style="cursor: pointer; text-decoration: none" @click="moreOtherContacts"></a>备用联系人
                </div>
                <div v-for="item in patientinfo.other_contacts" class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-4 col-sm-4">
                            <div class="col-lg-3">
                                <a class="fa fa-minus-square-o" style="text-decoration: none; cursor: pointer" @click="deleteOtherContacts($index)"></a>
                                <label>姓名</label>
                            </div>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <input class="form-control" type="text" value="{{patientinfo.spare_contacts_name}}" v-model="item.name">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-4">
                            <label class="col-lg-3 col-sm-3 clear-padding-left">关系</label>
                            <div class="col-lg-8 col-sm-8 clearPadding">
                                <select class="form-control clearMargin" value="{{patientinfo.spare_contacts_shipstr}}" v-model="item.shipstr">
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
                                <input name="spare_contacts_mobile{{$index}}" class="form-control" type="text" value="{{patientinfo.spare_contacts_mobile}}" v-model="item.mobile">
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
                                <input id="createDocDate" class="form-control" type="text" @click="showCalendar" v-model="patientinfo.create_doc_date">
                                <calendar :show.sync="showForCreateDocDate" :defaultdate="isShowDefaultDate(patientinfo.create_doc_date, 'create_doc_date')"  :value.sync="patientinfo.create_doc_date" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
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
                <div class="bottom-dashed">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                        <label class="col-lg-1 col-sm-2">自身免疫病</label>
                        <div class="col-lg-11 col-sm-10 clear-padding-left">
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value1" value="红斑狼疮" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value1">红斑狼疮</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value2" value="干燥综合征" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value2">干燥综合征</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value3" value="白塞氏病" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value3">白塞氏病</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value4" value="风湿性关节炎" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value4">风湿性关节炎</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value5" value="克隆氏病" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value5">克隆氏病</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value6" value="溃疡性结肠炎" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value6">溃疡性结肠炎</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value7" value="重症肌无力" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value7">重症肌无力</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
                                    <input type="checkbox" id="value8" value="桥本氏甲状腺炎" v-model="past_main_history_checkboxs" lazy>&nbsp;
                                    <label for="value8">桥本氏甲状腺炎</label>
                                </div>
                                <div class="checkbox checkbox-inline checkbox-info clearMargin">
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
                <div class="bottom-solid">
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">其他疾病</label>
                            <div class="col-lg-5 col-sm-6 clearPadding">
                                <textarea class="form-control" cols="50" rows="4" v-model="patientinfo.past_other_history"></textarea>
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
                            <div class="col-lg-5 col-sm-6 clearPadding">
                                <textarea class="form-control" cols="50" rows="4" value="{{patientinfo.family_history}}" v-model="patientinfo.family_history"></textarea>
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
                                        <input class="form-control" type="text" value="{{menstruationHoldOnDays}}" v-model="menstruationHoldOnDays">
                                    </div>
                                    <div class="col-lg-3 col-sm-3 clearPadding" style="width:auto;padding-left:5px;padding-right:5px;">
                                        <span style="line-height:2.3;">天/</span>
                                    </div>
                                    <div class="col-lg-3 col-sm-3 clearPadding">
                                        <input class="form-control" type="text" value="{{menstruationPeriod}}" v-model="menstruationPeriod">
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
                                        <input v-for="option in ['生理性', '病理性']" type="radio" id="inlineRadio{{option}}" :value='option' v-model='picked1'>
                                        <label v-for="option in ['生理性', '病理性']" for="inlineRadio{{option}}" :class="{active1: picked1 == option}" style="margin-top: 0px; text-align: center;">{{option}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row padding-5px" v-if="menstruationStopStyle">
                        <div v-show="picked1 == '生理性'" class="col-lg-6 col-sm-6">
                            <label class="col-lg-2 col-sm-4" >停经年龄</label>
                            <div class="col-lg-6 col-sm-7">
                                <input class="form-control" type="text" value="{{menstruationStopTime}}" v-model="menstruationStopTime">
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
                                    <label class="col-lg-3 col-sm-5">生育</label>
                                    <div class="col-lg-8 col-sm-7">
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
                <div>
                    <div class="row padding-5px">
                        <div class="col-lg-12 col-sm-12">
                            <label class="col-lg-1 col-sm-2">药物</label>
                            <div class="col-lg-5 col-sm-6 clearPadding">
                                <textarea class="form-control" cols="50" rows="4" value="{{patientinfo.allergy_history}}" v-model="patientinfo.allergy_history"></textarea>
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
    <app-footer></app-footer>
</template>
<style scoped>
h4 {
    float: left;
    padding-left: 10px;
    border-left: 3px solid #008db9;
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

.disease-first td {
    padding: 0 8px 8px;
}
</style>
<script type="text/javascript">
import util from '../../lib/util.js';
import common from '../../lib/common.js';
import api from '../../config/api.js';
import nationlist from '../../config/nationlist.js';
import rule from '../../config/rule.js';
import provinceAndCityList from '../../config/provinceAndCityList.js';
module.exports = {
    data: function() {
        return {
            picked1: '',
            menstruationStopReason:'',
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

            //select二级联动
            currentAddressProvinceIndex: 0,
            currentBirthPlaceProvinceIndex: 0,
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
                sex: 1, //性别 0未知 1男 二女
                birthday: "", //生日
                nation: "汉族", //民族
                career: "", //职业
                prcrid: "", //身份证号
                marry_status: "", //婚姻状态
                // provincestr: "北京市", //省
                // citystr: "东城", //市
                // addressProvince: "北京市", //居住地省
                // addressCityStr: "东城", //居住地市
                address: {
                    provincestr: '',
                    citystr: '',
                },
                birth_place: {
                    provincestr: '',
                    citystr: '',
                },
                other_contacts:[
                    {
                        name: '',
                        mobile: '',
                        shipstr: '',
                    },
                ],
                past_other_history: '',
                mobile: "", //电话号码
                email: "", //邮箱
                spare_contacts_name: "", //备用联系人
                spare_contacts_shipstr: "", //关系
                spare_contacts_mobile: "", //备用联系人手机
                create_doc_date: "", //建档日期
                doctor_name: "", //主治医生
                hospital: "", //医院
                other_illness: "", //其他疾病
                family_history: "", //家族史
                allergy_history: "", //过敏史
            },
            past_main_history_checkboxs: [],
            other_input: "",
            provinceAndCities: provinceAndCityList,
            nations: nationlist.nations,
        }
    },
    route: {
        data: function(transition) {
            var that = this;
            if (!that.isModify()) {
                if (this.diseaseCount > 1) {
                    transition.redirect({
                        path: '/patient/selectdisease'
                    });
                }
            }
            if (that.isModify()) {
                $.ajax({
                    url: api.get('patient.baseinfo'),
                    type: "post",
                    dataType: 'json',
                    data: {
                        patientid: that.patientid,
                    }
                }).done(function(response) {
                    that.patientinfo = response.data;
                    if (that.patientinfo.birthday == '0000-00-00') {
                        that.patientinfo.birthday = '';
                    }
                    if (that.patientinfo.create_doc_date == '0000-00-00') {
                        that.patientinfo.create_doc_date = '';
                    }
                     if (that.patientinfo.firstMenstruationAge == '0000-00-00') {
                        that.patientinfo.firstMenstruationAge = '';
                    }
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
                        that.past_main_history_checkboxs = arr;
                    }

                    for (var i = 0; i < provinceAndCityList.length; i++) {
                        if (provinceAndCityList[i].province == that.patientinfo.provincestr) {
                            that.currentProvinceIndex = i-1;
                            break;
                        }
                    }

                    if ($.trim(that.patientinfo.menstruation_history) != "") {
                        var menstruation_historyArr = that.patientinfo.menstruation_history.split('|');
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
                    //处理二个地区的二级数据
                    for (var i = 0; i < provinceAndCityList.length; i++) {
                        if (provinceAndCityList[i].province == that.patientinfo.birth_place.provincestr) {
                            that.currentBirthPlaceProvinceIndex = i;
                        }
                        if (provinceAndCityList[i].province == that.patientinfo.address.provincestr) {
                            that.currentAddressProvinceIndex = i;
                        }
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

                    if (that.patientinfo.other_contacts.length == 0) {
                        // console.log('444');
                        that.patientinfo.other_contacts = [{name: '', shipstr: '', mobile: ''}];
                    }
                })
            }
        }
    },
    watch: {
        'patientinfo.menstruationStopTime': function(vale, oldval) {},
        'patientinfo.other_contacts': function(vale, oldval){
            console.log('new--', vale, 'old---', oldval);
        }
    },
    computed: {
        pagetitle: function() {
            var title = '';
            if (this.patientid) {
                title = this.patientinfo.name + '修改';
            } else {
                title = '新增患者';
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
        patientid: function() {
            return this.$route.params.patientid != undefined ? this.$route.params.patientid : '';
        },
        diseaseCount: function() {
            var diseases = common.getDiseases();
            if ($.isArray(diseases)) {
                return diseases.length;
            }

            return 0;
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'),
        'appFooter': require('../../components/Footer.vue'),
        'visitHeader': require('../../components/VisitHeader.vue'),
        calendar: function(resolve) {
            require(['../../components/calendar.vue'], resolve);
        }
    },
    methods: {
        moreOtherContacts: function() {
            var obj = {
                name: '',
                shipstr: '',
                mobile: '',
            }
            this.patientinfo.other_contacts.push(obj);
            console.log(this.patientinfo.other_contacts);
        },
        deleteOtherContacts: function(index) {
            if (this.patientinfo.other_contacts.length > 1) {
                this.patientinfo.other_contacts.splice(index, 1);
            }
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
            this.menstruationNormalStyle = false;
            this.menstruationStopStyle = true;
            this.menstruationStatus = "停经";
        },
        save: function() {
            var httpurl = this.patientid == '' ? 'patient.addpost' : 'patient.modifypost';
            var that = this;
            switch (true) {
                case this.patientinfo.name.trim() == "":
                    that.$dispatch('show-alert', "请输入患者姓名", function() {
                        $("input[name='patient-name']").focus();
                    });
                    return;
                    break;
                    // case this.patientinfo.out_case_no.trim() == "":
                    // that.$dispatch('show-alert', "请输入病历号", function(){
                    //     $("input[name='out-case-no']").focus();
                    // });
                    // return ;
                    // break;
                case this.patientinfo.sex == 0:
                    that.$dispatch('show-alert', "请输入患者性别", function() {
                        //
                    });
                    return;
                    break;
                // case this.patientinfo.mobile.trim() == "":
                //     that.$dispatch('show-alert', "请输入患者本人手机", function() {
                //         $("input[name='patient-mobile']").focus();
                //     });
                //     return;
                //     break;
                case this.patientinfo.birthday.trim() == "":
                    that.$dispatch('show-alert', "请输入患者生日", function() {
                        $("input[name='patient-birthday']").focus();
                    });
                    return;
                    break;
                case $.trim(this.patientinfo.prcrid) == "":
                    that.$dispatch('show-alert', "请输入身份证号", function(){
                        $("input[name='patient-prcrid']").focus();
                    });
                    return ;
                    break;
                default:
                    break;
            }
            //校验手机号
            if ($.trim(this.patientinfo.mobile) != "" && !rule.checkPhone(this.patientinfo.mobile)) {
                that.$dispatch('show-alert', "请输入正确的手机号", function() {
                    $("input[name='patient-mobile']").focus();
                });
                return;
            }
            //校验邮箱号
            if ($.trim(this.patientinfo.email) != "" && !rule.checkEmail(this.patientinfo.email)) {
                that.$dispatch('show-alert', "请输入正确的邮箱号", function() {
                    $("input[name='patient-email']").focus();
                });
                return;
            }
            //校验身份证号
            if ($.trim(this.patientinfo.prcrid) != "" && !rule.checkIDcard(this.patientinfo.prcrid)) {
                that.$dispatch('show-alert', "请输入正确的身份证号", function() {
                    $("input[name='patient-prcrid']").focus();
                });
                return;
            }
            //校验备用联系人手机号
            for (var i = 0; i < this.patientinfo.other_contacts.length; i++) {
                if( $.trim(this.patientinfo.other_contacts[i].mobile) != "" && !rule.checkPhone(this.patientinfo.other_contacts[i].mobile)){
                    that.$dispatch('show-alert', "请输入正确的备用联系人号码", function() {
                        $("input[name='spare_contacts_mobile" + i + "']").focus();
                    });
                    return;
                }
            }

            //全部提交字段，方便测试
            // console.log("name", this.patientinfo.name);
            // console.log('out_case_no', this.patientinfo.out_case_no);
            // console.log('sex', this.patientinfo.sex);
            // console.log('birthday', this.patientinfo.birthday);
            // console.log('nation', this.patientinfo.nation);
            // console.log('career', this.patientinfo.career);
            // console.log('prcrid', this.patientinfo.prcrid);
            // console.log('marry_status', this.patientinfo.marry_status);
            // console.log('address.provincestr', this.patientinfo.address.provincestr);
            // console.log('address.citystr', this.patientinfo.address.citystr);
            // console.log('birth_place.provincestr', this.patientinfo.birth_place.provincestr);
            // console.log('birth_place.citystr', this.patientinfo.birth_place.citystr);
            // console.log('mobile', this.patientinfo.mobile);
            // console.log('email', this.patientinfo.email);
            // console.log('other_contacts.name', this.patientinfo.other_contacts[0].name);
            // console.log('other_contacts.shipstr', this.patientinfo.other_contacts[0].shipstr);
            // console.log('other_contacts.mobile', this.patientinfo.other_contacts[0].mobile);
            // console.log('other_contacts', this.patientinfo.other_contacts);
            // console.log('create_doc_date', this.patientinfo.create_doc_date);
            // console.log('past_main_history', this.past_main_history);
            // console.log('past_other_history', this.patientinfo.past_other_history);
            // console.log('family_history', this.patientinfo.family_history);
            // console.log('menstruation_history', this.menstruation_history);
            // console.log('childbearing_history', this.childbearing_history);
            // console.log('allergy_history', this.patientinfo.allergy_history);
            // return ;
            $.ajax({
                    url: api.get(httpurl),
                    type: 'POST',
                    dataType: 'json',
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
                        address: this.patientinfo.address,
                        birth_place: this.patientinfo.birth_place,
                        mobile: this.patientinfo.mobile,
                        email: this.patientinfo.email,
                        other_contacts: this.patientinfo.other_contacts,
                        create_doc_date: this.patientinfo.create_doc_date,
                        past_main_history: this.past_main_history,
                        past_other_history: this.patientinfo.past_other_history,
                        family_history: this.patientinfo.family_history,
                        menstruation_history: this.menstruation_history,
                        childbearing_history: this.childbearing_history,
                        allergy_history: this.patientinfo.allergy_history,
                    },
                })
                .done(function(response) {
                    var data = response.data;
                    if (response.errno != 0 && response.errno != -10) {
                        that.$dispatch("show-alert", response.errmsg, function() {
                            $("input[name='out-case-no']").focus();
                        })
                    }else {
                        that.$dispatch('show-popup', '保存成功', function() {
                            if (typeof data.patientid != ``) {
                                that.$route.router.go({
                                    path: '/patient/' + data.patientid + '/baseinfo'
                                })
                            }
                        })
                    }
                })
        },
        showCalendar: function(e) {
            e.stopPropagation();
            var that = this;
            if (e.target.id == "birthday") {
                that.showForBirthday = true;
            } else if (e.target.id == "menstruationHistory") {
                that.showForMenstruationHistory = true;
            } else if (e.target.id == "createDocDate") {
                that.showForCreateDocDate = true;
            }

            that.xN = e.target.offsetLeft;
            that.y = e.target.offsetTop + e.target.offsetHeight + 8;
            var bindHide = function(event) {
                if (event.target == e.target) {
                    return;
                }
                // console.log('----document----', event);
                event.stopPropagation();
                that.showForBirthday = false;
                that.showForMenstruationHistory = false;
                that.showForCreateDocDate = false;
                document.removeEventListener('click', bindHide, false);
                document.removeEventListener('touchstart', bindHide, false);
            };
            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
                document.addEventListener('touchstart', bindHide, false);
            }, 500);
        },
        selectChangeForBirthPlaceProvince: function(e) {
            this.currentBirthPlaceProvinceIndex = e.target.selectedIndex -1;
            this.patientinfo.birth_place.citystr = this.provinceAndCities[this.currentBirthPlaceProvinceIndex].cities[0];
        },
        selectChangeForCurrentAddress: function(e) {
            this.currentAddressProvinceIndex = e.target.selectedIndex -1;
            this.patientinfo.address.citystr = this.provinceAndCities[this.currentAddressProvinceIndex].cities[0];
        },
        showAlertMsg: function(msg) {},
        show: function() {

        },
        isModify: function() {
            return !!this.patientid;
        },
        isShowDefaultDate: function(birthday, type) {
            if (this.isModify()) {
                if (birthday == undefined || birthday == '' || birthday == null) {
                    return false;
                }
            } else {
                if (type == 'birthday') {
                    return false;
                }
                return true;
            }
            return true;
        },
    }
}
</script>
