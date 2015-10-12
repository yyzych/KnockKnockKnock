/*
* app-debug.js-翻页样式2
*/

define("app3-debug",["zepto"],function (require,exports,module) {
	var $=require("zepto"),
		appAudio=require("./appAudio");

	var App=function ($app) {
		this.$app=$app;
		this.$pages=this.$app.find(".page");
		this.$currentPage=this.$pages.eq(0);

		this.isDisableFlipPage=!1;
		this.isDisableFlipPrevPage=!1;
		this.isDisableFlipNextPage=!1;
		this.isInitComplete=!1;
		this.isFirstShowPage=!0;

		var that=this,
			$win=$(window);
		(function () {
			$win.on("scroll",function (e) {
				e.preventDefault();
			});
			$win.on("touchmove",function (e) {
				e.preventDefault();
			});
			$win.on("img",function (e) {
				e.preventDefault();
			})
		})();
		$win.on("load",function () {
			var $appLoading=$(".app-mask");
			$appLoading.css("opacity",0);
			$appLoading.on("webkitTransitionEnd",function (e) {
				$appLoading.remove();
			});
			that.isInitComplete=!0;
			that.showPage();
		});
		$win.on("load",that.slideHandler.bind(that));
	}
	App.prototype.slideHandler=function (e) {
		var that=this,
			currentPage=null,
			activePage=null,
			startX=0,
			startY=0,
			moveDistX=0,
			moveDistY=0,
			isLoop=!1,
			isNext=!1,
			isStart=!1,//true:表示正在运行
			isFirstTouch=!1;
		that.$app.on("touchstart",function (e) {
			if(that.isDisableFlipPage) return;
			var touch=e.touches[0];
			// 状态重置
			activePage&&(activePage.classList.remove("z-active"),activePage.classList.remove("z-move"));
			activePage=null
			currentPage=that.$pages.filter(".z-current").get(0);
			if(currentPage){
				startX=touch.pageX;
				startY=touch.pageY;
				moveDistY=0;
				moveDistX=0;
				isFirstTouch=!0;
				isNext=!1;
				isStart=!0;
				currentPage.classList.add("z-move");
				currentPage.webkitTransition="none";
			}
		}).on("touchmove",function (e) {
			var touch=e.touches[0];
			moveDistX=touch.pageX-startX,moveDistY=touch.pageY-startY;
			if(isStart&&
				(isFirstTouch||activePage)&&
				Math.abs(moveDistX)<Math.abs(moveDistY)){
				if(moveDistY<0){
					if(that.isDisableFlipNextPage) return;
					if(isFirstTouch||!isNext){
						isFirstTouch=!1,isNext=!0;
						activePage&&(activePage.classList.remove("z-active"),activePage.classList.remove("z-move"));
						(currentPage.nextElementSibling&&currentPage.nextElementSibling.classList.contains("page"))?(activePage=currentPage.nextElementSibling):(activePage=that.$pages.first().get(0),isLoop=!0);
						if(activePage&&activePage.classList.contains("page")){
							activePage.style.webkitTransition="none";
							activePage.classList.add("z-active"),activePage.classList.add("z-move");
							activePage.webkitTransition="none";
							activePage.style.webkitTransform="translateY("+window.innerHeight+"px)";
							// currentPage.style.webkitTransformOrigin="top center";			
						}else{
							// currentPage.style.webkitTransform="translateY(0px) scale(1)";
							activePage=null;
						}
					}else{
						activePage.style.webkitTransform="translateY("+(window.innerHeight+moveDistY)+"px)";
						// currentPage.style.webkitTransform="scale("+((window.innerHeight+moveDistY)/window.innerHeight).toFixed(3)+")";
					}
				}else{
					if(that.isDisableFlipPrevPage) return;
					if(isFirstTouch||isNext){
						isFirstTouch=!1,isNext=!1;
						activePage&&(activePage.classList.remove("z-active"),activePage.classList.remove("z-move"));
						activePage=currentPage.previousElementSibling&&currentPage.previousElementSibling.classList.contains("page")?currentPage.previousElementSibling:(isLoop?that.$pages.last().get(0):false);
						if(activePage&&activePage.classList.contains("page")){
							activePage.style.webkitTransition="none";
							activePage.classList.add("z-active"),activePage.classList.add("z-move");
							activePage.webkitTransition="none";
							activePage.style.webkitTransform="translateY("+(-window.innerHeight)+"px)";
							// currentPage.style.webkitTransformOrigin="top center";			
						}else{
							// currentPage.style.webkitTransform="translateY(0px) scale(1)";
							activePage=null;
						}
					}else{
						activePage.style.webkitTransform="translateY("+(-window.innerHeight+moveDistY)+"px)";
					}
				}
			}
		}).on("touchend",function (e) {
			if(isStart){
				isStart=!1;
				if(activePage){
					that.isDisableFlipPage=!0;
					currentPage.style.webkitTransition="-webkit-transform 0.4s ease-out";
					activePage.style.webkitTransition="-webkit-transform 0.4s ease-out";						
					if(Math.abs(moveDistY)>100&&Math.abs(moveDistY)>Math.abs(moveDistX)){
						// currentPage.style.webkitTransform="scale(0.2)";
						activePage.style.webkitTransform="translateY(0px)";
						setTimeout(function () {
							activePage.classList.remove("z-active");
							activePage.classList.remove("z-move");
							activePage.classList.add("z-current");
							currentPage.classList.remove("z-current");
							currentPage.classList.remove("z-move");
							that.isDisableFlipPage=!1;
							that.$currentPage=$(activePage);
							$(activePage).trigger("current");
							$(currentPage).trigger("hide");
						},500);
					}else{
						// currentPage.style.webkitTransform="scale(1)";
						activePage.style.webkitTransform="translateY("+(isNext?"100%":"-100%")+")";
						setTimeout(function () {
							activePage.classList.remove("z-active");
							activePage.classList.remove("z-move");
							currentPage.classList.remove("z-move");
							that.isDisableFlipPage=!1;
						},500);
					}
				}else{
					currentPage.classList.remove("z-move");
				}
			}
		})
	}
	App.prototype.showPage=function (e) {
		
	}
	App.prototype.enableFlipPage=function () {
		this.isDisableFlipPage=!1;
	}
	App.prototype.disableFlipPage=function () {
		this.isDisableFlipPage=!0;
	}
	App.prototype.setFlipPageMode=function (mode) {
		if(typeof mode!="number"||mode>3||mode<0) return;
		switch(mode){
			case 0:
				this.isDisableFlipPage=!0;
				this.isDisableFlipPrevPage=!0;
				this.isDisableFlipNextPage=!0;
				break;
			case 1:
				this.isDisableFlipPage=!1;
				this.isDisableFlipPrevPage=!1;
				this.isDisableFlipNextPage=!1;
				break;
			case 2:
				this.isDisableFlipPage=!1;
				this.isDisableFlipPrevPage=!1;
				this.isDisableFlipNextPage=!0;
				break;
			case 3:
				this.isDisableFlipPage=!1;
				this.isDisableFlipPrevPage=!0;
				this.isDisableFlipNextPage=!1;
				break;
		}
	}

	module.exports=new App($(document.body));
})

