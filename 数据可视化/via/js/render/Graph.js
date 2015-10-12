define(function(require, exports, module) {
    // base 
    function Graph(opts) {
        opts || (opts = {});
        this.id = this.guid();
        this.series = opts.series; // 只绘制一个图形
        this.canvas = opts.canvas
        this.ctx = this.canvas.getContext("2d");
    }
    Graph.prototype = {
        constructor: Graph,
        type: "Graph",
        init: function() {},
        draw: function() {},
        guid: function() {
            var time = String(Date.now());
            var res = time.replace(/\d/g, function(a) {
                var b = parseInt(a);
                var r = Math.random();
                return Math.floor(a * r);
            });
            return this.type.substr(0, 1) + res;
        },
        refresh: function(series) {
            this.draw(series);
        },
        _drawCircle: function() {
            var ctx = this.ctx,
                item = this.series;

            if (!item.xAxis || !item.yAxis || !item.radius) throw new Error("缺少必要参数");
            ctx.save();
            ctx.beginPath();
            ctx.arc(item.xAxis, item.yAxis, item.radius, 0, 2 * Math.PI);
            item.bgColor && (ctx.fillStyle = item.bgColor, ctx.fill());
            item.brColor && (ctx.strokeStyle = item.brColor, ctx.stroke());
            ctx.closePath();
            ctx.restore();
        },
        _drawSector: function() {
            var ctx = this.ctx,
                item = this.series;

            if (!item.xAxis || !item.yAxis || !item.radius || item.angle) throw new Error("缺少必要参数");
            ctx.save();
            ctx.beginPath();
            // 位移到圆心，方便绘制
            ctx.translate(item.xAxis, item.yAxis);
            // 移动到圆心
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, item.radius, item.bAngle, item.eAngle, item.directon);
            item.bgColor && (ctx.fillStyle = item.bgColor, ctx.fill());
            item.brColor && (ctx.strokeStyle = item.brColor, ctx.stroke());
            ctx.closePath();
            ctx.restore();
        }
    }

    module.exports = Graph;
});