import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'webindex',
      auth: true,
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
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/AuditList.vue'], resolve);
          }
        },
        {
          path: 'list',
          name: 'patient-list',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/List.vue'], resolve);
          }
        },
        {
          path: 'new',
          name: 'patient-new',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/Modify.vue'], resolve);
          }
        },
        {
          path: 'new-lungcancer',
          name: 'patient-new-lungcancer',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/ModifyForLungcancer.vue'], resolve);
          }
        },
        {
          path: ':patientid/baseinfo/',
          name: 'patient-baseinfo',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/BaseInfo.vue'], resolve);
          }
        },
        {
          path: ':patientid/baseinfo-lungcancer/',
          name: 'patient-baseinfo-lungcancer',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/BaseInfoForLungcancer.vue'], resolve);
          }
        },
        {
          path: ':patientid/revisitrecords',
          name: 'patient-revisitrecord',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/RevisitRecords.vue'], resolve);
          }
        },
        {
          path: ':patientid/modify',
          name: 'patient-modifybaseinfo',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/Modify.vue'], resolve);
          }
        },
        {
          path: ':patientid/modify-lungcancer',
          name: 'patient-modify-lungcancer-baseinfo',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/ModifyForLungcancer.vue'], resolve);
          }
        },
        {
          path: 'selectdisease',
          name: 'patient-selectdisease',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/SelectDisease.vue'], resolve);
          }
        }
    ]
    },
    {
      path: '/addvisit/:patientid',
      name: 'add-visit',
      auth: true,
      component: function(resolve) {
        require(['../pages/AddVisit.vue'], resolve);
      }
    },
    {
      path: '/checkuptpl/:patientid',
      auth: true,
      component: function(resolve) {
        require(['../pages/checkuptpl/Main.vue'], resolve);
      },
      children: [
        {
          path: '',
          name: 'checkuptpl-zhusu',
          auth: true,
          component: function(resolve) {
            require(['../pages/checkuptpl/Zhusu.vue'], resolve);
          }
        },
        {
          path: 'child/:ename/:name',
          name: 'checkuptpl-child',
          auth: true,
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
          auth: true,
          component: function(resolve) {
            require(['../pages/assistant/Add.vue'], resolve);
          }
        },
        {
          path: 'modify',
          name: 'assistant-modify',
          auth: true,
          component: function(resolve) {
            require(['../pages/assistant/Add.vue'], resolve);
          }
        },
        {
          path: 'forcemodifypassword',
          name: 'assistant-forcemodifypassword',
          auth: true,
          component: function(resolve) {
            require(['../pages/assistant/ForceModifyPassword.vue'], resolve);
          }
        },
        {
          path: 'privilege',
          name: 'assistant-privilege',
          auth: true,
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
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/projectlist.vue'], resolve);
          }
        },
        {
          path: 'addproject',
          name: 'doctorgroup-addproject',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyProject.vue'], resolve);
          }
        },
        {
          path: ':projectid/modifyproject',
          name: 'doctorgroup-modifyproject',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyProject.vue'], resolve);
          }
        },
        {
          path: ':projectid/centerlist',
          name: 'doctorgroup-centerlist',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/centerlist.vue'], resolve);
          }
        },
        {
          path: ':projectid/addcenter',
          name: 'doctorgroup-addcenter',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyCenter.vue'], resolve);
          }
        },
        {
          path: ':projectid/center/:centerid/modifycenter',
          name: 'doctorgroup-modifycenter',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/addOrModifyCenter.vue'], resolve);
          }
        },
        {
          path: 'patientlist',
          name: 'doctorgroup-patientlist',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/patientlist.vue'], resolve);
          }
        },
        {
          path: ':projectid/project/:centerid/centerdetail',
          name: 'doctorgroup-centerdetail',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/centerdetail.vue'], resolve);
          }
        },
        {
          path: ':projectid/project/:centerid/importpatients',
          name: 'doctorgroup-importpatients',
          auth: true,
          component: function(resolve) {
            require(['../pages/doctorgroup/importpatients.vue'], resolve);
          }
        },
        {
          path: ':patientid/revisitinfo',
          name: 'doctorgroup-revisitinfo',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/RevisitRecords.vue'], resolve);
          }
        },
        {
          path: ':patientid/patientbaseinfo',
          name: 'doctorgroup-baseinfo',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/BaseInfo.vue'], resolve);
          }
        },
        {
          path: ':patientid/patientbaseinfo-lungcancer/',
          name: 'doctorgroup-baseinfo-lungcancer',
          auth: true,
          component: function(resolve) {
            require(['../pages/patient/BaseInfoForLungcancer.vue'], resolve);
          }
        },
    ]
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
          auth: true,
          component: function(resolve) {
            require(['../pages/user/Info.vue'], resolve);
          }
        },
        {
          path: 'modifypassword',
          name: 'user-modifypassword',
          auth: true,
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
