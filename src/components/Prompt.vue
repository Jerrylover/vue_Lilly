<template>
    <transition name="modal">
    <div class="modal-mask" v-show="show">
        <div class="modal-wrapper">
            <div class="modal-container sweet-alert">
                <div class="modal-header">
                    <span class="header-span">提示信息</span>
                </div>
                <div class="modal-body">
                    <span style="">
                        <i class="fa fa-info-circle fa-lg" style="color:#008db9"></i>&nbsp;&nbsp;{{msg}}
                    </span>
                </div>
                <div style="height:1px"></div>
                <div class="modal-footer">
                    <div style="float:right;margin-left:20px;"><a class="btn btn-default" @click="doCancel($event)">取消</a></div>
                    <div style="float:right;"><a class="btn btn-primary" @click="doOK($event)">确定</a></div>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<style scoped>
.header-span {
    color: #fff;
}

.modal-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    /*    padding: 20px 30px;*/
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-header {
    background-color: #008db9;
    padding: 10px;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    padding-top: 10px;
    padding-bottom: 10px;
}

.modal-default-button {
    float: right;
}

.modal-enter,
.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1);
    transform: scale(1);
}
</style>
<script>
module.exports = {
    data: function() {
        return {

        }
    },
    props: {
        show: {
            type: Boolean,
            required: true,
            default: false
        },
        msg: {
            type: String,
            required: false,
            default: '操作失败'
        },
        type: {
            type: String,
            required: false,
            default: 'error'
        }
    },
    methods: {
        doOK: function(e) {
            e.preventDefault();
            this.show = false;
            this.$emit('prompt-ok-click', e);
        },
        doCancel: function(e) {
            e.preventDefault();
            this.show = false;
            this.$emit('prompt-cancel-click', e);
        }
    }
}
</script>
