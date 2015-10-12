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

		// ��ֹһЩĬ���¼�
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
			// ��WebKit�����������У���CSS 3��animation����ִ�н���ʱ������webkitAnimationEnd�¼�,��CSS 3��transition����ִ�н���ʱ������webkitTransitionEnd�¼���webkitTransitionEnd�¼�����Ԫ�ص�ÿ����ʽ����ֵ�����ı�֮�󴥷�һ�Ρ�
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
			isStart=!1,//�ƶ��Ƿ�ʼ��touchstartʱ��Ϊtrue
			isPrev=!1,//activePage�Ƿ���currentpage��ǰһ���ֵ�Ԫ��
			isFirstTimeTouch=!1;//��ʾ��һ�ΰ�����ꡣtouchstartʱ��Ϊtrue��touchmoveʱ��Ϊfalse
			// docHei=Math.max(document.documentElement.clientHeight,document.body.clientHeight);//��������ڿ��ܻ�仯������Ƕ�̬���

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
					// ���֮ǰ����һ���ֵܽڵ�����ǵ�һ��move��Ҫ��������activePage,�Ұ�isPrev����Ϊtrue����Ϊ������previousElementSibling
					if(!isPrev||isFirstTimeTouch){
						isPrev=!0,isFirstTimeTouch=!1;
						activePage&&(activePage.classList.remove("z-active"),activePage.classList.remove("z-move"));//����˵�����activePage��null�İ�
						activePage=currentPage.previousElementSibling&&currentPage.previousElementSibling.classList.contains("page")?currentPage.previousElementSibling:(loop?that.$pages.last().get(0):!1);
						if(activePage&&activePage.classList.contains("page")){//��Ϊ����һ���п���ȡ����loop?that.$pages.last().get(0):!1
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
						currentPage.style.webkitTransform="scale("+(window.innerHeight/(window.innerHeight+moveDistY)).toFixed(3)+")";//Ҫ�����ƶ��˶��ٶ�Ӧ��y�ı��˶���
						activePage.style.webkitTransform="translateY(-"+(window.innerHeight-moveDistY)+"px)";
					}
				}else if(moveDistY<0){
					if(that.isDisableFlipNextPage) return;
					// ���֮ǰ��isPrev����ǰһ���ֵܽڵ㣩�����ǵ�һ��move��Ҫ��������activePage,�Ұ�isPrev����Ϊfalse����Ϊ������nextElementSibling
					if(isPrev||isFirstTimeTouch){
						isPrev=!1,isFirstTimeTouch=!1;
						activePage&&(activePage.classList.remove("z-active"),activePage.classList.remove("z-move"));//����˵�����activePage��null�İ�
						currentPage.nextElementSibling&&currentPage.nextElementSibling.classList.contains("page")?currentPage.nextElementSibling:(activePage=this.$pages.first(),loop=!0);
						if(activePage&&activePage.classList.contains("page")){//��Ϊ����һ���п���ȡ����loop?that.$pages.last().get(0):!1
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
						currentPage.style.webkitTransform="scale("+((window.innerHeight+moveDistY)/window.innerHeight).toFixed(3)+")";//Ҫ�����ƶ��˶��ٶ�Ӧ��y�ı��˶���
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
			(this.$pages.filter(".z-current").removeClass("z-current"),$page.css("-webkit-transform","none").addClass("z-current"),this.$currentPage=$page);//�����Ǳ��ʽ�������÷ֺţ���
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