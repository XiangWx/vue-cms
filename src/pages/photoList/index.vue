<template>
    <div class="photoList-contain">
        <!-- 顶部滑动区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="{'mui-control-item':true,'mui-active':index==0 }" href='#' 
                    v-for="(item,index) in cates" :key='item.id'>
                        {{ item.title }}
                    </a>  
                </div>
            </div>
		</div>
        <!-- 图文列表区域 -->
            <ul class="photo-list">
                <li v-for="item in list " :key="item.id">
                    <a href="#"> <img v-lazy="item.img_url" >
                    <div class="info">
                        <h1 class="info-title">{{ item.title }}</h1>
                        <div class="info-content">{{ item.zhaiyao }}</div>
                    </div>
                    </a>
                </li>
            </ul>
        </div>
</template>

<script>
 //导入 mui 的js文件
    import mui from '../../lib/mui/js/mui.js'
export default {
   data(){
       return {
           cates:[],//所有分类数组
           list:[]//图文列表的数组
       }
   },
   created(){
       this.getphotoList() //加载分类数据
       this.getphotoListByCateId(0)
   },
   methods:{
       getphotoList(){
           //获取所有的分类信息
           this.$http.get('api/getimgcategory').then(result=>{
               if(result.body.status==0){
                    result.body.message.unshift({ title: "全部", id: 0 });
                   this.cates = result.body.message
                   //this.getPhotoListByCateId(result.body.message[0].id);
               }
           })
       },
       getphotoListByCateId(cateId){
           console.log(cateId)
           //获取图文列表信息
           this.$http.get('api/getimages/'+cateId).then(result=>{
               if(result.body.status==0){
                   this.list = result.body.message
               }
           })
       }
   },
   mounted(){
       //此时数据已经渲染到页面上,DOM元素是最新的
       //初始化滑动组件
       mui('.mui-scroll-wrapper').scroll({
	    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
   }

   
}
</script>

<style lang='less'>

    .photoList-contain{
        .photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-content {
        font-size: 13px;
      }
    }
  }
}
    }
    
</style>
