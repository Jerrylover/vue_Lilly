<template>
    <div>
    <app-header active='patient'></app-header>
    <div class="container-fluid content">
        <div class="row">
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
    <app-footer></app-footer>
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
            diseaseid: '',
        }
    },
    components: {
        'appHeader': require('../../components/Header.vue'), //头组件
        'appFooter': require('../../components/Footer.vue'), //尾组件

    },
    computed: {
        'diseases': function() {
            return common.getDiseases();
        }
    },
    route: {
        data: function(transition) {
            this.diseaseid = common.getDiseaseId();
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

    }
}
</script>
