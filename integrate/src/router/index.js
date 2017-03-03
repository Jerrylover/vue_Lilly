import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'webindex',
      meta: {auth: true},
      redirect: '/patient/list'
    },
    {
      path: '/login',
      name: 'login',
      component: function(resolve) {
        require(['../pages/Login.vue'], resolve)
      }
    },
    {
      path: '/patient',
      component: {
        template: '<router-view></router-view>'
      },
      children: [
        {
          path: 'auditlist',
          name: 'patient-auditlist',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/AuditList.vue'], resolve);
          }
        },
        {
          path: 'list',
          name: 'patient-list',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/List.vue'], resolve);
          }
        },
        {
          path: 'new',
          name: 'patient-new',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/Modify.vue'], resolve);
          }
        },
        {
          path: 'new-lungcancer',
          name: 'patient-new-lungcancer',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/ModifyForLungcancer.vue'], resolve);
          }
        },
        {
          path: ':patientid/baseinfo/',
          name: 'patient-baseinfo',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/BaseInfo.vue'], resolve);
          }
        },
        {
          path: ':patientid/baseinfo-lungcancer/',
          name: 'patient-baseinfo-lungcancer',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/BaseInfoForLungcancer.vue'], resolve);
          }
        },
        {
          path: ':patientid/revisitrecords',
          name: 'patient-revisitrecord',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/RevisitRecords.vue'], resolve);
          }
        },
        {
          path: ':patientid/modify',
          name: 'patient-modifybaseinfo',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/Modify.vue'], resolve);
          }
        },
        {
          path: ':patientid/modify-lungcancer',
          name: 'patient-modify-lungcancer-baseinfo',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/ModifyForLungcancer.vue'], resolve);
          }
        },
        {
          path: 'selectdisease',
          name: 'patient-selectdisease',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/SelectDisease.vue'], resolve);
          }
        },
        {
          name: 'patient-prescription',//开用药
          path: ':patientid/prescription',
          meta: {auth: true},
          component: function(resolve) {
              require(['../pages/patient/Prescription.vue'], resolve)
          }
        },
        {
            name: 'patient-appointment',//患者约复诊
            path: ':patientid/appointment',
            meta: {auth: true},
            component: function(resolve) {
                require(['../pages/patient/Appointment.vue'], resolve)
            }
        },
        {
            name: 'patient-paperlist',
            path: ':patientid/paperlist',
            meta: {auth: true},
            component: function(resolve) {
                require(['../pages/patient/Paperlist.vue'], resolve)
            }
        },
        {
            name: 'patient-paperone',
            path: ':patientid/paperone',
            meta: {auth: true},
            component: function(resolve) {
                require(['../pages/patient/Paperone.vue'], resolve)
            }
        },
    ]
    },
    {
      path: '/addvisit/:patientid',
      name: 'add-visit',
      meta: {auth: true},
      component: function(resolve) {
        require(['../pages/AddVisit.vue'], resolve);
      }
    },
    {
      path: '/checkuptpl/:patientid',
      meta: {auth: true},
      component: function(resolve) {
        require(['../pages/checkuptpl/Main.vue'], resolve);
      },
      children: [
        {
          path: '',
          name: 'checkuptpl-zhusu',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/checkuptpl/Zhusu.vue'], resolve);
          }
        },
        {
          path: 'child/:ename/:name',
          name: 'checkuptpl-child',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/checkuptpl/Child.vue'], resolve);
          }
        }
    ]
    },
    {
      path: '/manager',
      name: 'manager',
      component: function(resolve) {
        require(['../pages/manage/Index.vue'], resolve)
      }
    },
    {
      path: '/log',
      name: 'log',
      component: function(resolve) {
        require(['../pages/manage/Log.vue'], resolve)
      }
    },
    {
      path: '/assistant',
      component: {
        template: '<router-view></router-view>'
      },
      children: [
        {
          path: 'add',
          name: 'assistant-add',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/assistant/Add.vue'], resolve);
          }
        },
        {
          path: 'modify',
          name: 'assistant-modify',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/assistant/Add.vue'], resolve);
          }
        },
        {
          path: 'forcemodifypassword',
          name: 'assistant-forcemodifypassword',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/assistant/ForceModifyPassword.vue'], resolve);
          }
        },
        {
          path: 'privilege',
          name: 'assistant-privilege',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/assistant/Privilege.vue'], resolve);
          }
        }
    ]
    },
    {
      path: '/doctorgroup',
      component: {
        template: '<router-view></router-view>'
      },
      children: [
        {
          path: 'projectlist',
          name: 'doctorgroup-projectlist',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/projectlist.vue'], resolve);
          }
        },
        {
          path: 'addproject',
          name: 'doctorgroup-addproject',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyProject.vue'], resolve);
          }
        },
        {
          path: ':projectid/modifyproject',
          name: 'doctorgroup-modifyproject',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyProject.vue'], resolve);
          }
        },
        {
          path: ':projectid/centerlist',
          name: 'doctorgroup-centerlist',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/centerlist.vue'], resolve);
          }
        },
        {
          path: ':projectid/addcenter',
          name: 'doctorgroup-addcenter',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyCenter.vue'], resolve);
          }
        },
        {
          path: ':projectid/center/:centerid/modifycenter',
          name: 'doctorgroup-modifycenter',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyCenter.vue'], resolve);
          }
        },
        {
          path: 'patientlist',
          name: 'doctorgroup-patientlist',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/patientlist.vue'], resolve);
          }
        },
        {
          path: ':projectid/project/:centerid/centerdetail',
          name: 'doctorgroup-centerdetail',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/centerdetail.vue'], resolve);
          }
        },
        {
          path: ':projectid/project/:centerid/importpatients',
          name: 'doctorgroup-importpatients',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/doctorgroup/importpatients.vue'], resolve);
          }
        },
        {
          path: ':patientid/revisitinfo',
          name: 'doctorgroup-revisitinfo',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/RevisitRecords.vue'], resolve);
          }
        },
        {
          path: ':patientid/patientbaseinfo',
          name: 'doctorgroup-baseinfo',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/BaseInfo.vue'], resolve);
          }
        },
        {
          path: ':patientid/patientbaseinfo-lungcancer/',
          name: 'doctorgroup-baseinfo-lungcancer',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/patient/BaseInfoForLungcancer.vue'], resolve);
          }
        },
    ]
    },
    {//设置门诊时间
      name: 'schedule-visit',
      path: '/schedule/visit',
      meta: {auth: true},
      component: function(resolve) {
          require(['../pages/schedule/Visit.vue'], resolve)
      }
    },
    {//复诊日历
      name: 'schedule-revisit',
      path: '/schedule/revisit',
      meta: {auth: true},
      component: function(resolve) {
          require(['../pages/schedule/VisitOfCanlendar.vue'], resolve)
      }
    },
    {
        name: 'sickbed-listofpendingoperation',
        path: '/sickbed/listofpendingoperation',
        meta: {auth: true},
        component: function(resolve) {
            require(['../pages/sickbedorder/ListOfPendingOperation.vue'], resolve);
        }
    },
    {
        name: 'operation-history',
        path: '/sickbed/operation-history',
        meta: {auth: true},
        component: function(resolve) {
            require(['../pages/sickbedorder/DoctorOperateHistory.vue'], resolve);
        }
    },
    {
      path: '/user',
      component: {
        template: '<router-view></router-view>'
      },
      children: [
        {
          path: 'info',
          name: 'user-info',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/user/Info.vue'], resolve);
          }
        },
        {
          path: 'modifypassword',
          name: 'user-modifypassword',
          meta: {auth: true},
          component: function(resolve) {
            require(['../pages/user/ModifyPassword.vue'], resolve);
          }
        }
    ]
    },
    {
        path: '*',
        redirect: '/'
    }
  ]
})
