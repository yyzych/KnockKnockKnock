/*
* main.js---启动模块
*/

window.BASEURL="file:///D:/叶陈辉/学习/专业/编程类/HTML和Javascript/敲敲敲/单页应用/Seajs组织版/js/";
seajs.config({
	// base:window.BASEURL,
	alias:{
		'jquery':'commons/jquery/2.1.0/jquery'
	},
	vars:{
		'indexView':'index'
	}
});

// seajs.use相对于当前页面路径
seajs.use('../js/app',function (app) {
	new app();
})
