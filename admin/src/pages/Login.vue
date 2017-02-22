<template>
    <div class="linear">
        <div id="white_rec">
            <div>
                <a href="//www.fangcunyisheng.com">
                    <img id="logo_icon" src="../assets/logo_icon.png">
                </a>
            </div>
        </div>
        <div>
            <img id="logo_text" src="../assets/logo_text.png">
        </div>
    </div>
    <div class="div-login">
        <form name="form1" method="post" action="/login/loginpost/" class="form-horizontal">
            <input type="hidden" name="redirect_url" value="" />
            <div class="form-group">
                <span for="username" class="col-lg-3 col-md-3 col-sm-3  control-label">用户名</span>
                <div class="col-lg-8 col-md-8 col-sm-8">
                    <input type="text" name="username" class="form-control inputtext" placeholder="邮箱/手机号" maxlength="20" @click="inputClick" v-model="username">
                </div>
            </div>
            <div class="form-group">
                <span for="password" class="col-lg-3 col-md-3 col-sm-3 control-label">密码</span>
                <div class="col-lg-8 col-md-8 col-sm-8">
                    <input type="password" name="password" class="form-control inputtext" placeholder="密码" @click="inputClick" v-model="password">
                </div>
            </div>
            <div class="form-group" :class="{'hidden':loginFailure}">
                <div class="col-sm-8 col-sm-offset-3">
                    <i class="fa fa-times-circle"></i><span class="warning-font">{{errmsg}}</span>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-offset-3 col-lg-8 col-md-8 col-md-offset-3 col-sm-8 col-sm-offset-3">
                    <button class="btn btn-success" @click="login($event)" style="display: block; width: 100%">登&nbsp;&nbsp;录</button>
                </div>
            </div>
        </form>
    </div>
</template>
<style scoped>
@charset "utf-8";
body {
    margin: 0 auto;
}

.linear {
    height: 250px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    filter: progid: DXImageTransform . Microsoft . Gradient(gradientType=0, startColorStr=#51a0f8, endColorStr=#399ee4);
    /*    background:-moz-linear-gradient(top,#51a0f8,#399ee4);
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#51a0f8), to(#399ee4));*/
    background-color: #008db9;
    filter: progid: DXImageTransform.Microsoft.gradient(GradientType=0, startColorstr='#15A216', endColorstr='#fafafa');
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#15A216', endColorstr='#fafafa')";
}

#white_rec {
    position: relative;
    top: 60px;
    width: 75px;
    height: 75px;
    text-align: center;
    margin: 0 auto;
    background: white;
    border-radius: 10px
}

#logo_icon {
    height: 80%;
    width: 80%;
    position: relative;
    top: 10px;
}

#logo_text {
    position: relative;
    top: 86px;
}

#namelayer {
    padding-top: 50px;
    height: 16px;
    width: auto;
}

#passwordlayer {
    margin-top: 32px;
    height: 46px;
    width: auto;
}

#submitlayer {
    margin: 28px 0px;
    text-align: center;
}

span {
    display: inline-block;
    font-size: 16px;
    color: #333333;
}

.warning-font {
    color: #eb4f38;
    font-size: 14px;
    padding-left: 5px;
}

.fa {
    color: #eb4f38;
}


/*input.inputtext{
    padding:0px 15px  0px 15px;
    position: relative;
    width: 200px;
    height: 30px;
    color: #555;
    border:0px;
    border-radius:4px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
}*/

input.login_submit {
    height: 32px;
    width: 85px;
    font-size: 18px;
    background: #1996ea;
    color: #ffffff;
    border-radius: 10px;
    border: none;
}

input.borderbule {
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(102, 175, 233, 0.6);
    /*border-color: #66AFE9;*/
}

.div-login {
    position: relative;
    height: 250px;
    width: 400px;
    top: 80px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.54);
    margin: 0 auto;
    padding: 50px 0;
}
</style>
<script>
import common from '../lib/common.js'
import api from '../config/api.js'
module.exports = {
    data: function() {
        return {
            username: '',
            password: '',
            loginFailure: 'true',
            errmsg: '1234',
        }
    },
    components: {
        // 'appHeader': require('../components/Header.vue'), //头组件
        'appFooter': require('../components/Footer.vue') //尾组件
    },
    route: {
        data: function(transition) {
            // if (common.isLogin()) {
            //      transition.redirect({
            //         path: '/'
            //    });
            //  }
            transition.next();
        }
    },
    ready: function() {
        $(".inputtext").on("mousemove", function() {
            var me = $(this);
            me.addClass('borderbule');
        });
        $(".inputtext").on("mouseleave", function() {
            var me = $(this);
            me.removeClass('borderbule');
        });
    },
    methods: {
        'login': function(e) {
            e.preventDefault();
            var self = this;
            $.ajax({
                    url: api.get('user.login'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        username: this.username,
                        password: this.password
                    },
                })
                .done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                        // alert(d.errmsg);
                        console.log(d.data);
                        self.loginFailure = false;
                        self.errmsg = d.errmsg;
                    } else {
                        console.log('111111111');
                        common.login(d.data);
                        console.log('222222222');
                        self.$route.router.go({
                            path: '/'
                        })
                    }
                })

        },
        'inputClick': function() {
            this.loginFailure = true;
        }
    }
}
</script>
