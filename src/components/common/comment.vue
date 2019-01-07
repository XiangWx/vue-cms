<template>
    <div class="com-container">  
        <p>发表评论</p>
        <hr>
        <textarea placeholder="请输入评论内容，不超过120字" maxlength='120' v-model="msg"> </textarea>
        <mt-button type="primary" size='large' @click="postComment">发表评论</mt-button>
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
         <mt-button type="danger" size='large' plain @click="getmore">加载更多</mt-button>
    </div>
</template>


<script>
  import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            msg:[], //评论输入的内容
            newComment:[], //存放数据的数组
            pageIndex:1, //默认是加载第一页的评论
            artid:this.$route.params.id //获取当前页面的id值
           
        }
    },
    created(){
        this.getComment()
    },
    methods:{
        getComment(){
            this.$http.get('api/getcomments/'+this.artid + '?pageindex='+this.pageIndex).then(result=>{
                if(result.body.status==0){
                    //直接这样写 会造成点击加载更多评论会被覆盖掉
                   // this.newComment = result.body.message
                   this.newComment = this.newComment.concat(result.body.message)
                }else{
                    Toast('评论加载失败')
                }
    })
        },
        getmore(){
            //加载更多评论 
            //1.给加载更多按钮注册点击事件  2.重新调用getComment()发送请求获取到数据
            this.pageIndex++;
            this.getComment()

        },
        postComment(){
            //post请求参数1:url地址 参数2:提交给服务器的数据 参数3:定义提交的时候,表单的数据格式(如果已定义为全局的就不用写了)
            this.$http.post('api/postcomment/'+this.artid,{content:this.msg.trim()},{emulateJSON: true}).then(result=>{
                if(result.body.status==0){
                    //发送成功 1.清空当前页面数据 2.重新获取第一页的数据 3.
                    this.newComment = []  //清空当前页面的评论数据
                    this.pageIndex = 1 //重置为第一页
                    this.getComment()//重新获取数据
                    this.msg='' 


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