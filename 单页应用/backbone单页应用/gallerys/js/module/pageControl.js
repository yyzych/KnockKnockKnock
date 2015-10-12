/*
 * pageControl.js
 */

define(function (require, exports, module) {
    var defOptions={
        curIndex:0,
        pageNum:0,
        nextOperation: function(){},
        prevOperation: function(){}
    };

    function PageControl (options) {
        options=$.extend({}, defOptions, options);

        this.curIndex=options.curIndex;
        this.pageNum=options.pageNum;
        this.nextOperation=options.nextOperation;
        this.prevOperation=options.prevOperation;

        this.isDisabled=!1;

        this.init();
    }

    PageControl.prototype.init=function () {
        var that=this;
        var el=$('<div class="page-control"><a class="btn prev">上一页</a><a class="btn next">下一页</a></div>');
        el.on("click", ".prev", function (e) {
            if(that.isDisabled
                || that.curIndex === 1) return;
            that.curIndex--;
            that.prevOperation();
        }).on("click", ".next", function (e) {
            if(that.isDisabled) return;
            that.curIndex++;
            that.nextOperation();
        });

        this.$el=el;
        this.prevBtn=el.find(".prev");
        this.nextBtn=el.find(".next");
    }
    PageControl.prototype.setCurIndex=function (index) {
        this.curIndex=parseInt(index);
    }
    PageControl.prototype.add=function (elem) {
        if(this.curIndex === 1) {
            this.prevBtn.hide();
        }else {
            this.prevBtn.show();
        }
        elem.append(this.$el);
    }
    PageControl.prototype.detach=function () {
        // 这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。与remove()不同的是，所有绑定的事件、附加的数据等都会保留下来。
        this.$el.detach();
    }
    PageControl.prototype.remove=function () {
        this.$el.remove();
    }

    module.exports=PageControl;

});