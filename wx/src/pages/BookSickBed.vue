<template>
    <div class="book-sick-bed">
        <mt-header fixed title="住院预约详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <template>
        <div>
            <a href="javascript:" :class="['navbar', {'selected': active=='male'}]">男性患者</a>
            <a href="javascript:" :class="['navbar', {'selected': active=='female'}]">女性患者</a>
        </div>
        <div style="text-align: left" class="patientinfo">
            <div>
                <span>姓名:&nbsp;&nbsp;</span>
                <span>应住院日期:</span>
            </div>
            <div>
                <span>性别:&nbsp;&nbsp;</span>
                <span>手机号:&nbsp;&nbsp;</span>
            </div>
            <div>
                <span>年龄:&nbsp;&nbsp;</span>
                <span>近期居住地:&nbsp;&nbsp;</span>
            </div>
        </div>
        <div class="doperation">
            <a href="javascript:" style="background-color: #f06500" @click="clickRefuseBook()">拒绝入院</a><!--
            --><a href="javascript:" style="background-color: #4799ff" @click="clickConfirmEnter()">确认入院</a><!--
            --><a v-if="status == 1" href="javascript:" style="background-color: #3965ff" @click="clickSendMsg()">发送入院通知</a><!--
            --><a v-if="status == 2" href="javascript:" style="background-color: #4bcc00">患者确认可入院</a><!--
            --><a v-if="status == 3" href="javascript:" style="background-color: #f06500">患者无法入院</a><!--
            --><a v-if="status == 4" href="javascript:" style="background-color: #4799ff">患者待确认</a>
        </div>
        </template>
    </div>
</template>
<script>
    module.exports = {
        data: function() {
            return {
                selected: '',
                active: 'male',
                status: '1'
            }
        },
        methods: {
            'clickRefuseBook': function() {

            },
            'clickConfirmEnter': function() {

            },
            'clickSendMsg': function() {
                
            }
        }
    }
</script>
<style scoped>
    .navbar {
        width:49%;
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
    .doperation a {
        display: inline-block;
        padding: 5px 0px;
        text-align: center;
        color: #fff;
        width:33%;
        text-decoration:none;
    }
</style>