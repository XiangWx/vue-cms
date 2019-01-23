<template>
    <div class="shopcar-container">
      <div class="mui-card"  v-for="(item,i) in goodsList" :key='item.id'>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
        <mt-switch 
        v-model="$store.getters.goodsSelected[item.id]" 
        @change='selectedChange(item.id,$store.getters.goodsSelected[item.id])'></mt-switch>
        <img :src="item.thumb_path" alt="">
        <div class="info">
            <h1>{{ item.title }}</h1>
            <div class="num-box">
                <span>￥{{ item.sell_price }}</span>
                <input @click="sub(item.id,i)" type="button" value='-'>
                <input ref='countValue' type="text" v-model="$store.getters.goodsCount[item.id]">
                <input @click="add(item.id,i)" type="button" value="+">
            </div>
            <a href="#" @click.prevent="remove(item.id, i)">删除</a>
        </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner account">
            <div class="left">
                <p>总计（不含运费）</p>
                <p>已勾选商品
                <span class="red">{{ $store.getters.goodsCountAndAmount.count }}</span> 件， 总价
                <span class="red">￥{{ $store.getters.goodsCountAndAmount.amount }}</span>
                </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
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
        selectedChange(id,selected){ //点击stwitch 开关 把状态同步到store中
            this.$store.commit('updateGoodsSelected',{id,selected})
        },
        sub(id,i){ //id是存入购物车对应商品的id，i是对应的索引
          let countValue = this.$refs.countValue[i] //获取到当前id的这条商品信息
          if(countValue.value<=1) return 
          countValue.value-- //到这一步 自减已经实现 但是徽章位置的数据还未同步
          this.changeCount(id,i)

        },
        add(id,i){
         let countValue = this.$refs.countValue[i]
          countValue.value++
          this.changeCount(id,i)
        },
        changeCount(id,i){
            let countValue = this.$refs.countValue[i]
            this.$store.commit('updateCarInfo',{id:id,count:countValue.value})

        },
        remove(id, i){
            this.goodsList.splice(i,1)
            this.$store.commit('removeCarCount',id)
        }
    },

}
</script>

<style lang="less">
.shopcar-container{
    .mui-card-content{
        .red{
            color: red;
        }
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