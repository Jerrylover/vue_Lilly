<template>
      <div class="container-fluid content">
        <!-- <visit-header :patientname='patientname' :patientid='patientid' active='addvist' class="collapse"></visit-header> -->
            <breadcrumb pagetitle="生存率">
                <div slot="other-content">
                </div>
            </breadcrumb>
            <div class="page-content">
                <div class="row">
                <div class="col-sm-6">
                    <div class="panel panel-default">
                          <div class="panel-heading" style="padding:10px 10px">
                              不同疾病生存率比较
                          </div>
                          <div class="panel-body" id="disease-survival" style="height:500px;">
                          </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="panel panel-default">
                          <div class="panel-heading" style="padding:2px 10px 3px 10px">
                              <div style="float:left;line-height:2.5">按性别分布</div>
                              <div style="float:right">
                                  <el-select v-model="genderDisease" placeholder="" @change="genderDiseaseChange">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option label="肺癌" value="肺癌"></el-option>
                                    <el-option label="胃癌" value="胃癌"></el-option>
                                    <el-option label="癌症" value="癌症"></el-option>
                                  </el-select>
                              </div>
                              <div class="clearfix"></div>
                          </div>
                          <div class="panel-body" id="gender-survival" style="height:500px;">
                          </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="panel panel-default">
                          <div class="panel-heading" style="padding:2px 10px 3px 10px">
                              <div style="float:left;line-height:2.5">按年龄分布</div>
                              <div style="float:right">
                                  <el-select v-model="ageDisease" placeholder="" @change="ageDiseaseChange">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option label="肺癌" value="肺癌"></el-option>
                                    <el-option label="胃癌" value="胃癌"></el-option>
                                    <el-option label="癌症" value="癌症"></el-option>
                                  </el-select>
                              </div>
                              <div class="clearfix"></div>
                          </div>
                          <div class="panel-body" id="age-survival" style="height:400px">
                          </div>
                    </div>
                </div>
            </div>
            </div>
</div>
</template>
<style scoped>
</style>
<script>
import api from '../../config/api.js'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import '../../vendor/echart/theme/essos.js'

