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

export default {
    data: function() {
        return {
            ageOs: '全部',
            genderOs: '全部',
            ageOschart: '',
            genderOsChart: ''
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        genderOsChange: function(val) {
            let series = [
                {
                    name: '发病到死亡',
                    type: 'bar',
                    data: [77, 44]
                },
                {
                    name: '诊断到死亡',
                    type: 'bar',
                    data: [56, 38]
                },
                {
                    name: '治疗到死亡',
                    type: 'bar',
                    data: [33, 22]
                },
            ]
            this.genderOsChart.setOption({
                series: series
            })
        },
        ageOsChange: function(val) {
            let series = [
                {
                    name: '发病到死亡',
                    type: 'bar',
                    data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
                    smooth: true
                },
                {
                    name: '诊断到死亡',
                    type: 'bar',
                    data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
                    smooth: true
                },
                {
                    name: '治疗到死亡',
                    type: 'bar',
                    data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
                    smooth: true
                }
            ]
            this.ageOsChart.setOption({
                series: series
            })
        },
        initAllCharts: function() {
            var that = this
            api.http({
                url: 'statistic.totalcnt',
                data: {},
                successCallback: function(d) {
                    let data = d.data
                    that.initAgeOs()
                    that.initGenderOs()
                }
            })
        },
        initAgeOs: function(data) {
            let domMain = document.getElementById('age-os')
            this.ageOsChart = echarts.init(domMain)
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
                    data: ['发病到死亡', '诊断到死亡', '治疗到死亡'],
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

            this.ageOsChart.setOption(option)
        },
        initGenderOs: function(data) {
            let domMain = document.getElementById('gender-os')
            this.genderOsChart = echarts.init(domMain)
            let option = {
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis',
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left',
                    data: ['发病到死亡', '诊断到死亡', '治疗到死亡'],
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
