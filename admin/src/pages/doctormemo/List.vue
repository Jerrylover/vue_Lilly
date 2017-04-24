<template>
    <div class="doctormemo-list">
        <app-header active="doctormemo"></app-header>
        <div class=" container-fluid content">
            <table class="table table-bordered table-hover fctable">
                <thead>
                    <tr>
                        <th>患者</th>
                        <th>提交日期</th>
                        <th>代办日期</th>
                        <th>代办内容</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='doctormemo in doctormemoarr'>
                        <td>{{doctormemo.patient_name}}</td>
                        <td>{{doctormemo.createday}}</td>
                        <td>{{doctormemo.thedate}}</td>
                        <td>{{doctormemo.content}}</td>
                    </tr>
                    <tr v-if="doctormemoarr.length == 0">
                        <td colspan="11" class='text-center'>暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
    import api from '../../config/api.js';
    export default {
        data: function() {
            return {
                doctormemoarr: [],
            }
        },
        route: {
            data: function() {
                var self = this;
                $.ajax({
                    url: api.get('doctormemo.list'),
                    type: 'POST',
                    dataType: 'json',
                    data: {

                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        self.doctormemoarr = response.data.doctormemoarr;
                    }
                })
            }
        },
        components: {
            'appHeader': require('../../components/Header.vue'),
            'appFooter': require('../../components/Footer.vue'),
            'pagination': require('../../components/Pagination.vue'),
        }
    }
</script>