/*
* gesture.js---简单手势插件
* 只有swipe的上下左右四种手势
*/

define(function (require,exports,module) {
	var util=require("./util"),
		doc=document,
		slice=Array.prototype.slice;

	var touchPlugin=function () {
		var defOpt={
			onTouchStart:function (){},
			onTouchMove:function (){},
			onTouchEnd:function (){}
		};

		var Gesture=function (dom,opt) {
			this.dom=dom;
			this.opt=opt;
			this.startTouch={};
			this.lastTouch={};
		}
		Gesture.prototype.bind=function () {
			var that=this,
				elem=this.dom,
				opt=this.opt;
			elem.addEventListener("touchstart",function (e) {
				var temp=e.changedTouches[0];//不能简单的将touch赋值给startTouch，是引用，指的是同一个值。iphone 5s上有这个问题
				for(var p in temp){
					that.startTouch[p]=temp[p];
				}

				var moveHandler=function (e) {
					var touch=e.changedTouches[0];
					// 	vx=touch.clientX-that.lastTouch.clientX,
					// 	vy=that.lastTouch.clientY-touch.clientY,
					// 	angle=Math.atan2(vy,vx)*(180/Math.PI);
					// switch(true){
					// 	case (angle<45&&angle>-45):
					// 		e.drection="left_right";
					// 		break;
					// 	case ((angle<180&&angle>135)||(angle<-135&&angle>-180)):
					// 		e.drection="right_left";
					// 		break;
					// 	case (angle<135&&angle>45):
					// 		e.drection="bottom_top";
					// 		break;
					// 	case (angle>-135&&angle<-45):
					// 		e.drection="top_bottom";
					// 		break;
					// }
					// console.log("vx="+vx);
					// e.vy=vy;
					// e.vx=vx;
					opt.onTouchMove(e);
					for(var name in touch){
						that.lastTouch[name]=touch[name];
					}
				}

				doc.addEventListener("touchmove",moveHandler);
				doc.addEventListener("touchend",function (eve) {
					var touch=eve.changedTouches[0],
						vx=touch.clientX-that.startTouch.clientX,
						vy=that.startTouch.clientY-touch.clientY,
						angle=Math.atan2(vy,vx)*(180/Math.PI);
					switch(true){
						case (angle<45&&angle>-45):
							e.drection="left_right";
							break;
						case ((angle<180&&angle>135)||(angle<-135&&angle>-180)):
							e.drection="right_left";
							break;
						case (angle<135&&angle>45):
							e.drection="bottom_top";
							break;
						case (angle>-135&&angle<-45):
							e.drection="top_bottom";
							break;
					}
					// console.log("vx="+vx);
					e.vy=vy;
					e.vx=vx;
					opt.onTouchEnd(e);
					doc.removeEventListener("touchmove",moveHandler);
					doc.removeEventListener("touchend",arguments.callee);
				});
			})
		}

		module.exports = {
			addGesture:function (dom,opt) {
				opt=util.extend(defOpt,opt);
				var gesManager=new Gesture(dom,opt);
				gesManager.bind();
			}
		};
	}();
})