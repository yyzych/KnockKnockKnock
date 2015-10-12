/*
* app2.js
* 翻页样式2
*/

define(function (require,exports,module) {
	var $=require("zepto");

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
	App.prototype.showPage=function (page) {
		var that=this;
		window._showPage?window._showPage:window._showPage=function (page) {
			var $page,
				type=typeof page;
			switch(type){
				case "number":
					$page=that.$pages.eq(page);
					break;
				case "string":
					$page=that.$pages.first();
					break;
				case "object":
					$page=$(page);
					break;
			}
			($page&&$page.length)||($page=this.$currentPage);
			($page&&$page.length)&&
			(this.$pages.filter(".z-current").removeClass("z-current"),$page.css("-webkit-transform","none").addClass("z-current"),$page.trigger("current"),this.$currentPage=$page);
		}
		that.isInitComplete?window._showPage.apply(that,[page]):$(window).one("load",function (e) {
			window._showPage.apply(that,[page]);
		})
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