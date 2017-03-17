<template>
<div class="page-content">
    <div class="row">
    <div class="col-sm-6">
        <div class="panel panel-default">
              <div class="panel-heading" style="padding:10px 10px">
                  按疾病分布
              </div>
              <div class="panel-body" id="disease-patient" style="height:300px;">
              </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-default">
              <div class="panel-heading" style="padding:10px 10px">
                  按性别分布
              </div>
              <div class="panel-body" id="gender-patient" style="height:300px">
              </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <div class="panel panel-default">
              <div class="panel-heading" style="padding:10px 10px">
                  按年龄分布
              </div>
              <div class="panel-body" id="age-patient" style="height:400px;">
              </div>
        </div>
    </div>
</div>
</div>
</template>
<style scoped>
</style>
<script>
import api from '../../../config/api.js'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import '../../../vendor/echart/theme/essos.js'

export default {
    data: function() {
        return {

        }
    },
    methods: {
        initAllCharts: function() {
            var that = this
            api.http({
                url: 'statistic.totalcnt',
                data: {},
                successCallback: function(d) {
                    let data = d.data
                    that.initDiseasePatient(data['disease_all_cnt'])
                    that.initGenderPatient(data['disease_sex_cnt'])
                    that.initAgePatient(data['disease_age_cnt'])
                }
            })
        },
        initDiseasePatient: function(data) {
            delete data['全部']
            var that = this
            let domMain = document.getElementById('disease-patient')
            let myChart = echarts.init(domMain, 'essos')
            let option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['肺癌','胃癌','其他癌症']
                },
                series : [
                    {
                        name: '',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'肺癌'},
                            {value:310, name:'胃癌'},
                            {value:234, name:'其他癌症'},
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            option.legend.data = Object.keys(data)
            option.series[0].data = []
            option.series[0].data = Object.keys(data).map(function(key) {
                var obj = {}
                obj.name = key
                obj.value = data[key] - ''
                return obj
            })

            myChart.setOption(option)
        },
        initGenderPatient: function(data) {
            let domMain = document.getElementById('gender-patient')
            let myChart = echarts.init(domMain, 'essos')
            let option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data: [],
                    selected: {
                        '全部': false
                    }
                },
                xAxis: {
                    data: ["男性", "女性", "未知"]
                },
                yAxis: {},
                series : [
                    {
                        name: '',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            option.legend.data = Object.keys(data)
            option.series = []
            option.xAxis.data = []
            var i = 0
            Object.keys(data).forEach(function(key) {
                if (i == 0) {
                    option.xAxis.data = Object.keys(data[key])
                }
                i++
            })
            option.series = Object.keys(data).map(function(key) {
                let one = data[key]
                let obj = {}
                obj.name = key
                obj.type = 'bar'
                let data1 =  Object.keys(one).map(function(key1) {
                    return one[key1]
                })
                obj.data = data1
                return obj
            })
            myChart.setOption(option)
        },
        initAgePatient: function(data) {
            // delete data['全部']
            let domMain = document.getElementById('age-patient')
            let myChart = echarts.init(domMain, 'essos')
            let option = {
                title: {
                    text: '按年龄分布',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data:[],
                    selected: {
                        // '全部': false
                    }
                },
                xAxis: {
                    data: ["10-20","21-30","31-40","41-50","51-60","61-70","71-80", "80+"]
                },
                yAxis: {},
                series: [
                    {
                        name: '肺癌',
                        type: 'bar',
                        data: [5, 13, 16, 40, 35, 20, 49]
                    }
                ]
            }
            option.legend.data = Object.keys(data)
            option.series = []
            option.series = Object.keys(data).map(function(key) {
                let one = data[key]
                let arr = {}
                arr.name = key
                if (key == '全部') {
                    arr.type = 'line'
                } else {
                    arr.type = 'bar'
                }
                let data1 =  Object.keys(one).map(function(key1) {
                    return one[key1]
                })
                arr.data = data1
                return arr
            })
            myChart.setOption(option)
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
