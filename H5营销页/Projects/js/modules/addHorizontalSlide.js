// 添加左右滑动
define(function (require,exports,module) {
	var addHorizontalSlide=function (page,cascading,func) {
		func=!!(func)?func:function() {};
		$(page).swipeLeft(function (e) {
			var firChild=cascading.children[0];
			$(firChild).addClass("z-prev-move");
			setTimeout(function () {
				cascading.appendChild(firChild);
				$(firChild).removeClass("z-prev-move");
			},300);
			e.preventDefault();
		});
		$(page).swipeRight(function (e) {
			var firChild=cascading.children[0];
			$(firChild).addClass("z-next-move");
			setTimeout(function () {
				cascading.appendChild(firChild);
				$(firChild).removeClass("z-next-move");
			},300);
			e.preventDefault();
		})
	};

	module.exports=addHorizontalSlide;
})