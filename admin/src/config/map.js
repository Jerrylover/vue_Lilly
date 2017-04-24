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
            'list': {
                name: 'patient-list',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/List.vue'], resolve)
                },
                subRoutes: {
                    ':patientid/visitinfo': {
                        name: 'patient-list-visitinfo',
                        auth: true,
                        component: function(resolve) {
                            require(['../pages/patient/Visitinfo.vue'], resolve)
                        }
                    },
                    ':patientid/aftertreatment': {
                        name: 'patient-list-aftertreatment',
                        auth: true,
                        component: function(resolve) {
                            require(['../pages/patient/Aftertreatment.vue'], resolve)
                        }
                    }
                }
            },
            ':patientid/prescription': {
                name: 'patient-prescription',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/Prescription.vue'], resolve)
                }
            },
            ':patientid/appointment': {
                name: 'patient-appointment',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/Appointment.vue'], resolve)
                }
            },
            ':patientid/paperlist': {
                name: 'patient-paperlist',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/Paperlist.vue'], resolve)
                }
            },
            ':patientid/paperone': {
                name: 'patient-paperone',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/Paperone.vue'], resolve)
                }
            },
            ':patientid/medicalpic': {
                name: 'patient-medicalpic',
                auth: true,
                component: function(resolve) {
                    require(['../pages/patient/MedicalPic.vue'], resolve)
                }
            }
            // 'visitofcanlendar': {
            //     name: 'patient-visitofcanlendar',
            //     auth: true,
            //     component: function(resolve) {
            //         require(['../pages/patient/VisitOfCanlendar.vue'], resolve)
            //     }
            // }
        }
    },
    '/user': {//个人中心
        name: 'user',
        auth: true,
        component: function(resolve) {
            require(['../pages/User.vue'], resolve)
        }
    },
    '/schedule/visit': {//设置门诊时间
      name: 'schedule-visit',
      auth: true,
      component: function(resolve) {
          require(['../pages/schedule/Visit.vue'], resolve)
      }
    },
    '/schedule/revisit': {//复诊日历
      name: 'schedule-revisit',
      auth: true,
      component: function(resolve) {
          require(['../pages/schedule/VisitOfCanlendar.vue'], resolve)
      }
    },
    '/sickbed/listofpendingoperation': {
        name: 'sickbed-listofpendingoperation',
        auth: true,
        component: function(resolve) {
            require(['../pages/sickbedorder/ListOfPendingOperation.vue'], resolve);
        }
    },
    '/sickbed/operation-history': {
        name: 'operation-history',
        auth: true,
        component: function(resolve) {
            require(['../pages/sickbedorder/DoctorOperateHistory.vue'], resolve);
        }
    },
    '/doctormemo': {
        component: {
            template: '<router-view></router-view>'
        },
        subRoutes: {
            'list': {
                name: 'doctormemo-list',
                auth: true,
                component: function(resolve) {
                    require(['../pages/doctormemo/List.vue'], resolve)
                },
            },
        }
    }
    // '/schedule/revisit4patient': {//约复诊
    //   name: 'schedule-revisit4patient',
    //   auth: true,
    //   component: function(resolve) {
    //       require(['../pages/schedule/Revist4Patient.vue'], resolve)
    //   }
    // }

}
