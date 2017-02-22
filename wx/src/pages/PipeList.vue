<template>
    <div class="pipe-list">
        <mt-header fixed title="医助交流">
            <router-link :to="{name: 'active-patient', query: {'thedate':thedate}}" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="body">
            <div style="margin: 5px; padding: 5px;border-radius: 4px; text-align: left">
                <span>{{patient.name}}&nbsp;&nbsp;{{patient.sexstr}}&nbsp;&nbsp;{{patient.agestr}}</span>
            </div>
            <div class="filterArea">
                <a :class="{'filterActive': filterActive == 'all'}" href="javascript:" @click="clickAll">全部</a><a :class="{'filterActive': filterActive == 'patient'}" href="javascript:" @click="clickPatient">患者</a><a :class="{'filterActive': filterActive == 'auditor'}" href="javascript:" @click="clickAudit">医助</a>
            </div>
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="list-style-type: none; padding:0px">
                <li v-for="pipe in pipes">
                    <div :class="{'pipe-from-audit': pipe.owner_type == 'Auditor', 'pipe-from-patient': pipe.owner_type == 'Patient'}" style="padding: 10px 10px 10px 0px">
                        <div>
                            <span class="pipe-title">{{pipe.title}}</span>
                            <span style="padding:5px 10px 10px 10px; float: right; color: #555">{{pipe.createtime}}</span>
                            <!-- <div style="clear: both;"></div> -->
                        </div>
                        <div>
                            <p style="clear: both;word-break: break-all; text-align: left; margin-left: 10px;padding: 10px 5px 5px 0px">{{pipe.content}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import api from '../config/api.js'
    module.exports = {
        data: function() {
            return {
                thedate: '',
                openid: '',
                filter: 'all',
                filterActive: 'all',
                patient:{},
                pipes: [
                ]
            }
        },
        beforeRouteEnter(to, from, next) {
            var openid = localStorage.getItem('_openid_');
            var thedate = to.query.thedate;
            console.log(thedate);
            $.ajax({
                url: api.get('pipe.pipelist'),
                type: 'post',
                dataType: 'json',
                data: {
                    openid: openid,
                    patientid: to.params.patientid,
                }
            }).done(function(response){
                if (response.errno == 0) {
                    var data = response.data;
                    next(vm => {
                        vm.pipes = data.pipes;
                        vm.patient = data.patient;
                        vm.openid = openid;
                        vm.thedate = thedate;
                    })
                }
            })
        },
        methods: {
            clickAll: function() {
                if ($.trim(this.filter) == "all") {
                    return ;
                }
                this.filter = 'all';
                this.filterActive = 'all';
                this.fetchData();
            },
            clickPatient: function() {
                if ($.trim(this.filter) == "patient") {
                    return ;
                }
                this.filter = 'patient';
                this.filterActive = 'patient';
                this.fetchData();
            },
            clickAudit: function() {
                if ($.trim(this.filter) == "auditor") {
                    return ;
                }
                this.filter = 'auditor';
                this.filterActive = 'auditor';
                this.fetchData();
            },
            loadMore: function(){
                this.loading = true;
                this.loadMoreData();
            },
            fetchData: function() {
                var self = this;
                var pipeid = '';
                if (self.pipes.length != 0 && self.pipes[self.pipes.length -1].pipeid != 'undefined') {
                    pipeid = self.pipes[self.pipes.length-1].pipeid;
                }
                var openid = localStorage.getItem('_openid_');
                self.openid = openid,
                $.ajax({
                    url: api.get('pipe.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: self.openid,
                        patientid: self.patient.patientid,
                        filter: self.filter,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.pipes = data.pipes;
                    }
                })
            },
            loadMoreData: function() {
                var self = this;
                var pipeid = '';
                if (self.pipes.length != 0 && self.pipes[self.pipes.length -1].pipeid != 'undefined') {
                    pipeid = self.pipes[self.pipes.length-1].pipeid;
                }
                $.ajax({
                    url: api.get('pipe.pipelist'),
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        openid: self.openid,
                        lastpipeid: pipeid,
                        patientid: self.patient.patientid,
                        filter: self.filter,
                    }
                }).done(function(response){
                    if (response.errno == 0) {
                        var data = response.data;
                        self.pipes = self.pipes.concat(data.pipes);
                        self.loading = false;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .pipe-from-audit {
        border: 1px solid #ccc;
        border-radius: 0px;
        margin:5px;
    }
    .pipe-from-patient {
         border: 1px solid #ccc;
        border-radius: 0px;
        margin:5px;
    }
    .filterArea {
        margin-top: 10px;
    }
    .filterArea a {
        border: 1px solid #bbb;
        display: inline-block;
        width: 32%;
        color: #17a0ff;
        /*color: #17a0ff;*/
        /*margin-right: -2px;*/
        margin-left: -1px;
        text-decoration: none;
        padding: 10px 0px;
        /*border-radius: 4px;*/
    }
    .pipe-from-audit .pipe-title {
        float: left;
        margin: 0px 0px 0px 0px;
        padding: 5px 10px; 
        background-color: #37b031; 
        border-top-right-radius: 16px; 
        border-bottom-right-radius: 16px; 
        color: #fff
    }
    .pipe-from-patient .pipe-title {
        float: left;
        margin: 0px 0px 0px 0px;
        padding: 5px 10px; 
        background-color: #17a0ff; 
        border-top-right-radius: 16px; 
        border-bottom-right-radius: 16px; 
        color: #fff
    }
    .filterArea a.filterActive {
        background-color: #17a0ff;
        color: #fff;
    }
</style>