/*
 * app.js
 *
 * 视图知道模型，模型不知道视图
 */


$(function () {
    // model
    var Todo = Backbone.Model.extend({
        defaults: function () {
            return {
                title: "没有标题...",
                autoId: Todos.getNextAutoId(),
                done: false
            };
        },

        toggleDone: function () {
            var _done=this.get('done');
            this.save({
                done: !_done
            });
        }
    });


    // collection
    var TodoList=Backbone.Collection.extend({
        model: Todo,
        localStorage: new Backbone.LocalStorage("localTodos"),
        comparator: "autoId",

        done: function () {
            return this.where({
                done: true
            });
        },
        remaining: function () {
            return this.where({
                done: false
            });
        },
        getNextAutoId: function () {
            if(!this.length) return 1;
            // last, Backbone代理了underscore的函数
            return this.last().get("autoId") + 1;
        }
    });

    // 全局的todo列表
    var Todos=new TodoList;

    // todo item view
    var TodoView=Backbone.View.extend({
        tagName: "li",
        template: _.template($("#item-template").html()),
        events: {
            "click .toggle": "toggleDone",
            "dblclick .view": "edit",
            "click a.destroy": "clear",
            "keypress .edit": "updateOnEnter",
            "blur .edit": "close"
        },

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
        },
        render: function () {
            // 必须要转换为：this.model.toJSON()
            // 因为数据属性都在attributes里面
            var htm=this.template(this.model.toJSON());
            this.$el.html(htm);
            this.$el.toggleClass("done", this.model.get("done"));
            // 为什么不在initialize中定义this.input=this.$(".edit");呢？
            // 因为initialize时还没有在文档中生成dom元素
            this.input=this.$(".edit");
            return this;
        },
        toggleDone: function () {
            this.model.toggleDone();
        },
        edit: function () {
            this.$el.addClass("editing");
            this.input.focus();
        },
        close: function () {
            var val=this.input.val();
            if(!val) {
                this.clear();
            }else {
                this.model.save({
                    title: val
                });
                this.$el.removeClass("editing");
            }
        },
        clear: function () {
            this.model.destroy(); // 删除模型触发事件
        },
        updateOnEnter: function (e) {
            if(e.keyCode == 13) this.close();
        }
    });

    // application view
    var AppView=Backbone.View.extend({
        el: $("#todoapp"),
        statsTmpl: _.template($("#stats-template").html()),
        events: {
            "keypress #new-todo": "createOnEvent",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
        },

        initialize: function () {
            this.input=this.$("#new-todo");
            this.allCheckbox=this.$("#toggle-all")[0];

            this.listenTo(Todos, "add", this.addOne);
            this.listenTo(Todos, "reset", this.addAll);
            // 所有事件发生都能触发这个特别的事件，第一个参数是触发事件的名称。
            this.listenTo(Todos, "all", this.render);

            this.footer = this.$('footer');
            this.main = $('#main');

            Todos.fetch();
        },
        render: function () {
            var done=Todos.done().length,
                remaining=Todos.remaining().length;

            if(Todos.length) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTmpl({
                    done: done,
                    remaining: remaining
                }));
            }else {
                this.main.hide();
                this.footer.hide();
            }

            this.allCheckbox.checked=!remaining;
        },
        addOne: function (todo) {
            // console.log("addOne");
            var view=new TodoView({
                model: todo
            });
            this.$("#todo-list").append(view.render().el);
        },
        addAll: function () {
            // console.log("addAll");
            Todos.each(this.addOne, this);
        },
        createOnEvent: function (e) {
            if(e.keyCode != 13) return;
            if(!this.input.val()) return;

            Todos.create({
                title: this.input.val()
            });
            this.input.val("");
        },
        clearCompleted: function () {
            _.invoke(Todos.done(), "destroy");
            return false;
        },
        toggleAllComplete: function () {
            var _done=this.allCheckbox.checked;
            Todos.each(function (todo) {
               todo.save({
                done: _done
               });
            });
        }
    });

    var App=new AppView;


    // test
    // ==================================================
    var Stu=Backbone.Model.extend({
        defaults: {
            name: "no name",
            parentId: [0,1]
        },
        initialize: function () {
            this.on("change:name", function (e) {
                console.log("name change to"+e.get("name"));
            });
        },
        alertName: function () {
            alert(this.name);
        }
    });

    var StuList=Backbone.Collection.extend({
        model: Stu,
        localStorage: new Backbone.LocalStorage("localStus"),
        initialize: function () {
            this.on("add", function (e) {
                console.log(e.get("name"));
            });
            // 集合中的模型触发的任何事件都可以在集合身上直接触发
            this.on("change:name", function (model) {
                console.log(model);
            });
        }
    });

    var stulist=new StuList;
    // add不会保存到服务器中
    stulist.add([{
        name: "ych",
        parentId: [0,1,2,4]
    }, {
        name: "lihua"
    }]);

    var s=stulist.at(0);
    setTimeout(function () {
        s.save({name: "---"});
    }, 1500);
});
