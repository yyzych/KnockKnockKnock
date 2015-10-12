/*
 * galleryItem.js
 *
 * GalleryItemView 视图
 */

define(function(require, exports, module) {
    var tmpl = ['<a src="<% print(\'#gallerys/item/\' + autoId) %>">',
        '            <img src="<%= imgSrc %>">',
        '            <div class="desc"><%= desc %></div>',
        '        </a>'
    ].join("");

    var GalleryItemView = Backbone.View.extend({
        tagName: "section",
        className: "item",
        template: _.template(tmpl),

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },
        render: function () {
            var jsonModel=JSON.stringify(this.model)
            jsonModel=JSON.parse(jsonModel);
            var htm=this.template(jsonModel);
            this.$el.html(htm);
            return this;
        }
    });

    module.exports=GalleryItemView;
    
});