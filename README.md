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

4.渲染到页面


##  配置全局域名 


##  定义全局的过滤器 :dateFomate

	安装   npm   i   moment

	导入 import moment from ‘moment’

		Vue.filter（'dateFomate',(content,pattern = "YYYY - MM -DD hh:mm:ss") =>{ 
			return moment(content).format(pattern)
		}）

##  新闻详情页面 

	
	

	

