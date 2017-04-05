<template>
    <div class="revisitrecordlist">
        <div class="revisitrecordlist">
            <div v-for="(item, index) in items" style="text-align: left; border-radius: 4px; margin-bottom: 10px; padding: 10px 10px 10px 0px; box-sizing: border-box; border: 1px solid #1996ea" @click="openOrClose(item, index)">
                <div>
                    <span style="color: #fff; padding: 5px 15px 5px 5px; box-sizing: border-box; border-top-right-radius: 18px; border-bottom-right-radius: 18px; display: inline-block; background-color: #1996ea">{{item.typestr}}</span>
                    <span style="float: right;color: #ccc; line-height: 2.2">{{item.thedate}}</span>
                </div>
                <div style="padding: 10px" v-if="item.typestr == '治疗'">
                    <span>{{item.hospital}}</span>
                </div>
                <div v-if="item.typestr == '治疗' && item.show == true" style="padding: 10px; margin-left: 10px;border-top: 1px solid #ccc">
                    <table>
                        <tr>
                            <th>医院/时间/方案/性质/疗程</th>
                        </tr>
                        <tr>
                            <td>
                                化疗医院：{{item.hospital}}<br/>
                                开始时间：{{item.startdate}}<br/>
                                化疗方案：{{item.pkg_name}}<br/>
                                化疗性质：{{item.type}}<br/>
                                化疗疗程：{{item.stage}}
                            </td>
                        </tr>
                        <tr>
                            <th>进展原因</th>
                        </tr>
                        <tr>
                            <td>{{item.progress_reason}}</td>
                        </tr>
                        <tr>
                            <th>具体用药</th>
                        </tr>
                        <tr>
                            <td v-html="getPkgItems(item.pkg_items)"></td>
                        </tr>
                        <tr>
                            <th>疗效</th>
                        </tr>
                        <tr>
                            <td>{{item.effect_name}}</td>
                        </tr>
                        <tr>
                            <th>评价依据</th>
                        </tr>
                        <tr>
                            <td>{{item.effect_content}}</td>
                        </tr>
                        <tr>
                            <th>不良反应</th>
                        </tr>
                        <tr>
                            <td v-html="getSideEffect_items(item.sideeffect_items)"></td>
                        </tr>
                        <tr>
                            <th>放疗</th>
                        </tr>
                        <tr>
                            <td v-html="getChemosLog(item)"></td>
                        </tr>

                    </table>
                </div>
                <div style="padding: 10px" v-if="item.typestr != '治疗'" >
                    <span>{{item.checkuptpltitle}}</span>
                </div>
                <div v-if="item.typestr != '治疗' && item.show==true" style="padding: 10px; margin-left: 10px;border-top: 1px solid #ccc">
                    <div v-for="checkup in item.checkup">
                        <table>
                            <tr>
                                <th colspan="2">{{checkup.checkuptpl.title}} {{checkup.check_date}} {{checkup.hospitalstr}}</th>
                            </tr>
                            <tr v-for="answer in checkup.xanswersheet.answers">
                                <td>{{answer.xquestionname}}</td>
                                <td>{{answer.content}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div style="clear: both"></div>
            <div class="noData" v-if="items.length == 0">
                <span>记录为空</span>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    import common from '../../lib/common.js';
    module.exports = {
        data: function() {
            return {
                openid: '',
                patientid: '',

                items: [],
                revisitrecords: [],
                chemos: [],
            }
        },
        created: function() {
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.patientid = this.$route.query.patientid;
            var url = api.get('revisitrecord.list');
            var params = {
                openid: this.openid,
                patientid: this.patientid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    self.revisitrecords = response.data.revisitrecords;
                    // console.log(self.revisitrecords);
                    self.chemos = response.data.chemos;
                    // console.log(self.chemos);
                    self.revisitrecords.map(function(revisitrecord){
                        revisitrecord.show = false;
                        revisitrecord.checkuptpltitle = revisitrecord.checkup.map(function(checkup){
                            return checkup.checkuptpl.title
                        }).join(' ');
                    });

                    self.chemos.map(function(one){
                        one.thedate = one.startdate;
                        one.show = false;
                        one.typestr = '治疗';
                    })

                    self.items = self.revisitrecords.concat(self.chemos);
                    self.items.sort(function(x, y){
                        if (x.thedate > y.thedate) {
                            return -1;
                        }else if (x.thedate < y.thedate) {
                            return 1;
                        }else {
                            return 0;
                        }
                    })
                    console.log('55555',self.items);
                }
            })
        },
        methods:{
            getPkgItems: function(pkg_items) {
                var result = '';
                pkg_items.map(function(pkg_item){
                    result += pkg_item.name + " " + pkg_item.method3 + " " + pkg_item.pickedmethod4 + " " + pkg_item.pickedtime + " " + pkg_item.remark + "<br/>";
                })
                return result;
            },
            getSideEffect_items: function(sideeffect_items) {
                var result = '';
                sideeffect_items.map(function(sideeffect_item){
                    result += sideeffect_item[0] + ' ' + sideeffect_item[1] + '<br/>';
                })
                return result;
            },
            getChemosLog: function(item) {
                var result = '';
                result = "开始日期 " + item.x_startdate + "<br/>" + '部位 ' + item.x_part + "<br/>" + "模式 " + item.x_type + "剂量 " + item.x_dose + "<br/>" + "持续时间 " + item.x_timespan;
                return result;
            },
            openOrClose: function(item, index){
                console.log(item.show);
                item.show = !item.show;
                console.log(item.show);
                // this.items.$set(item, index);
                this.$set(this.items, index, item);
            }
        },
        filters: {
        },
        mounted: function() {
            document.title = "数据查询";
        }
    }
</script>
<style scoped>
    .xanswer-item {
        text-align: left;
        padding: 5px 10px;
    }
    .xanswer-question {
        padding: 5px;
    }
    .xanswer-answer {
        padding: 5px;
        background-color: #eee;
    }
    .noData {
        position: absolute;
        width: 100%;
        top: 40%;
    }
</style>