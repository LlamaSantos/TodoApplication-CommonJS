var assert = require("assert");
var _ = require("underscore");

var Store = (function (){
    "use strict";
    return {
        create : function (){
            var cache = {};
            return {
                get : function (key){
                    return cache[key];
                },
                set : function (key, value){
                    cache[key] = value;
                }
            }
        }
    }
})();

var noop = function (){};


describe("TodoApplication-CommonJS", function (){
    describe("Features", function (){
        describe("Todo operations", function (){
            var TodoOperations = require("../features/todo/todoOperations.js");
            var ops = null;

            beforeEach(function (){
                ops = TodoOperations.create(_, Store.create());
            });

            it("should give an empty list", function (){
                ops.list(function (err, items){
                    assert.equal(null, err, err);
                    assert.equal(items.length, 0, "list should be empty.");
                })
            })

            it ("should give a list item after added", function (){
                ops.add({name : "foo", description: ""}, function (err1, afterAddedItems){
                    ops.list(function (err2, items){
                        assert.equal(afterAddedItems.length, items.length, "Items aren't added to the list");
                    })
                })
            })

            it ("should add an item", function (){
                ops.add({name : "foo", description : "something"}, function (err, items){
                    assert.equal(items.length, 1, "Item wasn't added.");
                    assert.equal(items[0].name, "foo");
                    assert.equal(items[0].description, "something");
                })
            })

            it ("should add an id to the item", function (){
                ops.add({name: "foo", description: "something"}, function (err, items){
                    assert.equal(items[0].id, 1);
                })
            });
            it ("should update the name.", function (){
                ops.add({name: "foo", description: "something"}, function (err, items){
                    items[0].name = "foo2";
                    ops.update(items[0], function (err, items){
                        assert.equal(err, null);
                        assert.equal(items[0].name, "foo2");
                    });
                })
            });
            it ("should update the description", function (){
                ops.add({name: "foo", description: "something"}, function (err, items){
                    items[0].description = "foo2";
                    ops.update(items[0], function (err, items){
                        assert.equal(err, null);
                        assert.equal(items[0].description, "foo2");
                    });
                })
            });
            it ("should remove the item", function (){
                ops.add({name : "foo", description: "something"}, function (err, items){
                    var id = items[0].id;
                    ops.remove({id: id}, function (err, data){
                        assert.equal(data.length, 0);
                    })
                })
            });
            it ("should search for an item", function (){
                ops.add({name : "foo1", description : ""}, noop);
                ops.add({name : "foo2", description : ""}, noop);
                ops.add({name : "bar1", description : ""}, noop);
                ops.add({name : "bar2", description : ""}, noop);
                ops.search(function (item){
                    return /foo[0-9]/gi.test(item.name);
                }, function (err, items){
                    assert.equal(items.length, 2);
                })
            });
            it ("should get an item by id");
        })
    })
})