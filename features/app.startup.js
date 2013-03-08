// -- Browser Script
(function (win, $, _, Hogan, tmpls){

    var TodoOperation = require("./todo/todoOperations.js"),
        TodoController = require("./todo/todoController.js"),
        TodoPresenter = require("./todo/todoPresenter.js"),
        app = require("./app.js"),
        Nodeject = require("nodeject");

    var container = new Nodeject();
    container.define({ name : "jquery",    type : function () { return $; }, singleton: true })
        .define({ name : "_",              type : function () { return _; }, singleton : true })
        .define({ name : "templates",      type : function () { return tmpls; }, singleton: true })
        .define({ name : "app",            type : app.create, singleton : true, deps: ["templates"] })
        .define({ name : "bus",            type : function (app) { return app.bus; }, singleton: true, deps: ["app"] })
        .define({ name : "store",          type : function (app) { return app.store; }, singleton: true, deps: ["app"] })
        .define({ name : "todoOperation",  type : TodoOperation.create, singleton: true, deps: ["_", "store"] })
        .define({ name : "todoController", type : TodoController.create, deps: ["_", "bus", "todoOperation"] })
        .define({ name : "todoPresenter",  type : TodoPresenter.create, deps: ["jquery", "_", "bus", "templates"]})
        .define({ name : "bootstrap",      type: function (app, presenter, controller){
            app.presenters = {
                todo: presenter
            };

            app.controllers = {
                todo: controller
            };

            return app;
        }, deps: ["app", "todoPresenter", "todoController"]});


    if (!('app' in win)){
        win.app = container.resolve("bootstrap");
        win.app.container = container;
        win.app.noop = function (){};
    }

    if (!('require' in win)){
        win.require = require;
    }

})(window, jQuery, _, Hogan, templates);


$(function (){
    // -- Seed data, since we don't have a persistent store.
    var ops = app.container.resolve("todoOperation");
    ops.add({ name : "Item 1", description : "Description here."}, app.noop);
    ops.add({ name : "Item 2", description : "Description here."}, app.noop);
    ops.add({ name : "Item 3", description : "Description here."}, app.noop);

    // -- Init the view
    app.bus.emit("app::init", function (err){
        console.info("Application Initialized.");
    });
});