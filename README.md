#  VUE_CMS  #


### 这是使用vue-cli搭建的购物商城网站

##  vue-cli脚手架 
 1.装包：全局安装 webpack 和 webpack-cli
 	
	npm  i  webpack webpack-cli-g

 全局安装 vue-cli脚手架包

	npm  i  vue-cli  -g

2.使用脚手架命令新建一个webpack 工程化的 vue 项目
	
	npm  init  webpack  项目名称（目录名称比如vue_cms）

3.安装完之后所有的webpack配置都已经配好，但是所有的样式预处理loader都没有安装，比如如果需要使用less就安装less和less-loader，无需自己配置，安装了之后 就可以引进来用
	
	

##  MUI样式 

注意：MUI 不能用NPM下载，需要去GITHUB上把整个文件下载下来，再去里面找需要的样式

>导入MUI.CSS

>导入扩展字体的CSS


##  设置当前选中tab栏选定样式   

> router-link 默认会有切换时的类样式, 当前显示的路由, 默认加上的类名为: router-link-active

>我们可以自己添加css类样式完成当前路由高亮的效果

>除此之外, 还可以将默认值修改为自定义的类名:

>在路由的构造选项中, 通过 linkActiveClass 设置自定义类名
 linkActiveClass

 	在router文件中   linkActiveClass:'mui-active'

##  首页轮播图制作

 1.通过mint-ui的swipe组件完成样式

2.再通过vue-resource发送请求获取轮播图数据，进行渲染

##  首页九宫格部分的制作

1.mint-ui 没有需要的组件，所以这部分使用了mui的代码

2.在mui中 grid 九宫格部分

3.在控制台部分找到对应部分的样式 修改样式结构 并覆盖mui的默认样式

##  新闻资讯部分

1.点击首页新闻资讯 跳转到newsList页面（考虑到点击高亮问题 /home/newsList）

2.页面 mui中的media list（图文列表）结构

3.使用vue-resource 获取数据

4.渲染到页面 用v-for 循环生成


##  配置全局域名 
	
1.全局配置请求的根路径：

		Vue.http.options.root = 'http://www.xxx：xxxx'

2.将post请求提交数据的方式改成传统表单方式提交：

		Vue.http.options.emulateJSON = true

##  定义全局的过滤器 :dateFomate

安装   
		
		npm   i   moment

导入格式化时间的插件 ：
	
		 import moment from ‘moment’

定义全局的过滤器：参数1：过滤器名称 参数2：过滤器的回调函数
（参数1：是过滤器管道符左边的数据，参数2：指定的格式）	

		Vue.filter（'dateFomate',(content,pattern = "YYYY - MM -DD hh:mm:ss") =>{ 
			return moment(content).format(pattern)
		}）

##  新闻详情页面 
	
1.根据新闻资讯页面，传递过来的id值 

2.通过 this.$route.params.id 获取到id	
	

##  抽离评论组件

1.创建一个单独的 comment.vue 组件模板

2.在需要用到comment 组件的页面中，手动导入 comment 组件

3.在父组件中，使用 'components' 属性，将导入的 comment 组件，注册为自己的子组件

4.再将注册组件的名称，以标签的形式，在页面中引用

##  点击加载更多加载评论

1.给加载更多按钮,绑定点击事件

2.点击之后,让pageindex++ 并且重新调用getComment()发起请求,获取数据

3.防止新数据覆盖旧数据,用concat 原来的数据和新数据拼接新数组

##  发表评论

1.文本框做双向数据绑定

2.给发表按钮绑定事件

3.校验评论内容是否为空 为空就给出提示,并且return

4.vue-resource 发送post请求,提交评论给服务器

5.发表评论成功之后,需要重新刷新评论列表
	
##  绘制 图片列表 组件页面结构并美化样式

 1.  制作 顶部的滑动条
 
> 需要借助于 MUI 中的 tab-top-webview-main.html 
 
>需要把 slider 区域的 mui-fullscreen 类去掉
 
 2.  注意: mui 中使用了'arguments' 会报错,因为使用babel以上的时候,默认是开启了严格模式'use strict',所以要更改配置文件的设置,
 
