var b = {}; //base
var slice = [].slice;
var indexOf = function (k, arr) {
    if (!arr) {
        return -1;
    }
    //若是对象本身便居然indexof，便使用自身的，比如字符串
    if (arr.indexOf) {
        return arr.indexOf(k);
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] == k) {
            return i;
        }
    }
    return -1;
};


/*
* 只传入一个参数的表示没有指定他继承自那个类（实际上在内部重新定义了supClass为一个新的空函数即空对象），只传入附加的属性
* supClass是函数，如果是对象，则赋值个childAttr
* 作用：初始化时一定会执行_propertys_和init函数，子类调用这两方法时也会调用父类的；可以直接添加属性。如果直接使用最简单的prototype=new SubClass()这种做不到这些
*/
b.Class = function(supClass, childAttr) {
	//若是传了第一个类，便继承之；否则实现新类
	if (typeof supClass === 'object') {
		childAttr = supClass;
		supClass = function() {};
	}

	//定义我们创建的类
	var newClass = function() {
		this._propertys_();
		this.init.apply(this, arguments);
	};
	newClass.prototype = new supClass();

	var supInit = newClass.prototype.init || function() {};
	var childInit = childAttr.init || function() {};
	var _supAttr = newClass.prototype._propertys_ || function() {};
	var _childAttr = childAttr._propertys_ || function() {};

	for (var k in childAttr) {
		//_propertys_中作为私有属性
		childAttr.hasOwnProperty(k) && (newClass.prototype[k] = childAttr[k]);
	}

	//继承的属性有可能重写init方法---如果父类有init，则子类的init就要包含父类的init
	if (arguments.length && arguments[0].prototype && arguments[0].prototype.init === supInit) {
		//重写新建类，初始化方法，传入其继承类的init方法
		newClass.prototype.init = function() {
			var scope = this;
			var args = [
				function() {
					supInit.apply(scope, arguments);
				}
			];
			childInit.apply(scope, args.concat(slice.call(arguments)));
		};
	}
	//内部属性赋值
	newClass.prototype._propertys_ = function() {
		_supAttr.call(this);
		_childAttr.call(this);
	};
	//成员属性
	for (var k in supClass) {
		supClass.hasOwnProperty(k) && (newClass[k] = supClass[k]);
	}
	return newClass;
};



