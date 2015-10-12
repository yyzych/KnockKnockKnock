/*
 * 拖动对象
 * 依赖于EventUtil和EventTarget两个模块
 * 能不能直接使用文件
 */

define(function(require, exports, module) {
    var EventUtil = require("./EventUtil");
    var EventTarget = require("./EventTarget");
    // var EventTarget=t.EventTarget;

    var DragDrop = function() {
        var dragdrop = new EventTarget(),
            dragging = null,
            diffX = 0,
            diffY = 0;
        var boundry = null,
            itemSize = null;

        function handleEvent(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);

            switch (event.type) {
                case "mousedown":
                    if (target.className.indexOf('draggable') > -1) {
                        dragging = target;
                        diffY = event.clientY - target.offsetTop;
                        diffX = event.clientX - target.offsetLeft;
                        //触发自定义事件
                        dragdrop.fire({
                            type: "dragstart",
                            target: dragging,
                            x: event.clientX,
                            y: event.clientY
                        });
                    }
                    break;
                case "mousemove":
                    event.preventDefault();
                    if (dragging != null) {
                        var tx = event.clientX - diffX,
                            ty = event.clientY - diffY;

                        // if(tx<boundry.left){
                        //     tx=boundry.left;
                        // }else if(tx+itemSize.width>boundry.right){
                        //     tx=boundry.right-itemSize.width;
                        // }
                        //或者
                        tx = Math.max(boundry.left, Math.min(tx, boundry.right - itemSize.width));
                        ty = Math.max(boundry.top, Math.min(ty, boundry.bottom - itemSize.height));

                        dragging.style.left = tx + "px";
                        dragging.style.top = ty + "px";
                        //触发自定义事件
                        dragdrop.fire({
                            type: "drag",
                            target: dragging,
                            x: event.clientX, //注意这里传的都是clientX，相对浏览器的
                            y: event.clientY
                        });
                    }
                    break;
                case "mouseup":
                    if (dragging != null) {
                        dragdrop.fire({
                            type: "dragend",
                            target: dragging,
                            x: event.clientX,
                            y: event.clientY
                        });
                        dragging = null;
                    }
                    break;
            }
        }

        //公共接口
        dragdrop.enable = function() {
            EventUtil.addHandler(document, "mousedown", handleEvent);
            EventUtil.addHandler(document, "mousemove", handleEvent);
            EventUtil.addHandler(document, "mouseup", handleEvent);
        };
        dragdrop.disable = function() {
            EventUtil.removeHandler(document, "mousedown", handleEvent);
            EventUtil.removeHandler(document, "mousemove", handleEvent);
            EventUtil.removeHandler(document, "mouseup", handleEvent);
        };

        dragdrop.init = function(opt) {
            dragdrop.clearAll();//清除所有数据，我自己加的

            itemSize = opt.itemSize;
            boundry = opt.boundry;

            dragdrop.addHandler("dragstart", opt.dragstart || function(event) {});
            dragdrop.addHandler("drag", opt.drag || function(event) {});
            dragdrop.addHandler("dragend", opt.dragend || function(event) {});

            dragdrop.enable();
        }

        return dragdrop;
    }();

    module.exports = DragDrop;
})