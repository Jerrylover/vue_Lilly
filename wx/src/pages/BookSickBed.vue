<template>
    <div class="book-sick-bed">
        <mt-header fixed title="住院预约详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div style="position: fixed;top: 40px;left: 0px;width: 100%">
            <a href="javascript:" :class="['navbar', {'selected': active=='male'}]" @click="clickMale">男性患者</a><!--
            --><a href="javascript:" :class="['navbar', {'selected': active=='female'}]" @click="clickFemale">女性患者</a>
        </div>
        <div style="margin-top: 90px;">
        <div v-for="tkt in tktlist" style="text-align: left; background-color: #eee; padding: 5px" class="patientinfo">
            <div>
                <span>姓名:&nbsp;&nbsp;{{tkt.name}}</span>
                <span>应住院日期:&nbsp;&nbsp;{{tkt.plan_date}}</span>
            </div>
            <div>
                <span>性别:&nbsp;&nbsp;{{tkt.sex}}</span>
                <span>手机号:&nbsp;&nbsp;{{tkt.mobile}}</span>
            </div>
            <div>
                <span>年龄:&nbsp;&nbsp;{{tkt.age}}岁</span>
                <span>近期居住地:&nbsp;&nbsp;{{tkt.address}}</span>
            </div>
            <div class="doperation">
                <a href="javascript:" style="background-color: #f06500" @click="clickRefuseBook()">拒绝入院</a><!--
            --><a href="javascript:" style="background-color: #4799ff" @click="clickConfirmEnter()">确认入院</a><!--
            --><a v-if="status == 1" href="javascript:" style="background-color: #3965ff" @click="clickSendMsg()">发送入院通知    </a><!--
            --><a v-if="status == 2" href="javascript:" style="background-color: #4bcc00">患者确认可入院</a><!--
            --><a v-if="status == 3" href="javascript:" style="background-color: #f06500">患者无法入院</a><!--
            --><a v-if="status == 4" href="javascript:" style="background-color: #4799ff">患者待确认</a>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import api from '../config/api.js'
    import common from '../lib/common.js'
    module.exports = {
        data: function() {
            return {
                openid: '',
                selected: '',
                active: 'male',
                status: '1',
                tktlist: [],
                tktlist_male: [],
                tktlist_female: [],
            }
        },
        methods: {
            'clickRefuseBook': function() {

            },
            'clickConfirmEnter': function() {

            },
            'clickSendMsg': function() {
                
            },
            clickMale: function() {
                this.active = 'male';
                this.tktlist = this.tktlist_male;
            },
            clickFemale: function() {
                this.active = 'female';
                this.tktlist = this.tktlist_female;
            }
        },
        created(){
            // console.log(1111);
            var self = this;
            this.openid = localStorage.getItem('_openid_');
            var url = api.get('sickbed.list');
            var params = {
                openid: this.openid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    self.tktlist_male = data.tktlist_male;
                    self.tktlist_female = data.tktlist_female;
                    self.tktlist = self.tktlist_male;
                }
            })
        }
    }
</script>
<style scoped>
    .navbar {
        width:50%;
        display: inline-block;
        background-color: #ccc;
        padding: 10px 0px;
        text-decoration: none;
        color: #fff;
    }
    a.selected {
        background-color: #4799ff;
    }
    .patientinfo span {
        display: inline-block;
        width: 49%;
    }
    .doperation{
        margin: 0px -5px;
    }
    .doperation a {
        display: inline-block;
        padding: 5px 0px;
        text-align: center;
        color: #fff;
        width:33.3333%;
        text-decoration:none;
    }
</style>