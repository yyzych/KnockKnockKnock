/*
* main.js---启动模块
* 注意js中，没有像import这种在一个js文件中引入另一个js文件的用法。LABjs、RequireJS、SeaJS 可以作为文件加载器使用
*/


// 一个模块标识由斜线（/）分隔的多项组成。
// 每一项必须是小驼峰字符串、 . 或 .. 。
// 模块标识可以不包含文件后缀名，比如 .js 。
// 模块标识可以是 相对 或 顶级 标识。如果第一项是 . 或 ..，则该模块标识是相对标识。
// 顶级标识根据模块系统的基础路径（即 Sea.js 的 base 路径）来解析。
// 相对标识相对 require 所在模块的路径来解析。只出现在模块环境中（define 的 factory 方法里面）。相对标识永远相对当前模块的 URI 来解析


// define(id?, deps?, factory)	factory 为函数时，表示是模块的构造方法。factory 为对象、字符串时，表示模块的接口就是该对象、字符串。
// require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口。
define(function (require) {
	var jquery=require("jquery");//这里其实在config中设置了一个别名，别名实际的值是一个基层路径。是先找到有无别名吗？应该是的
	var PlaySecen=require('./modules/PlaySecen');//相对标识，相对当前模块的

	PlaySecen.init({
	    wrap:"wrap",
	    nearElemCss:"nearElemCss",
	    step:"step"
	});
	PlaySecen.run('http://img3.cache.netease.com/photo/0001/2011-01-24/900x600_6R5H25AN00AO0001.jpg');
});

//可以再define外面写代码的
console.log("can ues?");