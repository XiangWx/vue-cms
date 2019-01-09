<template>
  <div class="goodsInfo-container">
    <transition @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
      <div class="ball" v-show="isball" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <!--轮播图 mui库里面的卡片视图区域-->
      <div class="mui-card-content">
        <mt-swipe :auto="4000" :speed="300">
          <mt-swipe-item v-for="(item,index) in lunbotu" :key="index">
            <img :src="item.src" alt>
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <div class="buy-count">购买数量：
            <div class="num-box">
              <!-- 手写input + - -->
              <!-- || 一般用于默认值的处理  && 如果前面的结果为false , 后面的代码就不会执行 -->
              <input :disabled="buyCount <= 1" @click="buyCount > 1 && buyCount--" type="button"
                value="-">
              <input type="text" v-model="buyCount">
              <input :disabled="buyCount >= goodsinfo.stock_quantity"
                @click="buyCount < goodsinfo.stock_quantity && buyCount++"
                type="button" value="+">
            </div>
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lunbotu: [], //存放轮播图
      id: this.$route.params.id,
      goodsinfo:{}, //获取商品信息
      buyCount:1, //默认购买件数1
      isball:false,//控制小球的显示隐藏
     

    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo()
  },
  methods: {
    getLunbotu() { //获取轮播图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
          if(result.body.status == 0){
            this.lunbotu = result.body.message;
          }
      })
    },
  getGoodsInfo(){ //获取商品信息
    this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
       if(result.body.status == 0){
          this.goodsinfo = result.body.message[0]
       }
    })
  },
  goDesc(id){ //使用js 编程式导航 点击跳转到图文介绍页面 不需要使用router-link
    //this.$router.push('/home/goodsDesc'+id) 第一种 最简单的字符串拼接
    this.$router.push({name:'goodsDesc',params:{ id } }) //第二种 命名的路由

  },
  goComment(id){ //点击之后 跳转到评论页面
    this.$router.push({name:'goodsComment',params:{ id }})
    

  },
  addToShopCar(){ //加入购物车
      this.isball = !this.isball
  },
  beforeEnter(el){
    el.style.transform = 'translate(0,0)'
  },
  enter(el,done){
    el.offsetWidth;
    //1.获取小球在页面的位置
    const ballPosition = this.$refs.ball.getBoundingClientRect();
    //2.获取徽章所在的位置
    console.log(document.getElementById("badge"))
    const badgePosition = document.getElementById("badge").getBoundingClientRect();

    const Xposition = badgePosition.left - ballPosition.left;
    const Yposition = badgePosition.top - ballPosition.top;

    el.style.transform = `translate(${Xposition}px,${Yposition}px`;
    el.style.transition = 'all 0.5s cubic-bezier(.61,.12,.53,.18)';

    done()
  },
  afterEnter(el){
    this.isball = !this.isball
  }

  }
};
</script>

<style lang='less'>
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  margin:0;
 
  .mint-swipe {
    height: 200px;
    text-align: center;
    img {
      width: 340px;
      height: 200px;
    }
  }
  .buy-count{
    padding:5px;
    .num-box{
    display: inline-block;
    width: 200px;
    height: 30px;
    input[type="text"] {
      width: 65px;
      text-align: center;
      height: 30px;
    }
    input[type="button"] {
      width: 40px;
      height: 100%;
    }
  }
  }
  .mui-card-footer{
    display:block;
    
    
  }

  .ball{
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index:1;
    top:335px;
    left:170px

  }
}
</style>
