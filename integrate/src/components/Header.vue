<template>
    <div class="app-header">
    <nav class="navbar navbar-inverse navbar-xs fc-navbar navbar-fixed-top">
        <div class="container-fluid container-nav">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">
                    <!-- <img style="width:38px;height:38px" src="../assets/logo_icon.png" /> -->
                    {{sitePreName}}
                </a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav" style="margin-left:10px;float:right">
                    <!-- <li v-bind:class="{activeFix: active == 'patient'}">
                        <router-link  :to="{path:'/patient/list'}">患者</router-link>
                    </li>

                    <li v-privilege="'数据库-菜单-数据统计1'">
                        <a href="javascript:">数据统计</a>
                    </li>
                    <li  v-privilege="'数据库-菜单-管理'" v-bind:class="{activeFix: active == 'manager'}">
                        <router-link   :to="{name:'manager'}">管理</router-link>
                    </li>
                    <li  v-privilege="'数据库-菜单-操作日志'" v-bind:class="{activeFix: active == 'log'}">
                        <router-link   :to="{name:'log'}">操作日志</router-link>
                    </li>
                    <li v-bind:class="{activeFix: isuser}">
                        <router-link   :to="{name:'user-info'}">个人中心</router-link>
                    </li>
                    <li v-if="username == 'wangqian'" v-bind:class="{activeFix: active == 'doctorgroup'}">
                        <router-link   :to="{name:'doctorgroup-projectlist'}">医生团队</router-link>
                    </li> -->
                    <li v-if="diseaseCount > 1">
                        <button class="btn btn-warning btn-sm" style="line-height:1.5;padding:5px 10px;margin-top:4px;" @click="switchState">{{state | filterState}}</button>
                    </li>
                    <li>
                        <a href="javascript:" @click="logout($event)">退出 [{{name}}]</a>
                    </li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
    </nav>
    <div style="clear:both"></div>
    </div>
</template>
<style scoped>
.fc-navbar {
    margin-bottom: 0
}
.navbar-xs {
    min-height: 38px;
    height: 38px;
}

.navbar-xs .navbar-brand {
    padding: 0px 1px;
    font-size: 16px;
    line-height: 38px;
}

.navbar-xs .navbar-nav > li > a {
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
    overflow: hidden;
}

.navbar .navbar-header {
    height: 38px;
}

.navbar .activeFix {
    background-color: #0782A8;
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
    width: 138px;
    line-height: 30px !important;
}

.dropdown-menu {
    display: block;
    min-width: 138px;
    background-color: #008DB9;
}

.dropdown-menu > li > a {
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
    padding-left: 25px;
}
</style>
<style>
.bg-gray {
    background-color: #eee;
}

.color-gray {
    color: #999;
}

.font-16 {
    font-size: 16px;
}
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
table.fctable thead tr {
    background-color: #F5F6FA;
}

table.fctable thead th {
    border-bottom-width: 0;
}

/*div.content {
    padding: 0 100px;
}*/

.fl {
    float: left;
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
.btn, .panel, .form-control, .well {
    border-radius: 2px;
}
.hide-scroll {
  overflow-y: hidden;
}
.light-th {
    font-weight:normal;
    background: #F5F6FA;
}
.table-header {
    border-bottom: 1px solid #ccc;
}
.mg-t-20 {
    margin-top:20px;
}
.mg-t-10 {
    margin-top:10px;
}
.mg-r-20 {
    margin-right: 20px;
}
.mg-r-10 {
    margin-right: 10px;
}

tr.light-tr th {
    font-weight:normal;
    background: #F5F6FA;
}
.el-input__inner {
    border-radius: 2px;
    border-color: #ccc;
}
.dg-header-a {
    margin: 5px 0 10px 20px;
}
.content.container-fluid {
    /*margin-left: 125px;*/
    overflow: auto;
    padding-left: 0;
    min-height: 800px;
    margin-top: 38px;
}

.menu-mini.content.container-fluid {
    /*margin-left:170px;*/
}
.content.container-fluid.fullscreen {
    margin: 0;
}

.page-content {
    background: #fff;
    margin: 0;
    padding: 8px 20px 24px;
}
.page-content:before {
    display: table;
    content: " ";
}
.page-content:after {
    clear: both;
}
.breadcrumbs {
    position: relative;
    border-bottom: 1px solid #e5e5e5;
    background-color: #f5f5f5;
    min-height: 41px;
    line-height: 40px;
    padding: 0 12px 0 0;
    display: block;
    margin-right: -15px;
}
.breadcrumbs h4 {
    margin: 0;
    line-height: 40px;
    padding-left: 10px;
    float: left;
}
.btn-primary, .pagination>.active>span {
    color: #fff;
    background-color: #008DB9;
    border-color: #008DB9;
}
.btn-primary:focus, .btn-primary:hover, .pagination>.active>span:focus, .pagination>.active>span:hover {
    background: #2da0b9;
    border-color: #2da0b9;
    color: #fff;
}

</style>
<script>
import common from '../lib/common.js';
import config from '../config/config.js'
export default {
    data: function() {
        return {
            state: 1,
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
        'sitePreName': function() {
            var diseaseid = common.getDiseaseId();
            if (diseaseid == 3) {
                return '中国NMO/MS数据登记系统';
            }
            return common.getSitePreName() + ' 数据管理系统';
        },
        diseaseCount: function() {
            var diseases = common.getDiseases();
            if ($.isArray(diseases)) {
                return diseases.length;
            }

            return 0;
        },
        isuser: function() {
            return this.active == 'info' || this.active == 'modifypassword';
        }
    },
    methods: {
        'logout': function(e) {
            e.preventDefault();
            common.logout(this);
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
        },
        switchState: function(e) {
            e.preventDefault();
            if (this.state == 1) {
                this.state = 2;
            } else {
                this.state = 1;
            }
            if (this.$route.name != 'patient-list') {
                this.$router.push({
                    path: '/patient/list'
                });
            } else {
                window.location.reload();
            }

            common.setState(this.state);
        },
        setDiseaseName: function(diseasename) {
            this.diseasename = diseasename;
        }
    },
    filters: {
        filterState: function(val) {
            var str = '';
            if (val == 1) {
                str = '数据库';
            } else {
                str = '门诊';
            }
            return str;
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            if (process.env.NODE_ENV === 'development') {
            //   $('.navbar-inverse').css('background-color', '#1996ea');
            }
            this.state = common.getState();
            var diseaseid = common.getDiseaseId();
            for (var i = 0; i < this.diseases.length; i++) {
                if (diseaseid == this.diseases[i].diseaseid) {
                    this.diseasename = this.diseases[i].name;
                    break;
                }
            }
        })
    }
}
</script>
