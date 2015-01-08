/*
* app.js---App类与其说担任MVC中控制器的角色，不如说他就是充当了一下路由选择的角色，根据不同的URL导向不同的view，并且会管理hash。
*/

define(function (require,exports,module) {
	//导入依赖模块
	var $=require("jquery");
	var b=require("./commons/base");

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

            // this.stopListening = false;//是否开启监听

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
	        var path = this.buildUrl(viewPath);

            //模块加载后回调函数
            var callBack=function (View) {
            	var view=new View();
            	view.show();
            	scope.viewport.append(view.root);
            	var s="";  
            }
            
            // 注意和原来的区别
            // 加载视图模块，并在回调后调用
            switch(viewPath){
            	case "index":
            		require.async(['./views/{indexView}'],callBack);
            		break;
            }
	    },
	    buildUrl: function (path) {
	        return this.viewRoot = path;
	    }
	});

	module.exports=Application;
})
