var clone = function (item){
    return JSON.parse(JSON.stringify(item));
};

var TodoOperation = (function (){
    return {
        create : function (_, store){
            if (!!store.get("todo")){
                store.set("todo", []);
            }

            var index = 0;

            return (function (){
                return {
                    search : function search (filter, done){
                        var scope = store.get("todo") || [];

                        done(null, _(scope).filter(filter));
                    },
                    list : function list(done){
                        var scope = store.get("todo") || [];

                        done(null, clone(scope));
                    },
                    add : function add (item, done){
                        if(('name' in item) && ('description' in item)){
                            var scope = store.get("todo") || [];

                            index = index + 1;
                            item.id = index;
                            scope.push(item);

                            store.set("todo", scope);

                            done(null, clone(scope));
                        }
                        else{
                            done("Bad todo item, missing data", clone(scope));
                        }
                    },
                    update : function update (item, done){
                        if(('name' in item) && ('description' in item)){

                            var scope = store.get("todo") || [];
                            var newList = _(scope).reject(function (i){
                                return i.id == item.id;
                            });

                            newList.push(item);
                            scope = _(newList).sortBy(function (item) { return item.id; });
                            store.set("todo", scope);

                            done(null, clone(scope));
                        }
                        else{
                            done("Bad todo item, missing data");
                        }
                    },
                    remove : function remove (item, done){
                        var scope = store.get("todo") || [];
                        scope = _.chain(scope).reject(function (i){
                            return i.id == item.id;
                        }).sortBy(function (item) { return item.id; }).value();

                        store.set("todo", scope);

                        done(null, clone(scope));
                    },
                    get : function get(item, done){
                        if ('id' in item){

                            var scope = store.get("todo") || [];
                            var item = _(scope).find(function (i){
                                return i.id == item.id;
                            });

                            done(null, (item ? clone(item) : null));
                        }
                        else {
                            done("id missing from input.", null);
                        }
                    }
                }
            })();
        }
    };
})();