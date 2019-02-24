var express = require("express");
var app = express();
var db = require("./models") //use schema from models
var bodyParser = require("body-parser");
const {PORT = 3000} = process.env //Set port for node 

app.use(bodyParser.json());  //tells our app to use bodyparser
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.send("HURROOOOOO!");
});

//READ ROUTE
app.get("/api/todos", function(req, res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
});

//CREATE ROUTE
app.post("/api/todos", function(req, res){
    //bodyparser to acces post data for express
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
});


app.listen(PORT, function(){
    console.log("APP IS RUNNING ON PORT " + PORT);
});
