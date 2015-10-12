
define(function (require, exports, module) {
    var GalleryList=require("../entity/galleryList"),
        GalleryItemView=require("./galleryItem"),
        PageControl=require("../module/pageControl");

    var doc=document,
        galleryView=null;

    var pageControl=new PageControl({
        curIndex: 0,
        pageNum: 12,
        nextOperation: function () {
            appRoute.navigate("#gallerys/"+this.curIndex, {trigger: true, replace: false});
        },
        prevOperation: function () {
            appRoute.navigate("#gallerys/"+this.curIndex, {trigger: true, replace: false}); 
        }
    });

    var GalleryView=Backbone.View.extend({
        tagName: "div",
        id: "main",
        events: {
            "click .item": "showItemInfo" // @ques: 这个事件是绑定在每个item上还是整个gallerys上呢
        },

        initialize: function () {
            // this.listenTo(Gallerys, "add", this.addOne);
            // this.listenTo(Gallerys, "reset", this.addAll);
            this.listenTo(Gallerys, "all", this.render);
            this.listenTo(Gallerys, "sync", this.addAll);

            this.gallerys=$('<div class="gallerys">');
            this.$el.append(this.gallerys);
            $(".web-bd").html("").prepend(this.$el);

            Gallerys.fetch();
        },
        addOne: function (item) {
            var v=new GalleryItemView({
                model: item
            });
            this.gallerys.append(v.render().el);
        },
        addAll: function () {
            Gallerys.each(this.addOne, this);
        },
        render: function () {
            var $el=$(this.el);
            if(!Gallerys.length) {
                var tip=$("<p class='tip'>").html("没有内容");
                $el.append(tip);
                pageControl.detach();
            }else {
                $el.find(".tip").remove();
                pageControl.add($(".web-bd"));
            }
        },

        showItemInfo: function (e) {
            console.log("click");
        }
    });
    
    exports.initUI=function (pageIndex) {
        window.Gallerys=new GalleryList();
        pageControl.setCurIndex(pageIndex);
        galleryView=new GalleryView;

        // setTimeout(function () {
        //     Gallerys.create({
        //         imgSrc: "http://h.hiphotos.baidu.com/image/w%3D310/sign=02a45aeed739b6004dce09b6d9513526/2e2eb9389b504fc2c208e908e7dde71190ef6d63.jpg",
        //         desc: "work 1"
        //     });
        //     Gallerys.create({
        //         imgSrc: "http://h.hiphotos.baidu.com/image/w%3D310/sign=02a45aeed739b6004dce09b6d9513526/2e2eb9389b504fc2c208e908e7dde71190ef6d63.jpg",
        //         desc: "work 2"
        //     });
        //     Gallerys.create({
        //         imgSrc: "http://h.hiphotos.baidu.com/image/w%3D310/sign=02a45aeed739b6004dce09b6d9513526/2e2eb9389b504fc2c208e908e7dde71190ef6d63.jpg",
        //         desc: "work 3"
        //     });
        // },1000);
        
    };

    exports.release=function () {
        galleryView && galleryView.remove();
        pageControl.detach();
        galleryView=null;
        window.Gallerys=null;
    };

});