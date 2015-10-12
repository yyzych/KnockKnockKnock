define(function(require, exports, module) {
    var util = function() {
        var res = {},
            slice = [].slice,
            toString = Object.prototype.toString;

        function isType(type) {
            return function(obj) {
                return toString.call(obj, null) === ("[object " + type + "]");
            };
        }
        var isFunction = isType("Function"),
            isNumber = isType("Number"),
            isString = isType("String"),
            isBoolean = isType("Boolean"),
            isObject = isType("Object"),
            isArray = isType("Array");
        res.isFunction = isFunction;
        res.isNumber = isNumber;
        res.isString = isString;
        res.isBoolean = isBoolean;
        res.isArray = isFunction;
        res.isObject = isObject;

        // 只能复制基本数据对象
        function clone(obj) {
            var res;
            if (isFunction(obj) || isNumber(obj) || isString(obj) || isBoolean(obj)) return obj;
            if (isObject(obj)) {
                res = {};
                for (var i in obj) {
                    if (obj.hasOwnProperty(i)) {
                        res[i] = clone(obj[i]);
                    }
                }
                return res;
            } else if (isArray(obj)) {
                res = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    res[i] = clone(obj[i]);
                }
                return res;
            }
        }

        function extend(tar) {
            if (!tar) throw "extend 参数错误";
            var args = slice.call(arguments, 1);
            if (args.length < 1) return tar;
            var item;
            for (var i = 0, len = args.length; i < len; i++) {
                item = args[i];
                for (var p in item) {
                    if (item.hasOwnProperty(p)) {
                        tar[p] = clone(item[p]);
                    }
                }
            }
        }

        // 继承类
        function _inherit(parent, protoProps, staticProps) {
            var child = function(opts) {
                parent.apply(this, arguments);
                this.init(opts);
            };

            child.prototype = function() {
                var F = function() {};
                F.prototype = parent.prototype;
                F.constructor = child;
                return new F();
            }();

            this.__parent__ = parent.prototype;

            extend(child, parent, staticProps);

            for (var prop in protoProps) {
                if (isFunction(protoProps[prop]) && isFunction(parent.prototype[prop])) {
                    child.prototype[prop] = function(name, func) {
                        return function() {
                            this.base = parent.prototype[name];
                            func.apply(this, arguments);
                            this.base = null;
                            delete this.base;
                        };
                    }(prop, protoProps[prop]);
                } else {
                    child.prototype[prop] = protoProps[prop];
                }
            }

            return child;
        }
        res.inherit = _inherit;

        res.isRetina=function () {
            var retina=window.retina || (window.devicePixelRatio > 1);
            return retina;
        }();

        return res;
    }();

    module.exports = util;
});