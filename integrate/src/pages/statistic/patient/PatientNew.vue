<template>
<div class="page-content">
    <div class="row col-sm-12 new-patient-title">
        <div class="col-sm-4 one">
            <div style="margin-top:30px">
                <p>昨天新增</p>
                <p>{{yesterdayCnt}}</p>
            </div>
        </div>
        <div class="col-sm-4 two">
            <div style="margin-top:30px">
                <p>最近7天新增</p>
                <p>{{weekCnt}}</p>
            </div>
        </div>
        <div class="col-sm-4 three">
            <div style="margin-top:30px">
                <p>最近30天新增</p>
                <p>{{monthCnt}}</p>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="row mg-t-20 col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading" style="padding:2px 10px">
              <div style="float:left;line-height:2.5">患者新增</div>
              <div style="float:right">
                    <el-date-picker
                          v-model="date"
                          type="daterange"
                          align="right"
                          placeholder="选择日期范围"
                          :picker-options="pickerOptions2">
                        </el-date-picker>
              </div>
              <div class="clearfix"></div>
          </div>
          <div class="panel-body" id="new-patient-line" style="height:400px">
          </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.new-patient-title {
    font-size:18px;
    color:#fff;
    /*line-height:100px;*/
    text-align: center;
}
.new-patient-title .one {
    height:100px;
    background-color: #F7BA2A;
}
.new-patient-title .two {
    height:100px;
    background-color: #20A0FF;
}
.new-patient-title .three {
    height:100px;
    background-color: #13CE66;
}
</style>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import api from '../../../config/api.js'

export default {
    data: function() {
        return {
            activeName: '',
            date: '',
            yesterdayCnt: '',
            weekCnt: '',
            monthCnt: '',
            pickerOptions2: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            }
        }
    },
    methods: {
        initNewPatient: function() {
            var that = this
            let domMain = document.getElementById('new-patient-line')
            let myChart = echarts.init(domMain)
            let option = {
                title: {
                    text: '新增患者数',
                    x: 'center',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 500,
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        let str1 = params[0].name
                        let str2 = ''
                        let total = 0
                        params.forEach(function(param) {
                            total += Number(param.data)
                            str2 += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + param.color + '"></span>' + param.seriesName + ': ' + param.data + '<br />'
                        })
                        let str = str1 + '&nbsp;&nbsp;总: ' + Math.round(total) + '<br />' + str2
                        return str
                    }
                    // formatter: "{b} <br/>{a0} : {c0}<br/>{a1} : {c1}<br/>{a2} : {c2}"
                },
                legend: {
                    data: [],
                    y: 'bottom'
                },
                toolbox: {
                   show : true,
                   feature : {
                       mark : {show: true}, // 辅助线标志，上图icon左数1/2/3，分别是启用，删除上一条，删除全部
                       dataView : {show: true, readOnly: false},// 数据视图，上图icon左数8，打开数据视图
                       magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},// 图表类型切换，当前仅支持直角系下的折线图、柱状图转换，上图icon左数6/7，分别是切换折线图，切换柱形图
                       restore : {show: true}, // 还原，复位原始图表，上图icon左数9，还原
                       saveAsImage : {show: true} // 保存为图片，上图icon左数10，保存
                   }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: [],
                        name: "月份"
                    }
                ],
                yAxis: {
                    type: 'value',
                    splitArea: { show: true },
                    name:"患者数"
                },
                series: [
                    // {
                    //     name: '肺癌',
                    //     type: 'bar',
                    //     stack: '癌症',
                    //     data: []
                    // }
                ]
            }
            api.http({
                url: 'statistic.newcnt',
                data: {},
                successCallback: function(d) {
                    let data = d.data
                    that.yesterdayCnt = data.disease_yesterday_cnt['全部']
                    that.weekCnt = data.disease_day7_cnt['全部']
                    that.monthCnt = data.disease_day30_cnt['全部']
                    let sixmonthData = data.disease_six_month_cnt
                    let months = Object.keys(sixmonthData['全部'])
                    delete sixmonthData['全部']
                    let diseases = Object.keys(sixmonthData)
                    option.legend.data = diseases
                    option.xAxis[0].data = months
                    option.series = Object.keys(sixmonthData).map(function(key) {
                        let one = sixmonthData[key]
                        let arr = {}
                        arr.name = key
                        arr.type = 'bar'
                        arr.stack = '癌症'
                        arr.data = Object.keys(one).map(function(key1) {
                            return one[key1]
                        })
                        return arr

                    })
                    option.series.splice(3, 1)
                    console.log('....option', option)
                    myChart.setOption(option);
                }
            })


        }
    },
    mounted: function() {
        this.$nextTick(function() {
            var that = this
            $(function() {
                that.initNewPatient()
            })

        })
    },
    created: function() {
        Bus.$emit('statistic-patient-tab-active', 'new')
    }
}
</script>
