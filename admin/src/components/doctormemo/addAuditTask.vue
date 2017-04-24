<template>
    <div class="add-audit-tast">
        <a href="javascript:" class="btn btn-default" @click="clickbtn">{{btnname}}</a>
        <modal :show.sync = "showAuditTaskModal" width="500px">
            <div slot="header">
                <span style="color: #fff">{{btnname}}</span>
                <i class="fa fa-times-circle fa-lg" @click.stop="closeModal"></i>
            </div>
            <div slot="body" style="padding: 10px 20px 10px 20px; height: 350px;">
                <div class="row" style="padding: 0">
                    <div class="form-group">
                        <div class="">
                            <label>复诊的日期:&nbsp;&nbsp;&nbsp;</label>
                            <input id="thedate" name="patient-birthday" class="form-control" type="text" @click="showCalendar" name="" v-model="thedate">
                            <calendar :defaultdate="true" :show.sync="showForThedate" :value.sync="thedate" :x="x" :y="y" :begin="begin" :end="end" :range="range"></calendar>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>备注:&nbsp;&nbsp;&nbsp;</label>
                        <textarea class="form-control" rows="8" v-model="content" @focus="hideerrmsg"></textarea>
                        <span v-show="errmsg" class="errmsg">请输入需要助理处理的内容</span>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <div class="row" style="margin: 0px">
                    <div class="col-sm-12">
                        <a class="btn btn-default" href="javascript:" @click="closeModal">取消</a>
                        <a class="btn btn-primary" href="javascript:" @click="doYes">确认</a>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    export default {
        data: function() {
            return {
                showForThedate: false,
                showForMenstruationHistory: false,
                showForCreateDocDate: false,
                type: "date", //date datetime
                value: "",
                begin: "",
                x: 0,
                y: 0,
                range: false, //是否多选

                showAuditTaskModal: false,
                thedate: '',
                content: '',
                errmsg: false,
            }
        },
        props: ['btnname', 'patientid'],
        methods: {
            'clickbtn': function() {
                console.log('xxxxx');
                this.showAuditTaskModal = true;
                this.errmsg = false;
            },
            closeModal: function() {
                this.showAuditTaskModal = false;
                this.errmsg = false;
            },
            hideerrmsg: function() {
                this.errmsg = false;
            },
            doYes: function() {
                var self = this;
                console.log('doYes');
                console.log(this.thedate, '----', this.content);
                if (self.content.trim() == '') {
                    this.errmsg = true;
                    return ;
                }
                $.ajax({
                    url: api.get('doctormemo.addpost'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        thedate: self.thedate,
                        content: self.content,
                        patientid: self.patientid,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.$dispatch('show-popup', '操作成功');
                        self.showAuditTaskModal = false;
                        self.content = '';
                    }
                })
            },
            showCalendar: function(e) {
                e.stopPropagation();
                var that = this;
                if (e.target.id == "thedate") {
                    that.showForThedate = true;
                }
                that.xN = e.target.offsetLeft;
                that.y = e.target.offsetTop + e.target.offsetHeight + 8;
                var bindHide = function(event) {
                    if (event.target == e.target) {
                        return;
                    }
                    event.stopPropagation();
                    that.showForThedate = false;
                    document.removeEventListener('click', bindHide, false);
                    document.removeEventListener('touchstart', bindHide, false);
                };
                setTimeout(function() {
                    document.addEventListener('click', bindHide, false);
                    document.addEventListener('touchstart', bindHide, false);
                }, 500);
            },
        },
        components: {
            modal: function(resolve) {
                require(['../Modal.vue'], resolve);
            },
            calendar: function(resolve) {
                require(['../calendar.vue'], resolve);
            }
        }
    }
</script>
<style>
    .fa-times-circle {
        float: right;
        color: white;
        cursor: pointer;
        margin-top: 3px;
        margin-right: 5px;
    }
    .errmsg {
        color: red;
    }
</style>