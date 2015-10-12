/*
* gesture.js---简单手势插件
* 只有swipe的上下左右四种手势
*/

define(function (require,exports,module) {
	var util=require("./util"),
		slice=Array.prototype.slice,
		gestures={};//手势管理器,管理者每个手势对象

	function touchstartHandler (event) {
		if(Object.keys(gestures)){//不包括原型中的
			document.addEventListener("touchmove",touchmoveHandler);
			document.addEventListener("touchend",touchendHandler);
		}

		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch=event.changedTouches[i],
				touchRecord=util.extend(touch,{});
			var gesture={
				startTouch:touchRecord,
				startTime:Date.now(),
				element:touch.target
			}
			gestures[touch.identifier]=gesture;
		};
	}

	function touchmoveHandler (event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch=event.changedTouches[i],
				gesture=gestures[touch.identifier];

			if(!gesture){
				return;
			}

			if(!gesture.lastTouch){
				gesture.lastTouch=gesture.startTouch;//最后一个触点和最开始的触点
			}
			if(!gesture.lastTime){
				gesture.lastTime=gesture.startTime;
			}
			if (!gesture.duration) {//从开始到现在总的时间
			    gesture.duration = 0;
			}
			var time=Date.now()-gesture.lastTime;
			var vx=(touch.clientX-gesture.lastTouch.clientX)/time,
				vy=(touch.clientY-gesture.lastTouch.clientY)/time;//vx,vy上的速度
			gesture.duration += time;
			gesture.lastTouch=util.extend(touch,{});
			gesture.lastTime=Date.now();

			var displacementX = touch.clientX - gesture.startTouch.clientX,
			    displacementY = touch.clientY - gesture.startTouch.clientY,
			    distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));//Math.pow(x,y):计算X的Y次方

			

		};
	}

	function touchendHandler (event) {
		
	}

	module.exports={
		enable:function () {
			HTMLElement.prototype.addGesture=function (opt) {
				console.log(opt.type);
			};
			document.addEventListener("touchstart",touchstartHandler);
		},
		disable:function () {
			delete HTMLElement.prototype.addGesture;
			document.remveEventListener("touchstart",touchstartHandler);
		}
	};
})