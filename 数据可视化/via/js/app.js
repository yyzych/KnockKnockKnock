// app.js

define(function (require, exports, module) {
    var SectorChart=require("./chart/SectorChart");

    var sectorChart1=new SectorChart({
        canvas: $("#canvas").get(0),
        series: [{
            xAxis: 500,
            yAxis: 220,
            radius: 160,
            direction: false,
            autoShowLabel: true,
            data: [
                {value: 0.3, label: "30%", bgColor: "#22C76B"}, 
                {value: 0.5, label: "50%", bgColor: "#D87A80"},
                {value: 0.1, label: "20%", bgColor: "#28B8EC"},
                {value: 0.1, label: "20%", bgColor: "#B6A2DE"}
            ]
        }]
    });
    sectorChart1.render();
     
});
