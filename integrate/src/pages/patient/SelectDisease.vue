<template>
    <div class="container-fluid content">
        <breadcrumb :data="breadcrumbData" pagetitle="新增患者选择疾病">
        <div slot="other-content">
        </div>
    </breadcrumb>

        <div class="page-content">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">选择疾病</h3>
                </div>
                <div class="panel-body form">
                    <div class="col-sm-4 form-group">
                        <select class="form-control" v-model="diseaseid">
                            <option v-for="disease in diseases" :value="disease.diseaseid">{{disease.name}}</option>
                        </select>
                    </div>
                    <div class="col-sm-1 form-group">
                        <button class="btn btn-primary" @click="selectDisease">选择</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
import api from '../../config/api.js'
import common from '../../lib/common.js'
export default {
    data: function() {
        return {
            breadcrumbData: [
                {
                    name: '患者列表',
                    link: {name: 'patient-list'}
                }
            ],
            diseaseid: '',
        }
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    computed: {
        'diseases': function() {
            return common.getDiseases();
        }
    },
    methods: {
        selectDisease: function(e) {
            localStorage.setItem('_diseaseid_', this.diseaseid)
            // console.log(this.$route);
            this.$router.push({
                path: this.$route.query.from,
                query: {
                    diseaseid: this.diseaseid
                }
            });
        }
    },
    filters: {

    },
    created: function() {
        this.diseaseid = common.getDiseaseId();
    },
    watch: {
        '$route': function(to, from) {
            this.diseaseid = common.getDiseaseId();
        }
    }
}
</script>
