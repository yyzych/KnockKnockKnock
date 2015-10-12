// SectorChart.js

define(function(require, exports, module) {
    var util = require("../util"),
        Sector = require("../render/Sector");

    var defOpts = {
        title: "", // 大标题
        subTitle: "", // 小标题
        canvas: null,
        series: []
    };

    var SectorChart = function(opts) {
        opts = $.extend({}, defOpts, opts);
        if (!canvas) throw new Error("缺少canvas参数");

        this.canvas = opts.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.title = opts.title;
        this.subTitle = opts.subTitle;
        this.series = opts.series; // 表示几组，一组里面又有好多块
        this.opts = opts;
        this.init(opts);
    };
    SectorChart.prototype.init = function(opts) {
        var series = this.series,
            opts = this.opts,
            bAngle,
            angle,
            temp = {
                canvas: this.canvas
            };

        $.each(series, function(s_index, s_item) {
            bAngle = 0;
            temp.series = {
                xAxis: s_item.xAxis,
                yAxis: s_item.yAxis,
                radius: s_item.radius,
                direction: s_item.direction
            };
            s_item.dataObj = [];

            $.each(s_item.data, function(d_index, d_item) {
                $.extend(temp.series, d_item);
                angle = d_item.value * 360;
                angle = angle * Math.PI / 180;
                temp.series.bAngle = bAngle;
                bAngle += angle;
                temp.series.eAngle = bAngle;
                temp.series.bgColor = d_item.bgColor;
                s_item.dataObj.push(new Sector(temp));
            });
        });
    };
    SectorChart.prototype.render = function() {
        var that = this;
        $.each(this.series, function(s_index, s_item) {
            $.each(s_item.dataObj, function(d_index, d_item) {
                // 扇形区域
                d_item.draw();
                // 扇形提示
                that.drawtTip(d_item.series);
            });
        });
    };
    SectorChart.prototype.drawtTip = function(opt) {
        var angle = (opt.eAngle + opt.bAngle) / 2;
        var ctx = this.ctx;
        var centerx = (opt.radius + 15) * Math.cos(angle),
            centery = (opt.radius + 15) * Math.sin(angle);
        ctx.save();
        ctx.beginPath();

        ctx.fillStyle = opt.bgColor;
        ctx.testBaseline = "middle";
        ctx.font = "12px Arial";
        ctx.strokeStyle = opt.bgColor;
        if(util.isRetina) {
            ctx.font = "24px Arial";
            ctx.lineWidth="2";
        }

        var txtWidth = ctx.measureText(opt.label).width+20;

        ctx.translate(opt.xAxis, opt.yAxis);
        ctx.moveTo(0, 0);
        ctx.lineTo(centerx, centery);
        centerx > 0 ? (ctx.lineTo(centerx + 10, centery), ctx.fillText(opt.label, centerx + 20, centery + 6)) 
                    : (ctx.lineTo(centerx - 10, centery), ctx.fillText(opt.label, centerx - txtWidth, centery + 6));

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };

    module.exports = SectorChart;
});