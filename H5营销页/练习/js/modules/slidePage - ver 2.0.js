/*
* slidePage.js---�Ż���
* ����¼lastTouch
* ������жϸ��Ӽ�
* ��ÿ�ζԻ�ȡnextPage���洢�ڱ����У���touchʱ���ظ�ȡֵ
*/

define(function (require,exports,module) {
	var SlidePage=function (app) {
		this.curOpt={
			type:"scale",//����ʱ����ʽ
			limit:100,//������ֵʱ�Զ�ִ��
			wrap:"",//����
			page:""//������Ŀ��
		};
		this.isDisableFlipPage = false;//��ֹ����
		this.isDisableFlipPrevPage = !1, 
		this.isDisableFlipNextPage = !1;
		
		this.$pages=null;
		this.$wrap=null;
		this.$app=app;
		this.$currentPage = null;
	};

	SlidePage.prototype.disableFlipPage = function() {
		this.isDisableFlipPage = !0
	};

	SlidePage.prototype.enableFlipPage = function() {
		this.isDisableFlipPage = !1
	};

	SlidePage.prototype.createEvent=function () {
		var that=this;
		$(window).on("load",function () {
			var curPage=null,
				nextPage=null,
				startTouch=null,
				vx=0,
				vy=0,
				loop=false,
				isActive=false,
				isPrev=false,
				docHei=Math.max(document.documentElement.clientHeight,document.body.clientHeight);

			that.$app.on("touchstart",function (e) {
				if(that.isDisableFlipPage) return;
				var touch=e.touches[0];
				curPage = that.$pages.filter(".z-current").get(0);
				startTouch={
					x:touch.pageX,
					y:touch.pageY
				};
				curPage.style.webkitTransition="none";
			}).on("touchmove",function (e) {
				e.preventDefault();
				if(that.isDisableFlipPage) return;
				var touch=e.touches[0];
				vx=touch.pageX-startTouch.x;//���Կ�ʼʱ��touchΪ��㣬������ÿ�ζ�����һ��lastTouch
				vy=touch.pageY-startTouch.y;
				if(Math.abs(vx)<Math.abs(vy)){//ˮƽ��������ڱ仯�о�ֱ���˳�
					if(vy>0){
						if(that.isDisableFlipPrevPage) return;
						if(!isActive||!isPrev){//��һ��move���߸ı��˷���
							nextPage&&(nextPage.classList.remove("z-move"));
							nextPage=curPage.previousElementSibling &&
								curPage.previousElementSibling.classList.contains("page") ? curPage.previousElementSibling:
								(loop?that.$pages.last().get(0):false);
							if(nextPage){
								switch(that.curOpt.type){
									case "cover":
										break;
									case "scale":
									default:
										curPage.style.webkitTransformOrigin="bottom center";
										nextPage.style.webkitTransition="none";
										nextPage.style.webkitTransform="translateY(-100%)";
										nextPage.classList.add("z-move");
										break;
								}
								isActive=true;
								isPrev=true;
							}
						}else{
							switch(that.curOpt.type){
								case "cover":
									break;
								case "scale":
								default:
									nextPage.style.webkitTransform="translateY(-" + (docHei - vy) + "px)";
									curPage.style.webkitTransform="scale(" + (docHei / (docHei + vy)).toFixed(3) + ")";//Ҫ���������
									break;
							}
						}
					}else if(vy<0){
						if(that.isDisableFlipNextPage) return;
						if(!isActive||isPrev){
							nextPage&&(nextPage.classList.remove("z-move"));
							nextPage=curPage.nextElementSibling &&
								curPage.nextElementSibling.classList.contains("page") ? curPage.nextElementSibling:
								(that.$pages.first().get(0));
							// loop=true;// ����Ϊtrue��ѭ��
							if(nextPage){
								switch(that.curOpt.type){
									case "cover":
										break;
									case "scale":
									default:
										curPage.style.webkitTransformOrigin="top center";
										nextPage.style.webkitTransition="none";
										nextPage.style.webkitTransform="translateY(100%)";
										nextPage.classList.add("z-move");
										break;
								}
								isActive=true;
								isPrev=false;
							}
						}else{
							switch(that.curOpt.type){
								case "cover":
									break;
								case "scale":
								default:
									nextPage.style.webkitTransform="translateY(" + (docHei + vy) + "px)";
									curPage.style.webkitTransform="scale(" + ((docHei + vy) / docHei).toFixed(3) + ")";
									break;
							}
						}
					}
				}
			}).on("touchend",function (e) {
				if(that.isDisableFlipPage) return;
				if(!nextPage){
					curPage.classList.remove("z-move");
					return;
				}
				that.isDisableFlipPage=true;//�Ƚ�ֹ
				curPage.style.webkitTransition="all .4s ease-out";
				nextPage.style.webkitTransition="all .4s ease-out";
				if(Math.abs(vx)<Math.abs(vy)){
					if(Math.abs(vy)>that.curOpt.limit){
						curPage.style.webkitTransform="scale(0.2)";
						nextPage.style.webkitTransform="translateY(0)";
						setTimeout(function () {
							curPage.classList.remove("z-current");
							curPage.classList.remove("z-move");
							nextPage.classList.add("z-current");
							nextPage.classList.remove("z-move");
							curPage.pageHide&&curPage.pageHide();//ִ��ÿ��ҳ��ĺ���
							nextPage.pageShow&&nextPage.pageShow();//ִ��ǰһ��ҳ��ĺ���
							that.isDisableFlipPage=false;
						},500);
					}else{
						curPage.style.webkitTransform="scale(1)";
						nextPage.style.webkitTransform="translateY("+(isPrev?"-100%":"100%")+")";
						setTimeout(function () {
							nextPage.classList.remove("z-move");
							curPage.classList.remove("z-move");
							that.isDisableFlipPage=false;
						},500);
					}
				}else{
					that.isDisableFlipPage=false;
				}
				
				isActive=false;
				isPrev=false;
			})
		})
	}

	SlidePage.prototype.slide = function(opt) {
		this.curOpt=$.extend(this.curOpt,opt);
		// this.$wrap=$(this.curOpt.wrap),
		this.$pages=$(this.curOpt.page);
		if(!this.$pages){
			return;
		}
		this.createEvent();
	};

	SlidePage.prototype.getTouchInfo = function (vx,vy) {
		var info={
			vx:vx,
			vy:vy,
			vx_direction:0,
			vy_direction:0
		};
		info.dist=Math.sqrt(vx*vx+vy*vy);
		var angle=Math.atan2(-vy,vx)*(180/Math.PI);;
		switch(true){
			case (angle<45&&angle>-45):
				info.vx_direction=1;
				break;
			case ((angle<180&&angle>135)||(angle<-135&&angle>-180)):
				info.vx_direction=-1;
				break;
			case (angle<135&&angle>45):
				info.vy_direction=-1;
				break;
			case (angle>-135&&angle<-45):
				info.vy_direction=1;
				break;
		}
		return info;
	}

	SlidePage.prototype.getTransformVal = function (val,name) {
		var regexp=new RegExp(name+"\\(([-px%\\.\\d]+)\\)");
		var arr=regexp.exec(val);
		if(!arr||!arr.length)
			return "";
		return arr[1];
	}


	module.exports=new SlidePage($(document.body));
})