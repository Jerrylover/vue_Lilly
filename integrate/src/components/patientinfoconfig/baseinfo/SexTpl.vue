<template>
    <div class="col-lg-4 col-sm-4">
        <label class="col-lg-3 col-sm-3 clear-padding-left">{{localObj.title}}</label>
        <div class="col-lg-8 col-sm-8 clearPadding h34">
            <span class="col-lg-6 col-sm-6 radioButtonStyle leftRadioButtonRadius" :class="{'radioSelectStyle':localObj.value == 1}" @click="maleSelectClick">男</span>
            <span class="col-lg-6 col-sm-6 radioButtonStyle rightRadioButtonRadius" :class="{'radioSelectStyle':localObj.value == 2}" @click="femaleSelectClick">女</span>
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
                        code: 'sex',
                        title: '性别',
                        value: 0,
                        ismust: 0,
                    }
                }
            }
        },
        methods: {
            maleSelectClick: function() {
                this.localObj.value = 1;
            },
            femaleSelectClick: function() {
                this.localObj.value = 2;
            }
        }
    }
</script>
<style scoped>
    .radioSelectStyle {
        background-color: #008DB9;
        color: white;
    }

    .radioButtonStyle {
        border: 1px solid #ccc;
        display: -moz-inline-box;
        display: inline-block;
        text-align: center;
        height: 34px;
        padding: 4px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .leftRadioButtonRadius {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-right:0;
    }
    .rightRadioButtonRadius {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
    .h34 {
        height: 34px;
    }
</style>