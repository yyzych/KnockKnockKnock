// 声音控制模块
// define的id就是模块的绝对路径
define(function (require,exports,module) {
	var audioControl=function () {
		var audioBox=$(".u-global-audio"),//开关
			audio=audioBox.find("audio").get(0),//audio
			audioSpan=audioBox.find("span"),//tip
			res={
				status:"off",
				play:function () {
					audio.play();
					audioBox.addClass("z-play");
					audioSpan.text("开始");
					this.status="on";
				},
				pause:function () {
					audio.pause();
					audioBox.removeClass("z-play");
					audioSpan.text("关闭");
					this.status="off";
				}
			};

		function init () {
			var that=this;
			audioBox.on("tap",function (e) {
				e.preventDefault();
				if($(this).hasClass("z-play")){
					that.pause();
				}else{
					that.play();
				}
				audioSpan.addClass("z-show");
				setTimeout(function () {
					audioSpan.removeClass("z-show");
				},1200);
			});

			if(audio.autoplay){
				$(window).on("load",function () {
					that.play();
				})
				$(document.body).one("touchstart",function () {
					that.play();
				})
			}
		};

		init.apply(res);

		return res;
	}();

	module.exports=audioControl;
});