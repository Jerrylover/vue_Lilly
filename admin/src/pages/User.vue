<template>
<app-header active='user'>
</app-header>
<div class="container-fluid content">
    <div class="row">
        <div class="col-sm-10" style="margin-bottom:20px;">
            <a  :class="{'btn btn-primary': isInfo, 'btn btn-default': !isInfo}" href="javascript:" @click.stop="clickselfinfo">个人资料</a>
            <a  style="margin-left:10px;" :class="{'btn btn-primary': isModifyPwd, 'btn btn-default': !isModifyPwd}" href="javascript:" @click.stop="clickmodifypwd">密码修改</a>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-10" v-show="isInfo">
            <table class="table table-bordered fctable">
                <tr>
                    <td width="10%">姓名</td>
                    <td>{{doctorname}}</td>
                </tr>
                <tr>
                    <td>医院</td>
                    <td>{{hospitalname}}</td>
                </tr>
                <tr v-for="one in qrlist">
                    <td>二维码{{$index + 1}}</td>
                    <td>
                        <div>
                            <p>疾病:</span><span>{{one.diseasename}}</p>
                            <p>公众号:</span><span>{{one.wxshopname}}</p>
                              <a :href="one.qrurl" target="_blank">
                                <img :src="one.qrurl" style="max-width:100px;height-width:100px" />
                              </a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-sm-10" v-show="isModifyPwd">
              <form class="form-horizontal">
                  <div class="form-group">
                    <label for="oldpassword" class="col-lg-1 col-sm-2 control-label">旧密码</label>
                    <div class="col-sm-6">
                      <input class="form-control" type="password" name="oldpassword" v-model="oldpassword">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="newpassword" class="col-lg-1 col-sm-2 control-label">新密码</label>
                    <div class="col-sm-6">
                      <input class="form-control" type="password" name="newpassword" v-model="newpassword">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="newpassword" class="col-lg-1 col-sm-2 control-label" style="padding-left:0">重复新密码</label>
                    <div class="col-sm-6">
                      <input class="form-control" type="password" name="newpasswordrepeat" v-model="newpasswordrepeat">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-10 col-lg-offset-1 col-sm-offset-2">
                      <button class="btn btn-success" @click.prevent="modifypost($event)">提交修改</button>
                    </div>
                  </div>
              </form>
        </div>
    </div>
</div>
  <app-footer></app-footer>
</template>
<style scoped>

/*.list-group .active {
        background-color: #008cbb;
    }*/


/*.list-group a:hover {
        background-color: #008cbb;
    }*/


/*.list-group a:visited {
        background-color: #008cbb;
    }*/
</style>
<script>
import api from '../config/api.js';
module.exports = {
    data: function() {
        return {
            active: '',
            doctorname: "",
            hospitalname: "",
            diseasename: "",
            qrlist: "",
            oldpassword: "",
            newpassword: "",
            newpasswordrepeat: "",
        }
    },
    route: {
        data: function(transition) {
            var that = this;
            $.ajax({
                    url: api.get('user.info'),
                    type: "POST",
                    dataType: "json"
                })
                .done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {

                    } else {
                        that.hospitalname = d.data.hospitalname;
                        that.doctorname = d.data.name;
                        that.qrlist = d.data.qrlist;
                    }
                })
        }
    },
    components: {
        'appHeader': require('../components/Header.vue'),
        'appFooter': require('../components/Footer.vue')
    },
    computed: {
        'isInfo': function() {
            return this.active == 'info' || this.active == '';
        },
        'isModifyPwd': function() {
            return this.active == 'modifypwd';
        }
    },
    methods: {
        clickselfinfo: function(e) {
            this.active = 'info';
        },
        clickmodifypwd: function(e) {
            this.active = 'modifypwd';
        },
        modifypost: function(e) {
            var that = this;
            if (that.oldpassword.trim() == '') {
                that.$dispatch('show-alert', '旧密码不能为空', function() {
                    $("input[name='oldpassword']").focus();
                })
                return;
            }
            if (that.newpassword.trim() == '') {
                that.$dispatch('show-alert', '新密码不能为空', function() {
                    $("input[name='newpassword']").focus();
                })
                return;
            }
            if (that.newpasswordrepeat.trim() == '') {
                that.$dispatch('show-alert', '第二次输入密码不能为空', function() {
                    $("input[name='newpasswordrepeat']").focus();
                })
                return;
            }
            $.ajax({
                    url: api.get('user.modifypwd'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        password: that.oldpassword,
                        newpassword: that.newpassword,
                        newpasswordrepeat: that.newpasswordrepeat
                    }
                })
                .done(function(d) {
                    if (d.errno != 0 && d.errno != -10) {
                      that.$dispatch('show-alert', d.errmsg, function() {
                          $("input[name='password']").focus();
                          that.oldpassword = '';
                          that.newpassword = '';
                          that.newpasswordrepeat = '';
                      })
                    } else {
                      that.$dispatch('show-popup', '修改成功', function() {
                        that.oldpassword = '';
                        that.newpassword = '';
                        that.newpasswordrepeat = '';
                      }, 2000)
                    }
                })

        }
    }
}
</script>
