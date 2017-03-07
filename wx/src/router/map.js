const Doctor = {
    template: '<router-view></router-view>',
}
const Patient = {
    template: '<router-view></router-view>',
}
const EmptyTemplate = {
    template: '<router-view></router-view>',
}
module.exports = 
[
    {
        path: '/doctor/',
        name: 'doctor',
        component: Doctor,
        children: [
            {
                path: 'bind',
                name: 'doctor-bind',
                component: function(resolve) {
                  require(['../pages/doctor/BindUser.vue'], resolve);
                },
            },
            {
                path: 'config',
                name: 'doctor-config',
                component: resolve => require(['../pages/doctor/SetConfig.vue'], resolve),
            },
            {
                path: 'modifypwd',
                name: 'doctor-modifypwd',
                component: resolve => require(['../pages/doctor/ModifyPwd.vue'], resolve),
            },
            {
                path: 'info',
                name: 'doctor-info',
                component: resolve => require(['../pages/doctor/Info.vue'], resolve)
            }
        ]
    },
    {
        path: '/patient',
        name: 'patient',
        component: Patient,
        children: [
            {
                path: ':patientid/pipelist',
                name: 'patient-pipelist',
                component: resolve => require(['../pages/patient/PipeList.vue'], resolve)
            },
            {
                path: 'list',
                name: 'patient-list',
                component: resolve => require(['../pages/patient/PatientList.vue'], resolve)
            },
            {
                path: 'active',
                name: 'patient-active',
                component: resolve => require(['../pages/patient/ActivePatients.vue'], resolve)
            }
        ]


    },
    {
        path: '/bedtkt',
        name: 'bedtkt',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'bedtkt-list',
                component: resolve => require(['../pages/bedtkt/BookSickBed.vue'], resolve)
            },
            {
                path: 'historylist',
                name: 'bedtkt-historylist',
                component: resolve => require(['../pages/bedtkt/OperationHistory.vue'], resolve)
            },
            {
                path: 'refuse',
                name: 'bedtkt-refuse',
                component: resolve => require(['../pages/bedtkt/RefuseEnter.vue'], resolve)
            },
            {
                path: 'pass',
                name: 'bedtkt-pass',
                component: resolve => require(['../pages/bedtkt/ConfirmEnter.vue'], resolve)
            },
            {
                path: 'sendentermsg',
                name: 'bedtkt-sendentermsg',
                component: resolve => require(['../pages/bedtkt/SendEnterMsg.vue'], resolve)
            },
            {
                path: 'patientstatus',
                name: 'bedtkt-patientstatus',
                component: resolve => require(['../pages/bedtkt/PatientBookStatus.vue'], resolve)
            },
        ]
    },
    {
        path: '/revisittkt',
        name: 'revisittkt',
        component: EmptyTemplate,
        children: [
            {
                path: 'list',
                name: 'revisittkt-list',
                component: resolve => require(['../pages/revisittkt/Appointment.vue'], resolve)
            }
        ]
    },
    {
        path: '*',
        redirect: '/doctor/bind',
    },
]