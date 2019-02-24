var mongoose = require("mongoose")

var todoSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: "Please type something!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date, 
        defautl: Date.now
    }
});

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
