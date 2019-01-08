<template>
    <div class="goods-container">
        <div class="goods-list">
       <div class="goods-item" v-for="(item,index) in goodsList" :key="index" @tap='gotail(item.id)'>
           <img :src="item.img_url" alt="">
           <h1>{{ item.title }}</h1>
           <div class="goods-info">
               <div class="goods-price">
                   <span class="old">¥{{ item.sell_price }}</span>
                   <del class="new">¥{{ item.market_price }}</del>
               </div>
               <div class="goods-sell">
                   <span>热卖中</span>
                   <span>剩余{{ item.stock_quantity}}件</span>
               </div>
           </div>
        </div> 
    </div>
    <mt-button v-if='hasmore' type="danger" size='large' @tap='getmore'>加载更多</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageindex:1, //页数
            goodsList:[], //存放商品列表的数组
            hasmore:true //默认是显示 按钮‘加载更多’
        }
    },
    created(){
         this.getgoodsList()
    },
    methods:{
        getgoodsList(){
            this.$http.get("api/getgoods?pageindex"+this.pageindex).then(result=>{
                if(result.body.status == 0){
                    this.goodsList = this.goodsList.concat(result.body.message); //用concat拼接
                    if(result.body.message.length == 0){
                        this.hasmore = false
                    }
                }
            })
        },
        getmore(){
            this.pageindex++;
            this.getgoodsList();

        },
        gotail(id){
            //使用js形式进行路由导航
            //console.log(this) $route 是参数对象  $router 是设置路由导航对象
            this.$router.push('/home/goodsInfo/'+id)
        }
    }
}
</script>

<style lang="less">
     .goods-list {
        overflow-x: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 10px;
   .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    min-height: 293px;
      img{
          width: 100%;
          min-height: 190px;
      }
      h1{
          height: 30px;
          font-size:14px;
          overflow: hidden;
      }
      .goods-info{
          min-height: 63px;
          background-color: #ccc;
      }
      .goods-price{
          padding:5px;
          .old{
              color:red;
              font-size: 16px;
          }
          .new{
              font-size: 14px;
              padding-left: 15px;
          }
      }
      .goods-sell{
          display: flex;
          justify-content: space-between;
          font-size:12px;
      }
    }
    }
</style>