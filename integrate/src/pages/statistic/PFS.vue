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
import '../../vendor/echart/theme/essos.js'

export default {
    data: function() {
        return {
            pfsDisease: '全部',
            pfsChart: '',

            pfsData: {},
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        pfsDiseaseChange: function(val) {
            this.pfsDisease = val;
            this.initPFS(this.pfsData);
        },
        initAllCharts: function() {
            var that = this
            api.http({
                url: 'statistic.pfs',
                data: {},
                successCallback: function(d) {
                    let data = d.data
                    that.pfsData = data;
                    that.initPFS(that.pfsData);
                }
            })
        },
        initPFS: function(pfsData) {
            let domMain = document.getElementById('pfs')
            this.pfsChart = echarts.init(domMain, 'essos')
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
                        name: '全部',
                        type: 'bar',
                        data: [97, 100, 90, 88, 84, 33, 60, 160, 20]
                    },
                    {
                        name: '男性',
                        type: 'bar',
                        data: [69, 70, 50, 34, 22, 18, 25, 90, 8]
                    },
                    {
                        name: '女性',
                        type: 'bar',
                        data: [28, 30, 40, 54, 62, 15, 35, 70, 12]
                    }
                ]
            }
            var optionData = {};
            var that = this;
            Object.keys(pfsData).map(function(one){
                optionData[one] = pfsData[one][that.pfsDisease]
            })
            console.log(optionData, '?????');
            option.yAxis[0].data = Object.keys(optionData.pfs_all);

            let i = 0;
            option.series = option.legend.data.map(function(one){
                console.log('one', one);
                var obj = {};
                obj.name = one;
                obj.type = 'bar';
                console.log('keys',Object.keys(optionData[Object.keys(optionData)[i]]));
                obj.data = Object.keys(optionData[Object.keys(optionData)[i]]).map(function(key){
                    let one1 = optionData[Object.keys(optionData)[i]][key];
                    return one1;
                });
                i++;
                console.log(obj);
                return obj;
            })
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
