<template>
    <div class="vertical-container">
        <div style="padding: 20px 0px 40px 0px">
            <img src="../assets/fcqx_icon.png" style="width: 100px; height: 100px">
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div v-show="errmsg != ''"><span style="color: red">{{errmsg}}</span></div>
        <mt-button type="primary" size="large" @click="bindUser">提交绑定</mt-button>
        <div>
            <span>{{path}}</span>
        </div>
    </div>
</template>
<script>
    import api from '../config/api.js';
    module.exports = {
        data: function() {
            return {
                openid: '',
                errmsg: '',
                openid: '',
                username: '',
                password: '',
                path: '',
            }
        },
        methods: {
            bindUser: function() {
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
            }
        },
        beforeRouteEnter(to, from, next) {
            var self = this;
            var openid = '';
            openid = localStorage.getItem('_openid_');
            next(vm=>{
                vm.openid = openid;
            });
        }
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
</style>