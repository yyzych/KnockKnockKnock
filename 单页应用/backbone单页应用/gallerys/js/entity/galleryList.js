/*
 * galleryList.js
 */

define(function (require, exports, module) {
    var GalleryItem=require("./galleryItem");

    var GalleryList=Backbone.Collection.extend({
        model: GalleryItem,
        localStorage: new Backbone.LocalStorage("local-gallerys"),
        comparator: "autoId",

        initialize: function (options) {
            
        },
        getNextAutoId: function () {
            if(!this.length) return 1;
            return this.last().get("autoId") + 1;
        },
        getFromIndex: function (num, formIndex) {
            var res, autoId;
            res = this.filter(function (item) {
                autoId=item.get("autoId");
                if(autoId >= formIndex 
                    && autoId < (num+formIndex)) {
                    return true;
                }
            });
            return res;
        }
    });

    module.exports=GalleryList;
});