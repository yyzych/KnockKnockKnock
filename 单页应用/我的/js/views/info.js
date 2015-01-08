/*
* info.js---首页视图的js
*/

define(function (require,exports,module) {
	var $=require("jquery");
	var b=require("../commons/base");
	var AbstractView=require("../commons/view");


	var PageView = b.Class(AbstractView, {
		_propertys_: function() {
			this.template = '<blockquote>改变hash会加载相应的视图js文件来生成视图，如输入index；是使用Ajax来加载js文件的。不能跨域。</blockquote>';
		},
		init: function(superInit) {
			console.log(superInit);
			console.log('init');
		},
		createHtml: function() {
			var htm = [
				'<header>为什么这么难</header>',
				'<div class="main">',
				this.template,
				'</div>',
			].join('');
			return htm;
		},
		attrs: {
			'data-id': 'test',
			className: 'yexiaoc'
		},
		events: {
			'#bt,click': function(el) {
				var txt = this.find('#txt');
				alert(txt.val())
			}
		},
		onCreate: function() {
			console.log('onCreate');
		},
		//dom创建后数据加载时执行，用于加载后执行我们的逻辑
		onLoad: function() {
			console.log('onLoad');
		},
		//dom创建后，未显示
		onShow: function() {
			console.log('onShow');
		},
		//dom隐藏前
		onHide: function() {
			console.log('onHide');
		}
	});
	

	module.exports=PageView;
})
