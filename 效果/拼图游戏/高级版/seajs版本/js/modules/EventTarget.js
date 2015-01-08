/*
* EventTarget.js---自定义事件
*/

define(function (require,exports,module) {
    function EventTarget(){
        this.handlers = {};    
    }

    EventTarget.prototype = {
        constructor: EventTarget,

        addHandler: function(type, handler){
            if (typeof this.handlers[type] == "undefined"){
                this.handlers[type] = [];
            }

            this.handlers[type].push(handler);
        },
        
        fire: function(event){
            if (!event.target){
                event.target = this;
            }
            if (this.handlers[event.type] instanceof Array){
                var handlers = this.handlers[event.type];
                for (var i=0, len=handlers.length; i < len; i++){
                    handlers[i](event);
                }
            }            
        },

        removeHandler: function(type, handler){
            if (this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for (var i=0, len=handlers.length; i < len; i++){
                    if (handlers[i] === handler){
                        break;
                    }
                }
                
                handlers.splice(i, 1);
            }            
        },

        clearAll:function () {//清除所有数据，我自己加的
            this.handlers={};
        }
    };

    // 应该返回一个函数,函数也是对象
    module.exports=EventTarget;
    // exports.EventTarget=EventTarget;
})