<template>
<div class="nav-menu">
    <div class="menu-container" :class="{'menu-min': ismini}">
        <div class="text-center div-toggle" @click.stop="toggleMenu"><i class="menu-fa fa" :class="{'fa-angle-double-left' : !ismini, 'fa-angle-double-right' : ismini}"></i></div>

        <ul class="el-menu">
            <li class="el-menu-item" :class="{'is-active': menu.isactive}" style="padding-left: 20px;" v-for="(menu, index) in menuData" @click="clickMenu(menu)">
                <el-tooltip placement="top" v-show="ismini">
                    <div slot="content">{{menu.name}}</div>
                    <i :class="menu.icon"></i>
                </el-tooltip>
                <i :class="menu.icon" v-show="!ismini"></i>
                <span class="menu-text">{{menu.name}}</span>
            </li>
        </ul>
    </div>
    <div class="submenu-container" v-show="isShowSubMenu">
        <ul class="el-menu submenu">
            <li class="el-menu-item submenu" :class="{'is-active': one.isactive}" v-for="(one, index) in subMenuData" @click="clickSubMenu(index)">
                <span class="menu-text">
                    {{one.name}}
                </span>
            </li>
        </ul>
    </div>
    <div  class="submenu-container" v-show="showThirdLevelMenu">
        <ul class="el-menu submenu">
            <li class="menu-title">{{patientname}}</li>
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
        padding: 2px 0
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
        width: 150px;
        float: left;
        margin-left: -15px;
        border-right: 1px solid #ccc;
    }
    .menu-container:before {
        content: "";
        display: block;
        width: 150px;
        position: fixed;
        bottom: 0;
        top: 0;
        z-index: -1;
        background-color: #f2f2f2;
        border: 1px solid #ccc;
        border-width: 0 1px 0 0;
    }
    /*二级菜单*/
    .submenu-container {
        width: 150px;
        float: left;
        margin-left: 0;
        border-right: 1px solid #ccc;
    }
    .submenu-container:before {
        content: "";
        display: block;
        width: 150px;
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

    .el-menu > li {
        border-bottom: 1px solid #ddd;
    }
    .menu-min.menu-container {
        width:50px;
    }
    .menu-min.menu-container:before {
        width:50px;
    }
    .menu-min .menu-text {
        display:none
    }
    .menu-min .el-menu > li {
        border: 0;
        padding: 0;
    }

    .el-menu-item.is-active {
        color: #fff;
        background-color: #20a0ff;
        border-right: 0;
    }
    .nav-menu {
        padding-left: 10px;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .menu-title {
        padding: 5px 10px;
        font-size: 17px;
        text-align: center;
        font-weight: 700;
        color: #008DB9;
    }
    .fa {
        margin-right: 10px
    }
    </style>
<style>
    .menu-min i.el-submenu__icon-arrow.el-icon-arrow-down {
        display:none !important;
    }
</style>
<script>
import Bus from '../lib/bus.js'
import common from '../lib/common.js'
import libpatient from '../lib/patient.js'
export default {
  data: function() {
    return {
        patientid: '',
        patientname: '',
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
            name: '门诊',
            icon: 'fa fa-user-md',
            isactive: false,
            submenus: [
                {
                    name: '复诊日历',
                    link: '',
                    isactive: false,
                },
                {
                    name: '设置门诊时间',
                    link: '',
                    isactive: false,
                }
            ]
        },
        {
            name: '住院预约',
            icon: 'fa fa-bed',
            isactive: false,
            submenus: [
                {
                    name: '预约列表',
                    link: '',
                    isactive: false,
                },
                {
                    name: '操作记录',
                    link: '',
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
            name: '管理',
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
                    name: '助理账号',
                    link: {name: 'manager'},
                    isactive: false,
                }
            ]
        },
        {
            name: '数据统计',
            icon: 'fa fa-pie-chart',
            isactive: false,
            submenus: [

            ]
        },
        {
            name: '操作日志',
            icon: 'fa fa-history',
            isactive: false,
            link: {name: 'log'},
            submenus: [

            ]
        }
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
    }
  },
  methods: {
    toggleMenu: function() {
        this.ismini = !this.ismini
        this.$nextTick(function() {
            Bus.$emit('menu-mini', this.ismini)
        })
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
            this.ismini = true
            var _activeSubMenu = menu.submenus[0]
            menu.submenus.forEach(function(one) {
                one.isactive = false
            })
            _activeSubMenu.isactive = true
            this.activeSubmenu = _activeSubMenu.name//记录active的二级菜单
            localStorage.setItem('_activeSubmenu_', this.activeSubmenu)
            this.$router.push(_activeSubMenu.link)
            this.$nextTick(function() {
                Bus.$emit('menu-mini', this.ismini)
            })

        } else {
            this.ismini = false
            if (menu.link != '' && menu.link != undefined) {
                this.$router.push(menu.link)
            }
        }
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
            default:

        }
    },
    initPage: function() {
        var that = this
        this.menuData.forEach(function(menu) {
            if (menu.isactive) {
                that.subMenuData = menu.submenus
            }
        })
        if (this.doctorUserName == 'xuyan') {
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
    },
    showGrandsonMenu: function(patientid, patientname, pagename) {//专门为patient做的三级菜单
        this.showThirdLevelMenu = true
        this.ismini = true
        this.showSubMenu = false
        this.patientid = patientid
        this.patientname = patientname
        this.patientGrandsonMenus.forEach(function(one) {
            if (one.name == pagename) {
                one.isactive = true
            } else {
                one.isactive = false
            }
        })
    }
  },
  mounted: function() {
      this.$nextTick(function() {
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
          this.initPage()
          Bus.$on('show-patient-third-level-menu', this.showGrandsonMenu)
          var that = this
          Bus.$on('hide-patient-third-level-menu', function() {
              that.showThirdLevelMenu = false
              that.ismini = false
          })
          Bus.$on('make-menu-mini', function() {

              if (that.subMenuData.length > 0) {
                    that.ismini = true
              }
          })
      })

  }
}
</script>
