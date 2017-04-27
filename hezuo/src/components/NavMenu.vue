<template>
    <div class="menu" >
        <!-- 循环菜单 -->
        <div class="menu-btn" :class="{'is-active': menu.isactive}" v-for="(menu, index) in menuData" @click="clickMenu(menu)">
            <img class="menu-img" :class="{'is-active': menu.isactive}" :src="menu.imgsrc">
            </br>
            {{menu.name}}
        </div>
    </div>
</template>
<script>
export default{
    data: function() {
      return {
          menuData: [
          {
              name: '动态',
              imgsrc: '../static/show.png',
            //   路由至二级页面
              link: {name: 'show-info'},
            //   标记一级路由，方便监听时的菜单的高亮显示
              path: '/show',
              isactive: false,
          },
          {
              name: '统计数据',
              imgsrc: '../static/statistic.png',
              link: {name: 'statistic-panel'},
              path: '/statistic',
              isactive: false,
          },
          {
              name: '患者列表',
              imgsrc: '../static/list.png',
              link: {name: 'patient-list'},
              path: '/patient',
              isactive: true,
          },
          {
              name: '个人设置',
              imgsrc: '../static/setting.png',
              link: {name: 'doctor-info'},
              path: '/doctor',
              isactive: false,
          }
        ]
      }
    },
    methods: {
        clickMenu: function(menu) {
            this.showSubMenu = true;
            this.$router.push({name: menu.link.name});
        }
    },
    watch: {
        '$route': function(to, from, next) {
            // console.log(to);
            if(false == ('empty' == to.name)){
                this.menuData.forEach(function(menu) {
                    menu.isactive = false;
                    // 获取当前页面的一级，来匹配高亮
                    if (menu.path == to.matched[0].path) {
                        menu.isactive = true;
                    }
                });
            }
        }
    }
}
</script>
<style scoped>
    .menu {
    	position: fixed;
        display: flex;
        border-top: 1px solid #ccc;
    	background-color: white;
        padding: 10px 2% 0px 2%;
    	color: #777;
    	width: 100%;
    	height: 55px;
    	left: 0px;
    	bottom: 0px;
        font-size: 0px;
    	text-align: center;
    }
    .menu-btn{
        left: 0px;
        font-size: 12px;
    	display: inline-block;
    	width: 24%;
        color: #333;
    }
    .menu-img{
        border: 0px;
        /*border: 1px solid rgba(255, 255, 255, 1);*/
        background-color: #9fa59e;
        /*background-color: #36a4f0;*/
        width: 22px;
        height: 22px;
    }
    div .is-active{
        color: #36a4f0;
    }
    img.is-active{
        background-color: #36a4f0;
    }
</style>
