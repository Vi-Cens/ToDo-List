var mongoose = require("mongoose")
mongoose.set("debug", true);

//local mongodb
//mongoose.connect("mongodb://localhost/todo-api-db");

//adds environment variables
var url = process.env.DATABASEURL || "mongodb://localhost/todo-api-db";
mongoose.connect(url)

mongoose.Promise = Promise; //so it can use catch and then

module.exports.Todo = require("./todo");
//