var TodoController = (function (){
    return {
        create : function (_, bus, ops){

            // -- Wireup adding a todoitem
            bus.on("todo::add", function (item, presenter){
                ops.add(item, function (err, todoItems){
                    if (err){
                        presenter(err, todoItems);
                    }
                    else{
                        presenter(null, todoItems);
                    }

                    bus.emit("todo::add::completed", todoItems);
                });
            });

            // -- Wireup Updating a specific item
            bus.on("todo::update", function (data, presenter){
                ops.update(data, function (err, items){
                    if (err){
                        presenter(err, items);
                    }
                    else {
                        presenter(null, items);
                    }

                    bus.emit("todo::update::completed", items);
                });
            });

            // -- Wireup removing an item
            bus.on("todo::remove", function (data, presenter){
                ops.remove(data, function (err, items){
                    if (err){
                        presenter(err, items);
                    }
                    else {
                        presenter(null, items);
                    }

                    bus.emit("todo::remove::completed", items);
                });
            });

            // -- Wireup fetching a single item
            bus.on("todo::getItem", function (data, presenter){
                ops.getItem(data, function (err, item){
                    presenter(err, item);
                });
            });

            // -- Wireup listing of all items
            bus.on("todo::list", function (presenter){
                ops.list(function (err, items){
                    presenter(err, items);
                });
            });

            return {
                setup : true
            };
        }
    };
})();

module.exports = TodoController;