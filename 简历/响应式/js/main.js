/*
* main.js---启动模块
*/

var waitTimer=setInterval(function () {
	if(document.readyState=="complete"||document.readyState=="interactive"){
		$(".mask").animate({
			opacity:0
		},"slow",function () {
			$(".mask").remove();
		})
		clearInterval(waitTimer);
	}
},900);


window.BASEURL="file:///D:/叶陈辉/知识尼妹/专业/编程类/HTML和Javascript/简历/seajs版/js/";//http://1.ychresume.sinaapp.com/js/libs/sea.js
seajs.config({
	base:window.BASEURL,//base的值默认就是sea.js所在的路径
	alias:{
		'jquery':'modules/jquery/2.1.0/jquery',
		'util':'modules/util'
	}
});

// 如果有.或/开头eajs.use就相对于当前页面路径解析,而不管main所在的路径
// 顶级标识不以点（.）或斜线（/）开始， 会相对模块系统的基础路径（即 Sea.js 的 base 路径）来解析。所有如果没有 ../js/ 就会使用base来解析
seajs.use('../js/modules/app',function (app) {
	// var u=util;
	app.init();
})
