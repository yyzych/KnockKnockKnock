/*
* base.js---基类，用于继承
*/

define(function (require,exports,module) {
	var base={},
		slice=[].slice;
	function indexOf (item,arr) {
		if(!arr){
			return -1;
		}
		if(arr.indexOf){
			return arr.indexOf(item);
		}
		for (var i = 0,len=Things.length; i < len; i++) {
			if(arr[i]==item){
				return i;
			}
		}
		return -1;
	}

	// 用于生成类的函数。子类需要继承某个基类，并且需要额外满足一些属性，这些属性是添加到基类中的，所有属性共享？？！
	// 成员属性是使用_propertys_()指定的，父类的成员属性会变成子类的成员属性
	base.Class=function (superClass,attrs) {
		if(typeof superClass !="function"){
			//没有父类，传进来的是要额外要满足的属性
			attrs=superClass;
			superClass=function () {};
		}

		var newClass=function (){
			//内部属性赋值
			this._propertys_();
			//初始化
			this.init.apply(this,arguments);
		};
		newClass.prototype=new superClass();

		var supInit=newClass.prototype.init||function(){};//父类的初始化函数
		var childInit=attrs.init||function(){};//子类的初始化函数
		var _supAttr=newClass.prototype._propertys_||function(){};//父类的成员属性赋值函数
		var _childAttr=attrs._propertys_||function(){};//子类的内部属性赋值函数

		for(var proName in attrs){
			attrs.hasOwnProperty(proName)&&(newClass.prototype[proName]=attrs[proName]);//如果基类也有，也会从写
		}

		if(arguments.length&&arguments[0].prototype&&arguments[0].prototype.init===supInit){
			newClass.prototype.init=function (){
				var scope=this;//基类对象
				var args=[
					function(){
						supInit.apply(scope,arguments);
					}
				];
				childInit.apply(scope,args.concat(slice.call(arguments)));
			}
		}

		//内部属性赋值，即this的属性，成员属性
		newClass.prototype._propertys_=function(){
			_supAttr.call(this);//父类的成员属性也会变为子类的成员属性
			_childAttr.call(this);
		}
		//函数本身的属性
		for(var proName in superClass){
			superClass.hasOwnProperty(proName)&&(newClass[proName]=superClass[proName]);
		}

		return newClass;
	};

	/*
	* Hash类，管理浏览器hash的变化
	*/
	base.Hash=base.Class({
		_propertys_:function(){
			this.keys=[];
			this.values=[];
		},
		init:function(obj){
			(typeof obj=="object")||(obj={});
			for(var k in obj){
				if(obj.hasOwnProperty(k)){
					this.keys.push(k);
					this.values.push(obj[k]);
				}
			}
		},
		length:function(){
			return this.keys.length;
		},
		getItem:function(key){
			var index=indexOf(key,this.keys);
			if(index<0)
				return null;
			return {
				key:this.keys[index],
				value:this.values[index]
			};
		},
		getKey:function(i){
			return this.keys[i];
		},
		getValue:function(i){
			return this.values[i];
		},
		add:function(key,val){
			return this.push(key,val);
		},
		del:function(key){
			var index=indexOf(key,this.keys);
			return this.delByIndex(index);
		},
		delByIndex:function (index) {
			if(index<0) return this;
			this.keys.splice(index,1);
			this.values.splice(index,1);
			return this;
		},
		pop:function () {
			if(!this.keys.length) return null;
			this.keys.pop();
			return this.values.pop();
		},
		//order:什么？
		push:function (k,v,order) {//可以一个值一个键的传也可直接传入一整个对象保存的键值对
			if(typeof k=="object"&&!v){
				for(var i in k){
					this.push(i,k[i],order);
				}
			}else{
				var index=indexOf(k,this.keys);
				if(index<0||order){
					if(order) this.del(k);//????
					this.keys.push[k];
					this.values.push[v];
				}else{
					this.values[index]=v;
				}
			}
		},
		//查找hash表，返回key
		indexOf:function (val) {
			var index=indexOf(val,this.values);
			if(index>=0){
				return this.keys[index];
			}
			return -1;
		},
		each:function (handler) {
			if(typeof handler =="function"){
				for (var i = 0,len=this.length(); i < len; i++) {
					handler.call(this,this.keys[i],this.values[i]);
				};
			}
		},
		getObj:function () {
			var obj={};
			for (var i = 0,len=this.length(); i < len; i++) {
				obj[this.keys[i]]=this.values[i];
			}
			return obj;
		}
	});

	module.exports=base;
})