/*
* 网站js入口函数main.js
*/

define(function (require) {
	var $=require("jquery");//如果主界面已经导入了jquery文件，则这里不用再导入jquery对象，是可以通用的

	// 登录
	var loginView=require("./modules/Login_Sign").loginView;
	loginView.init();
	loginView.openLoginBox(".signin-entry");
	loginView.closeLoginBox(".close");
	// 注册
	var signView=require("./modules/Login_Sign").signView;
	signView.init();
	signView.openSignBox(".signup-entry");
	signView.closeSignBox(".close");
	// 全屏滚动界面
	var fullScroll=require("./modules/FullScreenScroll");
	fullScroll.init({
		selectorName:".nav a",
		marTopHei:50
	});

	//显隐菜单导航
	navMenuToggle();
	//或者这样
	// navMenuToggle2($);
});
//注意：这里的jQuery对象并不是模块定义里面的jQuery对象。是在主页面里引入了jquery文件，所以有jquery对象。如果没有引入jquery文件就不能用
function navMenuToggle () {
	var elem;
	$("#nav-menu").click(function (e) {
		e=e||window.event;
		var target=this.getAttribute("data-toggle");
		elem=$("."+target);
		// console.log(elem.css("height")+typeof elem.css("height"));
		if(elem.css("height")=="0px"||typeof elem.css("height") =="undefined"){
			elem.css("height","auto");
		}else{
			elem.css("height","0");
		}
		e.stopPropagation();//阻止事件冒泡
		e.preventDefault();
	});
	$(document).click(function (e) {
		if(e.target!=$("#nav-menu").get(0)){
			elem && elem.css("height","0px");
		}
	});
}
function navMenuToggle2 ($) {
	var elem;
	$("#nav-menu").click(function (e) {
		e=e||window.event;
		var target=this.getAttribute("data-toggle");
		elem=$("."+target);
		// console.log(elem.css("height")+typeof elem.css("height"));
		if(elem.css("height")=="0px"||typeof elem.css("height") =="undefined"){
			elem.css("height","auto");
		}else{
			elem.css("height","0");
		}
		e.stopPropagation();//阻止事件冒泡
		e.preventDefault();
	});
	$(document).click(function (e) {
		if(e.target!=$("#nav-menu").get(0)){
			elem && elem.css("height","0px");
		}
	})
}


/*
* 帮助页js
*/
(function (global) {
	function slideAsideMenu () {
		var slidebar=$(".slidebar"),
			threads=$("#threads");
		$("#slideMenu").click(function (e) {
			if(slidebar.get(0).clientWidth!=0){
				$(slidebar).animate({width:"0px"});
				$(threads).animate({marginLeft:"0px"});
			}else{
				$(slidebar).animate({width:"190px"});
				$(threads).animate({marginLeft:"180px"});
			}
		})
	}

	slideAsideMenu ();
})(window)