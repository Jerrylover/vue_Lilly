<template>
<div class="modal-mask" v-show="show">
        
        
        <div class="div-img">
            <i class="fa fa-rotate-left fa-2x" style="color: #fff; cursor: pointer; padding: 10px;" title="左转90度" @click="clickRotate('left')"></i>
            <i class="fa fa-rotate-right fa-2x" style="color: #fff; cursor: pointer; padding: 10px" title="右转90度" @click="clickRotate('right')"></i>
            <img id="picture" :src="photourls[currentindex]" />
        </div>
        
        <i class="fa fa-times-circle fa-3x photoclose" @click="clickClose"></i>
        <i class="fa fa-chevron-circle-left fa-3x prev" @click="clickPrev"></i>
        <i class="fa fa-chevron-circle-right fa-3x next" @click="clickNext"></i>
        <div class="circle text-center">
            <template v-for="photourl in photourls" track-by="$index">
                    <i v-if="$index == currentindex" class="fa fa-circle fa-md i-circle" style="color:red"></i>
                    <i v-else class="fa fa-circle-thin fa-md i-circle"></i>
            </template>
        </div>
</div>
</template>
<style scoped>
.photoclose {
    position: absolute;
    z-index: 200000;
    top: 2%;
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
module.exports = {
    data: function() {
        return {
            picwidth: '',
            picheight: '',
            rotateTimes: 0,
            lastDeg: 0,
            currentDeg: 0,
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
            twoWay: true,
        },
        currentindex: {
            type: Number,
            require: false,
            default: 0,
        },
    },
    computed: {
        currentPhotoUrl: function() {
            this.photourls
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
            this.$dispatch('closePhotoGallery');
        },
        clickPrev: function() {
            if (this.currentindex > 0) {
                this.currentindex = this.currentindex - 1;
                this.rotateTimes = 0;
                this.lastDeg = 0;
                var img = document.getElementById('picture');
                img.style.width = this.picwidth + 'px';
                img.style.height = this.picheight + 'px';
                img.style.transform = "rotate(0deg)";
            }
        },
        clickNext: function() {
            if (this.currentindex < this.photourls.length - 1) {
                this.currentindex = this.currentindex + 1;
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
             console.log('width',img.style.width, '------height', img.style.height);
        },
    },
}
</script>
