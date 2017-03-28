<template>
    <div class="vertical-container">
        <template v-if="isbind == 0">
        <div style="padding: 20px 0px 40px 0px">
            <img src="../../assets/fcqx_icon.png" style="width: 100px; height: 100px">
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div v-show="errmsg != ''"><span style="color: red">{{errmsg}}</span></div>
        <mt-button type="primary" size="large" @click="bindUser">提交绑定</mt-button>
        <div>
            <span>{{path}}</span>
        </div>
        </template>
        <template v-if="isbind == 1">
            <div class="doctorinfo">
                <span>医生姓名:&nbsp;&nbsp;</span>
                <span>{{doctor.name}}</span><br/>
                <span>疾病:&nbsp;&nbsp;</span>
                <span v-for="disease in doctor.disease_arr">{{disease.name}},</span>
            </div>
            <img src="../../assets/bindsuccess.png" style="width: 100px; height: 100px; margin-top: 130px;"><br/>
            <span style="color: #1996ea; margin-top: 20px; display: block; font-size: 22px">已绑定成功</span>
            <a class="unbind-btn" href="javascript:" @click="unbindUser">解除绑定</a>
        </template>
    </div>
</template>
<script>
    import common from '../../lib/common.js';
    import api from '../../config/api.js';
    module.exports = {
        data: function() {
            return {
                openid: '',
                errmsg: '',
                openid: '',
                username: '',
                password: '',
                path: '',
                isbind: '',
                doctor: {},
            }
        },
        methods: {
            bindUser: function() {
                this.openid = localStorage.getItem('_openid_');
                var self = this;
                if(!this.checkPostParams()){
                    return ;
                };
                $.ajax({
                    url: api.get('bind.binduserpost'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: this.openid,
                        username: this.username,
                        password: this.password,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        localStorage.setItem('_isbind_', '1');
                        let instance = self.$toast('绑定成功');
                        setTimeout(() => {
                            instance.close();
                            WeixinJSBridge.call('closeWindow');
                        }, 2000);
                    }else if (response.errno == 2001){
                        self.errmsg = "用户名不存在,请重新输入";
                    }else if (response.errno == 2002){
                        self.errmsg = '密码错误,请重新输入';
                    }else {
                        self.errmsg = '系统异常,请联系技术人员';
                    }
                })

            },
            unbindUser: function() {
                var self = this;
                this.$messagebox.confirm('您确定要取消绑定吗?').then(action => {
                    var url = api.get('bind.unbindpost');
                    var params = {
                        openid: this.openid,
                    }
                    common.post(url, params, function(response){
                        if (response.errno == 0) {
                            localStorage.setItem('_isbind_', '0');
                            let instance = self.$toast('解绑成功');
                            setTimeout(() => {
                                instance.close();
                                WeixinJSBridge.call('closeWindow');
                            }, 2000);
                        }
                    })
                }, cancel => {

                });
            },
            checkPostParams: function() {
                if (this.username.trim() == '') {
                    this.$messagebox.alert("请输入用户名").then(action => {
                    });
                    return false;
                }
                if (this.password.trim() == '') {
                    this.$messagebox.alert("请输入密码").then(action => {
                    });
                    return false;
                }
                return true;
            },
            clickUsername: function() {
                this.errmsg = '';
            },
            clickPassword: function() {
                this.errmsg = '';
            },
            getDoctorInfo: function() {
                var doctorInfoUrl = api.get('doctor.info');
                var params = {
                    openid: openid,
                }
                common.post(doctorInfoUrl, params, function(response){
                    if (response.errno == 0) {
                        console.log('doctor-info', response.data);
                        next(vm => {
                            vm.openid = openid;
                            vm.isbind = isbind;
                            vm.doctor = response.data.doctor;
                        })
                    }
                })
            }
        },
        watch: {
            'username': function(val){
                if (val != '') {
                    this.errmsg = '';
                }
            },
            'password': function(val){
                if (val != '') {
                    this.errmsg = '';
                }
            },
            '$router': function(newValue, old) {
                console.log('hahaha');
            }
        },
        created: function() {
            var self = this;
            var openid = '';
            var isbind = '';
            openid = localStorage.getItem('_openid_');
            var url = api.get('user.isbind');
            var params = {
                openid: openid,
            }
            common.post(url, params, function(response){
                if (response.errno == 0) {
                    isbind = response.data.isbind;
                    console.log('isbind', isbind);
                    if (isbind == 1) {
                        this.getDoctorInfo();
                    }
                }
            })
        }
        // beforeRouteEnter(to, from, next) {
        //     var self = this;
        //     var openid = '';
        //     var isbind = '';
        //     openid = localStorage.getItem('_openid_');
        //     var url = api.get('user.isbind');
        //     var params = {
        //         openid: openid,
        //     }
        //     common.post(url, params, function(response){
        //         if (response.errno == 0) {
        //             isbind = response.data.isbind;
        //             console.log('isbind', isbind);
        //             if (isbind == 1) {
        //                 this.getDoctorInfo();
        //             }
        //         }
        //     })
            
        // }
    }
</script>
<style scoped>
    /*.vertical-container{
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
              align-items: center;
        -webkit-justify-content: center;
              justify-content: center;
    }*/
    .unbind-btn {
        text-decoration: none;
        position: fixed;
        color: #fff;
        background-color: #f06602;
        width: 100%;
        line-height: 2.4;
        height: 41px;
        font-size: 18px;
        bottom:0px;
        left: 0px;
    }
    .doctorinfo {
        margin: -60px -8px 0px -8px;
        padding: 10px;
        font-size: 16px;
        background-color: #1996ea;
        text-align: left;
    }
    .doctorinfo span {
        color: #fff;
    }
</style>