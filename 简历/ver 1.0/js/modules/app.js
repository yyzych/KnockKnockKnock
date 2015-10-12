/*
* app.js---主程式类
*/

define(function (require,exports,module) {
	//依赖模块,jquery直接在页面中导入
	var util=require("./util"),
		touchPlugin=require("./gesture"),
		SlidePlugin=require("./slidePlugin");

	var App=function () {
		// 配置参数
		var CONFIG={
			ROAD_SPACING:139,
			ROAD_NUM:9-1,
			ME_SPACING:113,
			ME_NUM:6-1,
			PAGE_NUM:4
		};

		// 全局变量
		var winHeight=window.innerHeight,
			isInScene1=true,
			canTouch=false,
			isFinish=true,//滚动的动画是否结束了
			pageIndex=0,
			pageTagArr=[],
			worksSlide=null,
			meLeft=0,//开始时距离容器左边的距离
			sys;//平台

		var container=$(".container").get(0),
			me=$(".me").get(0),
			road=$(".road-process"),
			works=$(".works"),
			roadProcesses=road.children("li");

		// 事件处理程序
		var handlers={
			mousewheelHandler:function (e) {// 滚轮事件处理程序
				if(isFinish){
					isFinish=false;
					var detla=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));//-1:下滚	1：上滚
					if(isInScene1){
						var roadIndex=$(road).data("roadIndex");
						if(detla==-1&&roadIndex<8){
							roadIndex=parseInt(roadIndex)+1;
							$(roadProcesses[roadIndex]).addClass("on");
							$(road).data("roadIndex",roadIndex);
							walk(me,CONFIG.ROAD_SPACING);
						}else if(detla==-1&&roadIndex==8){
							$(me).css({
								backgroundImage:"url(../image/me2.png)"
							});
							$(".scroll-down").addClass("scroll-down2").show();
							isInScene1=false;
							isFinish=true;
						}else{
							isFinish=true;
						}
					}else{
						pageIndex+=detla==1?-1:1;
						if(pageIndex<0||pageIndex>CONFIG.PAGE_NUM-1){
							pageIndex-=detla==1?-1:1;
							isFinish=true;
							return;
						}
						pageScroll(pageIndex);
						if(pageIndex==1){
							setTimeout(function () {
								$(".ability-box").addClass("show-ability-box");
							},250);
						}else if(pageIndex==2){

						}else if(pageIndex==3){

						}
					}
				}
			},
			resize:function (e) {
				clearTimeout(arguments.callee.timer);
				arguments.callee.timer=setTimeout(function () {
					winHeight=window.innerHeight
					var items=document.getElementsByClassName("item");
					var len=items.length;
					for (var i = 0; i < len; i++) {
						items[i].style.height=winHeight+"px";
						pageTagArr[i]=-i*winHeight;
					};

					worksSlide.reload();
				},100);
			},
			roadTouchMove:function (vx) {
				var curX=parseInt(road.css("left"));
				curX+=vx;
				if(curX>0){
					return;
				}
				if(curX<-(CONFIG.ROAD_NUM*CONFIG.ROAD_SPACING)){
					clearInterval(me.timer);
					me.timer=null;
					me.style.backgroundPositionX=0+"px";
					me.style.backgroundImage="url(../image/me2.png)";
					return;
				}
				road.css({
					left:curX
				});
			},
			roadTouchEnd:function (vx) {
				var spacing=CONFIG.ROAD_SPACING;
				var curX=parseInt(road.css("left"));
				// var t=(Math.abs(curX)%spacing)<(spacing/2)?0:1;
				// curX=-(Math.floor(Math.abs(curX)/spacing)+t)*spacing;
				var t=Math.abs(vx)<(spacing/2)?0:1;
				if(t===0) return;
				curX+=(vx<0)?-spacing:spacing;
				if(curX>0){
					return;
				}
				if(curX<-(CONFIG.ROAD_NUM*CONFIG.ROAD_SPACING)){
					clearInterval(me.timer);
					me.timer=null;
					me.style.backgroundPositionX=0+"px";
					me.style.backgroundImage="url(../image/me2.png)";
					return;
				}
				road.animate({
					left:curX
				},350);
			},
			worksTouchMove:function (vx) {
				var curX=parseInt(works.css("left"));
				curX+=vx;
				if(curX>0||curX<-1160){
					return;
				}
				works.css({
					left:curX
				});
			},
			worksTouchEnd:function (vx) {
				var curX=parseInt(works.css("left"));
				var t=Math.abs(vx)<(290/4)?0:1;
				if(t===0) return;
				curX+=(vx<0)?-290:290;
				if(curX>0||curX<-1160){
					return;
				}
				works.animate({
					left:curX
				},350);
			}
		}

		function _init () {
			// 高度初始化
			var items=document.getElementsByClassName("item");
			var len=items.length;
			for (var i = 0; i < len; i++) {
				items[i].style.height=winHeight+"px";
				pageTagArr[i]=-i*winHeight;
			};

			// 事件绑定
			createEvent ();

			// 作品滚动
			worksSlide=new SlidePlugin();
			worksSlide.slide({
				leftTrigger:".show-prev",
				rightTrigger:".show-next",
				triggerType:"click",
				parElem:".show-box-inner",
				tarElem:".works",
				titCell: ".works li", 
				showNum:3,
				duration:600,
			});

			meLeft=me.offsetLeft||62;
			$(".front-road").css("text-shadow",util.getTxtShadow(14,"#D85C44"));
		}
		function createEvent () {
			var $logo=$(".logo");
			sys=util.isMobile();
			if(sys.isPhone){
				roadProcesses.addClass("on");

				touchPlugin.addGesture($(".scene-1").get(0),{
					onTouchMove:function (e) {//touchmove:事件少做应用逻辑处理，提高性能
						if(!canTouch){
							e.preventDefault();
							e.stopPropagation();
							return;
						}
						// switch(e.drection){
						// 	case "left_right":
						// 	case "right_left":
						// 		// 事件处理与应用逻辑分开
						// 		handlers.roadTouchMove(e.vx);
						// 		break;
						// 	default:
						// 		break;
						// }
					},
					onTouchEnd:function (e) {
						switch(e.drection){
							case "left_right":
							case "right_left":
								// 事件处理与应用逻辑分开
								handlers.roadTouchEnd(e.vx);
								break;
							default:
								break;
						}
					}
				})

				touchPlugin.addGesture($(".show-box-inner").get(0),{
					// onTouchMove:function (e) {
					// 	// switch(e.drection){
					// 	// 	case "left_right":
					// 	// 	case "right_left":
					// 	// 		handlers.worksTouchMove(e.vx);
					// 	// 		break;
					// 	// 	default:
					// 	// 		break;
					// 	// }
					// },
					onTouchEnd:function (e) {
						switch(e.drection){
							case "left_right":
							case "right_left":
								handlers.worksTouchEnd(e.vx);
								break;
							default:
								break;
						}
					}
				})


				me.timer=setInterval(function () {
					var backPosiX=me.style.backgroundPositionX||util.getCss(me,"backgroundPositionX");
					backPosiX=parseInt(backPosiX);
					if(backPosiX>-CONFIG.ME_SPACING*CONFIG.ME_NUM){
						backPosiX+=-CONFIG.ME_SPACING;//人物进行了缩放，不是原来的150宽了
						backPosiX=backPosiX>0?0:backPosiX;
					}else{
						backPosiX=0;
					}
					me.style.backgroundPositionX=backPosiX+"px";
				},120);
			}else{
				window.onresize=handlers.resize;
			}

			$logo.click(function (e) {
				$(this).addClass("logo-anim");
				$(".scroll-down").hide();

				// 显示一个圆圈
				$(roadProcesses[0]).addClass("on");
				$(road).data("roadIndex",0);
				// 显示人物
				$(me).addClass("show-me-backBox");
				var bb=$(".backBox");
				bb.addClass("show-me-backBox");
				if(/WebKit/.test(navigator.userAgent)){
					bb.children("div").css("zoom","0.65");
				}

				canTouch=true;
			});

			window.addEventListener("mousewheel",handlers.mousewheelHandler);
			window.addEventListener("DOMMouseScroll",handlers.mousewheelHandler);

		}
		function walk (elem,vx) {
			var curPosiX=elem.style.left||util.getCss(elem,"left");
			curPosiX=parseInt(curPosiX);
			if(curPosiX>=(CONFIG.ROAD_NUM*CONFIG.ROAD_SPACING+meLeft)){//62是padding
				return;
			}
			curPosiX+=vx;

			$(elem).animate({
				left:curPosiX
			},450,function () {
				if(elem.timer){
					clearTimeout(elem.timer);
					elem.timer=null;
					elem.style.backgroundPositionX=0+"px";
				}
				isFinish=true;
			});

			elem.timer=setInterval(function () {
				var backPosiX=elem.style.backgroundPositionX||util.getCss(elem,"backgroundPositionX");
				backPosiX=parseInt(backPosiX);
				if(backPosiX>-CONFIG.ME_SPACING*CONFIG.ME_NUM){
					backPosiX+=-CONFIG.ME_SPACING;//人物进行了缩放，不是原来的150宽了
					backPosiX=backPosiX>0?0:backPosiX;
				}else{
					backPosiX=0;
				}
				elem.style.backgroundPositionX=backPosiX+"px";
			},40);
		}
		function pageScroll (index,callback) {
			var val=pageTagArr[index];
			if(typeof callback !=="undefined"){
				$(container).animate({
					top:val
				},"501",callback);
			}else{
				$(container).animate({
					top:val
				},"501",function () {
					isFinish=true;
				});
			}
		}

		// 接口
		return {
			init:_init
		}
	}();

	module.exports=App;
})