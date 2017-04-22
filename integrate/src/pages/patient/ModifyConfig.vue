<template>
    <div class="addormodify container-fluid content">
        <div class="baseinfo row">
            <template v-for="item in items">
                <component :is="item.code" :obj="item"></component>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                items: [
                    {
                        code: 'name',
                        title: '姓名',
                        ismust: 1,
                        value: '方汉文',
                    },
                    {
                        code: 'name',
                        title: '姓名',
                        ismust: 1,
                        value: '方汉文',
                    },
                    {
                        code: 'sex',
                        title: '性别',
                        ismust: 0,
                        value: 2,
                    },
                    {
                        code: 'birthday',
                        title: '生日',
                        ismust: 1,
                        value: '',
                    },
                    {
                        code: 'birthday',
                        title: '生日',
                        ismust: 1,
                        value: '',
                    },
                    {
                        code: 'birthday',
                        title: '生日',
                        ismust: 1,
                        value: '',
                    },

                ]
            }
        },
        components: {
            'name': function(resolve) {
                require(['../../components/patientinfoconfig/baseinfo/NameTpl.vue'], resolve);
            },
            'sex': function(resolve) {
                require(['../../components/patientinfoconfig/baseinfo/SexTpl.vue'], resolve);
            },
            'birthday': function(resolve) {
                require(['../../components/patientinfoconfig/baseinfo/BirthdayTpl.vue'], resolve);
            }
        },
        created: function() {
            console.log('111111');
        }
    }
</script>