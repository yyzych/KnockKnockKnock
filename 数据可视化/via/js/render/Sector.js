
define(function (require, exports, module) {
    var util=require("../util"),
        Graph=require("./Graph");

    var defOpts={
        xAxis: 250,
        yAxis: 100,
        radius: 50,
        direction: false,
        bAngle: 0,
        eAngle: 0
    };

    var Sector=util.inherit(Graph, {
        type: "Sector",
        init: function (opts) {
            this.series=$.extend({}, defOpts, this.series);
        },
        draw: function (n_series) {
            $.extend(this.series, n_series);
            this._drawSector();
        }
    });
    
    module.exports=Sector;
})