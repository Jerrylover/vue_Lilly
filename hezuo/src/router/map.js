const EmptyTemplate = {
    template: '<router-view></router-view>',
}
module.exports =
[
    {
        path: '/show',
        name: 'show',
        component: EmptyTemplate,
        children: [
            {
                path: 'info',
                name: 'show-info',
                component: resolve => require(['../pages/show/Info.vue'], resolve)
            }
        ]


    },
    {
        path: '/statistic',
        name: 'statistic',
        component: EmptyTemplate,
        children: [
            {
                path: 'panel',
                name: 'statistic-panel',
                component: resolve => require(['../pages/statistic/Panel.vue'], resolve)
            }
        ]


    },
    {
        path: '/doctor/',
        name: 'doctor',
        component: EmptyTemplate,
        children: [
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
        component: EmptyTemplate,
        children: [
            {
                path: ':patientid/main',
                name: 'patient-main',
                component: resolve => require(['../pages/patient/PatientMain.vue'], resolve)
            },
            {
                path: ':patientid/baseinfo',
                name: 'patient-baseinfo',
                component: resolve => require(['../pages/patient/BaseInfo.vue'], resolve)
            },
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
        path: '/paper',
        name: 'paper',
        component: EmptyTemplate,
        children: [
            {
                path: 'tpllist4onepatient',
                name: 'paper-tpllist4onepatient',
                component: resolve => require(['../pages/paper/PaperTplList.vue'], resolve)
            },
            {
                path: ':papertplid/list',
                name: 'paper-list',
                component: resolve => require(['../pages/paper/PaperList.vue'], resolve)
            },
            {
                path: ':paperid/one',
                name: 'paper-one',
                component: resolve => require(['../pages/paper/PaperOne.vue'], resolve)
            },
        ]
    },
    {
        path: '/error',
        name: 'error',
        component: resolve => require(['../pages/doctor/error.vue'], resolve)
    },
    {
        path: '/',
        name: 'empty',
        component: resolve => require(['../pages/patient/PatientList.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/error',
    }
]
