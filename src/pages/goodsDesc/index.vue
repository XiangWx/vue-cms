<template>
    <div class="goodsDesc-container">
       <h1>{{goodsDesc.title }}</h1>
       <hr>
       <div class="content" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            goodsDesc:{}
        }

    },
    created(){
        this. getDesc()
    },
    methods:{
        getDesc(){
            this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
                if(result.body.status==0){
                    this.goodsDesc = result.body.message[0]
                }
            })
        }
    },



    
}
</script>

<style lang="less">
    .goodsDesc-container{
        padding:3px;
        h1{
            font-size:16px;
            color: #226aff;
            padding:5px;
            text-align: center;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
    
</style>