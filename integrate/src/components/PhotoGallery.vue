<template>
<div class="modal-mask" v-show="show">
        <div class="div-img">
            <i class="fa fa-rotate-left fa-2x" style="color: #fff; cursor: pointer; padding: 10px;" title="左转90度" @click="clickRotate('left')"></i>
            <i class="fa fa-rotate-right fa-2x" style="color: #fff; cursor: pointer; padding: 10px" title="右转90度" @click="clickRotate('right')"></i>
            <img id="picture" :src="photourls[myCurrentIndex]" />
        </div>

        <i class="el-icon-close fa-2x photoclose" @click="clickClose"></i>
        <i class="el-icon-arrow-left fa-2x prev" @click="clickPrev"></i>
        <i class="el-icon-arrow-right fa-2x next" @click="clickNext"></i>
        <div class="circle text-center">
            <div class="page-icon" v-for="(photourl, index) in photourls" :key="index">
                    <i v-if="index == myCurrentIndex" class="fa fa-circle fa-md i-circle" style="color:#20A0FF"></i>
                    <i v-else class="fa fa-circle-thin fa-md i-circle"></i>
            </div>
        </div>
</div>
</template>
<style scoped>
.page-icon {
    display: inline-block;
}
.photoclose {
    position: absolute;
    z-index: 200000;
    top: 10%;
    right: 5%;
    color: #fff;
    cursor: pointer;
}

.prev {
    position: absolute;
    z-index: 200000;
    top: 48%;
    left: 5%;
    color: #fff;
    cursor: pointer;
    user-select: none;
}

.next {
    position: absolute;
    z-index: 200000;
    top: 48%;
    right: 5%;
    color: #fff;
    cursor: pointer;
    user-select: none;
}

div.circle {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    bottom: 5%;
    padding-right: 35px;
}

.i-circle {
    color: #fff;
    margin-left: 5px;
    user-select: none;
}

.div-img {
    width: 100%;
    height: 95%;
    overflow: hidden;
    text-align: center;
    position: relative;
}

.div-img img {
    margin: auto;
    width: auto;
    height: auto;
    max-width: 80%;
    max-height: 80%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.modal-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    display: table;
    transition: opacity .3s ease;
}

.modal1-body {
    margin: 0;
    text-align: center;
    position: absolute;
    padding:0;
    height:100%;
    width: 100%;
}

.modal-default-button {
    float: right;
}
</style>

<script>
export default {
    data: function() {
        return {
            picwidth: '',
            picheight: '',
            rotateTimes: 0,
            lastDeg: 0,
            currentDeg: 0,
            myCurrentIndex: this.currentindex
        }
    },
    props: {
        photourls: {
            type: Array,
            require: true,
            default: function() {
                return {

                }
            },
        },
        show: {
            type: Boolean,
            require: false,
            default: false,
        },
        currentindex: {
            type: Number,
            require: false,
            default: 0,
        },
    },
    computed: {
        currentPhotoUrl: function() {
            // this.photourls
        }
    },
    created: function() {
        // var screenWidth = screen.width;
        // var screeHeight = screen.height;
        // console.log($('.pic-modal-container').get(0));
        // window.setTimeout(
        //     function() {
        //         $('.pic-modal-container').css({
        //             height: screeHeight + 'px',
        //         });
        //         $('.div-img').css({
        //             height: screeHeight * 0.8 + 'px',
        //         })
        //     },
        //     2000
        // )
    },
    methods: {
        clickClose: function() {
            this.rotateTimes = 0;
            this.lastDeg = 0;
            var img = document.getElementById('picture');
            img.style.width = this.picwidth + 'px';
            img.style.height = this.picheight + 'px';
            img.style.transform = "rotate(0deg)";
            // this.show = false;
            // $('body').removeClass('hide-scroll');
            $('#visitContent').css('-webkit-overflow-scrolling', 'touch');
            Bus.$emit('close-photogallery');
        },
        clickPrev: function() {
            if (this.myCurrentIndex > 0) {
                this.myCurrentIndex = this.myCurrentIndex - 1;
                this.rotateTimes = 0;
                this.lastDeg = 0;
                var img = document.getElementById('picture');
                img.style.width = this.picwidth + 'px';
                img.style.height = this.picheight + 'px';
                img.style.transform = "rotate(0deg)";
            }
        },
        clickNext: function() {
            if (this.myCurrentIndex < this.photourls.length - 1) {
                this.myCurrentIndex = this.myCurrentIndex + 1;
                this.rotateTimes = 0;
                this.lastDeg = 0;
                var img = document.getElementById('picture');
                img.style.width = this.picwidth + 'px';
                img.style.height = this.picheight + 'px';
                img.style.transform = "rotate(0deg)";
            }
        },
        clickRotate: function(str) {
            var img = document.getElementById('picture');
            var width = img.width;
            var height = img.height;
            if (this.rotateTimes == 0) {
                this.picwidth = width;
                this.picheight = height;
            }
            this.rotateTimes++;
            if (str.trim() == 'left') {
                this.currentDeg = this.lastDeg + (-90);
            }else {
                this.currentDeg = this.lastDeg + 90;
            }
            this.lastDeg = this.currentDeg;
            img.style.transform = "rotate("+this.currentDeg+"deg)";
             if (this.rotateTimes % 2 == 1) {
                img.style.width = this.picheight+'px';
             }else {
                img.style.width = this.picwidth + 'px';
             }
            //  console.log('width',img.style.width, '------height', img.style.height);
        },
    },
    watch: {
        myCurrentIndex: function(newval, oldval) {
            Bus.$emit('change-photo-index', newval)
        },
        currentindex: function(newval, oldval) {
            // console.log('newval ',newval, 'oldval', oldval )
            this.myCurrentIndex = newval
        }
    }
}
</script>
