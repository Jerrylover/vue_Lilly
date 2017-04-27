<template>
    <div class="statisticinfo">
		<mt-header fixed title="统计数据" style="height: 60px; font-size: 20px;">
		</mt-header>
        <div class="panel-body" id="drug_rate" style="height:300px">
        </div>
        <div class="panel-body" id="stop_reason" style="height:400px">
        </div>
    </div>
</template>
<script>
import api from '../../config/api.js';
import common from '../../lib/common.js';
import { Indicator } from 'mint-ui';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import '../../vendor/echart/theme/essos.js'

export default {
    data: function() {
        return {

        }
    },
    methods: {
        initNewPatient: function() {
            var self = this
            let drug_rate = document.getElementById('drug_rate')
            let myChart_drug_rate = echarts.init(drug_rate, 'essos')
            let stop_reason = document.getElementById('stop_reason')
            let myChart_stop_reason = echarts.init(stop_reason, 'essos')
            let option_drug_rate = {
                title: {
                    text: '服药／停药比率',
                    x:'center'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        var tar = params[1];
                        return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value + ' % ';
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type : 'category',
                    splitLine: {show:false},
                    data : []
                },
                yAxis: {
                    type : 'value'
                },
                series: [
                    {
                        name: '停药率',
                        type: 'bar',
                        stack:  '总量',
                        itemStyle: {
                            normal: {
                                color: 'rgba(0, 151, 220, 1)'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: []
                    },
                    {
                        name: '服药率',
                        type: 'bar',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                color: 'rgba(237, 125, 49, 1)'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data:[]
                    }
                ]
            }
            let option_stop_reason = {
                title : {
                    text: '停药原因分析',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    top: 30,
                    left: 'left',
                    data: []
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '65%'],
                        data:[],
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
            var url = api.get('doctor.statistic');
            common.post(url, {}, function(response) {
                if (response.errno == 0) {
                    var data = response.data;
                    // console.log(data);
                    option_drug_rate.xAxis.data = data.drug_rate.item.name;
                    option_drug_rate.series[0].data = data.drug_rate.item.value[0];
                    option_drug_rate.series[1].data = data.drug_rate.item.value[1];
                    option_stop_reason.legend.data = data.stop_reason.item.name;
                    option_stop_reason.series[0].data = data.stop_reason.item.value;
                    myChart_drug_rate.setOption(option_drug_rate);
                    myChart_stop_reason.setOption(option_stop_reason);
                }
            });
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            var self = this
            $(function() {
                self.initNewPatient()
            })

        });
    }
}
</script>
<style scoped>
.statisticinfo{
    margin: 80px 10px 100px 10px;
}
.panel-body{
    height: 350px;
    margin-top: 20px;
    border: 1px solid #ddd;
}
</style>
