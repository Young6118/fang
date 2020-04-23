<template>
  <wxc-tab-bar :tab-titles="tabTitles"
      :tab-styles="tabStyles"
      title-type="icon"
      @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <!-- 第一个页面内容-->
    <div class="item-container" :style="contentStyle"><HelloWorld/></div>

    <!-- 第二个页面内容-->
    <div class="item-container" :style="contentStyle"><search/></div>

    <!-- 第三个页面内容-->
    <div class="item-container" :style="contentStyle"><text>消息中心</text></div>

    <!-- 第四个页面内容-->
    <div class="item-container" :style="contentStyle"><text>我的主页</text></div>
  </wxc-tab-bar>
</template>

<script>
import { WxcTabBar, Utils } from "weex-ui";
import Config from './config'
import HelloWorld from '../HelloWorld';
import Search from '../Search';

const modal = weex.requireModule("modal");

export default {
    components: { WxcTabBar, HelloWorld, Search },
    data: () => ({
        tabTitles: Config.tabTitles,
        tabStyles: Config.tabStyles
    }),
    created () {
      const tabPageHeight = Utils.env.getPageHeight();
      // 如果页面没有导航栏，可以用下面这个计算高度的方法
      // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
      const { tabStyles } = this;
      this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
    },
    methods: {
        oninput(event) {
        },
        onchange(event) {
        },
        onfocus(event) {
        },
        onblur(event) {
        },
        alert(...message) {
            modal.toast({
                message: message.join(""),
                duration: .5
            });
        },
        wxcTabBarCurrentTabSelected (e) {
          const index = e.page;
          this.alert(index)
          // console.log(index);
        }
    },
    mounted() {
    }
};
</script>

<style>
  .item-container {
    width: 750px;
    background-color: #f2f3f4;
    align-items: center;
    justify-content: center;
  }
</style>