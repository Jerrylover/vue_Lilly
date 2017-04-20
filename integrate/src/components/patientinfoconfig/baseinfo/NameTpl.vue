<template>
    <div class="col-lg-4 col-sm-4">
    <label class="col-lg-3 col-sm-3">{{localObj.title}}</label>
        <div class="col-lg-8 col-sm-8 clearPadding">
            <input name="patient-name" class="form-control" type="text" v-model="localObj.value">
        </div>
        <div class="col-lg-1 col-sm-1 clearPadding" v-if="localObj.ismust == 1">
            <span class="padding-5px" style="color:red;line-height:2.4">*</span>
        </div>
    </div>
</template>
<script>
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
                        code: 'name',
                        title: '姓名',
                        value: '',
                        ismust: 0,
                    }
                }
            }
        }
        // props:['obj'],
    }
</script>