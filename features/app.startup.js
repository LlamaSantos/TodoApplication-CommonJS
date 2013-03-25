// -- Browser Script
(function (win, $, _, Hogan, tmpls){

    /* We make strong references like TodoOperation for clarity's sake.
    * Normally in your application you would require the dependencies directly
    * in the container configuration for terseness.  Ex.
    *
    * container.define({ name : "MyOperation", type : require("./path/to/operation.js").create, category : "operations" });
    * */
    var TodoOperation = require("./todo/todoOperations.js"),
        TodoController = require("./todo/todoController.js"),
        TodoPresenter = require("./todo/todoPresenter.js"),
        app = require("./app.js"),
        Nodeject = require("nodeject");

    var wrapGlobal = function (obj) { return function () { return obj ; }};
    var wrap = function (name) { return function (obj) { return obj[name]; }};

    var container = new Nodeject();
    container.define({ name : "jquery",    type : wrapGlobal($), singleton: true })
        .define({ name : "_",              type : wrapGlobal(_), singleton : true })
        .define({ name : "templates",      type : wrapGlobal(tmpls), singleton: true })
        .define({ name : "app",            type : app.create, singleton : true, deps: ["templates"] })
        .define({ name : "bus",            type : wrap("bus"), singleton: true, deps: ["app"] })
        .define({ name : "store",          type : wrap("store"), singleton: true, deps: ["app"] })
        .define({ name : "todoOperation",  type : TodoOperation.create, category : "operations", singleton: true, deps: ["_", "store"] })
        .define({ name : "todoController", type : TodoController.create, category : "controllers", deps: ["_", "bus", "todoOperation"] })
        .define({ name : "todoPresenter",  type : TodoPresenter.create, category : "presenters", deps: ["jquery", "_", "bus", "templates"]})
        .define({ name : "startup",      type: function (app){
            // Initialize the Presenters
            app.presenters = container.resolve({ category : "presenters", format : "literal" });

            // Initialize the controllers
            app.controllers = container.resolve({ category : "controllers", format : "literal" });

            // Assign the container
            win.app.container = container;

            // Create a noop function for general purpose
            win.app.noop = function (){};

            // Return the initialized app
            return app;
        }, deps: ["app"]});


    if (!('app' in win)){
        win.app = container.resolve("startup");
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
