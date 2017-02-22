<template>
    <div class="refuse-enter">
        <mt-header fixed title="拒绝入院">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <div>
            <p style="width: 80%; margin: auto">请填写拒绝患者入院的理由,该理由内容会发送至患者服务号中。可不填写。</p>
            <div style="width: 80%; margin: auto; text-align: left">
                <textarea rows="20" style="border: 1px solid #ccc; width: 90%;padding: 10px;display: block; margin: auto;" v-model="content"></textarea>
                <div style="margin-top: 10px">
                    <div style="display: inline-block; line-height: 1.6; float: left">
                        <input id="defaultreason" type="checkbox" name="" v-model="is_set_default">
                    </div>
                    <div style="display: inline-block">
                        <label for="defaultreason" style="font-size: 14px;">保存为默认理由</label>
                    </div>
                </div>
            </div>
        </div>
        <div style="clear: both"></div>
        <div class="footer" style="position: fixed; bottom: 0px; width: 100%;left: 0px">
            <a class="cn-btn-cancel" href="javascript:" style="width: 50%" @click="clickCancel">取消</a><!--
            --><a class="cn-btn-confirm" href="javascript:" style="width:50%" @click="clickConfirm">确认拒绝入院</a>
        </div>
    </div>
</template>
<script>
    import common from '../lib/common.js'
    import api from '../config/api.js'
    module.exports = {
        data: function() {
            return {
                openid: '',
                content: '',
                is_set_default: false,
                bedtktid: '',
            }
        },
        methods: {
            'clickCancel': function() {
                this.$route.go(-1);
            },
            'clickConfirm': function() {
                // $.ajax({
                //     url: api.get('sickbed.refusejson'),
                //     type: 'POST',
                //     dataType: 'json',
                //     data: {
                //         openid: this.openid,
                //         content: this.content,
                //         is_set_default: this.is_set_default,
                //         bedtktid: this.bedtktid,
                //     }
                // }).done(function()
                var url = api.get('sickbed.refusejson');
                var params = {
                    openid: this.openid,
                    content: this.content,
                    is_set_default: this.is_set_default,
                    bedtktid: this.bedtktid,
                }
                console.log(params);
                common.post(url, params, function(response){
                    console.log(response);
                })

            }
        },
        created(){
            this.openid = localStorage.getItem('_openid_');
            console.log(this.openid);
        },
        watch: {
            '$route': function(to, from) {

            }
        }
    }
</script>
<style scoped>
    .footer a {
        display: inline-block;
        /*width: 50%;*/
        padding: 10px 0px;
        text-decoration: none;
        color: #fff;
    }
</style>