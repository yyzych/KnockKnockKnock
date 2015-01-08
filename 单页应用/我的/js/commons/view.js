/*
* view.js---所有视图的基类
*/

define(function (require,exports,module) {
	//导入依赖模块
	var $=require("jquery");
	var b=require("./base");

	var AbstractView=b.Class({
			attrs:{},//默认属性
			events:{},//定义将用到的事件
			_propertys_:function () {
				this.id=(new Date()).getTime();//唯一的pageId
				this.rootBox=$("body");//视图容器
				this.root=$("<div/>");//视图的根元素,为什么这么写？也会创建一个div元素的
				this.header=null;
				this.footer=null;
				this.template="";//可能的模板
				this.isCreate=false;
				this.status=AbstractView.STATE_NOTCREATE
			},
			init:function () {},
			find:function (selector) {
				return this.root.find(selector);
			},
			create:function (opts) {
				if(!this.isCreate&&this.status!=AbstractView.STATE_ONCREATE){
					var attr=opts&&opts.attr;
					var html=this.createHtml();
					this.initRoot(attr);
					this.hide();
					// this.rootBox.append(this.root);
					this.root.html(html);
					this.trigger("onCreate");//触发：正在创建的事件。这一步前已经创建完了
					this.status=AbstractView.STATE_ONCREATE;
					this.isCreate=true;
					this.bindEvent();
				}
			},
			//呈现/渲染视图
			show: function(callback) {
				if (this.status == AbstractView.STATE_ONSHOW) {
					return;
				}
				this.create();
				this.root.show();
				this.trigger('onShow');
				this.status = AbstractView.STATE_ONSHOW
				callback && (typeof callback == 'function') && callback.call(this);
				this.trigger('onLoad');
			},
			hide:function (callback) {
				if(!this.root||this.status==AbstractView.STATE_ONHIDE){
					return;
				}
				this.root.hide();
				this.trigger("onHide");
				this.status=AbstractView.STATE_ONHIDE;
				//先检验回调函数是不是函数类型
				callback&&(typeof callback=="function")&&callback();
			},
			bindEvent:function () {//这里绑定的事件和直接设置onLoad这种事件处理程序有什么不同。后者是直接绑定在这个对象上，而前者是给dom元素绑定事件
				var events=this.events;
				for(var name in events){
					var sec_type=name.replace(/\s/i,'').split(',');
					var func=events[name];
					if(sec_type&&sec_type.length==2&&typeof func=="function"){
						var selector=sec_type[0],
							type=sec_type[1],
							scope=this;
						this.find(selector).on(type,function () {
							func.call(scope,$(this));
						})
					}
				}
			},
			createHtml:function () {
				throw new Error("请重新定义createHtml方法");
			},
			initRoot:function () {
				var attr = this.attrs;
				if (!attr) {
					return;
				}
				for (var k in attr) {
					if (k == 'className') {
						this.root.attr('class', attr[k]); //jquery
					} else {
						this.root.attr(k, attr[k]);
					}
				}
				this.root.attr('id', this.id);
			},
			trigger:function (eType,args) {//触发事件
				var handler=this[eType];
				args=args||[];
				if(handler&&typeof handler=="function"){
					handler.apply(this,args);
				}
			},
			setRootBox:function (dom) {
				this.rootBox=dom;
			},
			setAttr:function (key,val) {
				this.root.attr(key,val);
			},
			getAttr:function (key) {
				return this.root.attr(key);
			},
			setCss:function (key,val) {
				this.root.css(key,val);
			},
			getCss:function (key) {
				return this.root.css(key);
			},
			onCreate:function(){},//视图创建后执行
			onLoad:function(){},////视图创建后数据加载时执行，用于加载后执行我们的逻辑
			onShow:function(){},//视图创建后，未显示
			onHide:function(){}//视图隐藏前
	})

	//组件状态,未创建
	AbstractView.STATE_NOTCREATE = 'notCreate';
	//组件状态,已创建但未显示
	AbstractView.STATE_ONCREATE = 'onCreate';
	//组件状态,已显示
	AbstractView.STATE_ONSHOW = 'onShow';
	//组件状态,已隐藏
	AbstractView.STATE_ONHIDE = 'onHide';


	module.exports=AbstractView;
})