// 声音控制模块
// define的id就是模块的绝对路径
define("appAudio",[],function (require,exports,module) {
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

// 视频控制模块
// 用单例对象来管理不方便，但也没有必要抽象为一个类
define("appVideo",["./appAudio"],function (require,exports,module) {
	var appAudio=require("./appAudio");

	var proto={
		createVideo:function (src,posterUrl) {
			var opt={
				src:src,
				width:"100%",
				height:"460px",
				controls:"controls"
			};
			posterUrl&&(opt.poster=posterUrl);
			return $("<video>",opt);
		},
		init:function ($page,posterUrl) {
			var that=this,
				audioStatus;
			var btnPlay=$page.find(".btn-play"),
				videoBox=$page.find(".video-box"),
				mask=$page.find(".mask-layer");

			btnPlay.on("tap",function () {
				mask.removeClass("z-hide");
				btnPlay.css("display","none");
				that.video=that.createVideo(videoBox.get(0).dataset.src,posterUrl||"");
				videoBox.append(that.video);
				audioStatus=appAudio.status;
				appAudio.pause();
			});

			$page.find(".maskLayer-close").on("tap",function () {
				mask.addClass("z-hide");
				btnPlay.css("display","block");
				that.video.remove();
				audioStatus==="on"?(appAudio.play()):(appAudio.pause());
			});
		}
	};

	function create () {
		var res=Object.create(proto);
		res.video=null;
		return res;
	}

	module.exports=create();
});

// 添加左右滑动
define("addHorizontalSlide",[],function (require,exports,module) {
	var addHorizontalSlide=function (page,cascading,func) {
		func=!!(func)?func:function() {};
		$(page).swipeLeft(function (e) {
			var firChild=cascading.children[0];
			$(firChild).addClass("z-prev-move");
			setTimeout(function () {
				cascading.appendChild(firChild);
				$(firChild).removeClass("z-prev-move");
			},300);
			e.preventDefault();
		});
		$(page).swipeRight(function (e) {
			var firChild=cascading.children[0];
			$(firChild).addClass("z-next-move");
			setTimeout(function () {
				cascading.appendChild(firChild);
				$(firChild).removeClass("z-next-move");
			},300);
			e.preventDefault();
		})
	};

	module.exports=addHorizontalSlide;
})