export default {
    data: function() {
        return {
            genderDisease: '全部',
            ageDisease: '全部',

            age_rent: {},
            disease_rent: {},
            sex_rent: {},

            diseaseSurvivalChart: '',
            genderSurvivalChart: '',
            ageSurvivalChart: '',
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        genderDiseaseChange: function(val) {
            this.genderDisease = val;
            this.initGenderSurvival(this.sex_rent);
        },
        ageDiseaseChange: function(val) {
            this.ageDisease = val;
            this.initAgeSurvival(this.age_rent);
        },
        initAllCharts: function() {
            var that = this
            api.http({
                url: 'statistic.survival',
                data: {},
                successCallback: function(d) {
                    let data = d.data
                    that.sex_rent = data.sex_rent;
                    that.disease_rent = data.disease_rent;
                    that.age_rent = data.age_rent;
                    that.initDiseaseSurvival(that.disease_rent)
                    that.initGenderSurvival(that.sex_rent)
                    that.initAgeSurvival(that.age_rent)
                }
            })
        },
        initDiseaseSurvival: function(disease_rent) {
            var that = this
            let domMain = document.getElementById('disease-survival')
            this.diseaseSurvivalChart = echarts.init(domMain, 'essos')
            let option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: function(param) {
                        return param.name + '<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + param.color + '"></span>'+ param.seriesName + ' : '+ param.data+'%'
                    }
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data: ['一年', '两年', '三年', '四年', '五年'],
                    selected: {
                        '全部': false
                    }
                },
                xAxis: {
                    name: '疾病',
                    type: 'category',
                    data: ['全部', '癌症', '肺癌', '胃癌']//todo
                },
                yAxis: [
                    {
                        name: '存活率',
                        type: 'value',
                        axisLabel: {
                            show: true,
                            interval: 'auto',
                            formatter: "{value} %",
                            rotate: 25,
                        }
                    }
                ],
                series : [
                    {
                        name: '一年',
                        type: 'bar',
                        data: [80, 70, 50]
                    }
                ]
            }
            delete disease_rent['全部']
            console.log('disease_rent',disease_rent);
            option.xAxis.data = Object.keys(disease_rent)
            let i = 0
            option.series = option.legend.data.map(function(one) {
                i++;
                let obj = {}
                obj.name = one
                obj.type = 'bar'
                obj.data = Object.keys(disease_rent).map(function(key) {
                    let one1 = disease_rent[key]
                    return one1[i] - ''
                })
                return obj
            })
            that.diseaseSurvivalChart.setOption(option)
        },
        initGenderSurvival: function(sex_rent) {
            let domMain = document.getElementById('gender-survival')
            this.genderSurvivalChart = echarts.init(domMain, 'essos')
            let option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: ""
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data: ['一年', '两年', '三年', '四年', '五年'],
                    selected: {
                        '全部': false
                    }
                },
                xAxis: {
                    data: ["男性", "女性"]
                },
                yAxis: {},
                series : [
                    {
                        name: '一年',
                        type: 'bar',
                        data: [80, 70]
                    },
                    {
                        name: '两年',
                        type: 'bar',
                        data: [20, 8]
                    },
                    {
                        name: '三年',
                        type: 'bar',
                        data: [55, 33]
                    },
                    {
                        name: '四年',
                        type: 'bar',
                        data: [20, 8]
                    },
                    {
                        name: '五年',
                        type: 'bar',
                        data: [2, 1]
                    }
                ]
            }
            var optionData = sex_rent[this.genderDisease];
            option.xAxis.data = Object.keys(optionData);
            let i = 0;
            option.series = option.legend.data.map(function(one){
                i++;
                let obj = {};
                obj.name = one;
                obj.type = 'bar';
                obj.data = Object.keys(optionData).map(function(key){
                    let one1 = optionData[key];
                    return one1[i];
                })
                return obj;
            })
            this.genderSurvivalChart.setOption(option)
        },
        initAgeSurvival: function(age_rent) {
            let domMain = document.getElementById('age-survival')
            this.ageSurvivalChart = echarts.init(domMain, 'essos')
            let option = {
                title: {
                    text: '',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data:['一年', '两年', '三年', '四年', '五年'],
                    selected: {
                        '全部': false
                    }
                },
                xAxis: {
                    // data: ["10-20","21-30","31-40","41-50","51-60","61-70","71-80", "80+"]
                },
                yAxis: {},
                series: [
                    {
                        name: '一年',
                        type: 'line',
                        data: [55, 45, 33, 40, 22, 18, 11, 5],
                        smooth: true
                    },
                    {
                        name: '两年',
                        type: 'line',
                        data: [45, 35, 26, 22, 17, 17, 10, 4],
                        smooth: true
                    },
                    {
                        name: '三年',
                        type: 'line',
                        data: [35, 25, 20, 11, 15, 10,7, 3],
                        smooth: true
                    },
                    {
                        name: '四年',
                        type: 'line',
                        data: [25, 15, 12, 13, 10, 8, 6, 2],
                        smooth: true
                    },
                    {
                        name: '五年',
                        type: 'line',
                        data: [15, 5, 2, 33, 8, 5, 1, 0],
                        smooth: true
                    },
                ]
            }
            var optionData = age_rent[this.ageDisease];
            option.xAxis.data = Object.keys(optionData);
            let i = 0;
            option.series = option.legend.data.map(function(one){
                i++;
                var obj = {};
                obj.name = one;
                obj.type = 'line';
                obj.data = Object.keys(optionData).map(function(key){
                    let one1 = optionData[key][i];
                    return one1;
                })
                return obj;
            })
            this.ageSurvivalChart.setOption(option)
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            var that = this
            $(function() {
                that.initAllCharts()
            })

        })
    },
    created: function() {
        Bus.$emit('statistic-patient-tab-active', 'total')
    }
}
</script>
