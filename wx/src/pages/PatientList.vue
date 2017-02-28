<template>
    <div class="patientlist">
        <div style="position: fixed; top: 0px; left: 0px; width: 100%">
            <mt-search v-model="keyword" :show="true" v-on:keyup.13.native="doSearch">
                <div class="body-container">
                    <div class="item-box" v-for="patient in patients" @click="goPatientPipeList(patient)">
                        <div class="item-box-header">
                            <span>{{patient.name}}</span>
                            <span style="float: right">{{patient.diseasename}}</span>
                        </div>
                        <div class="item-box-item" style="margin-top: 10px">
                            <span class="left">性别: </span>
                            <span>{{patient.sex}}</span>
                        </div>
                        <div class="item-box-item">
                            <span class="left">电话号码: </span>
                            <span>{{patient.mobile}}</span>
                        </div>
                        <div class="item-box-item">
                            <span class="left">入组日期: </span>
                            <span>{{patient.entertime}}</span>
                        </div>
                    </div>
                </div>
            </mt-search>
        </div>
    </div>
</template>
<script>
    import api from '../config/api.js'
    import common from '../lib/common.js'
    module.exports = {
        data: function() {
            return {
                keyword: '',
                patients: [
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                    {
                        id: "1",
                        name: '方汉文',
                        diseasename: '肺癌',
                        sex: '男',
                        mobile: '19323214124',
                        entertime: '2016-05-03',
                    },
                ]
            }
        },
        methods: {
            goPatientPipeList: function(patient) {
                this.$router.push({name: 'pipelist', params:{'patientid': patient.id}})
            },
            clickdiv: function() {
                console.log('aaaaa');
            },
            clicka: function() {
                 console.log('aaaaa');
            },
            hello: function() {
                console.log('22222');
            },
            doSearch: function(){
                console.log('11111111');
                var url = api.get('');
                var params = {
                    keyword: this.keyword,
                }
                common.post(url, params, function(response) {
                    if (response.errno == 0) {
                        var data = response.data;

                    }
                })
            }
        }

    }
</script>
<style scoped>
    .body-container {
        background-color: #eee;
        margin: 0px -8px 0px -8px;
        padding:  0px 0px 0px 0px;
    }
    .item-box {
        background-color: #fff;
        text-align: left;
        padding: 20px;
        margin-bottom: 10px;
    }
    .item-box-header {
        border-bottom: 1px dashed #ccc;
        padding-bottom: 5px;
        color: #1996ea;
    }
    .item-box-item {
        font-size: 14px;
        padding: 2px 0px;
        color: #666;
    }
    .item-box-item .left {
        width: 25%;
        display: inline-block;
    }
</style>