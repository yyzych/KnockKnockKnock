/*
* slidePage.js---页面滑动插件
*/

define(function (require,exports,module) {
	var slidePage=function () {
		var defOpt={
			type:"scale",//滑动时的样式
			limit:100,//超过该值时自动执行
			wrap:"",//容器
			page:"",//发生的目标
			callback:function(){}
		};
		var Elems={
			Wrap:null,
			Pages:null
		};
		var curIndex=0,
			nextIndex,
			doc=document,
			pageLength=0,
			curOpt=null,
			isInScale=false,
			tfOrigin,
			docHei=0;
			gesture={
				startTouch:null,
				lastTouch:null,
				startMouse:null,
				lastMose:null
			};

		function slide (opt) {
			curOpt=$.extend(defOpt,opt);
			Elems.Wrap=(this!==window)?this:$(curOpt.wrap),
			Elems.Pages=$(curOpt.page);
			if(!Elems.Wrap||!Elems.Pages){
				return;
			}
			pageLength=Elems.Pages.length;
			createEvent(curOpt);
			init();
		}

		function init () {
			docHei=Math.max(document.documentElement.clientHeight,document.body.clientHeight);

		}

		function addHorizontalSlide (page,cascading,func) {
			func=!!(func)?func:function() {};
			$(page).swipeLeft(function (e) {
				var firChild=cascading.children[0];
				$(firChild).addClass("z-prev-move");
				setTimeout(function () {
					cascading.appendChild(firChild);
					$(firChild).removeClass("z-prev-move");
				},600);
				e.preventDefault();
			});
			$(page).swipeRight(function (e) {
				var firChild=cascading.children[0];
				$(firChild).addClass("z-next-move");
				setTimeout(function () {
					cascading.appendChild(firChild);
					$(firChild).removeClass("z-next-move");
				},600);
				e.preventDefault();
			})
		}

		function scaleHandler (info,auto) {
			var	pages=Elems.Pages;
			if(typeof tfOrigin ==="undefined"){
				tfOrigin=info.vy_direction>0?"50% 100%":"50% 0%";
			}
			if(auto!==undefined&&auto===true){
				var temp,temp2;
				var cur_p=$(pages[curIndex]),
					next_p=$(pages[nextIndex]);
				if(info.dist>curOpt.limit){
					temp=0.2;
					temp2=0;
					var formarIndex=curIndex;
					curIndex=Math.max(0,Math.min(pageLength-1,curIndex-info.vy_direction));
					setTimeout(function () {
						cur_p.toggleClass("z-current");
						next_p.toggleClass("z-current").css({
							display:undefined,
							zIndex:undefined
						});
						pages[curIndex].slideCallback&&pages[curIndex].slideCallback();//执行每个页面的函数
						pages[formarIndex].slideCallback&&pages[formarIndex].slideCallback();//执行前一个页面的函数
					},400);
				}else{
					temp=1;
					temp2=nextIndex>curIndex?docHei:-docHei;
				}
				cur_p.css({
					transition:"all .4s",
					transform:"scale("+temp+")"
				});
				next_p.css({
					transition:"all .4s",
					zIndex:"9",
					transform:"translateY("+temp2+"px)"
				});
			}else{
				var curVal=$(pages[curIndex]).css("transform"),
					ctemp=info.vy_direction*0.001*info.dist;
				curVal=getTransformVal(curVal,"scale");
				if(curVal==="")
					curVal=1;
				if(/50% 100%/.test(tfOrigin)){//原点在底部
					curVal=Math.max(0,Math.min(1,parseFloat(curVal)-ctemp));
					nextIndex=Math.max(-1,Math.min(pageLength,curIndex-1));
				}else{
					curVal=Math.max(0,Math.min(1,parseFloat(curVal)+ctemp));
					nextIndex=Math.max(-1,Math.min(pageLength,curIndex+1));
				}
				var tf="scale("+curVal+")";
				$(pages[curIndex]).css({
					transition:"none",
					transformOrigin:tfOrigin,
					transform:tf
				});
				nextPageShow(info,nextIndex,ctemp*docHei,nextIndex>curIndex?docHei:-docHei);//ctemp*docHei；表示变化的高度
			}
		}

		function getTransformVal (val,name) {
			var regexp=new RegExp(name+"\\(([-px%\\.\\d]+)\\)");
			var arr=regexp.exec(val);
			if(!arr||!arr.length)
				return "";
			return arr[1];
		}

		function nextPageShow (info,index,vy,oriVal) {
			if(index<0||index>pageLength-1) return;
			var nextVal=$(Elems.Pages[index]).css("transform");
			nextVal=getTransformVal(nextVal,"translateY");
			if(nextVal==="")
				nextVal=oriVal;
			nextVal=parseFloat(nextVal)+vy;
			var tf="translateY("+nextVal+"px)";
			$(Elems.Pages[index]).css({
				transition:"none",
				display:"block",
				transform:tf
			})
		}

		function getTouchInfo (vx,vy) {
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

		function touchmoveHandler (e) {
			var touch=e.changedTouches[0],
				vx=touch.clientX-gesture.lastTouch.clientX,
				vy=touch.clientY-gesture.lastTouch.clientY,
				info=getTouchInfo(vx,vy);
			//水平方向或者在变化中就直接退出
			if(info.vy_direction===0) 
				return;
			if((info.vy_direction===1&&curIndex<=0&&isInScale===false)||(info.vy_direction===-1&&curIndex>=pageLength-1&&isInScale===false))
				return;
			isInScale=true;
			switch(curOpt.type){
				case "cover":
					break;
				case "scale":
				default:
					scaleHandler(info);
					break;
			}

			$.extend(gesture.lastTouch,touch);
		}

		function touchendHandler (e) {
			var touch=e.changedTouches[0],
				vx=touch.clientX-gesture.startTouch.clientX,
				vy=touch.clientY-gesture.startTouch.clientY,
				info=getTouchInfo(vx,vy);
			//水平方向直接退出
			if(info.vy_direction===0) return;
			if((info.vy_direction===1&&curIndex<=0&&isInScale===false)||(info.vy_direction===-1&&curIndex>=pageLength-1&&isInScale===false))
				return;
			scaleHandler(info,true);
			reset();
		}

		function reset () {
			isInScale=false;
			tfOrigin=undefined;
			$(doc).off("touchmove",touchmoveHandler);
			$(doc).off("touchend",touchendHandler);
		}

		function createEvent (opt) {
			var wrap=Elems.Wrap;
			$(wrap).on("touchstart",function (e) {
				var touch=e.changedTouches[0];
				gesture.lastTouch=$.extend({},touch);//注意：lastTouch和startTouch不能指向同一个引用
				gesture.startTouch=$.extend({},touch);
				$(doc).on("touchmove",touchmoveHandler);
				$(doc).on("touchend",touchendHandler);
			})
			
		}

		return {
			slide:slide,
			addHorizontalSlide:addHorizontalSlide
		}
	}();

	module.exports=slidePage;
})