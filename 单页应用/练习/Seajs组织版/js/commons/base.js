/*
* base.js---基类
*/

define(function (require,exports,module) {
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
	    push: function (k, v, order) {//可以一个值一个键的传也可直接传入一整个对象保存的键值对
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
	

	module.exports=b;
})
