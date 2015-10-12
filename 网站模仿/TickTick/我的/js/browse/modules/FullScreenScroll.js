/*
* 页面滚动到指定位置
*/

define(function (require,exports,module) {
	var $=require("jquery");

	function FullScroll () { }
	FullScroll.prototype={
		init:function (option) {//初始化
			var self=this;
			if(typeof option.selectorName !="undefined"){
				$(option.selectorName).click(function (e) {
					var targetElem=$(this.getAttribute("data-nav-scroll")).get(0);
					// var offsetY=targetElem.offsetTop;//距浏览器窗口顶端的距离---这样写是有错的，并不一定就是距离浏览器的高度
					var offsetY=self.getOffsetY(targetElem);
					var h=offsetY-option.marTopHei||0;
					self.scrollToAimPosi(h);
					e.stopPropagation();
				})
			}
		},
		getOffsetY:function (elem) {
			if(elem.offsetParent==document.body){
				return elem.offsetTop;
			}
			var totle=0;
			while(elem.offsetParent!=document.body){
				totle+=elem.offsetTop;
				elem=elem.parentNode;//offsetParent还是parentNode
			}
			res+=elem.offsetTop;
			return totle;
		},
		scrollToAimPosi:function (scrollHeight) {
			$(document.body).animate({scrollTop:scrollHeight});
			$(document.documentElement).animate({scrollTop:scrollHeight});
		}
	};

	return module.exports=new FullScroll();
});