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
                        <div class="panel-heading" style="padding:2px 10px 3px 10px">
                            <div style="float:left;line-height:2.5">不同年龄OS比较</div>
                            <div style="float:right">
                                <el-select v-model="ageOs" placeholder="" @change="ageOsChange">
                                  <el-option label="全部" value="全部"></el-option>
                                  <el-option label="肺癌" value="肺癌"></el-option>
                                  <el-option label="胃癌" value="胃癌"></el-option>
                                  <el-option label="癌症" value="癌症"></el-option>
                                </el-select>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="panel-body" id="age-os" style="height:300px;">
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="panel panel-default">
                          <div class="panel-heading" style="padding:2px 10px 3px 10px">
                              <div style="float:left;line-height:2.5">不同性别OS比较</div>
                              <div style="float:right">
                                  <el-select v-model="genderOs" placeholder="" @change="genderOsChange">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option label="肺癌" value="肺癌"></el-option>
                                    <el-option label="胃癌" value="胃癌"></el-option>
                                    <el-option label="癌症" value="癌症"></el-option>
                                  </el-select>
                              </div>
                              <div class="clearfix"></div>
                          </div>
                          <div class="panel-body" id="gender-os" style="height:300px;">
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
            ageOs: '全部',
            ageOsData: '',
            genderOs: '全部',
            genderOsData: '',

            ageOschart: '',
            genderOsChart: ''
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        genderOsChange: function(val) {
            this.genderOs = val;
            this.initGenderOs(this.genderOsData);
        },
        ageOsChange: function(val) {
            this.ageOs = val;
            this.initAgeOs(this.ageOsData);
        },
        initAllCharts: function() {
            var that = this
            api.http({
                url: 'statistic.os',
                data: {},
                successCallback: function(d) {
                    let data = d.data
                    that.ageOsData = data['age-OS'];
                    that.genderOsData = data['sex-OS'];
                    that.initAgeOs(that.ageOsData);
                    that.initGenderOs(that.genderOsData);
                }
            })
        },
        initAgeOs: function(ageOsData) {
            let domMain = document.getElementById('age-os')
            this.ageOsChart = echarts.init(domMain, 'essos')
            let option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis',
                    // formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data: ['诊断到死亡', '发病到死亡', '治疗到死亡'],
                    selected: {
                        '全部': false
                    }
                },
                xAxis: {
                    data: ["10-20","21-30","31-40","41-50","51-60","61-70","71-80", "80+"]
                },
                yAxis: {},
                series : [
                    {
                        name: '发病到死亡',
                        type: 'bar',
                        data: [80, 70, 60, 50, 40, 30, 20, 10]
                    },
                    {
                        name: '诊断到死亡',
                        type: 'bar',
                        data: [70, 60, 50, 40, 30, 20, 15, 5]
                    },
                    {
                        name: '治疗到死亡',
                        type: 'bar',
                        data: [60, 50, 40, 30, 20, 15, 10, 2]
                    }
                ]
            }

            var optionData = ageOsData[this.ageOs]
            option.xAxis.data = Object.keys(optionData);
            let i = 0;
            option.series = option.legend.data.map(function(one){
                let obj = {};
                obj.name = one;
                obj.type = 'bar';
                obj.data = Object.keys(optionData).map(function(key){
                    /*更准确*/
                    // if (one == '发病到死亡') {
                    //     return optionData[key]['发病-死亡'];
                    // }else if (one == '诊断到死亡') {
                    //     return optionData[key]['诊断-死亡'];
                    // }else {
                    //     return optionData[key]['治疗-死亡'];
                    // }
                    /* 如下写法需要optin.legend.data和数据一一对应*/
                    let one1 = optionData[key][Object.keys(optionData[key])[i]];
                    return one1;
                })
                i++;
                return obj;
            })
            this.ageOsChart.setOption(option)
        },
        initGenderOs: function(genderOsData) {
            let domMain = document.getElementById('gender-os')
            this.genderOsChart = echarts.init(domMain, 'essos')
            let option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data: ['诊断到死亡', '发病到死亡', '治疗到死亡'],
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
                        name: '发病到死亡',
                        type: 'bar',
                        data: [80, 50]
                    },
                    {
                        name: '诊断到死亡',
                        type: 'bar',
                        data: [70, 40]
                    },
                    {
                        name: '治疗到死亡',
                        type: 'bar',
                        data: [55, 44]
                    },
                ]
            }
            var optionData = genderOsData[this.genderOs];
            console.log('initGenderOs',optionData);
            option.xAxis.data = Object.keys(optionData);
            let i = 0;
            option.series = option.legend.data.map(function(one){
                console.log('one',one);
                let obj = {};
                obj.name = one;
                obj.type = 'bar';
                obj.data = Object.keys(optionData).map(function(key){
                    /*精确方式*/
                    // if (one == '发病到死亡') {
                    //     return optionData[key]['发病-死亡'];
                    // }else if (one == '诊断到死亡') {
                    //     return optionData[key]['诊断-死亡'];
                    // }else {
                    //     return optionData[key]['治疗-死亡'];
                    // }
                    /* 此种返回数据的方法要求接口数据和option.legend.data顺序一致*/
                    let one1 = optionData[key][Object.keys(optionData[key])[i]];
                    return one1;
                })
                i++;
                return obj;
            })
            this.genderOsChart.setOption(option)
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
    }
}
</script>
