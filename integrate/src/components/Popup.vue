<template>
    <transition name="modal">
    <div class="modal-mask" v-show="show">
        <div class="modal-wrapper">
            <div class="modal-container sweet-alert">
                <div class="modal-body">
                    <div style="text-align: center">
                        <i class="fa fa-3x fa-check" style="color:#fff;padding:0"></i>
                        <p>{{msg}}</p>
                    </div>
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
    background-color: rgba(0, 0, 0, 0);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 150px;
    margin: 0px auto;
    /*    padding: 20px 30px;*/
    background-color: rgba(0, 0, 0, .6);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}

.modal-body {
    margin: 20px 0;
    padding: 0;
    padding-top: 10px;
    padding-bottom: 10px
}

.modal-body p {
    color: #fff;
    padding: 0;
    padding-top: 10px;
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
export default {
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
            default: '操作成功'
        },
        type: {
            type: String,
            required: false,
            default: 'right'
        }
    },
    computed: {
        isRight: function() {
            return this.type == 'right';
        }
    }
}
</script>
