<template>
<div class="nav-menu" v-show="!isfullscreen">
    <div class="menu-container" :class="{'menu-mini': ismini}">
        <div class="text-center div-toggle" @click.stop="toggleMenu"><i class="menu-fa fa" :class="{'fa-angle-double-left' : !ismini, 'fa-angle-double-right' : ismini}"></i></div>

        <ul class="el-menu">
            <li class="el-menu-item" :class="{'is-active': menu.isactive}" style="padding-left: 20px;" v-for="(menu, index) in menuData" @click="clickMenu(menu)">
                <el-tooltip placement="right" v-show="ismini">
                    <div slot="content">{{menu.name}}</div>
                    <i :class="menu.icon"></i>
                </el-tooltip>
                <i :class="menu.icon" v-show="!ismini"></i>
                <span class="menu-text">{{menu.name}}</span>
            </li>
        </ul>
    </div>
    <transition name="transition-submenu">
        <div class="submenu-container" v-show="isShowSubMenu">
            <ul class="el-menu submenu">
                <li class="el-menu-item submenu" :class="{'is-active': one.isactive}" v-for="(one, index) in subMenuData" @click="clickSubMenu(index)" v-show="isShowSubMenuItem(one)">
                    <span class="menu-text">
                        {{one.name}}
                    </span>
                </li>
            </ul>
        </div>
    </transition>
    <div  class="submenu-container" v-show="showThirdLevelMenu">
        <ul class="el-menu submenu">
            <li class="menu-title" :class="{'fullinfo': isShowFullInfo}" @click="showFullInfo">
                <p class="title">{{patientname}}&nbsp;&nbsp;<i class="menu-title-arrow el-icon-arrow-right" :class="{'opened': isShowFullInfo}" ></i></p>
                <div class="menu-content">
                <div>{{patientinfo.agestr | filterAgestr}} {{patientinfo.sexstr}}</div>
                <div>{{patientinfo.diseasename}}</div>
                <div>{{patientinfo.out_case_no}}</div>
                </div>
            </li>
            <li class="el-menu-item submenu" :class="{'is-active': one.isactive}" v-for="(one, index) in patientGrandsonMenus" @click="clickThirdMenu(one)">
                <span class="menu-text">
                    {{one.name}}
                </span>
            </li>
        </ul>
    </div>
