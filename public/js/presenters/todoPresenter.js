var TodoPresenter = (function (){
    // -- Shared Space between all TodoPresenters created.
    var renderBody = function renderBody(tmpl, items){
        $(".app-root").html(tmpl.main.render({items: items}));
    };

    var jQueryEvents = function jQueryEvents($, _, bus, tmpl){

        // Adding an Item (From Main Menu or the Hero area)
        $("body").on("click", ".js-todo-add", function (){
            $(".app-root").append(tmpl.todoAddModal.render({ }));
            $(".todo-add-modal").modal({ keyboard : true  });
        });

        // Save the new item from the modal
        $("body").on("click", ".js-todo-add-modal-save", function (){
            var data = {
                name : $(".todo-add-modal .todo-name-field").val(),
                description : $(".todo-add-modal .todo-description-field").val()
            };

            bus.emit("todo::add", data, function (err, items){
                if (err){
                    console.info(err);
                }
                else{
                    var modal = $(".todo-add-modal");
                    modal.on("hidden", function (){
                        modal.remove();
                        renderBody(tmpl, items);
                    }).modal("hide");
                }
           });
        });

        // Close the modal without a save.
        $("body").on("click", ".js-todo-modal-close", function (){
            $(this).closest(".modal").remove();
        });

        // Edit a selected element
        $("body").on("click", ".js-todo-edit", function (){
            var id = $(this).attr("data-id");
            bus.emit("todo::get", {id: id}, function (err, item){
                console.info(item);

                $(".app-root").append(tmpl.todoEditModal.render(item));
                $(".todo-edit-modal").modal({ keyboard : true  });
            });
        });

        // Save the updated item from the modal
        $("body").on("click", ".js-todo-edit-modal-save", function (){
            var data = {
                id : $(this).attr("data-id"),
                name : $(".todo-edit-modal .todo-name-field").val(),
                description : $(".todo-edit-modal .todo-description-field").val()
            };

            bus.emit("todo::update", data, function (err, items){
                if (err){
                    console.info(err);
                }
                else{
                    var modal = $(".todo-edit-modal");
                    modal.on("hidden", function (){
                        modal.remove();
                        renderBody(tmpl, items);
                    }).modal("hide");
                }
            });
        });

        // Delete a selected element
        $("body").on("click", ".js-todo-remove", function (){
            var id = $(this).attr("data-id");
            bus.emit("todo::get", {id: id}, function (err, item){
                console.info(item);

                $(".app-root").append(tmpl.todoRemoveModal.render(item));
                $(".todo-remove-modal").modal({keyboard: true});
            })
        });

        // Save the deletion from the modal
        $("body").on("click", ".js-todo-remove-modal-save", function (){
            var id = $(this).attr("data-id");
            bus.emit("todo::remove", {id: id}, function (err, items){

                if (err){
                    console.info(err);
                }
                else {
                    var modal = $(".todo-remove-modal");
                    modal.on("hidden", function (){
                        modal.remove();
                        renderBody(tmpl, items);
                    }).modal("hide");
                }
            });
        });
    };

    var busEvents = function busEvents($, _, bus, tmpl){
        bus.on("app::init", function (){
            bus.emit("todo::list", function (err, items){
                renderBody(tmpl, items);
            });
        });

        bus.on("todo::add::completed", function (err, items){
            console.info("Items: %o", items);
        });

        bus.on("todo::edit::completed", function (err, items){
            console.info("Items: %o", items);
        });

        bus.on("todo::remove::completed", function (err, items){
            console.info("Items: %o", items);
        });
    };

    return {
        create : function ($, _, bus, tmpl){
            // -- Handle all jquery listeners
            jQueryEvents($, _, bus, tmpl);

            // -- Handle any bus listeners, these may be triggered by other operations
            busEvents($, _, bus, tmpl);

            return {
                setup : true
            }
        }
    }
})();