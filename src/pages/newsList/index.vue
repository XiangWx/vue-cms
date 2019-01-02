<template>
    <div class="newsList-container">
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newList" :key='item.id'>
					<router-link :to="'/home/newsInfo/' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{ item.add_time | dateFormat}}</span>
                                <span>点击:{{ item.click }} 次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
       
    </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
    data(){
        return{
            //存放请求回来的数据
            newList:[]
        }
    },
    created(){
        this.getnewList()
    },
    methods:{
        getnewList(){
            this.$http.get('api/getnewslist').then(result=>{
                if(result.body.status===0){
                    this.newList = result.body.message
                }else{
                    Toast("404.数据请求失败")
                }
            })
        }
    }
    
}
</script>

<style lang="less">
.newsList-container{
    .mui-table-view{
        overflow-x: hidden;
        padding-top: 20px;
        .mui-media-body{
            h1{
                font-size: 16px;
            }
            .mui-ellipsis{
                //伸缩盒子 主轴左右对齐
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>