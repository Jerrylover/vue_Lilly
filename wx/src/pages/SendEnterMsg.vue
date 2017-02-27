<template>
    <div class="SendEnterMsg">
        <mt-header fixed title="发送入院通知">
            <router-link to="/booksickbed" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="patientinfo">
            <div>
                <span>姓名:&nbsp;&nbsp;{{name}}</span>
                <span>应住院日期:&nbsp;&nbsp;{{plan_date}}</span>
            </div>
            <div>
                <span>性别:&nbsp;&nbsp;{{sex}}</span>
                <span>手机号:&nbsp;&nbsp;{{mobile}}</span>
            </div>
            <div>
                <span>年龄:&nbsp;&nbsp;{{age}}岁</span>
                <span>近期居住地:&nbsp;&nbsp;{{address}}</span>
            </div>
        </div>
        <p style="width: 80%; margin: 30px auto; text-align: left; text-indent: 2em">发送确认信息至患者,询问患者是否可以入院,点击发送确认通知将会发送确认信息给患者,届时请查收患者反馈。</p>
        <div>
            <span style="display: block">请输入期望患者入院的日期</span>
            <input type="text" placeholder="请输入期望患者入院的日期" name="" style="border: 1px solid #ccc; padding: 10px;width: 72%; text-align: center; margin-top: 20px" @click="clickTimeInput" v-model="thedate">
        </div>
        <div class="footer" style="position: fixed; bottom: 0px; width: 100%;left: 0px">
            <a class="cn-btn-cancel" href="javascript:" style="width: 50%" @click="clickCancel">取消</a><!--
            --><a class="cn-btn-confirm" href="javascript:" style="width:50%" @click="clickConfirm">发送确认通知</a>
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
    import api from '../config/api.js'
    import common from '../lib/common.js'
    module.exports = {
        data: function() {
            return {
                name: '',
                sex: '',
                age: '',
                mobile: '',
                address: '',
                plan_date: '',


                openid: '',
                bedtktid: '',
                thedate: '',
                pickerValue: '',
                startDate: '',
            }
        },
        created(){
            this.openid = localStorage.getItem('_openid_');
            var queryString = this.$route.query;
            this.name = queryString.name;
            this.sex = queryString.sex;
            this.age = queryString.age;
            this.mobile = queryString.mobile;
            this.address = queryString.address;
            this.plan_date = queryString.plan_date;
            this.bedtktid = queryString.bedtktid;

            this.startDate = new Date();
        },
        methods: {
            clickCancel: function() {
                this.$router.go(-1);
            },
            clickConfirm: function() {
                var self = this;
                var url = api.get('sickbed.senddate');
                var params = {
                    openid: this.openid,
                    bedtktid: this.bedtktid,
                    thedate: this.thedate,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        // console.log(data);
                        let instance = self.$toast('通知发送成功!');
                        setTimeout(() => {
                            instance.close();
                            self.$router.go(-1);
                        }, 2000);
                    }
                })
            },
            clickTimeInput: function() {
                this.$refs.picker.open();
            },
        },
        watch: {
            'pickerValue': function(newValue, oldValue){
                this.thedate = newValue.getFullYear() + '-' + (newValue.getMonth() + 1) + '-' + newValue.getDate();
            }
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
        text-align: left;
        font-size: 0px;
        border: 1px solid #58B7FF;
        padding: 15px;
        margin-bottom: 10px;
    }
    .patientinfo span {
        font-size: 16px;
        width: 50%;
        display: inline-block;
    }
</style>