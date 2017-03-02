<template>
    <div>
        <app-header active="learn"></app-header>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#news">News</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#about">About</a></li>
        </ul>
        <div class="img">
            <img src="../assets/logo_icon.png">
            <div style="text-align: center;margin: 5px 3px 3px 3px"><span>图片描述</span></div>
        </div>
        <div class="shadow"></div>
        <div style="margin:10px auto;height: 200px;width:300px;border: 10px solid #ccc;background-image: url('http://photo.fangcunyisheng.com/f/0a/f0a92de6ac2310a7bf90c33cb5a2be4a.150_150.jpeg'); padding: 30px;background-repeat: no-repeat;background-origin: padding-box;">
            12345
        </div>
        <div style="width: 200px;margin: auto">
            <input type="checkbox" name="" style="background:red">
        </div>
        <div style="margin: auto;width: 400px;">
        <video src="/static/movie.ogg" style="" controls="controls">
        </video>
        </div>
        <h1 style="text-shadow: 0px 2px 4px #bbb">对不起，我是个警察</h1>
        <p style="width: 200px; margin: auto; border: 1px solid #ccc; word-wrap: break-word; padding: 5px;text-outline: 2px 2px #red">hahahahahahaahhahahahahahaahhahahahahahaahhahahahahahaahhahahahahahaah</p>
</template>
<script>
    module.exports = {
        data: function(){
            return {

            }
        },
        components: {
            'appHeader': require('../components/Header.vue'),
        }
    }
</script>
<style scoped>
    ul {
        list-style-type: none;
        font-size: 0px;
        padding: 0px;
        width: 100%;
    }
    ul li {
        display: inline;

    }
    ul li a {
        padding: 5px;
        background-color: #ccc;
        font-size: 14px;
        text-decoration: none;
        display: inline-block;
        width: 60px;
    }
    a:link {
        color: red;
    }
    a:visited {
        color: black;
    }
    a:hover {
        color: green;
        background-color: red;
    }
    a:active {
        color: green;
    }
    img {
        border: 1px solid #bebebe;
        margin: 3px;
        opacity: 0.1;
    }
    img:hover {
        opacity: 1.0;
    }
    .img {
        border:1px solid #bebebe;
        display: inline-block;
        width: auto;
        margin-left: 300px;
    }
    .shadow {
        /*border: 1px solid #ccc;*/
        margin: 20px auto;
        background-color: orange;
        height: 100px;
        width:200px;
        box-shadow: 0px 10px 10px #888888;
        /*transform: rotate(50deg);*/
        /*transform: translate(100px, 200px);*/
        /*transform: scale(2,2);*/
        /*transform: skew(0deg,30deg);*/
        /*transition: height 0.5s ease-in-out, width 1s ease-in-out 1s;*/
        resize: both;
        overflow:auto;
    }
    @keyframes myAnimotion{
        from {background: red;left: 100px;}
        to {background: green;left: 300px;}
    }
    /*.shadow:hover {
        animation: myAnimotion 2s;
        width: 400px;
        height: 200px;
    }*/
</style>