在.babelrc的配置文件中, 添加ignore节点:

			{
			  "presets": [
			    ["env", {
			      "modules": false,
			      "targets": {
			        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
			      }
			    }],
			    "stage-2"
			  ],
			  "ignore": [
			    "./src/lib/mui/js/mui.js"
			  ]
			}

3. 制作 底部的图片列表

##  制作图片列表区域

1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`(按需引入,这个组件实现不了效果,所以要全部引入)

2. 根据`lazy-load`的使用文档，尝试使用

3. 渲染图片列表数据

4. 页面一加载,第一项高亮,用index索引判断(不建议用id id也有可能会变动)
 
   索引为0的默认高亮,

	适合多个动态切换的样式, 少部分固定样式使用

	 <a :class="{'mui-control-item':true,  'mui-active':index==0 }"   href='#' 
       v-for="(item,index) in cates"  :key='item.id'> 
          {{ item.title }}
      </a>

##  实现 图片详情中 缩略图的功能

1. 使用 插件 vue-preview 这个缩略图插件

	import  VuePreview from 'vue-preview'

	Vue.use(VuePreview)


2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据

3. 注意： img标签上的class不能去掉
 
4. 注意： 每个 图片数据对象中，必须有 w 和 h 属性


## 编程式的导航

- 除了使用 <router-link> 创建 a 标签来定义导航链接，还可以借助 router 的实例方法，通过编写代码来实现（goodsList 商品列表页 点击图片时跳转到goodsInfo页面 使用到）

- 在 Vue 实例内部，通过 $router 访问路由实例。可以调用 this.$router.push

1.在网页中，有两种跳转方式：

   方式1： 使用 a 标签 的形式叫做 标签跳转 

   方式2： 使用 window.location.href 的形式，叫做 编程式导航 

2.使用JS的形式进行路由导航

   注意： 一定要区分 this.$route 和 this.$router 这两个对象，

   其中： this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它

   其中： this.$router 是一个路由【导航对象】，用它 可以方便的 使用 JS 代码，实现路由的 前进、后退、 跳转到新的 URL 地址

      console.log(this);

       1. 最简单的   // 字符串
      this.$router.push("/home/goodsinfo/" + id);

      2. 传递对象   // 对象 （如果使用path进行跳转，需要携带参数，必须自行手动拼接，path不能和params一起使用，如果传入了path 则params 无效）
      this.$router.push({ path: "/home/goodsinfo/" + id });

      3. 传递命名的路由   // 命名的路由（params 只能和name同时使用）
      this.$router.push({ name: "goodsinfo", params: { id } });

 这里面的name，要在router 中匹配好路由规则

	{path:'/home/goodsDesc/:id',component:goodsDescCom,name:'goodsinfo'},

## 抽取组件要注意的事项

如果抽取组件之后，使用的时候，有部分组件有冲突：

首页中的轮播图 和 详情中的轮播图，分歧点是 宽度到底是 100% 还是 自适应，

		<script>
			export default {
			  props: ["lunbotuList", "isfull"]
			};
		</script>
	
	 .full {width: 100%;}

	 <img :src="item.img" alt="" :class="{'full': isfull}">

## 加入购物车

## 购物车界面


	
##  遇到的问题1：

 加入购物车功能实现的过程中，动画样式都没有问题，小圆球的初使位置，落脚位置都没有问题，但是不能正常显示在页面上

原因是 app.vue中，组件之间的切换类样式的动画 和购物车的小球类样式的钩子动画产生冲突

解决办法：给app.vue或者小球的 transtion 标签中声明name 属性，这个name属性就是类样式的前缀

		<transition name="app"></transition>

##  遇到的问题2：

加入购物车时候，同一个id的商品加入购物车时候，本应该只是count 数量上的增加，但在localStorage上出现两条商品记录

原因是 判断id值是否相等的时候 使用了 === 而服务器端返回的数据类型有number也有string类型 用 == 就可以解决这个问题

##  遇到的问题3：

点击 加入购物车 按钮的时候，整个页面会抖动，会掉下来

原因：小圆球设置的是position：relative没有脱标，影响到了其他元素

解决办法：设置position：absolute 脱标就可以了