</div>
</template>
<style scoped>
    .div-toggle {
        border-bottom: 1px solid #ddd;
        padding: 2px 0;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .div-toggle .menu-fa {
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
        color: #aaa;
        border: 1px solid #bbb;
        padding: 0 5px;
        line-height: 18px;
        border-radius: 16px;
        background-color: #fff;
        position: relative;
        margin-right: 0;
    }
    .menu-container {
        width: 125px;
        float: left;
        margin-left: -15px;
        border-right: 1px solid #ccc;
        transition: width .2s;
    }
    .menu-container:before {
        content: "";
        display: block;
        width: 125px;
        position: fixed;
        bottom: 0;
        top: 0;
        z-index: -1;
        background-color: #f2f2f2;
        border: 1px solid #ccc;
        border-width: 0 1px 0 0;
        transition: width .2s;
    }
    /*二级菜单*/
    .submenu-container {
        width: 125px;
        float: left;
        margin-left: 0;
        border-right: 1px solid #ccc;
    }

    .submenu-container:before {
        content: "";
        display: block;
        width: 125px;
        position: fixed;
        bottom: 0;
        top: 0;
        z-index: -1;
        background-color: #f1f1f1;
        border: 1px solid #ccc;
        border-width: 0 1px 0 0;
    }
    .submenu.el-menu {
        background-color: #f1f1f1;
    }
    .submenu.el-menu-item {
        border: 0;
    }
    .el-menu-item {
        transition: background-color .3s,color .3s;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .el-menu > li {
        border-bottom: 1px solid #ddd;
    }
    .menu-mini.menu-container {
        width:50px;
    }
    .menu-mini.menu-container:before {
        width:50px;
    }
    .menu-mini .menu-text {
        display:none
    }
    .menu-mini .el-menu > li {
        border: 0;
        padding: 0;
    }

    .el-menu-item.is-active {
        color: #fff;
        /*background-color: #20a0ff;*/
        background-color: #2da0b9;
        border-right: 0;
    }
    .nav-menu {
        padding-left: 10px;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        position:fixed;
        top: 38px;
    }
    .menu-title {
        /*padding: 0 20px;*/
        text-align: left;
        height: 30px;
        line-height: 30px;
        transition: height .5s ease;
        overflow: hidden;
        cursor: pointer;
        background-color: #F9FAFC;
    }
    .menu-title .title {
        padding: 0 20px;
        font-size: 15px;
        color: #008DB9;
        background-color: #eef1f6;
        font-weight: 700;
        margin: 0;
        -moz-box-shadow:0px 1px 2px #ccc;
        -webkit-box-shadow:0px 1px 2px #ccc;
        box-shadow:0px 1px 2px #ccc;
        /*border-bottom: 1px solid #ccc;*/
    }
    .menu-title .menu-content {
        padding: 0 20px;
    }
    .menu-title.fullinfo {
        height: 130px;
        transition: height .5s ease;
    }
    .menu-title-arrow {
        position: absolute;
        right: 5px;
        font-size: 12px;
        top: 10px;
        color: #48576A;
        transition: .3s;
    }
    .menu-title-arrow.opened {
        transform: rotate(90deg);
    }
    .fa {
        margin-right: 10px
    }
    .el-menu-item.submenu {
        height: 45px;
        line-height: 45px;
    }
    </style>
<style>
    /*.menu-min i.el-submenu__icon-arrow.el-icon-arrow-down {
        display:none !important;
    }*/
</style>
<script>
import Bus from '../lib/bus.js'
import common from '../lib/common.js'
import libpatient from '../lib/patient.js'
import api from '../config/api.js'
export default {
  data: function() {
    return {
        isfullscreen: false,
        isShowFullInfo: true,
        patientid: '',
        patientname: '',
        patientinfo: '',
        ismini: false,
        showSubMenu: true,
        activeMenu: '',
        activeSubmenu: '',
        subMenuData: [],
        showThirdLevelMenu: false,
        menuData: [
        {
            name: '患者',
            icon: 'fa fa-list',
            link: {name: 'patient-list'},
            isactive: true,
            submenus: [

            ]
        },
        {
            name: '复诊预约',
            icon: 'fa fa-calendar',
            link: {name: 'schedule-revisit'},
            isactive: false,
            submenus: [
                // {
                //     name: '复诊日历',
                //     link: {name: 'schedule-revisit'},
                //     isactive: false,
                // }
            ]
        },
        {
            name: '住院预约',
            icon: 'fa fa-bed',
            isactive: false,
            submenus: [
                {
                    name: '预约列表',
                    link: {name: 'sickbed-listofpendingoperation'},
                    isactive: false,
                },
                {
                    name: '操作记录',
                    link: {name: 'operation-history'},
                    isactive: false,
                }
            ]
        },
        {
            name: '医生团队',
            icon: 'fa fa-group',
            isactive: false,
            link: {name: 'doctorgroup-projectlist'},
            submenus: [

            ]
        },
        {
            name: '数据统计',
            icon: 'fa fa-pie-chart',
            isactive: false,
            submenus: [
                {
                    name: '患者',
                    link: {name: 'statistic-patientnew'},
                    isactive: false
                },
                {
                    name: '生存率',
                    link: {name: 'statistic-survivalrate'},
                    isactive: false,
                    show: 'cancer'
                },
                {
                    name: 'PFS',
                    link: {name: 'statistic-pfs'},
                    isactive: false,
                    show: 'cancer'
                },
                {
                    name: '缓解率',
                    link: {name: 'statistic-remissionrate'},
                    isactive: false,
                    show: 'cancer'
                },
                {
                    name: 'OS',
                    link: {name: 'statistic-os'},
                    isactive: false,
                    show: 'cancer'
                },


            ]
        },
        {
            name: '操作日志',
            icon: 'fa fa-history',
            isactive: false,
            link: {name: 'log'},
            submenus: [

            ]
        },
        {
            name: '设置',
            icon: 'fa fa-cog',
            isactive: false,
            submenus: [
                {
                    name: '个人信息',
                    link: {name: 'user-info'},
                    isactive: false,
                },
                {
                    name: '修改密码',
                    link: {name: 'user-modifypassword'},
                    isactive: false,
                },
                {
                    name: '设置门诊时间',
                    link: {name: 'schedule-visit'},
                    isactive: false,
                },
                {
                    name: '助理账号',
                    link: {name: 'manager'},
                    isactive: false,
                }
            ]
        },
      ],
      patientGrandsonMenus: [
          {
              name: '基本信息',
              link: {name: 'patient-baseinfo-lungcancer'},
              isactive: false,
          },
          {
              name: '就诊记录',
              link: {name: 'add-visit'},
              isactive: false,
          },
          {
              name: '数据录入',
              link: {name:'checkuptpl-child'},
              isactive: false,
          },
          {
              name: '历次就诊',
              link: {name: 'patient-revisitrecord'},
              isactive: false
          },
          {
              name: '患者用药',
              link: '',
              isactive: false,
          },
          {
              name: '患者复诊',
              link: '',
              isactive: false,
          },
          {
              name: '诊后管理',
              link: '',
              isactive: false,
          },
          {
              name: '评估量表',
              link: '',
              isactive: false,
          }
      ]
    }
  },
  computed: {
    isShowSubMenu: function() {
        return this.subMenuData.length > 0 && this.showSubMenu === true
    },
    doctorUserName: function() {
        return common.getUserName()
    },
    diseaseid: function() {
        return libpatient.getDiseaseId(this.patientid);
    },
  },
  methods: {
    isShowSubMenuItem: function(menu) {
        if (menu.show === 'cancer') {
            var diseaseid = common.getDiseaseId()
            if (common.isCancerDisease(diseaseid)) {
                return true
            }
            return false
        }
        return true
    },
    getPatientInfo: function() {
        // if (this.patientinfo == '') {
            var that = this
            api.http({
              url: 'patient.patientinfo',
              data: {
                  patientid: that.patientid,
              },
              successCallback: function(d) {
                  that.patientinfo = d.data
              }
          })
        // }
    },
    showFullInfo: function(e) {
        this.isShowFullInfo = !this.isShowFullInfo
    },
    toggleMenu: function() {
        this.ismini = !this.ismini
        Bus.$emit('menu-mini', {ismini: this.ismini, isShowSubMenu: this.isShowSubMenu, showThirdLevelMenu: this.showThirdLevelMenu})
    },
    clickMenu: function(menu) {//点击一级菜单
        this.showThirdLevelMenu = false
        this.showSubMenu = true
        this.menuData.forEach(function(one) {
            one.isactive = false
        })
        menu.isactive = true
        this.activeMenu = menu.name//记录active的一级菜单
        localStorage.setItem('_activeMenu_', this.activeMenu)
        this.subMenuData = menu.submenus
        if (menu.submenus.length > 0) {//有二级菜单的收起一级菜单，同时路由到第一个二级菜单页
            this.ismini = false
            var _activeSubMenu = menu.submenus[0]
            menu.submenus.forEach(function(one) {
                one.isactive = false
            })
            _activeSubMenu.isactive = true
            this.activeSubmenu = _activeSubMenu.name//记录active的二级菜单
            localStorage.setItem('_activeSubmenu_', this.activeSubmenu)
            this.$router.push(_activeSubMenu.link)
        } else {
            this.ismini = false
            if (menu.link != '' && menu.link != undefined) {
                this.$router.push(menu.link)
            }
        }
        Bus.$emit('menu-mini', {ismini: this.ismini, isShowSubMenu: this.isShowSubMenu, showThirdLevelMenu: this.showThirdLevelMenu})
    },
    clickSubMenu: function(index) {//点击二级菜单
        this.showThirdLevelMenu = false
        this.subMenuData.forEach(function(_submenu, idx) {
            _submenu.isactive = false
            if (idx == index) {
                _submenu.isactive = true
            }
        })
        this.$router.push(this.subMenuData[index].link)
        this.activeSubmenu = this.subMenuData[index].name//记录active的二级菜单
        localStorage.setItem('_activeSubmenu_', this.activeSubmenu)
    },
    clickThirdMenu: function(thirdMenu) {//点击三级菜单
        this.patientGrandsonMenus.forEach(function(one) {
            one.isactive = false
        })
        thirdMenu.isactive = true
        switch (thirdMenu.name) {
            case '基本信息':
                var routeName = 'patient-baseinfo'
                if (common.isCancerDisease(this.diseaseid)) {
                    routeName = 'patient-baseinfo-lungcancer'
                }
                this.$router.push({
                    name: routeName,
                    params: {
                        patientid: this.patientid
                    }
                })
                break;
            case '就诊记录':
                this.$router.push({
                    name: 'add-visit',
                    params: {
                        patientid: this.patientid
                    }
                })
                break;
            case '数据录入':
                var path = '/checkuptpl/' + this.patientid + '/child/zhusu/主诉';
                if (common.isGastricCancer(this.diseaseid)) {
                  path = '/checkuptpl/' + this.patientid + '/child/zhusu1/主诉';
                }
                this.$router.push({
                    path: path
                })
                break;
            case '历次就诊':
                this.$router.push({
                    name: 'patient-revisitrecord',
                    params: {
                        patientid: this.patientid
                    }
                })
                break;
            case '患者用药':
                this.$router.push({
                    name: 'patient-prescription',
                    params: {
                        patientid: this.patientid
                    }
                })
                break;
            case '患者复诊':
                this.$router.push({
                    name: 'patient-appointment',
                    params: {
                        patientid: this.patientid
                    }
                })
                break;
            case '评估量表':
                this.$router.push({
                    name: 'patient-paperlist',
                    params: {
                        patientid: this.patientid
                    }
                })
                break;
            case '诊后管理':
                this.$router.push({
                    name: 'patient-list-aftertreatment',
                    params: {
                        patientid: this.patientid
                    }
                })
                break;
            default:

        }
    },
    initMenus: function() {
        var that = this
        this.menuData.forEach(function(menu) {
            if (menu.isactive) {
                that.subMenuData = menu.submenus
            }
        })
        if (this.doctorUserName == 'xuyan' && this.menuData[0].submenus == 0) {
            this.menuData[0].submenus.push(
                {
                    name: '患者列表',
                    link: {name: 'patient-list'},
                    isactive: true
                }
            )
            this.menuData[0].submenus.push(
                 {
                     name: '待审核列表',
                     link: {name: 'patient-auditlist'},
                 }
             )
        }
        var isminimenu = that.subMenuData.length > 0 ? true : false
        this.ismini = false
        Bus.$emit('menu-mini', {ismini: this.ismini, isShowSubMenu: this.isShowSubMenu, showThirdLevelMenu: this.showThirdLevelMenu})
    },
    showGrandsonMenu: function(patientid, patientname, pagename) {//专门为patient做的三级菜单
        this.showThirdLevelMenu = true
        this.ismini = true
        this.showSubMenu = false
        if (patientid != this.patientid) {
            this.patientid = patientid
            this.patientname = patientname
            this.getPatientInfo()
        }
        this.patientGrandsonMenus.forEach(function(one) {
            if (one.name == pagename) {
                one.isactive = true
            } else {
                one.isactive = false
            }
        })
        //获取患者基本信息
        // console.log('showGrandsonMenu....')

        Bus.$emit('menu-mini', {ismini: this.ismini, isShowSubMenu: this.isShowSubMenu, showThirdLevelMenu: this.showThirdLevelMenu})
    },
    letFullScreen: function(isfullscreen) {
        this.isfullscreen = isfullscreen
    },
    makeMenuMini: function(menuName, subMenuName) {
        console.log('一级菜单', menuName, '二级菜单', subMenuName)
        if (menuName == undefined) {
            return
        }
        var that = this
        this.menuData.forEach(function(menu) {
            if (menu.name == menuName) {
                menu.isactive = true
                that.subMenuData = menu.submenus
            } else {
                menu.isactive = false
            }
            if (that.subMenuData.length > 0) {
                that.subMenuData.forEach(function(subMenu) {
                    if (subMenu.name == subMenuName) {
                        subMenu.isactive = true
                    } else {
                        subMenu.isactive = false
                    }
                })
            }
        })
        Bus.$emit('menu-mini', {ismini: this.ismini, isShowSubMenu: this.isShowSubMenu, showThirdLevelMenu: this.showThirdLevelMenu})
    },
    initPage: function() {
        var _activeMenu = localStorage.getItem('_activeMenu_')
        var _activeSubmenu = localStorage.getItem('_activeSubmenu_')
        if (_activeMenu) {
            var flag1 = false
            this.menuData.forEach(function(menu) {
                if (menu.name == _activeMenu) {
                    menu.isactive = true
                    flag1 = true
                } else {
                    menu.isactive = false
                }
                menu.submenus.forEach(function(submenu) {
                    if (submenu.name == _activeSubmenu) {
                        submenu.isactive = true
                    } else {
                        submenu.isactive = false
                    }
                })
            })
            if (!flag1) {//第一个菜单设置成active
                this.menuData[0].isactive = true
            }
        }
        this.initMenus()
        Bus.$on('show-patient-third-level-menu', this.showGrandsonMenu)
        var that = this
        Bus.$on('hide-patient-third-level-menu', function() {
            that.showThirdLevelMenu = false
            that.ismini = false
        })
        Bus.$on('make-menu-mini', this.makeMenuMini)
        Bus.$on('let-fullscreen', this.letFullScreen)
    }
  },
  filters: {
      filterAgestr: function(val) {
          return val ? val + '岁': '未知年龄'
      }
  },
  mounted: function() {
  },
  created: function() {
    this.initPage()
  },
  watch: {
      '$route': function(to, from, next) {
        //   this.initPage()

      }
  }
}
</script>
