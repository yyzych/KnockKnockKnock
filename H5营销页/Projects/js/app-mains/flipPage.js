/*
* flipPage.js-翻页效果插件
* @author ych
*/

(function ($,exports) {
	var queue={};
	var FlipPage=function () {
		var _FlipPage=function (opt) {
			this.isDisableFlipPage=!1;
			this.isDisableFlipPageNext=!1;
			this.isDisableFlipPagePrev=!1;
			this.isInitComplate=!1;

			this.flipType=opt.flipType||"default";

			(this.$app=$(opt.wrap),this.$app&&this.$app.length>0)||(this.$app=$(document.body));
			this.$pages=this.$app.find(".page");
			this.$currentPage=this.$pages.eq(0);

			var that=this,
				$win=$(window);

			(function () {
				$win.on("mousemove","img",function (e) {
					e.preventDefault();
				});
				$win.on("touchmove scroll",function (e) {
					e.preventDefault();
				})
			})();

			$win.on("load",$.proxy(that.slideHandler,that));
			$win.on("load",function (e) {
				that.isInitComplate=!0;
				that.showPage(opt.firstPage);
			})
		};

		_FlipPage.prototype.slideHandler=function (e) {
			var that=this,
				currentPage=null,
				activePage=null,
				isFirstTimeTouch=!1,
				isPrev=!1,
				isStart=!1,
				isLoop=!1,
				moveDistX=0,
				moveDistY=0,
				startX,
				startY;
			that.$app.on("touchstart",function (e) {
				if(that.isDisableFlipPage) return;
				currentPage=that.$pages.filter(".z-current").get(0);
				activePage=null;
				if(currentPage){
					isStart=!0,isPrev=!1,isFirstTimeTouch=!0;
					moveDistX=0,moveDistY=0;
					startX=e.touches[0].pageX,
					startY=e.touches[0].pageY;
					currentPage.classList.add("z-move");
					currentPage.style.webkitTransition="none";
				}
			}).on("touchmove",function (e) {
				if(isStart&&
					(activePage||isFirstTimeTouch)
					(moveDistX=e.touches[0].pageX-startX,moveDistY=e.touches[0].pageY-startY,Math.abs(moveDistY)>Math.abs(moveDistX))){
					if(moveDistY<0){//从下往上
						if(that.isDisableFlipPageNext) return;
						if(isFirstTimeTouch||isPrev){
							isFirstTimeTouch=!1;
							isPrev=!1;
							activePage&&(activePage.classList.remove("z-move"),activePage.classList.remove("z-active"));
							activePage=(currentPage.nextElementSibling&&currentPage.nextElementSibling.classList.contains("page"))?currentPage.nextElementSibling:(isLoop=!0,that.$pages.first().get(0));
							if(activePage&&activePage.classList.contains("page")){
								activePage.classList.add("z-move");
								activePage.classList.add("z-active");
								activePage.style.webkitTransition="none";
								activePage.style.webkitTransform="translateY(100%)";//"translateY("+window.innerHeight+"px)"
								currentPage.style.webkitTransformOrigin="center top";
							}else{
								activePage=null;
								currentPage.style.webkitTransform="translateY(0px) scale(1)";
							}
						}else{
							currentPage.style.webkitTransform="scale("+((window.innerHeight+moveDistY)/window.innerHeight).toFixed(3)+")";
							activePage.style.webkitTransform="translateY("+(window.innerHeight+moveDistY)+"px)";
						}
					}else if(moveDistY>0){
						if(that.isDisableFlipPagePrev) return;
						if(isFirstTimeTouch||!isPrev){
							isFirstTimeTouch=!1;
							isPrev=!0;
							activePage&&(activePage.classList.remove("z-move"),activePage.classList.remove("z-active"));
							activePage=(currentPage.prevElementSibling&&currentPage.prevElementSibling.classList.contains("page"))?currentPage.prevElementSibling:(isLoop?that.$pages.first().get(0):false);
							if(activePage&&activePage.classList.contains("page")){
								activePage.classList.add("z-move");
								activePage.classList.add("z-active");
								activePage.style.webkitTransition="none";
								activePage.style.webkitTransform="translateY(-100%)";//"translateY("+window.innerHeight+"px)"
								currentPage.style.webkitTransformOrigin="center bottom";
							}else{
								activePage=null;
								currentPage.style.webkitTransform="translateY(0px) scale(1)";
							}
						}else{
							currentPage.style.webkitTransform="scale("+(window.innerHeight/(window.innerHeight+moveDistY)).toFixed(3)+")";
							activePage.style.webkitTransform="translateY(-"+(window.innerHeight-moveDistY)+"px)";
						}
					}
				}
			}).on("touchend",function (e) {
				if(isStart){
					isStart=!1;
					if(activePage){
						that.isDisableFlipPage=!0;
						currentPage.style.webkitTransition="-webkit-transform .4s ease-out";
						activePage.style.webkitTransition="-webkit-transform .4s ease-out";
						if(Math.abs(moveDistY)>Math.abs(moveDistX)&&Math.abs(moveDistY)>100){
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
							setTimeout(function (e) {
								activePage.classList.remove("z-active");
								activePage.classList.remove("z-move");
								that.isDisableFlipPage=!1;
							},500);
						}
					}else{
						currentPage.classList.remove("z-move");
					}
				}
			});
		}
		//设置开始时显示的页面
		_FlipPage.prototype.showPage=function (page) {
			var that=this;
			var _showPage=function (page) {
				var $curPage=null;
				switch(typeof page){
					case "number":
						$curPage=that.$pages.eq(0);
						break;
					case "object":
						$curPage=$(page);
						break;
					case "string":
						$curPage=that.$pages.filter(page).first();
						break;
				}
				($curPage && $curPage.length)||($curPage=that.$currentPage);
				if($curPage&&$curPage.length){
					that.$pages.filter(".z-current").removeClass("z-current");
					$curPage.addClass("z-current").css({
						"-webkit-transform":none,
						"transform":none
					});
					$curPage.trigger("current");
					that.$currentPage=$curPage;
				}
			}

			that.isInitComplate?_showPage.apply(that,page):window.one("load",function (e) {
				_showPage.apply(that,page);
			})
		}
		_FlipPage.prototype.setFlipMode = function(type) {
			if(typeof type!=="number"||(type<0||type>3)){
				console.log("设置的类别不正确");
				return;
			}
			switch(type){
				case 0:
					this.isDisableFlipPage=!0;
					this.isDisableFlipPagePrev=!0;
					this.isDisableFlipPageNext=!0;
				case 1:
					this.isDisableFlipPage=!1;
					this.isDisableFlipPagePrev=!1;
					this.isDisableFlipPageNext=!1;
					break;
				case 2:
					this.isDisableFlipPage=!1;
					this.isDisableFlipPagePrev=!0;
					this.isDisableFlipPageNext=!1;
					break;
				case 3:
					this.isDisableFlipPage=!1;
					this.isDisableFlipPagePrev=!1;
					this.isDisableFlipPageNext=!0;
					break;
			}
		};
		_FlipPage.prototype.disableFlipPage=function () {
			this.isDisableFlipPage=!0;
		};
		_FlipPage.prototype.enableFlipPage=function () {
			this.isDisableFlipPage=!1;
		};

		return _FlipPage;

	}

	$.fn=function (opt) {
		var flipPage=new FlipPage(opt);
		queue[id]=flipPage;
		return this;
	}
})(window.Zepto,window);