<template>
  <div class="goodsInfo-container">
    <div class="mui-card">
      <!--轮播图-->
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
              <!-- || 一般用于默认值的处理 -->
              <!-- && 如果前面的结果为false , 后面的代码就不会执行 -->
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
      goodsinfo:{} //获取商品信息
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      })
    },


  }
};
</script>

<style lang='less'>
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;
  .mint-swipe {
    height: 200px;
    img {
      width: 340px;
      height: 200px;
    }
  }
}
</style>
