<template>
  <div id="app" class="app-container">
		<!-- 头部header -->
    <mt-header fixed title="乐购商城  ——  一个神奇的网站"></mt-header>
     

		<!-- 底部tabBar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to='/home'>
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to='/member'>
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to='/shopcar'>
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id='badge'>0</span>
        </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to='/search'>
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

		<!-- 中间区域 -->
		<!-- 占位组件 -->
		<!-- //加了动画 要放到transition标签内部 -->
		<transition name="app">
		<router-view></router-view>		
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  .app-container{
		//处理header和轮播图间的空白距离 
		overflow-x: hidden;
		padding-top:40px;
		padding-bottom: 50px;
	}

	//组件之间互相切换时候的动画效果
	.app-enter{
		opacity: 0;
		transform:translateX(100%);
	
	}
	.app-leave-to{
		opacity: 0;
		transform:translateX(-100%);
			position: absolute;
	}
	.app-enter-active,
	.app-leave-active{
		transition: all .5s ease;
	}
	.mui-bar-tab .mui-tab-item1.mui-active {
    color: #007aff;
}
	.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}


.mui-bar-tab .mui-tab-item .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
</style>
