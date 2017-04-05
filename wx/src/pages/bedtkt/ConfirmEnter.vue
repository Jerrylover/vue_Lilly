<template>
    <div class="refuse-enter">
        <!-- <mt-header fixed title="发送入院通知">
            <router-link to="/bedtkt/list" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="patientinfo">
            <div>
                <span class="left">姓名:&nbsp;&nbsp;{{bedtkt.name}}</span>
                <span>应住院日期:&nbsp;&nbsp;{{bedtkt.plan_date}}</span>
            </div>
            <div>
                <span class="left">性别:&nbsp;&nbsp;{{bedtkt.sex}}</span>
                <span>手机号:&nbsp;&nbsp;{{bedtkt.mobile}}</span>
            </div>
            <div>
                <span class="left">年龄:&nbsp;&nbsp;{{bedtkt.age}}岁</span>
                <span>近期居住地:&nbsp;&nbsp;{{bedtkt.address}}</span>
            </div>
        </div>
        <div>
            <p style="width: 80%; margin: auto; color: red">确认入院后系统会发送入院通知至患者,同时您可以填写备注信息将备注信息发送给患者。</p>
            <div style="width: 80%; margin: auto; text-align: left">
                <input type="text" name="" placeholder="请输入时间" style="width: 90%; border: 1px solid #ccc;padding: 10px;margin: 20px auto; display: block; text-align: center" @click="clickTimeInput" v-model="time">
                <textarea rows="5" style="border: 1px solid #ccc; width: 90%;padding: 10px;display: block; margin: auto;" v-model="content"></textarea>
                <div style="margin-top: 10px">
                    <div style="display: inline-block; line-height: 1.6; float: left">
                        <input id="defaultreason" type="checkbox" name="" v-model="is_set_default">
                    </div>
                    <div style="display: inline-block">
                        <label for="defaultreason" style="font-size: 14px;">将当前备注信息保存为默认备注</label>
                    </div>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="footer" style="position: fixed; bottom: 0px; width: 100%;left: 0px">
            <a class="cn-btn-cancel" href="javascript:" style="width: 50%" @click="clickCancel">取消</a><!--
            --><a class="cn-btn-confirm" href="javascript:" style="width:50%" @click="clickConfirm">确认入院</a>
        </div>
        <template>
            <mt-datetime-picker
                ref="picker"
                type="date"
                v-model="pickerValue"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                :startDate="startDate">
            </mt-datetime-picker>
        </template>
    </div>
</template>
<script>
    import common from '../../lib/common.js'
    import api from '../../config/api.js'
    import utils from '../../lib/utils.js'
    module.exports = {
        data: function() {
            return {
                openid: '',
                content: '',
                is_set_default: false,
                bedtktid: '',
                bedtkt: {},
                pickerValue: '',
                time: '',
                startDate: '',
            }
        },
        methods: {
            'clickCancel': function() {
                this.$router.go(-1);
            },
            'clickConfirm': function() {
                var self = this;
                if (this.is_set_default == true) {
                    this.is_set_default = 1;
                }else {
                    this.is_set_default = 0;
                }
                this.$messagebox.confirm('一旦发送入院通知将不能撤回请确认').then(action => {
                    var url = api.get('sickbed.passjson');
                    var params = {
                        openid: this.openid,
                        content: this.content,
                        thedate: this.time,
                        is_set_default: this.is_set_default,
                        bedtktid: this.bedtktid,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            let instance = self.$toast('操作成功!');
                            setTimeout(() => {
                                instance.close();
                                self.$router.go(-1);
                            }, 2000);
                        }
                    })
                }, cancel => {

                });
            },
            clickTimeInput: function() {
                this.$refs.picker.open();
            },
        },
        created(){
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            this.startDate = new Date();

            var queryString = this.$route.query;
            this.bedtktid = queryString.bedtktid;
            common.getBedtktInfo(this.bedtktid, this.openid, function(response){
                if (response.errno == 0) {
                    self.bedtkt = response.data.bedtkt;
                }
            })

            var url = api.get('sickbed.pass');
            var params = {
                openid: this.openid,
                bedtktid: this.bedtktid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.content = data.bedtkt_pass_content;
                }
            })
        },
        watch: {
            '$route': function(to, from) {

            },
            'pickerValue': function(newValue, oldValue) {
                this.time = newValue.getFullYear() + '-' + (newValue.getMonth() + 1) + '-' + newValue.getDate();
            }
        },
        mounted: function() {
            document.title = "确认入院";
        }
    }
</script>
<style scoped>
    .footer a {
        display: inline-block;
        /*width: 50%;*/
        padding: 10px 0px;
        text-decoration: none;
        color: #fff;
    }
    /*.patientinfo {
        text-align: left;
        font-size: 0px;
        border: 1px solid #58B7FF;
        padding: 15px;
        margin-bottom: 10px;
    }
    .patientinfo span {
        font-size: 16px;
        display: inline-block;
    }
    .patientinfo span.left {
        width: 45%;
    }*/
    .patientinfo {
        font-size: 14px;
        background-color: #1996ea;
        margin: -60px -8px 0px -8px;
        text-align: left;
    }
    .patientinfo .left {
        width: 40%;
    }
    .patientinfo span {
        display: inline-block;
        color: #fff;
        padding: 5px 10px;
    }
</style>