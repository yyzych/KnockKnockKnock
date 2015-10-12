/*
 * app.js
 */

define(function (require, exports, module) {
    var win=window,
        doc=document,
        mainViewCache=null;

    var AppRoute=Backbone.Router.extend({
        routes: {
            "": "loadIndex",
            "gallerys/:query": "loadGallerys"
        },
        loadIndex: function () {
            clearMainViewCache();
        },
        loadGallerys: function (pageIndex) {
            clearMainViewCache();
            pageIndex = pageIndex || 1;
            // seajs.use("view/gallerys", function (gallerys) {
            //     gallerys.initUI(pageIndex);
            // });
            require.async("./view/gallerys", function (gallerys) {
                gallerys.initUI(pageIndex);
                mainViewCache=gallerys;
            })
        }
    });

    function clearMainViewCache () {
        mainViewCache && mainViewCache.release();
    }

    function startRoute () {
        Backbone.history.start({
            pushState: false // 使用hash作为URL路径
        });
    }

    // AppView
    // ==================================================
    var AppView=Backbone.View.extend({
        el: $("#container"),

        initialize: function () {
            startRoute();
        }
    });

    var appView=new AppView;
    
    //暴露到全局对象中，用于在其他view中调用
    win.appRoute=new AppRoute;
    win.appView=appView;
    
});