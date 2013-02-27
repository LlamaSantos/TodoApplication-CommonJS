var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use("html", require("hogan-express"));
app.enable("view cache");


app.get("/", function (req, res){
    res.render("index", {partials : {}});
});

app.listen(8080, function (err){
    console.info("Started up on http://localhost:8080/");
});
