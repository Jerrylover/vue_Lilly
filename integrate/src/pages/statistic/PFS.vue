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
                              <div style="float:left;line-height:2.5">不同方案PFS比较</div>
                              <div style="float:right">
                                  <el-select v-model="pfsDisease" placeholder="" @change="pfsDiseaseChange">
                                    <el-option label="全部" value="全部"></el-option>
                                    <el-option label="肺癌" value="肺癌"></el-option>
                                    <el-option label="胃癌" value="胃癌"></el-option>
                                    <el-option label="癌症" value="癌症"></el-option>
                                  </el-select>
                              </div>
                              <div class="clearfix"></div>
                          </div>
                          <div class="panel-body" id="pfs" style="height:1000px">
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
            pfsDisease: '全部',
            pfsChart: '',
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        pfsDiseaseChange: function(val) {
            let series = [
                {
                    name: '男性',
                    type: 'bar',
                    data: [29, 70, 50, 14, 22, 18, 45, 90, 8, 18, 45, 66, 77, 22, 34, 88]
                },
                {
                    name: '女性',
                    type: 'bar',
                    data: [88, 30, 40, 24, 62, 15, 25, 50, 12, 28, 54, 23, 56, 19, 44, 98]
                },
                {
                    name: '全部',
                    type: 'bar',
                    data: [57, 100, 90, 58, 84, 33, 30, 160, 20, 48, 124, 53, 46, 39, 74, 180]
                },
            ]
            this.pfsChart.setOption({
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
                    that.initPFS()
                }
            })
        },
        initPFS: function(data) {
            let domMain = document.getElementById('pfs')
            this.pfsChart = echarts.init(domMain)
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
                    data: ['全部', '男性', '女性'],
                    selected: {
                        '男性': false,
                        '女性': false,
                    }
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                xAxis: [
                    {
                        type: 'value',
                        // boundaryGap: [0, '100%'],
                        position: 'top'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: ['TP', 'IP', 'EP', 'PF', 'FCR', '吉西他滨', '长春瑞滨+顺铂', '多烯紫杉醇+卡铂', 'TOX', 'TSOX', 'FOLFOX6', 'SOX', 'DCF', 'IT', '培美曲塞+顺（卡）铂', '吉西他滨+顺（卡）铂']
                    }
                ],
                series : [
                    {
                        name: '男性',
                        type: 'bar',
                        data: [69, 70, 50, 34, 22, 18, 25, 90, 8, 18, 45, 66, 77, 22, 34, 88]
                    },
                    {
                        name: '女性',
                        type: 'bar',
                        data: [28, 30, 40, 54, 62, 15, 35, 70, 12, 28, 54, 33, 56, 19, 44, 98]
                    },
                    {
                        name: '全部',
                        type: 'bar',
                        data: [97, 100, 90, 88, 84, 33, 60, 160, 20, 48, 74, 53, 66, 39, 74, 180]
                    },
                ]
            }

            this.pfsChart.setOption(option)
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
