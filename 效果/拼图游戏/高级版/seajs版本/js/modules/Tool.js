/*
 * 工具单实例对象
 */

 define(function (require,exports,module) {
     var Tool = {
         $: function(id) {
             return typeof id === "string" ? document.getElementById(id) : null;
         },
         extend: function(curOpt, oldOpt) {
             var res = {};
             for (name in oldOpt) {
                 if (curOpt.hasOwnProperty(name)) {
                     res[name] = curOpt[name];
                 } else {
                     res[name] = oldOpt[name];
                 }
             };
             return res;
         },
         hasClass: function(elem, className) {
             if (!elem) return false;
             return elem.className.indexOf(className) > -1 ? true : false;
         },
         addClass:function (elem,className) {
             if(!this.hasClass(elem,className)&&typeof elem !="undefined"){
                 var t=elem.className;
                 elem.className=t+" "+className;
             }
         },
         removeClass:function (elem,className) {
             if(this.hasClass(elem,className)){
                 var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                 elem.className = elem.className.replace(reg, ' ');
             }  
         },
         createElement: function(opt) {
             var o = this.extend(opt, {
                 tagName: "div",
                 text: "",
                 className: ""
             });
             var elem = document.createElement(o.tagName);
             elem.innerHTML = o.text;
             o.className !== "" ? elem.className = o.className : false;
             return elem;
         },
         setOpacity: function(node, level) {
             if (document.all) {
                 node.style.filter = "alpha(opacity=" + level + ")";
             } else {
                 node.style.opacity = level / 100;
             }
         },
         random: function(from, to) {
             return Math.floor(Math.random() * (to - from) + from);
         }
     };

     // 注意：传给 factory 构造方法的 exports 参数是 module.exports 对象的一个引用。
     module.exports=Tool;
 })
