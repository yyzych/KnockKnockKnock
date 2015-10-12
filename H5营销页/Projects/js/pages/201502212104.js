/*
* 具体项目的页面js
*/

define(function (require,exports,module) {
	var app=require("../app-mains/app1"),
		appAudio=require("../modules/appAudio"),
		appVideo=require("../modules/appVideo"),
		addHorizontalSlide=require("../modules/addHorizontalSlide"),
		Lottery=require("../modules/lottery");
	var pages=$(".page");
	
	(function () {
		pages.filter(".page-video").forEach(function (item,index,arr) {
			appVideo.init($(item));
		})
	})();

	app.disableFlipPage();
	var lottery=new Lottery({
		lottery:"../../file/201502212104/img/per3.jpg",
		lotteryType:"image",
		height:document.body.clientHeight||window.innerHeight,
		width:"640",
		complate:function () {
			app.enableFlipPage();
			appAudio.play();
		}
	});
})