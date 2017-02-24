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
        path: '/waitpatientconfirm',
        name: 'waitpatientconfirm',
        component: resolve => require(['../pages/WaitPatientConfirm.vue'], resolve),
        component: function(resolve){
            require(['../pages/WaitPatientConfirm.vue'], resolve)
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
        // meta: {
        //     requireBind: true,
        // }
    },

]