<template>
      <div class="container-fluid content">
        <!-- <visit-header :patientname='patientname' :patientid='patientid' active='addvist' class="collapse"></visit-header> -->
        <breadcrumb pagetitle="生存率">
            <div slot="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
        <div class="row">
            <div class="col-sm-12">
                <div class="panel panel-default">
                      <div class="panel-heading" style="padding:2px 10px 3px 10px">
                          <div style="float:left;line-height:2.5">不同方案的缓解率比较</div>
                          <div style="float:right">
                              <el-select v-model="remission" placeholder="" @change="remissionChange">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="肺癌" value="肺癌"></el-option>
                                <el-option label="胃癌" value="胃癌"></el-option>
                                <el-option label="癌症" value="癌症"></el-option>
                              </el-select>
                          </div>
                          <div class="clearfix"></div>
                      </div>
                      <div class="panel-body" id="remission" style="height:400px">
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
            remission: '全部',
            remissionChart: ''
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        remissionChange: function(val) {
            let series = [
                {
                    name: '总缓解率',
                    type: 'line',
                    data: [33, 22, 44, 70, 50, 20, 8, 12]
                },
                {
                    name: '完全缓解率',
                    type: 'bar',
                    data: [80, 70, 50, 80, 70, 20, 8, 12]
                },
                {
                    name: '部分缓解率',
                    type: 'bar',
                    data: [20, 8, 12, 80, 70, 50, 80, 70]
                }
            ]
            this.remissionChart.setOption({
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
                    that.initRemission()
                }
            })
        },
        initRemission: function(data) {
            let domMain = document.getElementById('remission')
            this.remissionChart = echarts.init(domMain, 'essos')
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
                    data: ['总缓解率', '完全缓解率', '部分缓解率'],
                    selected: {
                        '全部': false
                    }
                },
                xAxis: {
                    data: ["IP", "TP", "EP", "PF", "FCR", "吉西他滨", "长春瑞滨+顺铂", "多烯紫杉醇+卡铂"]
                },
                yAxis: {},
                series : [
                    {
                        name: '总缓解率',
                        type: 'line',
                        data: [80, 70, 50, 80, 70, 20, 8, 12]
                    },
                    {
                        name: '完全缓解率',
                        type: 'bar',
                        data: [20, 8, 12, 80, 70, 50, 80, 70]
                    },
                    {
                        name: '部分缓解率',
                        type: 'bar',
                        data: [33, 22, 44, 70, 50, 20, 8, 12]
                    }
                ]
            }

            this.remissionChart.setOption(option)
        },
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
