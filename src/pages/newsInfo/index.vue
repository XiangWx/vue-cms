<template>
    <div class="newsInfo-contaniner">
        <h3>{{newsInfo.title}}</h3>
        <div class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dateFormat }} </span>
            <span>点击：{{ newsInfo.click }} 次</span>
        </div>
        <hr/>
        <!-- 内容区域 -->
      <div class="content" v-html="newsInfo.content"></div>
      <!-- 评论组件 -->
        <comment></comment>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
     data(){
         return { 
             id:this.$route.params.id,
             newsInfo:{}  //存放对应id 的 新闻详情页数据 这里不需要数组循环
         }
     },
     created(){
         this.getnewsList()
     },
     methods:{
         getnewsList(){
            this.$http.get('api/getnew/'+this.id).then(result =>{
                 if(result.body.status == 0){
                     this.newsInfo = result.body.message[0]  //拿到新闻资讯页面传递过来的id值
                 }else{
                     Toast('加载失败！')
                 }
            })
         }
     }

}
</script>

<style lang="less">
    .newsInfo-contaniner{
        margin-top: 40px;
        padding: 0 5px;
        h3{
            font-size: 15px;
        }
        .subtitle{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between
        }
    }
</style>
