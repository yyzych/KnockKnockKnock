/*
* slidePage.js ver 3.0
*/

define(function (require,exports,module) {
	var SlidePage=function (app) {
		this.isDisableFlipPage = !0;
		this.isDisableFlipPrevPage = !1, 
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

		$(win).on("load",this.slideHandler.bind(this));
		$(win).on("load",function () {
			var $appLoading=$("#loading");
			// 在WebKit引擎的浏览器中，当CSS 3的animation动画执行结束时，触发webkitAnimationEnd事件,当CSS 3的transition动画执行结束时，触发webkitTransitionEnd事件。webkitTransitionEnd事件将在元素的每个样式属性值发生改变之后触发一次。
			$appLoading.on("webkitTransitionEnd",function () {
				$appLoading.remove();
			});
			that.isInitComplete=!0;
			that.showPage();
		})
	};

	SlidePage.prototype.slideHandler=function (e) {
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
				(moveDistY=e.touches[0].pageY-startY,moveDistX=e.touches[0].pageX,Math.abs(moveDistY)>Math.abs(moveDistX))){
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
						currentPage.nextElementSibling&&currentPage.nextElementSibling.classList.contains("page")?currentPage.nextElementSibling:(activePage=this.$pages.first(),loop=!0);
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
						},500);
					}else{
						currentPage.style.webkitTransform="scale(1)";
						isPrev?(activePage.style.webkitTransform="translateY(100%)"):(activePage.style.webkitTransform="translateY(-100%)");
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

	SlidePage.prototype.showPage=function (page) {
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
			(this.$pages.filter(".z-current").removeClass("z-current"),$page.css("-webkit-transform","none").addClass("z-current"),this.$currentPage=$page);//这里是表达式，不能用分号？！
		}
		this.isInitComplete?window.app_showPage.apply(that,[page]):$(window).one("load",function (e) {
			window.app_showPage.apply(that,[page]);
		})
	}

	SlidePage.prototype.disableFlipPage = function() {
		this.isDisableFlipPage = !0
	};

	SlidePage.prototype.enableFlipPage = function() {
		this.isDisableFlipPage = !1
	};

	module.exports=new SlidePage($(document.body));
})