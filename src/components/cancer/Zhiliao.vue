<template>
<div>
    <div class="question-content container-fluid">
        <div class="form-horizontal">
            <div class="form-group question-group caption">
                <div class="col-sm-7 col-md-7">
                    <h5>上次记录</h5>
                </div>
            </div>
            <div class="question-group">
                <table class="table table-bordered" style="margin-bottom:0;" v-if="chemos.length > 0">
                    <tr style="background:#eee;">
                        <th>化疗性质</th>
                        <th>化疗方案</th>
                        <th>化疗疗程</th>
                    </tr>
                    <tr>
                        <td>{{lastChemoPickedType}}</td>
                        <td>{{lastChemoPickedPkgname}}</td>
                        <td>{{lastChemoPickedStage}}</td>
                    </tr>
                </table>
                <p v-else>暂无记录</p>
            </div>
            <div class="form-group question-group caption">
                <div class="col-sm-7 col-md-7">
                    <h5>化疗</h5>
                </div>
            </div>
            <div class="form-group question-group">
                <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">化疗医院</label>
                <div class="col-sm-3" style="">
                    <div>
                        <input type="text" class="form-control" v-model="hospital" />
                    </div>
                </div>
                <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">化疗开始时间</label>
                <div class="col-sm-3" style="">
                    <div :class="{'has-error has-feedback': iserror, 'has-feedback': !iserror}">
                        <input id="calendar-chemo" class="form-control controls" type="text" @click="showCalendar" v-model="startdate" placeholder="请输入日期" name='_date' :value="startdate">
                        <span :class="{'no-error fa fa-calendar-check-o fa-lg form-control-feedback': !iserror, 'glyphicon glyphicon-remove form-control-feedback': iserror}" style="right:0"></span>
                        <span class="help-block" v-show="iserror">日期已存在</span>
                        <calendar :show="show" :value="startdate" v-on:calendar-change-value="changeStartdate" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                    </div>
                </div>
            </div>
            <div class="form-group question-group">
                <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">化疗方案</label>
                <div class="col-sm-3" style="">
                    <div>
                        <select class="form-control" v-model="pickedPkgname" @change="pkgnameChange()">
                          <option v-for="(pkgname, index) in pkgnames" :value="pkgname" :key="index">{{pkgname}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-2" style="" v-if="pickedPkgname == '其他'">
                    <div>
                        <input type="text" class="form-control" v-model="pickedOtherPkgname">
                    </div>
                </div>
                <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">化疗性质</label>
                <div class="col-sm-3" style="">
                    <div>
                        <select class="form-control" v-model="pickedType" @change="typeChange">
                            <option v-for="(type, effects) in types" :value="type">{{type}}</option>
                          </select>
                    </div>
                </div>
                <div class="col-sm-2" style="" v-if="pickedType == '其他'">
                    <div>
                        <input class="form-control" type="text" v-model="pickedOtherType">
                    </div>
                </div>
            </div>
            <div class="form-group question-group">
                <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">化疗疗程</label>
                <div class="col-sm-3" style="">
                    <div>
                        <select class="form-control" v-model="pickedStage">
                              <option v-for="stage in stages" :value="stage">{{stage}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-1" style="" v-if="pickedStage == '其他'">
                    <div>
                        <input class="form-control" type="text" v-model="pickedOtherStage">
                    </div>
                </div>
            </div>
            <div class="form-group question-group">
                <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">进展原因</label>
                <div class="col-sm-5" style="">
                    <div>
                        <textarea class="form-control" rows="5" v-model="progress_reason"></textarea>
                    </div>
                </div>
            </div>
            <div class="form-group question-group caption">
                <div class="col-sm-7 col-md-7">
                    <h5>具体用药<i class="btn fa fa-plus-square fa-lg" style="margin-left:10px;" @click="clickAddMedicine"></i> bsa：{{bsa}}</h5>
                </div>
            </div>
            <div class="form-group question-group">
                <div class="col-sm-12 text-center">
                    <table class="table table-bordered">
                        <thead>
                            <tr style="background-color:#eee;">
                                <th width="10%" class="text-center">药品名</th>
                                <th width="12%" class="text-center">标准用法</th>
                                <th width="12%" class="text-center">标准剂量</th>
                                <th width="12%" class="text-center">实际用量</th>
                                <th width="12%" class="text-center">给药途径</th>
                                <th width="12%" class="text-center">用药时长</th>
                                <th width="12%" class="text-center">备注</th>
                                <th width="12%" class="text-center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(medicine, index) in medicines" :key="medicine._id">
                                <template v-if="medicine.type == 'manual'">
                                    <td><input type="text" class="form-control" v-model="medicine.name"/></td>
                                    <td>
                                            <input type="text" class="form-control" v-model="medicine.pickedmethod" disabled="disabled"/>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" v-model="medicine.pickedmethod2" disabled="disabled"/>
                                    </td>
                                    <td width="15%">
                                            <input class="form-control" type="text" v-model="medicine.method3" :value="medicine.method3" />
                                    </td>
                                    <td width="15%">
                                            <input type="text" class="form-control" v-model="medicine.pickedmethod4"/>
                                    </td>
                                    <td width="15%">
                                            <input type="text" class="form-control" v-model="medicine.pickedtime"/>
                                    </td>
                                    <td width="15%">
                                            <input type="text" class="form-control" v-model="medicine.remark" />
                                    </td>
                                    <td>
                                        <a v-if="index > -1" href="javascript:" class="btn btn-warning" @click="clickRemoveMedicine(medicine)">删除</a>
                                    </td>
                                </template>
                                <template v-else >
                                    <td>{{medicine.name}} </td>
                                    <td>
                                            <select class="form-control" v-model="medicine.pickedmethod" @change="methodChange(medicine)">
                                            <option v-for="(method, index) in medicine.method" :key="index" :value="method">{{method}}</option>
                                            </select>
                                    </td>
                                    <td><select class="form-control" v-model="medicine.pickedmethod2">
                                    <option v-for="(method, index) in medicine.method2" :key="index" :value="method">{{method}}</option>
                                </select> </td>
                                    <td width="15%">
                                        <input class="form-control" type="text" v-model="medicine.method3" :value="medicine.method3" />
                                    </td>
                                    <td width="15%">
                                            <select class="form-control" v-model="medicine.pickedmethod4">
                                        <option v-for="(method, index) in medicine.method4" :key="index"  :value="method">{{method}}</option>
                                    </select>
                                    </td>
                                    <td width="15%">
                                            <select class="form-control" v-model="medicine.pickedtime">
                                      <option v-for="(time, index) in medicine.time" :key="index"  :value="time">{{time}}</option>
                                    </select>
                                    </td>
                                    <td width="15%">
                                            <input type="text" class="form-control" v-model="medicine.remark" />
                                    </td>
                                    <td>
                                        <a v-if="index > -1" href="javascript:" class="btn btn-warning" @click="clickRemoveMedicine(medicine)">删除</a>
                                    </td>
                                </template>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="input-group col-sm-5" style="padding:0;margin-left:15px;margin-bottom:15px;">
                        <input class="input-search form-inline form-control" type="text" placeholder="请输入药品名" v-model='keyword' @keyup.enter='clickSearch($event)'>
                        <span class="input-group-btn" style="width: 1%;">
                      <button class="btn btn-primary" type="submit" @click.prevent="clickSearch($event)">
                          <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button>
                        </span>
                    </div>
                    <div class="col-sm-5" id="search-medicine-div" style="font-size:14px;" v-show="isShowSearchMedicineDiv">
                        <div style="max-height:200px;overflow-y:auto;overflow-x:hidden" @mouseenter="doMouseenter($event)" @mouseleave="doMouseleave($event)">
                            <table class="table table-bordered" style="border:0">
                                <thead>
                                    <th class="td-search" style="border-bottom:1px dashed #ccc;">药品名称</th>
                                    <!--<th class="td-search" style="border-bottom:1px dashed #ccc;">标准用法</th>
                                <th class="td-search" style="border-bottom:1px dashed #ccc;">标准剂量</th>-->
                                    <th class="td-search" style="border-bottom:1px dashed #ccc;">选择</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(one, index) in searchlist" v-if="searchlist.length > 0" :key="index">
                                        <td class="td-search">{{one.name}}</td>
                                        <!-- <td class="td-search">{{one.method}}</td>
                                    <td class="td-search">{{one.method2}}</td> -->
                                        <td class="td-search">
                                            <div class="checkbox checkbox-inline checkbox-info" style="padding-top:0;">
                                                <input type="checkbox" class="form-control" name="medicine" :value="one" v-model="searchCheckedList" />
                                                <label></label>
                                            </div>
                                            <span>{{one.status}}</span>
                                        </td>
                                    </tr>
                                    <tr v-if="searchlist.length < 1">
                                        <td class="text-center" colspan="4">
                                            <span>暂无结果</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <a href="javascript:" class="btn btn-primary" style="font-size:10px;padding:2px;float:right;margin-bottom:10px;margin-right:10px;" @click="closeSearchMedicineDiv">关闭</a>
                        <a href="javascript:" class="btn btn-primary" style="font-size:10px;padding:2px;float:right;margin-bottom:10px;margin-right:10px;" @click="addMedicine">添加</a>
                    </div>
                </div>
                <div class="form-group question-group caption">
                    <div class="col-sm-7 col-md-7">
                        <h5>疗效评价</h5>
                    </div>
                </div>
                <div class="form-group question-group" v-show="pickedType">
                    <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">疗效</label>
                    <div class="col-sm-5" style="">
                        <input type="text" class="form-control" v-model="pickedEffect" v-if="pickedType == '其他'">
                        <div class="segmented-control" style="width:100%;border:1px solid #ccc" v-else>
                            <input type="radio" id="input-effect" v-for="effect in types[pickedType]" :value="pickedEffect" v-model="pickedEffect">
                            <label :class="{active1: pickedEffect == effect}" for="input-effect" v-for="effect in types[pickedType]" @click="clickRadioLabel(effect)">{{effect}}</label>
                        </div>
                    </div>
                </div>
                <div class="form-group question-group">
                    <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label  question-label">评价依据</label>
                    <div class="col-sm-5" style="">
                        <textarea class="form-control" rows="5" v-model='effectComment'></textarea>
                    </div>
                </div>
                <!-----不良反应---->
                <div class="form-group question-group caption">
                    <div class="col-sm-7 col-md-7">
                        <h5 style="margin:0;">不良反应<i class="btn fa fa-plus-square fa-lg" style="margin-left:10px;" @click="clickAddBadReaction"></i></h5>
                    </div>
                </div>
                <div v-for="(arr, index) in arr2" class="form-group question-group div-badreaction" :key="index">
                    <label style="padding-right:0;" for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">名称</label>
                    <div class="col-sm-3" style="">
                        <div>
                            <select class="form-control" v-model="arr[0]">
                              <option v-for="(val, key) in badreactions" :value="key">{{key}}</option>
                            </select>
                        </div>
                    </div>
                    <label style="padding-right:0;margin-left:20px;" for="inputEmail3" class="col-lg-1 col-sm-1 control-label question-label">程度</label>
                    <div class="col-sm-3" style="">
                        <div>
                            <input type="text" class="form-control" v-model="arr[1]" v-if="arr[0] == '其他'">
                            <select class="form-control" v-model="arr[1]" v-else>
                              <option v-for="item in badreactions[arr[0]]" :value="item">{{item}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        <a href="javascript:" class="btn btn-default" @click="resetBadReaction(arr)">重置</a>
                    </div>
                    <div class="col-sm-1" style="line-height:2.5" v-if="index > 2">
                        <i class="fa fa-minus-square fa-lg" style="color:#f61055;cursor:pointer" @click="clickRemoveBadReaction($event, arr)"></i>
                    </div>
                </div>
                <!---不良反应结束-->
                <!--放疗-->
                <div class="form-group question-group caption">
                    <div class="col-sm-7 col-md-7">
                        <h5>放疗</h5>
                    </div>
                </div>
                <div class="form-group question-group">
                    <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">同步放疗</label>
                    <div class="col-sm-2" style="">
                        <div class="segmented-control" style="width:100%;border:1px solid #ccc">
                            <input type="radio" :value="true" v-model="isShowRadiation">
                            <input type="radio" :value="false" v-model="isShowRadiation">
                            <label :class="{active1: isShowRadiation}" @click="clickRadioLabel2(true)">是</label>
                            <label :class="{active1: !isShowRadiation}" @click="clickRadioLabel2(false)">否</label>
                        </div>
                    </div>
                </div>
                <div v-show="isShowRadiation">
                    <div class="form-group question-group">
                        <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">开始日期</label>
                        <div class="col-sm-3" style="">
                            <div :class="{'has-error has-feedback': iserror, 'has-feedback': !iserror}">
                                <input id="calendar-radiation" class="form-control controls" type="text" @click="showCalendar" v-model="xstartdate" placeholder="请输入日期" name='_date' :value="xstartdate">
                                <span :class="{'no-error fa fa-calendar-check-o fa-lg form-control-feedback': !iserror, 'glyphicon glyphicon-remove form-control-feedback': iserror}"></span>
                                <span class="help-block" v-show="iserror">日期已存在</span>
                                <calendar :show="xshow" :value="xstartdate" v-on:calendar-change-value="changeXStartdate" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                            </div>
                        </div>
                        <label for="inputEmail3" class="col-lg-1 col-sm-1 control-label question-label" style="padding-right:0;margin-left:20px;">部位</label>
                        <div class="col-sm-3" style="">
                            <div>
                                <select class="form-control" v-model="pickedXpart">
                          <option v-for="xpart in xparts" :value="xpart">{{xpart}}</option>
                        </select>
                            </div>
                        </div>
                        <div class="col-lg-1 col-sm-2" style="" v-if="pickedXpart == '其他'">
                            <div>
                                <input type="text" class="form-control" v-model="pickedOtherXpart">
                            </div>
                        </div>
                    </div>
                    <div class="form-group question-group">
                        <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label" style="">模式</label>
                        <div class="col-sm-3" style="">
                            <div>
                                <select class="form-control" v-model="pickedXtype">
                        <option v-for="xtype in xtypes" :value="xtype">{{xtype}}</option>
                      </select>
                            </div>
                        </div>
                        <label for="inputEmail3" class="col-lg-1 col-sm-1 control-label question-label" style="padding-right:0;margin-left:20px;">剂量</label>
                        <div class="col-sm-3" style="">
                            <div :class="form-control">
                                <input class="form-control controls" type="text" v-model="xdose">
                            </div>
                        </div>
                        <div class="col-sm-1 unit">
                            <span></span>
                        </div>

                    </div>
                    <div class="form-group question-group">
                        <label for="inputEmail3" class="col-lg-1 col-sm-2 control-label question-label">持续时间</label>
                        <div class="col-sm-3" style="">
                            <div :class="form-control">
                                <input class="form-control controls" type="text" v-model="xtimespan">
                            </div>
                        </div>
                        <div class="col-sm-1 unit">
                            <span>天</span>
                        </div>

                    </div>
                </div>
                <!--放疗结束-->

                <div class="form-group" style="margin-top:10px">
                    <div class="col-lg-6 col-lg-offset-1 col-sm-offset-2 col-sm-6" style="">
                        <button :disabled='iserror' type="submit" class="btn btn-success btn-save" @click.stop.prevent="save">保存</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="history">
            <div class='header'>
                历史记录
            </div>
            <div class='div-table'>
                <table class="table table-bordered">
                    <thead>
                        <tr style="background-color:#eee;">
                            <th>医院/时间/方案/性质/疗程</th>
                            <th>进展原因</th>
                            <th width="25%">具体用药</th>
                            <th>疗效</th>
                            <th>评价依据</th>
                            <th width="15%">不良反应</th>
                            <th>放疗</th>
                            <th>操作</th>
                        </tr>
                        <tbody>
                            <tr v-for="chemo in chemos">
                                <td>
                                    <p>化疗医院：{{chemo.hospital}}</p>
                                    <p>开始时间：{{chemo.startdate}}</p>
                                    <p>化疗方案：{{chemo.pkg_name}}</p>
                                    <p>化疗性质：{{chemo.type}}</p>
                                    <p>化疗疗程：{{chemo.stage}}</p>
                                </td>
                                <td>{{chemo.progress_reason}}</td>
                                <td class="mytd" v-html="formatePkgItems(chemo.pkg_items)"></td>
                                <td>{{chemo.effect_name}}</td>
                                <td>{{chemo.effect_content}}</td>
                                <td class="mytd" v-html="formteSideEffectItems(chemo.sideeffect_items)"></td>
                                <td class="mytd" v-html="formateXContent(chemo)"></td>
                                <td><a href="javascript:" @click="chemoModify(chemo)">修改</a><br/>
                                </br/><a href="javascript:" @click="chemoRemove(chemo)">删除</a></td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>
.div-table {
    padding: 0;
}

.header {
    margin-top: 20px;
    background-color: #F5F6FA;
    font-weight: bold;
    line-height: 1.4285;
    padding: 8px;
    border: 1px solid #ddd;
    border-bottom: 0;
}

.table th {
    font-weight: normal;
    border-bottom: 0;
}

.fa {
    padding: 10px;
    color: #008DB9;
}

.btn-save {
    width: 100px;
}

.caption {
    padding-top: 2px;
    padding-bottom: 2px;
    background-color: #F5F6FA;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-top: -1px;
}

.caption h5 {
    font-weight: 600;
}

.unit {
    padding: 0;
    line-height: 2.2;
}

#search-medicine-div {
    margin-left: 15px;
    margin-top: -15px;
    margin-bottom: 15px;
    padding: 0;
    border: 1px solid #ccc;
    border-top: 0;
    background: white;
    opacity: 0.7;
    width: 39.52667%;
}

.td-search {
    border-left: 0;
    border-right: 0;
    border-top: 0;
    border-bottom: 1px dashed #ccc;
}

.checkbox-inline {
    margin-left: 0;
    margin-right: 10px;
}

.inner-td {
    border-bottom: 1px dashed #ccc;
}

.question-label {
    padding-right:0;
}

/*td.mytd table {
    font-size:12px;
}

td.mytd table tr:first-of-type td, td.mytd table tr:first-of-type th {
    border-top: 0;
}*/

</style>
<script>
import api from '../../config/api.js'
import util from '../../lib/util.js'
import common from '../../lib/common.js'
export default {
    data: function() {
        return {
            chemoid: '',
            chemos: [],
            searchCheckedList: [], //选中的搜索结果
            isShowRadiation: false,
            isShowSearchMedicineDiv: false,
            searchlist: [],
            medicineMaps: {}, //方案和用药字典
            badreactions: {
                '发热': ['1级：38.0-39.0', '2级：>39.0-40.0', '3级：>40.0，未达24h', '4级：>40.0，超过24h', '5级：死亡'],
                '恶心': ['1级：食欲减退，饮食不变', '2级：经口进食减少，但无明显体重下降、脱水、营养不良', '3级：经口摄入热量或液量不足；需要鼻饲、TPN或住院治疗'],
                '呕吐': ['1级：24小时内1-2次呕吐（间隔5min以上）', '2级：24小时内3-5次呕吐', '3级：24小时内≥6次呕吐', '4级：危及生命的情况，需要紧急干预', '5级：死亡'],
                '腹泻': ['1级：每日便次较平日增加<4次，排出物轻度增加', '2级：每日较平日在增加4-6次，排出物中度增加', '3级：每日较平日增加≥7次，排出物显著增加；躯体生活自理量表评分下降', '4级：危及生命的情况；需要紧急干预', '5级：死亡'],
                '心悸': ['1级：无症状，无需干预', '2级：有症状，需医疗干预', '3级：严重，症状明显，需要医疗干预', '4级：危及生命的情况；需要紧急干预', '5级：死亡'],
                'Hb': ['1级：正常下降-100', '2级：100-80', '3级：<80需要输血', '4级：危及生命的情况，需要紧急干预', '5级：死亡'],
                'WBC': ['1级：正常下限-3.0', '2级: 3.0-2.0', '3级：2.0-1.0', '4级：<1.0'],
                'PLT': ['1级：正常下限-75', '2级：75-50', '3级：50-25', '4级：<25'],
                '肝功能': ['1级：1-1.5倍正常上限', '2级：1.5-3.0倍正常上限', '3级：3.0-6.0倍正常上限', '4级：>6.0倍正常上限'],
                '肾功能': ['1级：1-3倍正常上限', '2级：3-5倍正常上限', '3级：5-20倍正常上限', '4级：>20倍正常上限'],
                '中性粒细胞': ['1级：正常下线-1.5', '2级：1.5-1.0', '3级：1.0-0.5', '4级：<0.5'],
                '其他': [],
            },
            pickedPkgname: '',
            pickedOtherPkgname: '', //其他
            arr2: [ //不良反应循环数组
                ['', ''],
                ['', ''],
                ['', ''],
            ],
            stages: [
                '第一程',
                '第二程',
                '第三程',
                '第四程',
                '第五程',
                '第六程',
                '第七程',
                '第八程',
                '第九程',
                '第十程',
                '第十一程',
                '第十二程',
            ],
            pickedStage: '',
            pickedOtherStage: '', //其他化疗疗程
            types: {
                '新辅助': ['完全退缩', '部分退缩', '稳定', '进展'],
                '辅助': ['DFS', 'PD'],
                '晚期一线': ['CR', 'PR', 'SD', 'PD'],
                '晚期二线': ['CR', 'PR', 'SD', 'PD'],
                '晚期三线': ['CR', 'PR', 'SD', 'PD'],
                '晚期四线': ['CR', 'PR', 'SD', 'PD'],
                '晚期五线': ['CR', 'PR', 'SD', 'PD'],
                '靶向': ['CR', 'PR', 'SD', 'PD'],
                '其他': []
            },
            effectComment: '', //疗效评价
            pickedType: '', //选择的化疗性质
            pickedOtherType: '', //其他化疗性质
            medicines: [], //用药列表
            pkgnames: [], //方案
            pickedMedicines: {}, //药品各项显示
            xparts: [
                '脑',
                '肺',
                '骨',
                '纵膈',
                '腹部',
                '其他',
            ],
            pickedXpart: '',
            pickedOtherXpart: '', //其他部位
            xtypes: [
                '三维适行', '固定野调强放疗', '容积调强', '螺旋断层调强', '立体定向放疗'
            ],
            pickedXtype: '',
            xdose: '', //剂量
            xtimespan: '', //持续时间
            keyword: '', //搜索关键字
            according: '', //评价依据
            effects: [], //影响数组
            pickedEffect: '', //选中的影响

            ismodify: false,
            error: false,
            content: '',

            show: false,
            xshow: false,
            type: "date", //date datetime
            startdate: "", //化疗日期
            xstartdate: "", //放疗日期
            begin: "",
            x: 0,
            y: 0,
            range: false, //是否多选
            bsa: '',
            hospital: '',//化疗医院
            progress_reason: '',//进展原因
            lastChemoPickedType: '',//上次化疗性质
            lastChemoPickedPkgname: '',//上次化疗方案
            lastChemoPickedStage: '',//上次化疗疗程
        }
    },
    props: ['patientid', 'ename', 'action'],
    computed: {
        'patientid': function() {
            return this.$route.params.patientid;
        },
        'iserror': function() {
            return this.error && !this.ismodify;
        },
        date: function() {
            return this.$route.query.date;
        },
        isOtherPickedType: function() {
            return this.pickedType.split('')[0] == '其他'
        }
    },
    components: {
        'calendar': function(resolve) {
            require(['../../components/calendar.vue'], resolve);
        }
    },
    methods: {
        changeStartdate: function(value) {
            this.startdate = value;
        },
        changeXStartdate: function(value) {
            this.xstartdate = value;
        },
        formatePkgItems: function(pkgitems) {
            if (pkgitems == '') {
                return '';
            }
            // var html = '<table class="table table-bordered"><tr><td width="20%">药品名</td><td width="25%">实际用量</td><td width="20%">用药途径</td><td width="20%">用药时长</td><td>备注</td></tr>';
            var html = '<table class="table mytable">'
            $.each(pkgitems, function(index, pkgitem) {
                html += '<tr><td style="border-top:0;">' + pkgitem.name + '</td><td style="border-top:0;">' + pkgitem.method3 + '</td><td style="border-top:0;">' + pkgitem.pickedmethod4 + '</td><td style="border-top:0;">' + pkgitem.pickedtime + '</td><td style="border-top:0;">' + pkgitem.remark + '</td></tr>';
            })
            html += '</table>';
            return html;
        },
        formteSideEffectItems: function(sideeffect_items) {
            if (sideeffect_items == '') {
                return '';
            }
            // var html = '<table class="table table-bordered"><tr><td width="20%">名称</td><td width="80%">程度</td></tr>';
            var html = '<table class="table mytable">';
            $.each(sideeffect_items, function(index, sideeffect_item) {
                html += '<tr><td style="border-top:0;">' + sideeffect_item[0] + '</td><td style="border-top:0;">' + sideeffect_item[1] + '</td></tr>';
            })
            html += '</table>';
            return html;
        },
        formateXContent: function(medicine) {
            if (medicine.x_yes == 0 || medicine == '') {
                return '';
            }
            var html = '<table class="table mytable">';
            html += '<tr><th style="font-weight:normal;border-top:0;">开始日期</th><td style="border-top:0;">' + medicine.x_startdate + '</td></tr><tr><th style="font-weight:normal;border-top:0;">部位</th><td style="border-top:0;">' + medicine.x_part + '</td></tr>';
            html += '<tr><th style="font-weight:normal;border-top:0;">模式</th><td style="border-top:0;">' + medicine.x_type + '</td></tr><tr><th style="font-weight:normal;border-top:0;">剂量</th><td style="border-top:0;">' + medicine.x_dose + '</td></tr>';
            html += '<tr><th style="font-weight:normal;border-top:0;">持续时间</th><td style="border-top:0;">' + medicine.x_timespan + '天</td></tr>';
            html += '</table>';
            return html;
        },
        resetBadReaction: function(arr) {
            Vue.set(arr, 0, '')
            Vue.set(arr, 1, '')
        },
        closeSearchMedicineDiv: function() {
            this.isShowSearchMedicineDiv = false;
            this.searchlist = [];
        },
        addMedicine: function() {
            var that = this;
            $.each(that.searchCheckedList, function(index, one) {
                one._id= Math.round(Math.random() * 100000000)
                var obj = Object.assign({}, one);
                that.medicines.push(obj);
                // if (that.medicines.length < 1) {
                //     that.medicines.push(one);
                // } else if (!util.inArray2(that.medicines, 'name', one.name)) {
                //     that.medicines.push(one);
                // } else {
                //     console.log(one.name, '已经存在了')
                // }
            })
        },
        pkgnameChange: function() {
            if (!this.ismodify) {
                if (this.pickedPkgname != this.lastChemoPickedPkgname) {//方案和最近一次的方案不一样
                    this.pickedStage = this.stages[0];
                    if (this.lastChemoPickedType == '晚期一线') {
                        this.pickedType = '晚期二线';
                    } else if (this.lastChemoPickedType == '晚期二线') {
                        this.pickedType = '晚期三线';
                    } else if (this.lastChemoPickedType == '晚期三线') {
                        this.pickedType = '晚期四线';
                    } else if (this.lastChemoPickedType == '晚期四线') {
                        this.pickedType = '晚期五线';
                    } else if (this.lastChemoPickedType == '晚期五线') {
                        this.pickedType = '其他';
                    }

                // } else {
                //     var stageIndex = util.getArrayIndex(this.stages, this.lastChemoPickedStage);
                //     if (stageIndex < this.stages.length - 1) {
                //         stageIndex += 1;
                //     }
                //     this.pickedStage = this.stages[stageIndex];
                }
            }
            //////////
            if (this.medicineMaps.hasOwnProperty(this.pickedPkgname)) {
                this.medicines = this.medicineMaps[this.pickedPkgname];
            } else {
                this.medicines = [];
            }
        },
        methodChange: function(medicine) { //标准用法变化
            var i = 0;
            $.each(medicine.method, function(index, method) {
                if (medicine.pickedmethod == method) {
                    i = index;
                }
                medicine.pickedmethod2 = medicine.method2[i];
                medicine.method3 = medicine.pickedmethod2.replace('/m2','');
            });

        },
        getFormData: function() {
            var data = {};
            var pickedType = this.pickedType;
            if (this.pickedType == '其他') {
                pickedType += ' ' + this.pickedOtherType;
            }
            data.hospital = this.hospital;
            data.progress_reason = this.progress_reason;
            data.type = pickedType; //化疗性质
            data.stage = this.pickedStage; //化疗疗程
            data.startdate = this.startdate; //化疗开始时间
            var pickedPkgname = this.pickedPkgname;
            if (pickedPkgname == '其他') {
                pickedPkgname += ' ' + this.pickedOtherPkgname;
            }
            data.pkg_name = pickedPkgname; //化疗方案
            var pickedMedicines = [];
            $.each(this.medicines, function(index, medicine) {
                var obj = {};
                obj.name = medicine.name;
                obj.pickedmethod = medicine.pickedmethod;
                obj.pickedmethod2 = medicine.pickedmethod2;
                obj.method3 = medicine.method3;
                obj.pickedmethod4 = medicine.pickedmethod4;
                obj.pickedtime = medicine.pickedtime;
                obj.remark = medicine.remark;
                pickedMedicines.push(obj);
            });
            data.pkg_items = pickedMedicines; //具体用药
            data.effect_name = this.pickedEffect;
            data.effect_content = this.effectComment;
            data.sideeffect_items = this.arr2;
            data.x_yes = this.isShowRadiation ? 1 : 0;
            data.x_startdate = this.xstartdate;
            var pickedXpart = this.pickedXpart;
            if (this.pickedXpart == '其他') {
                pickedXpart += ' ' + this.pickedOtherXpart;
            }
            data.x_part = pickedXpart;
            data.x_type = this.pickedXtype;
            data.x_dose = this.xdose;
            data.x_timespan = this.xtimespan;

            return data;
        },
        showCalendar: function(e) {
            var that = this;
            that.x = e.target.offsetLeft;
            that.y = e.target.offsetTop + e.target.offsetHeight + 8;
            if (e.target.id == "calendar-chemo") {
                that.show = true;
            } else if (e.target.id == "calendar-radiation") {
                that.xshow = true;
            }
            var bindHide = function(event) {
                if (event.target == e.target) {
                    return;
                }
                event.stopPropagation();
                that.show = false;
                that.xshow = false;
                document.removeEventListener('click', bindHide, false);
                document.removeEventListener('touchstart', bindHide, false);
            };
            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
                document.addEventListener('touchstart', bindHide, false);
            }, 500);
        },
        'save': function(e) {
            var data = this.getFormData();
            data.patientid = this.patientid;
            data.chemoid = this.chemoid;
            if (this.ismodify) {
                data.chemoid = this.chemoid;
            }

            console.log(data);
            var that = this;
            var url = '';
            if (that.ismodify) {
                url = api.get('chemo.modify');
            } else {
                url = api.get('chemo.add');
            }
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: data,
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {
                    that.$emit('show-alert', d.errmsg);
                } else {
                    that.$emit('show-popup', '保存成功', function() {
                        document.location.reload();
                    })
                }
            })
        },
        fetchData: function(newdate) {
            var that = this;
            //获取
            $.ajax({
                url: api.get('chemo.list'),
                type: 'post',
                dataType: 'json',
                data: {
                    patientid: that.patientid,
                    // zhusu: 1
                }
            }).done(function(d) {
                that.chemos = d.data;
                that.initSomeData();
            })
        },
        initSomeData: function() {
            if (util.isArray(this.chemos) && this.chemos.length > 0) {
                var chemo = this.chemos[0];
                //化疗医院继承上次
                if (chemo.hospital != '') {
                    this.hospital = chemo.hospital;
                } else {
                    this.hospital = common.getHospital();
                }
                //化疗性质继承上次
                var str1 = chemo.type.split(' ');
                this.pickedType = str1[0];
                this.pickedOtherType = str1[1];
                //化疗方案和用药继承上次
                var str2 = chemo.pkg_name.split(' ');
                this.pickedPkgname = str2[0];
                this.pickedOtherPkgname = str2[1];
                ////这里的方法不是最好的，但是暂时没有想到更好的既考虑性能又兼顾逻辑的方法
                var that = this;
                var i = 0;
                var interval = window.setInterval(function(){
                    console.log('interval-------------');
                    if (i > 50) {
                        window.clearInterval(interval);
                    }
                    if (that.pkgnames.length > 0) {
                        if (that.medicineMaps[that.pickedPkgname] != undefined) {
                            that.medicines = that.medicineMaps[that.pickedPkgname]; //方案对应的药品
                        }

                        window.clearInterval(interval);
                    }
                    i++;
                }, 200);
                //化疗疗程继承上次++
                if (chemo.stage) {
                    var stageIndex = util.getArrayIndex(this.stages, chemo.stage);
                    if (stageIndex < this.stages.length - 1) {
                        stageIndex += 1;
                    }
                    this.pickedStage = this.stages[stageIndex];
                }

                //上次记录
                this.lastChemoPickedType = chemo.type;
                this.lastChemoPickedPkgname = chemo.pkg_name;
                this.lastChemoPickedStage = chemo.stage;

            } else {
                this.hospital = common.getHospital();
                //化疗方案和用药继承
                var i = 0;
                var that = this;
                var interval = window.setInterval(function(){
                    console.log('interval+++++++++');
                    if (i > 50) {
                        window.clearInterval(interval);
                    }
                    if (that.pkgnames.length > 0) {
                        that.pickedPkgname = that.pkgnames[0]; //默认选中第一个方案
                        that.medicines = that.medicineMaps[that.pickedPkgname]; //方案对应的药品
                        window.clearInterval(interval);
                    }
                    i ++;
                }, 200);
            }
        },
        clickAddBadReaction: function() {
            this.arr2.push(['', '']);
        },
        clickRemoveBadReaction: function(e, arr) {
            e.preventDefault();
            index = this.arr2.indexOf(arr);
            this.arr2.splice(index, 1)
        },
        clickAddMedicine: function() {
            var medicine = {};
            medicine._id = Math.round(Math.random() * 100000000);
            medicine.type = 'manual'
            medicine.name = '';
            medicine.pickedmethod = '';
            medicine.pickedmethod2 = '';
            medicine.method3 = '';
            medicine.pickedmethod4 = '';
            medicine.pickedtime = '';
            medicine.remark = '';
            this.medicines.push(medicine);

        },
        clickRemoveMedicine: function(medicine) {
             var index = this.medicines.indexOf(medicine);
             this.medicines.splice(index, 1)
        },
        clickSearch: function(e) {
            e.preventDefault();
            var that = this;
            if (this.keyword == '') {
                return false;
            }
            $.ajax({
                url: api.get('chemo.search'),
                type: 'post',
                dataType: 'json',
                data: {
                    keyword: that.keyword,
                    patientid: that.patientid,
                }
            }).done(function(d) {
                if (d.errno != 0 && d.errno != -10) {

                } else {
                    that.searchlist = [];
                    that.searchlist = d.data.list;
                    that.searchCheckedList = [];
                    that.isShowSearchMedicineDiv = true;
                    that.bsa = d.data.bsa;
                }
            });
        },
        clickRadioLabel: function(effect) {
            if (this.pickedEffect == effect) {
                this.pickedEffect = '';
            } else {
                this.pickedEffect = effect;
            }
        },
        clickRadioLabel2: function(val) {
            if (this.isShowRadiation != val) {
                this.isShowRadiation = val;
            }
        },
        typeChange: function() {
            this.pickedEffect = '';
        },
        doMouseenter: function(e) {
            var H = $('body');
            var w1 = $(window).width();
            H.addClass('hide-scroll');
            var w2 = $(window).width();
            H.removeClass('hide-scroll');
            H.addClass('hide-scroll fancybox-margin');
            $('#fancybox-tmp').remove();
            $("<style id='fancybox-tmp' type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
        },
        doMouseleave: function(e) {
            $('body').removeClass('hide-scroll fancybox-margin');
        },
        chemoRemove: function(chemo) {
            var that = this;
            this.$emit('show-prompt', '确定要删除该量表吗？', function() {
                $.ajax({
                    url: api.get('chemo.delete'),
                    type: 'post',
                    dataType: 'json',
                    data: {
                        chemoid: chemo.id
                    }
                }).done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                        self.$emit('show-alert', d.errmsg);
                    } else {
                        that.$emit('show-popup', '删除成功');
                    }
                    that.fetchData();
                });
            });
        },
        chemoModify: function(chemo1) { //修改
            var that = this;
            $.ajax({
                url: api.get('chemo.one'),
                type: 'post',
                dataType: 'json',
                data: {
                    chemoid: chemo1.id,
                },
            }).done(function(d) {
                var chemo = d.data;
                that.initModifyData(chemo);
                that.bsa = chemo.bsa;
            })
            window.scrollTo(0, 0);
        },
        initModifyData: function(chemo) {
            var that = this;
            that.ismodify = true;
            that.action = '修改';
            that.chemoid = chemo.id;
            var pickedMedicines = util.isArray(chemo.pkg_items) ? chemo.pkg_items : [];
            // if (chemo.pkg_items) {
            //     $.each(that.medicineMaps, function(index2, medicines) {
            //         $.each(medicines, function(index3, medicine) {
            //             $.each(pickedMedicines, function(index, pickedMedicine) {
            //                 pickedMedicine._id = Math.round(Math.random() * 100000000);
            //                 if (medicine.name == pickedMedicine.name) {
            //                     pickedMedicine.method = medicine.method;
            //                     pickedMedicine.method2 = medicine.method2;
            //                     // pickedMedicine.method3 = medicine.method3;
            //                     pickedMedicine.method4 = medicine.method4;
            //                     pickedMedicine.time = medicine.time;
            //                     // return false;
            //                 }
            //             });
            //         })
            //     })
            // }

            if (pickedMedicines.length > 1) {
                $.each(pickedMedicines, function(index, pickedMedicine) {
                    pickedMedicine._id = Math.round(Math.random() * 100000000);
                });
            }

            var str1 = chemo.type.split(' ');
            that.pickedType = str1[0];
            that.pickedOtherType = str1[1];
            that.pickedStage = chemo.stage;
            that.startdate = chemo.startdate;
            var str2 = chemo.pkg_name.split(' ');
            that.pickedPkgname = str2[0];
            that.pickedOtherPkgname = str2[1];
            that.medicines = pickedMedicines;
            that.pickedEffect = chemo.effect_name;
            that.effectComment = chemo.effect_content;

            if ($.isArray(chemo.sideeffect_items)) {
                that.arr2 = chemo.sideeffect_items;
            } else {
                that.arr2 = [
                    ['', ''],
                    ['', ''],
                    ['', '']
                ];
            }
            that.isShowRadiation = chemo.x_yes == 1 ? true : false;
            that.xstartdate = chemo.x_startdate;
            var str3 = chemo.x_part.split(' ');
            that.pickedXpart = str3[0];
            that.pickedOtherXpart = str3[1];
            that.pickedXtype = chemo.x_type;
            that.xdose = chemo.x_dose;
            that.xtimespan = chemo.x_timespan;
            that.hospital = chemo.hospital;
            that.progress_reason = chemo.progress_reason;
        }
    },
    filters: {

    },
    watch: {

    },
    mounted: function() {
        this.$nextTick(function() {
            var that = this;
            var diseaseid = common.getDiseaseId();
            that.fetchData();
            $.ajax({
                url: api.get('chemo.medicineuse'),
                type: 'post',
                dataType: 'json',
                data: {
                    patientid: that.patientid,
                    diseaseid: diseaseid,
                },
            }).done(function(d) {
                that.medicineMaps = d.data.list;
                that.pkgnames = d.data.methods;
                $.each(that.medicineMaps, function(index, list) {
                    $.each(list, function(index1, one){
                        one._id = Math.round(Math.random() * 100000000);
                        console.log('one-id-----', one._id)
                    })

                })

                // if (that.pkgnames.length > 0) {
                //     that.pickedPkgname = that.pkgnames[0]; //默认选中第一个方案
                //     that.medicines = that.medicineMaps[that.pickedPkgname]; //方案对应的药品
                // }
                that.bsa = d.data.bsa;
            })
        })
    }
}
</script>
