/*
* app-debug.js
*/

// define时如果使用了deps参数，则以后加载的依赖项都必须在deps当中(PS:好像如果声明在同一文件内就又没关系了的)？！！
// 注意：这里的标示符也要改为debug
define("app-debug",["zepto"],function (require,exports,module) {
	// 加载依赖模块
	var $=require("zepto"),
		appAudio=require("./appAudio");

	var App=function (app) {
		this.isDisableFlipPage = !1;
		this.isDisableFlipPrevPage = !1;
		this.isDisableFlipNextPage = !1;
		this.isInitComplete=!1;
		this.isFirstShowPage=!0;
		
		this.$app=app;
		this.$pages=this.$app.find(".page");
		this.$currentPage = this.$pages.eq(0);

		var that=this,
			$win=$(window);

		// 阻止一些默认事件
		(function () {
			$win.on("scroll",function (e) {
				e.preventDefault();
			}).on("touchmove",function (e) {
				e.preventDefault();
			});
			$win.on("img","mousemove",function (e) {
				e.preventDefault();
			})
		})();

		$win.on("load",this.slideHandler.bind(this));
		$win.on("load",function () {
			var $appLoading=$(".app-mask");
			$appLoading.css("opacity",0);
			// 在WebKit引擎的浏览器中，当CSS 3的animation动画执行结束时，触发webkitAnimationEnd事件,当CSS 3的transition动画执行结束时，触发webkitTransitionEnd事件。webkitTransitionEnd事件将在元素的每个样式属性值发生改变之后触发一次。
			$appLoading.on("webkitTransitionEnd",function () {
				$appLoading.remove();
			});
			that.isInitComplete=!0;
			that.showPage();
		})
	};

	App.prototype.slideHandler=function (e) {
		var that=this;
		var currentPage=null,
			activePage=null,
			startX=0,
			startY=0,
			moveDistX=0,
			moveDistY=0,
			loop=!1,
			isStart=!1,//移动是否开始。touchstart时设为true
			isPrev=!1,//activePage是否是currentpage的前一个兄弟元素
			isFirstTimeTouch=!1;//表示第一次按下鼠标。touchstart时设为true，touchmove时设为false
			// docHei=Math.max(document.documentElement.clientHeight,document.body.clientHeight);//浏览器窗口可能会变化，最好是动态获得

		that.$app.on("touchstart",function (e) {
			if(that.isDisableFlipPage) return;
			currentPage = that.$pages.filter(".z-current").get(0);
			activePage=null;
			if(currentPage){
				isStart=!0,isPrev=!1,isFirstTimeTouch=!0;
				moveDistX=0,moveDistY=0;
				startX=e.touches[0].pageX,startY=e.touches[0].pageY;
				currentPage.classList.add("z-move");
				currentPage.style.webkitTransition="none";
			}
		}).on("touchmove",function (e) {
			if(isStart&&
				(activePage||isFirstTimeTouch)&&
				(moveDistY=e.touches[0].pageY-startY,moveDistX=e.touches[0].pageX-startX,Math.abs(moveDistY)>Math.abs(moveDistX))){
				if(moveDistY>0){
					if(that.isDisableFlipPrevPage) return;
					// 如果之前是下一个兄弟节点或则是第一次move就要重新设置activePage,且把isPrev设置为true，因为这里是previousElementSibling
					if(!isPrev||isFirstTimeTouch){
						isPrev=!0,isFirstTimeTouch=!1;
						activePage&&(activePage.classList.remove("z-active"),activePage.classList.remove("z-move"));//在理说这里的activePage是null的啊
						activePage=currentPage.previousElementSibling&&currentPage.previousElementSibling.classList.contains("page")?currentPage.previousElementSibling:(loop?that.$pages.last().get(0):!1);
						if(activePage&&activePage.classList.contains("page")){//因为上面一步有可能取到：loop?that.$pages.last().get(0):!1
							activePage.classList.add("z-active");
							activePage.classList.add("z-move");
							activePage.style.webkitTransition="none";
							activePage.style.webkitTransform="translateY(-100%)";
							currentPage.style.webkitTransformOrigin="bottom center";
						}else{
							currentPage.style.webkitTransform="translateY(0px) scale(1)";
							activePage=null;
						}
					}else{
						currentPage.style.webkitTransform="scale("+(window.innerHeight/(window.innerHeight+moveDistY)).toFixed(3)+")";//要计算移动了多少对应的y改变了多少
						activePage.style.webkitTransform="translateY(-"+(window.innerHeight-moveDistY)+"px)";
					}
				}else if(moveDistY<0){
					if(that.isDisableFlipNextPage) return;
					// 如果之前是isPrev（即前一个兄弟节点）或则是第一次move就要重新设置activePage,且把isPrev设置为false，因为这里是nextElementSibling
					if(isPrev||isFirstTimeTouch){
						isPrev=!1,isFirstTimeTouch=!1;
						activePage&&(activePage.classList.remove("z-active"),activePage.classList.remove("z-move"));//在理说这里的activePage是null的啊
						currentPage.nextElementSibling&&currentPage.nextElementSibling.classList.contains("page")?activePage=currentPage.nextElementSibling:(activePage=that.$pages.first().get(0),loop=!0);
						if(activePage&&activePage.classList.contains("page")){//因为上面一步有可能取到：loop?that.$pages.last().get(0):!1
							activePage.classList.add("z-active");
							activePage.classList.add("z-move");
							activePage.style.webkitTransition="none";
							activePage.style.webkitTransform="translateY("+window.innerHeight+"px)";//-100%???!
							currentPage.style.webkitTransformOrigin="top center";
						}else{
							currentPage.style.webkitTransform="translateY(0px) scale(1)";
							activePage=null;
						}
					}else{
						currentPage.style.webkitTransform="scale("+((window.innerHeight+moveDistY)/window.innerHeight).toFixed(3)+")";//要计算移动了多少对应的y改变了多少
						activePage.style.webkitTransform="translateY("+(window.innerHeight+moveDistY)+"px)";
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
					if(Math.abs(moveDistY)>Math.abs(moveDistX) && Math.abs(moveDistY)>100){
						currentPage.style.webkitTransform="scale(0.2)",activePage.style.webkitTransform="translateY(0px)";
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
						currentPage.style.webkitTransform="scale(1)";
						isPrev?(activePage.style.webkitTransform="translateY(-100%)"):(activePage.style.webkitTransform="translateY(100%)");
						setTimeout(function () {
							activePage.classList.remove("z-active");
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

	App.prototype.showPage=function (page) {
		var that=this;
		window.app_showPage?window.app_showPage:window.app_showPage=function (page) {
			var $page,
				type=typeof page;
			switch(type){
				case "number":
					$page=that.$pages.eq(page);
					break;
				case "string":
					$page=that.$pages.filter(page).first();
					break;
				case "object":
					$page=$(page);
					break;
			}
			($page && $page.length)||($page=this.$currentPage);
			($page && $page.length)&&
			(this.$pages.filter(".z-current").removeClass("z-current"),$page.css("-webkit-transform","none").addClass("z-current"),$page.trigger("current"),this.$currentPage=$page);//这里是表达式，不能用分号？！应该是这样
		}
		this.isInitComplete?window.app_showPage.apply(that,[page]):$(window).one("load",function (e) {
			window.app_showPage.apply(that,[page]);
		})
	}

	App.prototype.setFlipPageMode = function(mode) {
		if ("number" != typeof mode || 0 > mode || mode > 3) throw "App.setFlipPageMode 方法调用错误：请提供以下正确的参数（0:禁用翻页、1:启用上下翻页、2:仅启用向上翻页、3:仅启用向下翻页）";
		switch (mode) {
			case 0:
				this._isDisableFlipPage = !0,
				this._isDisableFlipPrevPage = !0,
				this._isDisableFlipNextPage = !0;
				break;
			case 1:
				this._isDisableFlipPage = !1,
				this._isDisableFlipPrevPage = !1,
				this._isDisableFlipNextPage = !1;
				break;
			case 2:
				this._isDisableFlipPage = !1,
				this._isDisableFlipPrevPage = !1,
				this._isDisableFlipNextPage = !0;
				break;
			case 3:
				this._isDisableFlipPage = !1,
				this._isDisableFlipPrevPage = !0,
				this._isDisableFlipNextPage = !1
		}
	};

	App.prototype.disableFlipPage = function() {
		this.isDisableFlipPage = !0
	};

	App.prototype.enableFlipPage = function() {
		this.isDisableFlipPage = !1
	};

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