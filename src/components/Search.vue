<template>
    <!-- <div>
      <input test-id="input-obj" ref="range" class="input" type="text" placeholder="测试输入" @input="eventInput" @change="onChange" @focus="onFocus" @blur="onBlur" @keyboard="onKeyBoard"></input>
    </div> -->
    <list>
        <cell v-for="(item,index) in list" :key="index">
            <image style="width:200px;height:200px" :src="picList[index > picList.length-1 ? 0 : index]"></image>
            <text>{{item.title.rendered}}</text>
            <text>{{item.excerpt.rendered}}</text>
        </cell>
    </list>
    <!-- <div>
        <wxc-button type="white" size="medium" text="加载" @wxcButtonClicked="getList"></wxc-button>
        <wxc-button type="white" size="medium" text="首页" @wxcButtonClicked="push('/')"></wxc-button>
        <wxc-button type="white" size="medium" text="找房" @wxcButtonClicked="push('search')"></wxc-button>
        <wxc-button type="white" size="medium" text="我的" @wxcButtonClicked="push('/')"></wxc-button>
    </div> -->
</template>

<script>
  import { WxcButton, WxcPopup, WxcCell, Utils } from "weex-ui";
    const modal = weex.requireModule("modal");
    const api = weex.requireModule('stream')
    const path = 'http://www.youngchou.cn/wp-json/wp/v2/posts'


  export default {
    components: { WxcButton, WxcPopup, WxcCell},
    data () {
      return {
        state:'',
        keyboard_state: '',
        list: [],
        firstId: 1,
        picList: [
          'https://cdn-qukan.1sapp.com/qukan/png/prawn.png',
          'https://cdn-qukan.1sapp.com/qukan/png/fish.png',
          'https://cdn-qukan.1sapp.com/qukan/png/carpenterworm.png',
          'https://cdn-qukan.1sapp.com/qukan/retalBrowser/img_lotcard/x_06.png',
          'https://cdn-qukan.1sapp.com/qukan/retalBrowser/img2/WxxmwRrnOTHbTpnX.png',
          'https://cdn-qukan.1sapp.com/qukan/game/quzhongcailuodiye/icon/icon/枪王之神.png'
        ],
      }
    },
    created () {
        this.getList()
    },
    methods: {
       eventInput:function (e) {
        this.state='input: ' + JSON.stringify(e)
      },
      onChange:function(e){
        this.state='change: '+ JSON.stringify(e) 
      },  
      onFocus:function (e) {
        this.state='focus: '+ JSON.stringify(e) 
      }, 
      onBlur:function (e) {
        this.state='blur: '+ JSON.stringify(e)
      },
      onKeyBoard: function(e) {
        this.keyboard_state = "\n onkeyboard: " + JSON.stringify(e)
      },
      getList () {
        const self = this;
      
        api.fetch({
            method: 'GET',
            url: path,
            type:'json'
        }, function(ret) {
            self.list = ret.data
            modal.toast({
                message: JSON.stringify(ret),
                duration: 3
            });
        });
    },
    push(path) {
        this.$router.push({
            path
        });
    },
    }
  }
</script>

<style scoped>
  .text {
    font-size: 88px;
    text-align: center;
    color: #41B883;
  }
  .input{
    width: 650px;
    height:100px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(162, 217, 192);
    placeholder-color: #41B883;
    margin-left: 50px;
    padding-left: 20px;
    font-size: 28px;
  }
  .textarea {
    width: 600px;
    margin-top: 50px;
    margin-left: 50px;
    color: #666666;
    border-width: 2px;
    border-style: solid;
    border-color: #41b883;
}

</style>