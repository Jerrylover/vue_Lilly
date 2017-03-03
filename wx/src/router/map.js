const Doctor = {
    template: '<div><router-view></router-view></div>',
}
module.exports = 
[
    {
        path: '/bind',
        name: 'bind',
        component: function(resolve) {
            require(['../pages/BindUser.vue'], resolve);
        },
    },
    {
        path: '/doctor/',
        name: 'doctor',
        component: Doctor,
        children: [
            {
                path: 'config',
                name: 'config',
                component: resolve => require(['../pages/doctor/SetConfig.vue'], resolve),
            },
            {
                path: 'modifypwd',
                name: 'modifypwd',
                component: resolve => require(['../pages/doctor/ModifyPwd.vue'], resolve),
            },
            {
                path: 'info',
                name: 'info',
                component: resolve => require(['../pages/doctor/Info.vue'], resolve)
            }
        ]
    },
    {
        path: '/active-patient',
        name: 'active-patient',
        component: resolve => require(['../pages/ActivePatients.vue'], resolve),
        meta: {
            requireBind: true,
        }
    },
    {
        path: '/pipelist/:patientid',
        name: 'pipelist',
        component: resolve => require(['../pages/PipeList.vue'], resolve),
        meta: {
            requireBind: true,
        }
    },
    {
        path: '/booksickbed',
        name: 'booksickbed',
        component: resolve => require(['../pages/BookSickBed.vue'], resolve),
        meta: {
            requireBind: true,
        }
    },
    {
        path: '/refuseenter',
        name: 'refuseenter',
        component: resolve => require(['../pages/RefuseEnter.vue'], resolve),
        meta: {
            requireBind: false,
        }
    },
    {
        path: '/confirmenter',
        name: 'confirmenter',
        component: resolve => require(['../pages/ConfirmEnter.vue'], resolve),
    },
    {
        path: '/sendentermsg',
        name: 'sendentermsg',
        component: resolve => require(['../pages/SendEnterMsg.vue'], resolve),
    },
    {
        path: '/patientbookstatus',
        name: 'patientbookstatus',
        component: resolve => require(['../pages/PatientBookStatus.vue'], resolve),
    },
    {
        path: '/patientlist',
        name: 'patientlist',
        component: resolve => require(['../pages/PatientList.vue'], resolve),
        meta: {
            requireBind: true,
        }
    },
    {
        path: '/cannotenter',
        name: 'cannotenter',
        component: resolve => require(['../pages/PatientCannotEnter.vue'], resolve),
    },
    {
        path: '/operationhistory',
        name: 'operationhistory',
        component: resolve => require(['../pages/OperationHistory.vue'], resolve),
    },
    {
        path: '/appointment',
        name: 'appointment',
        component: resolve => require(['../pages/Appointment.vue'], resolve),
    },
    {
        path: '*',
        redirect: '/bind',
    },
]