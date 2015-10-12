/*
* 具体项目的页面js
*/

define(function (require,exports,module) {
	var appVideo=require("../appVideo"),//之前已经有一次加载过了，已经在系统中了。虽然这里也依赖，但不会又重新执行依赖模块里面的代码??!
		addHorizontalSlide=require("../addHorizontalSlide");
	var pages=$(".page");
	
	(function () {
		pages.filter(".page-video").forEach(function (item,index,arr) {
			appVideo.init($(item));
		})
	})();

})