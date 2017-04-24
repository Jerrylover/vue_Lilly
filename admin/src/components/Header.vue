<template>
<nav class="navbar navbar-inverse navbar-xs">
    <div class="container-fluid container-nav">
        <div class="navbar-header">
            <a class="navbar-brand" href="/">医生管理后台</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a href="javascript:" @click="clickDropMenu" class="dropdown-toggle a-dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{getDiseaseName}}</a>
                    <ul class="dropdown-menu" v-show="showDropMenu">
                        <li v-for="disease in diseases"><a :class="{active: getDiseaseName == disease.name}" href="javascript:" @click.stop="selectDisease(disease)">{{disease.name}}</a></li>
                    </ul>
                </li>
                <li v-bind:class="{activeFix: active == 'patient'}">
                    <a href="#" v-link="{path:'/patient/list'}">患者</a>
                </li>
                <li v-bind:class="{activeFix: active == 'schedule-revisit'}">
                    <a v-link="{path:'/schedule/revisit'}">复诊日历</a>
                </li>
                <li v-bind:class="{activeFix: active == 'schedule-visit'}">
                    <a v-link="{path: '/schedule/visit'}">设置门诊时间</a>
                </li>
                <li :class="{activeFix: active == 'sickbed-order'}">
                    <a v-link="{name: 'sickbed-listofpendingoperation'}">住院预约</a>
                </li>
                <li :class="{activeFix: active == 'doctormemo'}">
                    <a v-link="{name: 'doctormemo-list'}">备忘录列表</a>
                </li>
                <li v-bind:class="{activeFix: active == 'user'}">
                    <a href="#" v-link="{path: '/user'}">个人中心</a>
                </li>
                <li>
                    <a href="javascript:" @click="logout($event)">退出 [{{name}}]</a>
                </li>
            </ul>
        </div>
        <!--/.nav-collapse -->
    </div>
</nav>
</template>
<style scoped>
.navbar-xs {
    min-height: 38px;
    height: 38px;
}

.navbar-xs .navbar-brand {
    padding: 0px 1px;
    font-size: 16px;
    line-height: 38px;
}

.navbar-xs .navbar-nav>li>a {
    padding-top: 0px;
    padding-bottom: 0px;
    line-height: 38px;
}

.navbar-inverse {
    background-color: #008db9;
    border-color: #080808;
    color: #fff;
}

.navbar-inverse .navbar-brand {
    color: #fff;
}

.navbar-inverse .navbar-nav>li>a {
    color: #fff;
}

.navbar-inverse .navbar-nav>li>a .active {
    color: #fff;
    font-weight: bold;
}

.navbar {
    border-radius: 0px;
    border: 0px solid #ccc;
}

.navbar .activeFix {
    background-color: #0782A8;
}

.bg-gray {
    background-color: #eee;
}

.font-16 {
    font-size: 16px;
}

li.dropdown {
    margin-top: 4px;
    margin-left: 20px;
    margin-right: 20px;
    background: url("../assets/triangle.png") no-repeat scroll right center transparent;
    background-position: 95% 50%;
}

.a-dropdown {
    border: 1px solid #57b8d4;
    height: 30px;
    width: 150px;
    line-height: 30px !important;
}

.dropdown-menu {
    display: block;
    min-width: 150px;
    background-color: #008DB9;
}

.dropdown-menu>li>a {
    color: #fff;
}

.dropdown-menu>li>a.active,
.dropdown-menu>li>a:focus,
.dropdown-menu>li>a:hover {
    color: #fff;
    text-decoration: none;
    background-color: #0782A8;
}

.container-nav {
    padding-left: 97px;
}
</style>
<style>
a.scale {
    display: inline-block;
    transition: all .1s ease-in-out;
    --webkit-transform: all .1s ease-in-out;
}

a.scale:hover {
    text-decoration: none;
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -o-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
}

table.fctable {
    font-size: 14px;
}

table.fctable thead tr {
    background-color: #F5F6FA;
}

table.fctable thead th,
table.fctable thead td {
    border-bottom-width: 0;
}

div.content {
    padding: 0 70px;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.question-group {
    margin-bottom: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ccc;
}

.question-label {
    font-weight: 500;
    text-align: left !important;
}

.btn, .panel {
    border-radius: 2px;
}

.btn-primary, .btn-primary:focus {
    background-color: #008DB9;
}
.btn-primary:hover {
  background-color: #0782A8;
}

.form-control {
    border-radius: 2px;
}

em {
    font-style: normal;
}

.red {
    color: #f00;
}

.active a {
    color: #fff;
    background-color: #428bca;
}

.patientDetails {
    padding: 5px;
    background: #f5f5f5;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}

.patientDetails span {
    margin: 0px 5px;
    color: #333;
}

.fb {
    font-weight: bold;
}

.ml5 {
    margin-left: 5px;
}

.mt20 {
    margin-top: 20px;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.pr {
    position: relative;
}

.pa {
    position: absolute;
}

.gray {
    color: #999;
}
label {
  font-weight: normal;
}
.hide-scroll {
  overflow-y: hidden;
}
.light-th {
    font-weight:normal;
    background: #fbfbfb;
}
tr.light-tr th {
    font-weight:normal;
    background: #F5F6FA;
}
</style>
<script>
import common from '../lib/common.js';
import config from '../config/config.js'
module.exports = {
    data: function() {
        return {
            diseasename: '',
            showDropMenu: false,
        }
    },
    props: ['active'],
    computed: {
        'username': function() {
            return common.getUserName();
        },
        'name': function() {
            return common.getName();
        },
        'diseases': function() {
            return common.getDiseases();
        },
        'getDiseaseName': function() {
            if (this.diseasename) {
                return this.diseasename;
            }
            var diseaseid = common.getDiseaseId();
            for (var i = 0; i < this.diseases.length; i++) {
                if (diseaseid == this.diseases[i].diseaseid) {
                    return this.diseases[i].name;
                }
            }
            return '未知';
        },
        'sitePreName': function() {
            return common.getSitePreName();
        }
    },
    methods: {
        'logout': function(e) {
            e.preventDefault();
            common.logout();
        },
        'selectDisease': function(disease) {
            this.diseasename = disease.name;
            this.showDropMenu = false;
            localStorage.setItem('_diseaseid_', disease.diseaseid);
            var sitePreName = disease.shortname;
            if (!sitePreName) {
                sitePreName = disease.name;
            }
            localStorage.setItem('_siteprename_', sitePreName);
            window.location.href = '/';
        },
        'clickDropMenu': function() {
            this.showDropMenu = !this.showDropMenu;
            var that = this;
            var bindHide = function(event) {
                event.stopPropagation();
                that.showDropMenu = false;
                document.removeEventListener('click', bindHide, false);
            };
            setTimeout(function() {
                document.addEventListener('click', bindHide, false);
            }, 200);
        }
    },
    ready: function() {
      if (process.env.NODE_ENV === 'development') {
        // $('.navbar-inverse').css('background-color', '#1996ea');
      }
    }
}
</script>