/*
* 所有view的基类
*/
b.AbstractView = b.Class({
	//基本view应该具有的属性
	_propertys_: function() {
		this.id = (new Date()).getTime(); //唯一pageID
		this.rootBox = $('body'); //视图容器
		this.root = $('<div/>'); //视图的根元素，可进行设置
		this.header = null;
		this.footer = null;
		this.template = ''; //可能的模板
		this.isCreated = false; //是否创建完毕
		this.status = b.AbstractView.STATE_NOTCREATE; //当前状态
	},
	init: function() {},
	//定义将要用到的事件，其中元素选取都会以root为标准，所以使用内部提供函数吧
	events: {
		'selector,eventType': 'func'
	},
	//默认属性
	attrs: {},
	//获取视图元素
	find: function(selector) {
		return this.root.find(selector);
	},
	//创建dom
	create: function(opts) {
		if (!this.isCreated && this.status != b.AbstractView.STATE_ONCREATE) {
			var attr = opts && opts.attr;
			var html = this.createHtml();
			this.initRoot(attr); //初始化root
			this.hide();
			this.rootBox.append(this.root);
			this.root.html(html);
			this.trigger('onCreate'); //触发正在创建事件，其实这里都创建完了
			this.status = b.AbstractView.STATE_ONCREATE;
			this.isCreated = true;
			this.bindEvent();
		}
	},
	//呈现/渲染视图
	show: function(callback) {
		if (this.status == b.AbstractView.STATE_ONSHOW) {
			return;
		}
		this.create();
		this.root.show();
		this.trigger('onShow');
		this.status = b.AbstractView.STATE_ONSHOW
		callback && (typeof callback == 'function') && callback.call(this);
		this.trigger('onLoad');
	},
	//隐藏dom
	hide: function(callback) {
		if (!this.root || this.status == b.AbstractView.STATE_ONHIDE) {
			return;
		}
		this.root.hide();
		this.trigger('onHide');
		this.status = b.AbstractView.STATE_ONHIDE;
		callback && (typeof callback == 'function') && callback();
	},
	//事件绑定
	bindEvent: function() {
		var events = this.events;
		for (var k in events) {
			var sec_type = k.replace(/\s/i, '').split(',');
			var func = events[k];
			if (sec_type && sec_type.length == 2 && typeof func == 'function') {
				var selector = sec_type[0];
				var type = sec_type[1];
				var scope = this;
				this.find(selector).on(type, function() {
					func.call(scope, $(this));
				})
			}
		}
	},
	//此处可以配合模板与相关参数组成html
	//解析模板也放到此处
	createHtml: function() {
		throw new Error('请重新定义createHtml方法');
	},
	initRoot: function() {
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
	//触发事件
	trigger: function(k, args) {
		var event = this[k];
		args = args || [];
		if (event && typeof event == 'function') {
			event.apply(this, args)
		}
	},
	setRootBox: function(dom) {
		this.rootBox = dom;
	},
	setAttr: function(k, v) {
		this.root.attr(k, v);
	},
	getAttr: function(k) {
		return this.root.attr(k);
	},
	setCss: function(k, v) {
		this.root.css(k, v);
	},
	getCss: function(k) {
		return this.root.css(k);
	},
	//dom创建后执行
	onCreate: function() {

	},
	//dom创建后数据加载时执行，用于加载后执行我们的逻辑
	onLoad: function() {

	},
	//dom创建后，未显示
	onShow: function() {

	},
	//dom隐藏前
	onHide: function() {

	}
});

//组件状态,未创建
b.AbstractView.STATE_NOTCREATE = 'notCreate';
//组件状态,已创建但未显示
b.AbstractView.STATE_ONCREATE = 'onCreate';
//组件状态,已显示
b.AbstractView.STATE_ONSHOW = 'onShow';
//组件状态,已隐藏
b.AbstractView.STATE_ONHIDE = 'onHide';



/*
* 管理hash变化，改变视图
*/
b.Hash = b.Class({
    _propertys_: function () {
        this.keys = [];
        this.values = [];
    },
    init: function (obj) {
        (typeof obj == 'object') || (obj = {}); //???
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                this.keys.push(k);
                this.values.push(obj[k]);
            }
        }
    },
    length: function () {
        return this.keys.length;
    },
    getItem: function (k) {
        var index = indexOf(k, this.keys);
        if (index < 0) {
            return null;
        }
        return this.keys[index];
    },
    getKey: function (i) {
        return this.keys[i];
    },
    getValue: function (i) {
        return this.values[i];
    },
    add: function (k, v) {
        return this.push(k, v);
    },
    del: function (k) {
        var index = indexOf(k, this.keys);
        return this.delByIndex(index);
    },
    delByIndex: function (index) {
        if (index < 0) return this;
        this.keys.splice(index, 1);
        this.vaules.splice(index, 1);
        return this;
    },
    //移除栈顶hash，并返回
    pop: function () {
        if (!this.keys.length) return null;
        this.keys.pop();
        return this.values.pop();
    },
    push: function (k, v, order) {
        if (typeof k == 'object' && !v) {
            for (var i in k) {
                if (k.hasOwnProperty(i)) {
                    this.push(i, k[i], order);
                }
            }
        } else {
            var index = indexOf(k, this.keys);
            if (index < 0 || order) {
                if (order) this.del(k);
                this.keys.push[k];
                this.values.push[v];
            } else {
                this.values[index] = v;
            }
        }
    },
    //查找hash表，返回key
    indexOf: function (v) {
        var index = indexOf(v, this.vaules);
        if (index >= 0) {
            return this.keys[index];
        }
        return -1;
    },
    each: function (handler) {
        if (typeof handler == 'function') {
            for (var i = 0, len = this.length(); i < len; i++) {
                handler.call(this, this.keys[i], this.vaules[i]);
            }
        }
    },
    getObj: function () {
        var obj = {};
        for (var i = 0, len = this.length(); i < len; i++) {
            obj[this.keys[i]] = this.values[i];
        }
        return obj;
    }
});

