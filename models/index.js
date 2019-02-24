var mongoose = require("mongoose")
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todo-api-db");

mongoose.Promise = Promise; //so it can use catch and then

module.exports.Todo = require("./todo");