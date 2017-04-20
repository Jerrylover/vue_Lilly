<template>
    <div class="col-lg-4 col-sm-4">
        <label class="col-lg-3 col-sm-3">生日</label>
        <div class="col-lg-8 col-sm-8 clearPadding">
            <fc-date v-model="localObj.value" format="YYYY-MM-DD">
                <el-date-picker type="date" ></el-date-picker>
                <!-- //:placeholder="getDefaultDate(birthday, 'birthday')" -->
            </fc-date>
        </div>
        <div class="col-lg-1 col-sm-1 clearPadding">
            <span class="padding-5px" style="color:red;line-height:2.4">*</span>
        </div>
    </div>
</template>
<script>
    import util from '../../../lib/util.js';
    export default {
        data: function() {
            return {
                localObj: this.obj,
            }
        },
        props: {
            obj: {
                type: Object,
                default: function() {
                    return {
                        code: 'birthday',
                        title: '生日',
                        value: '',
                        ismust: 0,
                    }
                }
            }
        },
        methods: {
            getDefaultDate: function(birthday, type) {
                var today = util.getFormatDate();
                if (this.isModify()) {
                    if (this.localObj.value == undefined || this.localObj.value == '' || this.localObj.value == null) {
                        return '';
                    }
                } else {
                    if (type == 'birthday') {
                        return '';
                    }
                    return today;
                }
                return today;
            },
        }
    }
</script>