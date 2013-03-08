var app = (function (){

    var EventEmitter2 = require("EventEmitter2").EventEmitter2;

    return {
        create : function (templates){
            var cache = {};

            return {
                bus : (new EventEmitter2({
                    "delimiter" : "::",
                    "wildcard" : "*"
                })),
                store : {
                    get : function (key){
                        return cache[key];
                    },
                    set : function (key, value){
                        cache[key] = value;
                    }
                },
                templates : templates,
                noop : function (){}
            }
        }
    }
})();

module.exports = app;