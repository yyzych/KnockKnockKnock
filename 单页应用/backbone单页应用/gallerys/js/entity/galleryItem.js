/*
 * galleryItem.js
 */

define(function(require, exports, module) {
    var GalleryItem = Backbone.Model.extend({
        defaults: function() {
            return {
                autoId: Gallerys.getNextAutoId(),
                desc: "no description",
                imgSrc: "./img/placehold.jpg"
            };
        }

        // 如果直接使用对象，Gallerys是不存在的
        // defaults: {
        //     autoId: Gallerys.getNextAutoId(),
        //     desc: "no description",
        //     imgSrc: "./img/placehold.jpg"
        // }
    });

    module.exports = GalleryItem;
});