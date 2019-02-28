var mongoose = require("mongoose")
mongoose.set("debug", true);

//local mongodb
//mongoose.connect("mongodb://localhost/todo-api-db");

//heroku mongolab db
mongoose.connect('mongodb://pvicens:p123456@dbh43.mlab.com:27437/todo-list');

mongoose.Promise = Promise; //so it can use catch and then

module.exports.Todo = require("./todo");