/*
* App类与其说担任MVC中控制器的角色，不如说他就是充当了一下路由选择的角色，根据不同的URL导向不同的view，并且会管理hash。
*/
var Application = new b.Class({
    _propertys_: function () {
        var scope = this;
        this.webRoot = ''; //应用跟目录
        this.head = $('head');
        this.body = $('body');
        this.viewRoot = 'views/'; //视图所在目录
        this.defaultView = 'index'; //默认加载视图

        this.request; //请求对象
        this.viewPath; //当前请求视图路径，解析request得出
        this.mainFrame; //主框架
        this.viewPort; //视图框架
        this.stateDom; //状态栏

        this.views = new b.Hash(); //views保存浏览器存储的hash
        this.curView; //当前视图
        this.interface = {}; //提供给视图访问的接口，暂时不管
        this.history = []; //历史记录

        //        this.stopListening = false;//是否开启监听

        this.onHashChange = function () {
            scope.history.push(window.location.href);
            var url = decodeURIComponent(window.location.hash.replace(/^#+/i, '')).toLowerCase();
            scope._onHashChange(url);
        };

        this.lastHash = '';
        this.lastFullHash = '';
        this.isChangeHash = false; //hash是否发生变化
    },
    init: function (opts) {
        //为属性赋值
        opts = opts || {};
        for (var k in opts) {
            this[k] = opts[k];
        }
        this.createViewPort();
        this.bindEvent(); //事件绑定
    },
    //创建app页面基本框架，此处不能使用id，因为。。。
    createViewPort: function () {
        var htm = [
            '<div class="main-frame">',
                '<div class="main-viewport"></div>',
                '<div class="main-state"></div>',
            '</div>'
        ].join('');
        this.mainframe = $(htm);
        this.viewport = this.mainframe.find('.main-viewport');
        this.statedom = this.mainframe.find('.main-state');
        var body = $('body');
        body.html('');
        body.append(this.mainframe);
    },
    //！！！！！！非常重要哦！！！！！！
    bindEvent: function () {
        var scope = this;
        //暂时不使用requireJS
        //        requirejs.onError = function () {};
        $(window).bind('hashchange', this.onHashChange);
    },
    _onHashChange: function (url) {
        url = url.replace(/^#+/i, '');
        var req = this.parseHash(url);

        this.request = req;
        this.viewPath = this.viewPath || this.defaultView;
        this.loadView(this.viewPath); //！！！重要的视图加载
    },
    //该方法慢慢看吧。。。
    parseHash: function (hash) {
        var fullhash = hash,
                hash = hash.replace(/([^\|]*)(?:\|.*)?$/img, '$1'),
                h = /^([^?&|]*)(.*)?$/i.exec(hash),
                vp = h[1] ? h[1].split('!') : [],
                viewpath = (vp.shift() || '').replace(/(^\/+|\/+$)/i, ''),
                path = vp.length ? vp.join('!').replace(/(^\/+|\/+$)/i, '').split('/') : [],
                q = (h[2] || '').replace(/^\?*/i, '').split('&'),
                query = {}, y;
        this.isChangeHash = !!(!this.lastHash && fullhash === this.lashFullHash) || !!(this.lastHash && this.lastHash !== hash);
        if (q) {
            for (var i = 0; i < q.length; i++) {
                if (q[i]) {
                    y = q[i].split('=');
                    y[1] ? (query[y[0]] = y[1]) : (query[y[0]] = true);
                }
            }
        }

        this.lastHash = hash;
        this.lashFullHash = fullhash;
        return {
            viewpath: viewpath,
            path: path,
            query: query,
            root: location.pathname + location.search
        };
    },
    //!!!非常重要
    loadView: function (viewPath) {
        var id = viewPath;
        var scope = this;
        //此处本来应该判断是否已经有该视图，但是我们暂时不管，我们只要加载了相关视图就算成功
        /*
        一些操作
        */

        // 此处应该加载我们的js文件
        // 通过 AJAX 请求来获得并运行一个 JavaScript 文件：
        $.getScript(this.buildUrl(viewPath), function () {
            var view = new PageView();
            view.show();
            scope.viewport.append(curView.$el);
            var s = ''; 
        });
        //！！！暂时不使用requireJS
        //        var self = this;
        //        requirejs([this.buildUrl(path)], function (View) {
        //            callback && callback.call(self, View);
        //        });
    },
    buildUrl: function (path) {
        return this.viewRoot = path;
    }
});