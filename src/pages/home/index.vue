    <template>
        <div class="home-container">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for='(item,index) in swipeList' :key='index'>
                <!-- 这里后台没有id返回  所以用index坐唯一值  要在组件的data中声明一下 -->
                <router-link to="#">
                    <img :src="item.img">
                </router-link>
            </mt-swipe-item>    
        </mt-swipe>

       
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='/home/newsList'>
                       <img src="../../assets/images/menu1.png" alt="">
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='#'>
                          <img src="../../assets/images/menu2.png" alt="">
                        <div class="mui-media-body">图片分享</div>
                        </router-link>
                        </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='#'>
                          <img src="../../assets/images/menu3.png" alt="">
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='#'>
                          <img src="../../assets/images/menu4.png" alt="">
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to='#'>
                          <img src="../../assets/images/menu5.png" alt="">
                        <div class="mui-media-body">视频专区</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to='#'>
                         <img src="../../assets/images/menu6.png" alt="">
                        <div class="mui-media-body">联系我们</div></router-link>
                </li>
            </ul> 
            </div>
      
    </template>

    <script>
    import { Toast } from 'mint-ui'
    export default {
        data() {
            return {
                swipeList: [],  //用来放请求回来的数据是个数组
                index:null
            }
        },
        created(){
            this.getSwipe()
        },
        methods: {
            getSwipe(){
                //发送get请求 获取轮播图数据
                this.$http.get('http://www.lovegf.cn:8899/api/getlunbo').then(result=>{
                    //console.log(result) //数据都在result.body中
                    if(result.body.status == 0){
                        this.swipeList = result.body.message

                        //console.log(  this.swipeList)
                    }else{
                        Toast('图片加载失败！');
                    }
                })
            }
        },
    }
    </script>

    <style lang="less" scoped>
        .home-container{
        .mint-swipe{
            height: 200px;
            img{
                height: 100%;
                width: 100%;
            }
            
            }
 
        .mui-grid-view.mui-grid-9{
            background-color: #fff;
            border:none;
            .mui-table-view-cell{
                border: none;
                }
            img{
            width: 60px;
            height: 60px;      
            }
            .mui-media-body {
            font-size: 13px;
            }
          
        }
        }
    </style>