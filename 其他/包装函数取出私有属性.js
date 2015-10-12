
var define=function(func){
  var exports={};
  func(exports);
  exports.source=func;
  return exports;
};

var obj=define(function(exports){
  exports.sayName=function() {
    return _sayName();
  };
  
  function _sayName(){
    return 'ych'; 
  }
  
});

var rewire=function(obj){
  var source=obj.source.toString();
  source = source.replace(/^function\s*\(exports\)\s*\{/, '').replace(/\}$/, '');
  source+=
    '\nexports._get_ = function(name) {\n'
        +'  return eval(name);\n'
     +'};\n\n';
  return define(new Function('exports', source));
};

console.log(rewire(obj)._get_('_sayName')());
console.log(obj.sayName());