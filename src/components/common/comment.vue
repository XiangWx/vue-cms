<template>
    <div class="com-container">  
        <p>发表评论</p>
        <hr>
        <textarea placeholder="请输入评论内容，不超过120字" maxlength='120'> </textarea>
        <mt-button type="primary" size='large'>发表评论</mt-button>
        <div class="com-list">
            <div class="com-item" v-for='(item,index) in newComment' :key='item.add_time'>
                <div class="com-tite">
                    第 {{ index+1 }}楼  用户：{{ item.user_name}}  发表时间：{{ item.add_time | dateFormat}}
                </div>
                <div class="com-body">
                    评论内容: {{ item.content }}
                </div>
            </div>
        </div>
         <mt-button type="danger" size='large' plain>加载更多</mt-button>
    </div>
</template>


<script>
  import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newComment:[],
            pageIndex:1,
            artid:this.$route.params.id
           
        }
    },
    created(){
        this.getComment()
    },
    methods:{
        getComment(){
            this.$http.get('api/getcomments/'+this.artid + '?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status==0){
                    this.newComment = result.body.message
                }else{
                    Toast('评论加载失败')
                }
    })
        }
    }
}
</script>


<style lang="less">
    .com-container{
        p{
            font-size: 16px;
            color: blueviolet;
        }
        textarea{
            font-size: 14px;
            height: 80px;
            margin:0
        }
        .com-list{
            font-size: 14px;
            margin:5px 0;
            .com-tite{
            line-height: 30px;
            background-color: #ccc;
        }
        }
        .com-body{
            line-height: 35px;
            text-indent: 2em;
        }
        
    }
</style>