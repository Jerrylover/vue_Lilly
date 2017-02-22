module.exports = {
    '/login': {
        name: 'login',
        component: function(resolve) {
            require(['../pages/Login.vue'], resolve)
        }
    },
    '/patient': {
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/auditlist': {
                name: 'patient-auditlist',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/AuditList.vue'], resolve);
                }
            },
            '/list': {
                name: 'patient-list',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/List.vue'], resolve);
                }
            },
            '/new': {
                name: 'patient-new',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/Modify.vue'], resolve);
                }
            },
            '/new-lungcancer': {
                name: 'patient-new-lungcancer',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/ModifyForLungcancer.vue'], resolve);
                }
            },
            '/:patientid/baseinfo/': {
                name: 'patient-baseinfo',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/BaseInfo.vue'], resolve);
                }
            },
            '/:patientid/baseinfo-lungcancer/': {
                name: 'patient-baseinfo-lungcancer',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/BaseInfoForLungcancer.vue'], resolve);
                }
            },
            '/:patientid/revisitrecords': {
                name: 'patient-revisitrecord',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/RevisitRecords.vue'], resolve);
                }
            },
            '/:patientid/modify': {
                name: 'patient-modifybaseinfo',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/Modify.vue'], resolve);
                }
            },
            '/:patientid/modify-lungcancer': {
                name: 'patient-modifybaseinfo',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/ModifyForLungcancer.vue'], resolve);
                }
            },
            '/selectdisease': {
                name: 'patient-selectdisease',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/SelectDisease.vue'], resolve);
                }
            }
        }
    },
    '/addvisit/:patientid': {
        name: 'add-visit',
        auth: true,
        component: function(resolve) {
            require(['../pages/AddVisit.vue'], resolve);
        }
    },
    '/checkuptpl/:patientid': {
        name: 'checkuptpl',
        auth: true,
        component: function(resolve) {
            require(['../pages/checkuptpl/Main.vue'], resolve);
        },
        subRoutes: {
            '/': {
                name: 'checkuptpl-main',
                auth: true,
                component: function(resolve) {
                    require(['../pages/checkuptpl/Zhusu.vue'], resolve);
                }
            },
            '/child/:ename/:name': {
                name: 'checkuptpl-child',
                auth: true,
                component: function(resolve) {
                    require(['../pages/checkuptpl/Child.vue'], resolve);
                }
            }
        }
    },
    '/manager': {
        name: 'manager',
        component: function(resolve) {
            require(['../pages/manage/Index.vue'], resolve)
        }
    },
    '/log': {
        name: 'log',
        component: function(resolve) {
            require(['../pages/manage/Log.vue'], resolve)
        }
    },
    '/assistant': {
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/add': {
                name: 'assistant-add',
                auth: true,
                component: function(resolve) {
                    require(['../pages/assistant/Add.vue'], resolve);
                }
            },
            '/modify': {
                name: 'assistant-modify',
                auth: true,
                component: function(resolve) {
                    require(['../pages/assistant/Add.vue'], resolve);
                }
            },
            '/forcemodifypassword': {
                name: 'assistant-forcemodifypassword',
                auth: true,
                component: function(resolve) {
                    require(['../pages/assistant/ForceModifyPassword.vue'], resolve);
                }
            },
            '/privilege': {
                name: 'assistant-privilege',
                auth: true,
                component: function(resolve) {
                    require(['../pages/assistant/Privilege.vue'], resolve);
                }
            }
        }
    },
    '/doctorgroup': {
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/projectlist': {
                name: 'doctorgroup-projectlist',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/projectlist.vue'], resolve);
                }
            },
            '/addproject': {
                name: 'doctorgroup-addproject',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/addOrModifyProject.vue'], resolve);
                }
            },
            ':projectid/modifyproject': {
                name: 'doctorgroup-modifyproject',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/addOrModifyProject.vue'], resolve);
                }
            },
            ':projectid/centerlist': {
                name: 'doctorgroup-centerlist',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/centerlist.vue'], resolve);
                }
            },
            ':projectid/addcenter': {
                name: 'doctorgroup-addcenter',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/addOrModifyCenter.vue'], resolve);
                }
            },
            ':projectid/center/:centerid/modifycenter': {
                name: 'doctorgroup-modifycenter',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/addOrModifyCenter.vue'], resolve);
                }
            },
            '/patientlist': {
                name: 'doctorgroup-patientlist',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/patientlist.vue'], resolve);
                }
            },
            ':projectid/project/:centerid/centerdetail': {
                name: 'doctorgroup-centerdetail',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/centerdetail.vue'], resolve);
                }
            },
            ':projectid/project/:centerid/importpatients': {
                name: 'doctorgroup-importpatients',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctorgroup/importpatients.vue'], resolve);
                }
            },
            ':patientid/revisitinfo': {
                name: 'doctorgroup-revisitinfo',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/RevisitRecords.vue'], resolve);
                }
            },
            ':patientid/patientbaseinfo': {
                name: 'doctorgroup-baseinfo',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/BaseInfo.vue'], resolve);
                }
            },
            '/:patientid/patientbaseinfo-lungcancer/': {
                name: 'doctorgroup-baseinfo-lungcancer',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/BaseInfoForLungcancer.vue'], resolve);
                }
            },
        }
    },
    '/user': {
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            '/info': {
                name: 'user-info',
                auth: true,
                component: function(resolve) {
                    require(['../pages/user/Info.vue'], resolve);
                }
            },
            '/modifypassword': {
                name: 'user-modifypassword',
                auth: true,
                component: function(resolve) {
                    require(['../pages/user/ModifyPassword.vue'], resolve);
                }
            }
        }
    }
}
