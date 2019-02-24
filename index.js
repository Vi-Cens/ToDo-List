var express = require("express");
var app = express();
var db = require("./models") //use schema from models
const {PORT = 3000} = process.env //Set port for node 


app.get("/", function(req, res){
    res.send("HURROOOOOO!");
});

//GET ROUTE
app.get("/api/todos", function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
});

//POST ROUTE
app.post("/api/todos", function(req, res){
    //bodyparser to acces post data for express
    res.send("This is the post route");
});


app.listen(PORT, function(){
    console.log("APP IS RUNNING ON PORT " + PORT);
});
