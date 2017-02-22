<template>
    <app-header></app-header>
    <div class="container-fluid content">
        <div class="row" style="margin: 0px">
            <h4>量表:{{papertpltitle}}</h4>
        </div>
        <div class="row" style="margin: 0px;">
            <div class="row" style="margin: 0px 0px 10px 0px; background-color: #f5f5f5; border: 1px solid #ccc; padding: 5px">
                <div>
                    <span>患者姓名:&nbsp;&nbsp;&nbsp;{{patient.name}}</span>
                </div>
                <div>
                    <span>填写时间:&nbsp;&nbsp;&nbsp;{{paper.createtime}}</span>
                </div>
            </div>
            <div v-if="paper.ename == 'medicine_parent'">
                <div v-for='item in medicine_parent'>
                    <div>{{item.title}}</div>
                    <div style="background-color: #f5f5f5">{{item.content}}</div>
                </div>
            </div>
            <div v-for="xanswer in xanswerlist">
                <div style="padding: 5px">{{xanswer.question}}</div>
                <div style="background-color: #e5e5e5; padding: 5px">{{xanswer.xanswer}}</div>
            </div>
        </div>
    </div>
    <app-footer></app-footer>
</template>
<style scoped>
    h4 {
        float: left;
        padding-left: 10px;
        border-left: 3px solid #008db9;
    }
</style>
<script>
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                paperid: '',
                xanswerlist: '',
                patient: '',
                papertpltitle: '',
                paper: '',
                medicine_parent: '',
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue')
        },
        route: {
            data: function(transition) {
                // console.log(transition);
                var self = this;
                self.paperid = transition.to.query.paperid;
                $.ajax({
                    url: api.get('patient.paperone'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        paperid: self.paperid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        console.log(response);
                        var data = response.data;
                        self.xanswerlist = data.xanswerlist;
                        self.patient = data.patient;
                        self.paper = data.paper;
                        self.papertpltitle = data.papertpltitle;
                        self.medicine_parent = data.medicine_parent;
                    }else {
                        self.$dispatch('show-alert', response.errmsg);
                    }
                })
            }
        }
    }
</script>