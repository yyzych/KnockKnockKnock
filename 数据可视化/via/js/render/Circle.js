
define(function(require, exports, module) {
    var util=require("../util"),
        Graph=require("./Graph");

    var Circle = util.inherit(Graph, {
        type: "Circle",
        draw: function(n_series) {
            this.base(n_series);

            var series = this.series;
            this.series = $.extend([], series, n_series);
            this._drawCircle();
        }
    });
    module.exports=Circle;
});