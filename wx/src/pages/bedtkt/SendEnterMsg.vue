<template>
    <div class="SendEnterMsg">
        <!-- <mt-header fixed title="发送入院通知">
            <router-link to="/bedtkt/list" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <!-- <div class="patientinfo">
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
        </div> -->
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
        <p style="width: 80%; margin: 30px auto; text-align: left; text-indent: 2em">发送确认信息至患者,询问患者是否可以入院,点击发送确认通知将会发送确认信息给患者,届时请查收患者反馈。</p>
        <div>
            <span style="display: block">请输入期望患者入院的日期</span>
            <input type="text" placeholder="请输入期望患者入院的日期" name="" style="border: 1px solid #ccc; padding: 10px;width: 72%; text-align: center; margin-top: 20px" @click="clickTimeInput" v-model="thedate">
        </div>
        <div class="footer" style="position: fixed; bottom: 0px; width: 100%;left: 0px">
            <a class="cn-btn-cancel" href="javascript:" style="width: 50%" @click="clickCancel">取消</a><!--
            --><a class="cn-btn-confirm" href="javascript:" style="width:50%" @click="clickConfirm">询问患者</a>
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
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    module.exports = {
        data: function() {
            return {
                bedtktid: '',
                bedtkt:{},


                openid: '',
                bedtktid: '',
                thedate: '',
                pickerValue: '',
                startDate: '',
            }
        },
        created(){
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            var queryString = this.$route.query;
            self.bedtktid = queryString.bedtktid;
            common.getBedtktInfo(self.bedtktid, self.openid, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.bedtkt = data.bedtkt;
                    console.log(self.bedtkt);
                }
            })

            this.startDate = new Date();
        },
        methods: {
            clickCancel: function() {
                this.$router.go(-1);
            },
            clickConfirm: function() {
                var self = this;
                this.$messagebox.confirm('请再次确认是否发送询问患者通知').then(action => {
                    var url = api.get('sickbed.senddate');
                    var params = {
                        openid: this.openid,
                        bedtktid: this.bedtktid,
                        thedate: this.thedate,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            var data = response.data;
                            let instance = self.$toast('通知发送成功!');
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
        watch: {
            'pickerValue': function(newValue, oldValue){
                this.thedate = newValue.getFullYear() + '-' + (newValue.getMonth() + 1) + '-' + newValue.getDate();
            }
        },
        mounted: function() {
            document.title = "询问患者可否入院";
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
    .patientinfo {
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
        word-break: break-all;
    }
    .patientinfo span.left {
        width: 45%;
    }*/
</style>