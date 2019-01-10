<template>
    <div class="shopcar-container">
      <div class="mui-card"  v-for="item in goodsList" :key='item.id'>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
        <mt-switch v-model="$store.getters.goodsSelected[item.id]" @change='selectedChange'></mt-switch>
        <img src="item.thumb_path" alt="">
        <div class="info">
            <h1>{{ item.title }}</h1>
            <div class="num-box">
                <span>￥{{ item.sell_price }}</span>
                <input type="button" value='-'>
                <input type="text" v-model="$store.getters.goodsCount[item.id]">
                <input type="button" value="+">
            </div>
            <a href="#" @click.prevent="remove(item.id, i)">删除</a>
        </div>
        </div>
      </div>
    </div>
     
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodsList:[] //购物车商品的数据
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            var idArr = [] //存放商品信息的id
            this.$store.state.car.forEach(item=>{
                idArr.push(item.id)
            })
            // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if (idArr.length <= 0) {
                return;
            }
            this.$http.get("api/goods/getshopcarlist/"+idArr.join(',')).then(result=>{
                if(result.body.status == 0){
                    this.goodsList = result.body.message
                }
            })
        },
        selectedChange(){

        }
    },

}
</script>

<style lang="less">
.shopcar-container{
    .mui-card-content{
        img{
            width: 60px;
        }
        h1{
            font-size:13px;
        }
        .mui-card-content-inner{
            display: flex;
            align-items:center;
        }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    .num-box {
        position: relative;
        display: inline-block;
        overflow: hidden;
        height: 35px;
        input[type="text"] {
          width: 65px;
          height: 100%;
          text-align: center;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        input[type="button"] {
          width: 40px;
          height: 100%;
        }
      }    
  }       
 }
}
</style>