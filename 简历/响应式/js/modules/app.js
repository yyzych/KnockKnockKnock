/*
* app.js---主程式类
*/

define(function (require,exports,module) {
	//依赖模块,jquery直接在页面中导入
	var util=require("./util"),
		// gesture=require("./gesture"),
		slidePlugin=require("./slidePlugin");

	var App=function () {
		// 配置参数
		var CONFIG={
			ROAD_SPACING:140,
			ROAD_NUM:9-1,
			ME_SPACING:113,
			ME_NUM:6-1,
			PAGE_NUM:4
		};

		// 全局变量
		var winHeight=window.innerHeight,
			me=$(".me").get(0),
			isInScene1=true,
			canTouch=false,
			isFinish=true,//滚动的动画是否结束了
			pageIndex=0,
			pageTagArr=[],
			container=$(".container").get(0),
			road=$(".road-process"),
			meLeft=0,//开始时距离容器左边的距离
			sys,//平台
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
				},100);
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
			slidePlugin.slide({
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
				// 开启触摸
				// gesture.enable();
				// 绑定触摸事件
				// $logo.get(0).addGesture({
				// 	type:"swipe",
				// 	drection:"leftToRight",
				// 	startHandler:function (e) {
				// 		e.stopPropagation();
				// 		e.preventDefault();
				// 	},
				// 	moveHandler:function (){},
				// 	endHandler:function (){}
				// })
				$logo.get(0).addEventListener("touchmove",function(e){
				    e.preventDefault();
				    e.stopPropagation();
				}, false);
				$(".scroll-down").get(0).addEventListener("touchmove",function (e) {
					e.preventDefault();
					e.stopPropagation();
				},false);
				roadProcesses.addClass("on");

				$(".scene-1").get(0).addEventListener("panend",function(e){
				    road.animate({
				    	left:"-="+139+"px"
				    },450);
				}, false);
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

			window.onresize=handlers.resize;
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