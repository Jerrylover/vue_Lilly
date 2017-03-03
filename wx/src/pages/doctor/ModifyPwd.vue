<template>
    <div class="modifypwd">
        <mt-field label="旧密码" placeholder="" style="border-bottom: 1px solid #ccc" @touchstart.native="clearErrmsg" type="password" v-model="oldpwd"></mt-field>
        <mt-field label="新密码" placeholder="" style="border-bottom: 1px solid #ccc" @touchstart.native="clearErrmsg" type="password" v-model="pwd"></mt-field>
        <mt-field label="重复新密码" placeholder="" style="border-bottom: 1px solid #ccc" @touchstart.native="clearErrmsg" type="password" v-model="repeatpwd"></mt-field>
        <div v-show="errmsg != ''" style="padding: 10px;margin-top: 10px;"><span style="color: red">{{errmsg}}</span></div>
        <mt-button type="danger" size="large" @touchstart="clickModifypwd">提交修改</mt-button>
    </div>
</template>
<script>
    import api from '../../config/api.js'
    import common from '../../lib/common.js'
    module.exports = {
        data: function() {
            return {
                errmsg: '',
                openid: '',
                oldpwd: '',
                pwd: '',
                repeatpwd: '',
            }
        },
        methods: {
            'clickModifypwd': function() {
                var self = this;
                if (this.oldpwd.trim() == "") {
                    this.errmsg = "旧密码不能为空.";
                    return ;
                }
                if (this.pwd.trim() == "" || this.repeatpwd.trim() == "") {
                    this.errmsg = "新密码/重复新密码不能为空.";
                    return ;
                }
                if (this.pwd != this.repeatpwd) {
                    this.errmsg = "两次输入的新密码不一致.请重新输入.";
                    return ;
                }

                var url = api.get('doctor.modifypwdjson');
                var params = {
                    openid: this.openid,
                    oldpwd: this.oldpwd,
                    newpwd: this.pwd,
                }
                common.post(url, params, function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        if (data.issuc == 1) {
                            let instance = self.$toast('修改成功');
                            setTimeout(() => {
                                instance.close();
                                WeixinJSBridge.call('closeWindow');
                            }, 2000);
                        }else {
                            console.log('111111');
                            self.errmsg = data.msg;
                        }
                        
                    }
                })

            },
            checkParams: function() {
                if (this.oldpwd.trim() == '' || this.pwd.trim() == '' || this.repeatpwd.trim() == '' || (this.pwd != this.repeatpwd) ) {
                    return false;
                }
            },
            clearErrmsg: function() {
                this.errmsg = "";
            }
        },
        created: function(){
            this.openid = localStorage.getItem('_openid_');
        }
    }
</script>
<style scoped>
</style>
