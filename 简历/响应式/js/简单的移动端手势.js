(function(win, lib, undef) {

    var doc = win.document,//吧属性存储起来，减少查询次数，提高性能
        docEl = doc.documentElement,
        slice = Array.prototype.slice,
        gestures = {}, lastTap = null;


    // 获取相同的祖先
    function getCommonAncestor(el1, el2) {
        var el = el1;
        while (el) {
            // contains:元素是否属于另一个元素，html5规范
            if (el.contains(el2) || el == el2) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    }

    function fireEvent(element, type, extra) {
        var event = doc.createEvent('HTMLEvents');// ??
        event.initEvent(type, true, true);

        if (typeof extra === 'object') {
            for (var p in extra) {
                event[p] = extra[p];
            }
        }

        element.dispatchEvent(event);// ??
    }

    // 多个手势时的操作，放大，缩放，旋转
    function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
        var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1),
            scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))),
            translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)];
        return {
            rotate: rotate,
            scale: scale,
            translate: translate,
            matrix: [
                [scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]],
                [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]],
                [0, 0, 1]
            ]
        };
    }

    function touchstartHandler(event) {

        // 返回对象的可枚举属性和方法
        if (Object.keys(gestures).length === 0) {
            docEl.addEventListener('touchmove', touchmoveHandler, false);
            docEl.addEventListener('touchend', touchendHandler, false);
            docEl.addEventListener('touchcancel', touchcancelHandler, false);
        }

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i],
                touchRecord = {};

            for (var p in touch) {
                touchRecord[p] = touch[p];
            }

            var gesture = {
                startTouch: touchRecord,
                startTime: Date.now(),
                status: 'tapping',
                element: event.srcElement,
                pressingHandler: setTimeout(function(element) {
                    return function() {
                        if (gesture.status === 'tapping') {
                            gesture.status = 'pressing';

                            fireEvent(element, 'press', {
                                touchEvent: event
                            });
                        }

                        clearTimeout(gesture.pressingHandler);
                        gesture.pressingHandler = null;
                    };
                }(event.srcElement), 500)
            };
            gestures[touch.identifier] = gesture;//将手势添加的gestures对象中，以标示符存储作为键存储
        }

        if (Object.keys(gestures).length == 2) {//多支手势
            var elements = [];

            for (var p in gestures) {
                elements.push(gestures[p].element);
            }

            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }
    }

    function touchmoveHandler(event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i],
                gesture = gestures[touch.identifier];

            if (!gesture) {
                return;
            }

            if (!gesture.lastTouch) {
                gesture.lastTouch = gesture.startTouch;
            }
            if (!gesture.lastTime) {
                gesture.lastTime = gesture.startTime;
            }
            if (!gesture.velocityX) {
                gesture.velocityX = 0;
            }
            if (!gesture.velocityY) {
                gesture.velocityY = 0;
            }
            if (!gesture.duration) {
                gesture.duration = 0;
            }

            var time = Date.now() - gesture.lastTime;
            var vx = (touch.clientX - gesture.lastTouch.clientX) / time,//x方向上的速度
                vy = (touch.clientY - gesture.lastTouch.clientY) / time;//y方向上的速度


            var RECORD_DURATION = 70;
            if (time > RECORD_DURATION) {
                time = RECORD_DURATION;
            }
            if (gesture.duration + time > RECORD_DURATION) {
                gesture.duration = RECORD_DURATION - time;
            }

            gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration + time);
            gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration + time);
            gesture.duration += time;// gesture.duration:从开始到现在总的时间

            gesture.lastTouch = {};

            for (var p in touch) {
                gesture.lastTouch[p] = touch[p];
            }
            gesture.lastTime = Date.now();

            var displacementX = touch.clientX - gesture.startTouch.clientX,
                displacementY = touch.clientY - gesture.startTouch.clientY,
                distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));//Math.pow(x,y):计算X的Y次方

            // magic number 10: moving 10px means pan, not tap
            if (gesture.status === 'tapping' && distance > 10) {
                gesture.status = 'panning';
                gesture.isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));

                fireEvent(gesture.element, 'panstart', {
                    touch: touch,
                    touchEvent: event,
                    isVertical: gesture.isVertical
                });

                fireEvent(gesture.element, (gesture.isVertical ? 'vertical' : 'horizontal') + 'panstart', {
                    touch: touch,
                    touchEvent: event
                });
            }

            if (gesture.status === 'panning') {
                gesture.panTime = Date.now();
                fireEvent(gesture.element, 'pan', {
                    displacementX: displacementX,
                    displacementY: displacementY,
                    touch: touch,
                    touchEvent: event,
                    isVertical: gesture.isVertical
                });


                if (gesture.isVertical) {
                    fireEvent(gesture.element, 'verticalpan', {
                        displacementY: displacementY,
                        touch: touch,
                        touchEvent: event
                    });
                } else {
                    fireEvent(gesture.element, 'horizontalpan', {
                        displacementX: displacementX,
                        touch: touch,
                        touchEvent: event
                    });
                }
            }
        }

        if (Object.keys(gestures).length == 2) {
            var position = [],
                current = [],
                elements = [],
                transform;

            for (var i = 0; i < event.touches.length; i++) {
                var touch = event.touches[i];
                var gesture = gestures[touch.identifier];
                position.push([gesture.startTouch.clientX, gesture.startTouch.clientY]);
                current.push([touch.clientX, touch.clientY]);
            }

            for (var p in gestures) {
                elements.push(gestures[p].element);
            }

            transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
                transform: transform,
                touches: event.touches,
                touchEvent: event
            });
        }
    }

    function touchendHandler(event) {

        if (Object.keys(gestures).length == 2) {
            var elements = [];
            for (var p in gestures) {
                elements.push(gestures[p].element);
            }
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i],
                id = touch.identifier,
                gesture = gestures[id];

            if (!gesture) continue;

            if (gesture.pressingHandler) {
                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            }

            if (gesture.status === 'tapping') {
                gesture.timestamp = Date.now();
                fireEvent(gesture.element, 'tap', {
                    touch: touch,
                    touchEvent: event
                });

                if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
                    fireEvent(gesture.element, 'doubletap', {
                        touch: touch,
                        touchEvent: event
                    });
                }

                lastTap = gesture;
            }

            if (gesture.status === 'panning') {
                var duration = Date.now() - gesture.startTime,
                    velocityX = (touch.clientX - gesture.startTouch.clientX) / duration,
                    velocityY = (touch.clientY - gesture.startTouch.clientY) / duration,
                    displacementX = touch.clientX - gesture.startTouch.clientX,
                    displacementY = touch.clientY - gesture.startTouch.clientY;

                var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY + gesture.velocityX * gesture.velocityX);
                var now = Date.now();
                var isflick = velocity > 0.5 && now - (gesture.lastTime < 10);

                fireEvent(gesture.element, 'panend', {
                    isflick: isflick,
                    touch: touch,
                    touchEvent: event,
                    isVertical: gesture.isVertical
                });

                if (isflick) {
                    fireEvent(gesture.element, 'flick', {
                        duration: duration,
                        velocityX: gesture.velocityX,
                        velocityY: gesture.velocityY,
                        displacementX: displacementX,
                        displacementY: displacementY,
                        touch: touch,
                        touchEvent: event,
                        isVertical: gesture.isVertical
                    });

                    if (gesture.isVertical) {
                        fireEvent(gesture.element, 'verticalflick', {
                            duration: duration,
                            velocityY: gesture.velocityY,
                            displacementY: displacementY,
                            touch: touch,
                            touchEvent: event
                        });
                    } else {
                        fireEvent(gesture.element, 'horizontalflick', {
                            duration: duration,
                            velocityX: gesture.velocityX,
                            displacementX: displacementX,
                            touch: touch,
                            touchEvent: event
                        });
                    }
                }
            }

            if (gesture.status === 'pressing') {
                fireEvent(gesture.element, 'pressend', {
                    touch: touch,
                    touchEvent: event
                });
            }

            delete gestures[id];
        }

        if (Object.keys(gestures).length === 0) {
            docEl.removeEventListener('touchmove', touchmoveHandler, false);
            docEl.removeEventListener('touchend', touchendHandler, false);
            docEl.removeEventListener('touchcancel', touchcancelHandler, false);
        }
    }

    function touchcancelHandler(event) {

        if (Object.keys(gestures).length == 2) {
            var elements = [];
            for (var p in gestures) {
                elements.push(gestures[p].element);
            }
            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
                touches: slice.call(event.touches),
                touchEvent: event
            });
        }

        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i],
                id = touch.identifier,
                gesture = gestures[id];

            if (!gesture) continue;

            if (gesture.pressingHandler) {
                clearTimeout(gesture.pressingHandler);
                gesture.pressingHandler = null;
            }

            if (gesture.status === 'panning') {
                fireEvent(gesture.element, 'panend', {
                    touch: touch,
                    touchEvent: event
                });
            }
            if (gesture.status === 'pressing') {
                fireEvent(gesture.element, 'pressend', {
                    touch: touch,
                    touchEvent: event
                });
            }
            delete gestures[id];
        }

        if (Object.keys(gestures).length === 0) {
            docEl.removeEventListener('touchmove', touchmoveHandler, false);
            docEl.removeEventListener('touchend', touchendHandler, false);
            docEl.removeEventListener('touchcancel', touchcancelHandler, false);
        }
    }

    docEl.addEventListener('touchstart', touchstartHandler, false);

})(window, window['lib'] || (window['lib'] = {}));