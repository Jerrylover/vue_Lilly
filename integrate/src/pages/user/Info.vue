<template>
<div class="container-fluid content">
    <!-- <page-nav active="info"></page-nav> -->
        <breadcrumb pagetitle="个人信息">
            <div name="other-content">
            </div>
        </breadcrumb>
        <div class="page-content">
            <div class="col-lg-6 col-sm-12" style="padding:0">
                <table class="table table-bordered">
                    <tbody>
                    <tr>
                        <td class="col-sm-2">姓名</td>
                        <td>{{myuser.name}}</td>
                    </tr>
                    <tr v-if="myuser.isassistant == 1">
                        <td class="col-sm-2">所属医生</td>
                        <td>{{myuser.doctorname}}</td>
                    </tr>
                    <tr>
                        <td>医院</td>
                        <td>{{myuser.hospitalname}}</td>
                    </tr>
                    <tr>
                        <td>二维码</td>
                        <td>
                            <div v-for="qr in myuser.qrlist">
                                <p>疾病：<span>{{qr.diseasename}}</span></p>
                                <p>公众号：<span>{{qr.wxshopname}}</span></p>
                                <a :href="qr.qrurl" target="_blank">
                                    <img style="max-width:100px;max-height:100px;" :src="qr.qrurl" />
                                </a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
</div>
</template>
<style scoped>

</style>
<script>
import api from '../../config/api.js'
export default {
    data: function() {
        return {
            myuser: '',
        }
    },
    computed: {
    },
    components: {
        'breadcrumb': require('../../components/BreadCrumb.vue'),
    },
    methods: {
        fetchAssistant: function() {
            var that = this;
            api.http({
              url: 'user.info',
              data: {
              },
              successCallback: function(d) {
                  if (d.data) {
                      that.myuser = d.data;
                  }
              }
            })
        },
    },
    created: function() {
        Bus.$emit('make-menu-mini')
        this.fetchAssistant()
    },
    watch: {
        '$route': function() {
        }
    }
}
</script>
