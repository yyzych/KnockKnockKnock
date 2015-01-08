//实现随机分布功能
function WishAchieve (elem,wish) {
	var self=this;
	this.wishs=Array.prototype.slice.call(elem.children);
	this.skin=wish;
	this.area={
		left:0,
		top:0,
		right:elem.clientWidth>wish.width?elem.clientWidth:self.area.left+wish.width,//也可以在这里直接限制。不能直接使用this的。首先因为不是函数。
		bottom:elem.clientHeight>wish.height?elem.clientHeight:self.area.top+wish.height
	};
}
WishAchieve.prototype={
	constructor:WishAchieve,
	layout:function () {
		var _left=this.area.left;
		var _top=this.area.top;
		//如果返回的是后面的值，即容器宽度小于便签的宽度。则减去本身的宽度之后_right=_left，最后随机布局返回的left都是一样的了。
		// var _right=this.area.right>this.skin.width?this.area.right:this.area.left+this.skin.width;
		// var _bottom=this.area.bottom>this.skin.height?this.area.bottom:this.area.top+this.skin.height;

		//减去他本身的宽高，不然有的部分会遮住了。。这样子固定每个的宽高了，最好能不限制
		var _right=this.area.right-this.skin.width;
		var _bottom=this.area.bottom-this.skin.height;

		var utils={
			getRandom:function (num1,num2) {
				return (Math.random()*(num2-num1)+0);
			},
			getPosition:function () {
				return {
					left:this.getRandom(_left,_right),
					top:this.getRandom(_top,_bottom)
				}
			}
		};

		//对每一项进行运用
		this.wishs.forEach(function (item,index,array) {
			var posi=utils.getPosition();
			item.className="wish";
			with(item.style){
				position="absolute";
				top=posi.top+"px";
				left=posi.left+"px";
			}
			var close=document.createElement("p");
			close.appendChild(document.createTextNode("X"));
			close.className="close";
			close.onclick=function () {
				item.parentNode.removeChild(item);
			};
			item.appendChild(close);
			item.onmouseover=function () {
				this.style.zIndex="999";
				close.style.display="block";
			};
			item.onmouseout=function () {
				this.style.zIndex="";
				close.style.display="none";
			}
		});
	},
	drag:function (options) {
		var dragStrat,dragMove,dragEnd,boundaryElem;
		var self=this;//容器对象

		//初始化配置---------函数也就是对象，相当于声明对象，也就不奇怪了
		function initOptions () {
			var noop=function () {},
				defaultOptions={
					boundaryElem:"body"//默认边界为body
				};
			options=$.extend(defaultOptions,options||{});
			boundaryElem=document.getElementById(options.boundaryElem);
			dragStrat=options.dragStrat||noop;
			dragEnd=options.dragEnd||noop;
			dragMove=options.dragMove||noop;
		}
		//真正的移动操作
		function _drag (e) {
			var clientX=e.clientX,// 记录鼠标按下时的位置及被拖动元素相对于offsetParent的相对位置
				clientY=e.clientY,
				offsetLeft=this.offsetLeft,
				offsetTop=this.offsetTop,
				_self=this;//被移动元素

			// 这样子封装可能更好
			var limitObj = {
				left:self.area.left,
				top:self.area.top,
				right:self.area.right-self.skin.width,
				bottom:self.area.bottom-self.skin.height
			};
			
			//在拖动元素上绑定鼠标按下事件，在文档对象中绑定鼠标移动，鼠标弹起事件；（为什么不把三个事件都绑定在拖动元素上，这是因为鼠标移动太快时，鼠标移动和弹起事件处理程序将不会执行 不怎么理解）
			dragStrat.apply(this,arguments);
			document.onmousemove=function (eve) {
				var e=eve||window.event;
				var x=e.clientX-clientX+offsetLeft;
				var y=e.clientY-clientY+offsetTop;
				_self.style.left=Math.max(Math.min(x,limitObj.right),limitObj.left)+"px";//x可能会小于limitObj._left或大于limitObj._right.e.clientX - clientX表示改变的，叫上offsetLeft表示最新的x
				_self.style.top=Math.max(Math.min(y,limitObj.bottom),limitObj.top)+"px";
				dragMove.apply(_self,arguments);
				// 阻止浏览器默认行为(鼠标在拖动图片一小段距离，会出现一个禁止的小提示，即：图片不能再拖动)--没有测试过
				e.preventDefault();
			}
			document.onmouseup=function (eve) {
				var e=eve||window.event;
				document.onmousemove=null;
				dragEnd.apply(_self,arguments);
			}
		}

		initOptions();
		this.wishs.forEach(function (item,index,array) {
			item.onmousedown=function (eve) {
				var e=eve||window.event;
				_drag.call(this,e);
				// 阻止区域文字被选中 for chrome firefox ie9
				e.preventDefault();//e 是event对象
				// for firefox ie9 || less than ie9
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
			}
		})
	}
}