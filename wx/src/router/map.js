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
        path: '/appointment',
        name: 'appointment',
        component: resolve => require(['../pages/Appointment.vue'], resolve),
    },
    {
        path: '*',
        redirect: '/bind',
        // meta: {
        //     requireBind: true,
        // }
    },

]