<template>
    <transition name="modal">
    <div class="modal-mask" v-show="show">
        <div class="modal-wrapper">
            <div class="modal-container sweet-alert" :style="modalStyle">
                <div class="modal-header" v-show="showheader">
                    <slot name="header">
                        default header
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>
                <div style="height:1px"></div>
                <div class="modal-footer" v-show="showfooter">
                    <slot name="footer">
                        default footer
                        <button class="modal-default-button" @click="show = false">
                            OK
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<style scoped>
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
    margin: 10px 0;
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
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
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
        showfooter: {
            type: Boolean,
            required: false,
            default: true
        },
        showheader: {
            type: Boolean,
            required: false,
            default: true
        },
        width: {
            type: String,
            required: false,
            default: '300px'
        }
    },
    computed: {
        'modalStyle': function() {
            return 'width:' + this.width;
        }
    }
}
</script>
