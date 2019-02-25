//get elements from api db
$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)

	//insert todos from db to page
	function addTodos(todos){
		todos.forEach(function(todo){
			//create our new todo
			var newTodo = $("<li class='task' >" + "<span>X </span>" + todo.name + "</li>");
			//store todo id
			newTodo.data("id", todo._id);
			//add completed boolean
			newTodo.data("completed", todo.completed);
			//add completed class to todo
			if(todo.completed){
				newTodo.addClass("completed");
			}
			//append new todo
			$(".list").append(newTodo);
		});
	}

	//create new todo
	//listens to keypress
	$("#todoInput").keypress(function(event){		
		if(event.which === 13){
			//send request to create todo
			var userInput = $("#todoInput").val();
			$.post("/api/todos", {name: userInput})
			.then(function(todoData){
				console.log(todoData);
				//clear input
				$("#todoInput").val("");
				//create our new todo
				var newTodo = $("<li class='task' >" + "<span>X </span>" + todoData.name + "</li>");
				//store todo id
				newTodo.data("id", todoData._id);
				//add completed boolean
				newTodo.data("completed", todoData.completed);
				//add completed class to todo
				if(todoData.completed){
					newTodo.addClass("completed");
				}
				//append new todo
				$(".list").append(newTodo);
			})
			.catch(function(err){
				console.log(err);
			})
		}
	});

	//check off specific todos when clicked
	//use on not click function to listen on already created item
	$(".list").on("click", "li", function(){	
		//get id from db
		var clickedId = $(this).data("id");
		//get completed status from db
		var isDone = $(this).data("completed");
		//cant call this inside then function, out of scope
		var update = $(this);
		//put request !isDone so true => false
		var updateData = {completed: !isDone}
		$.ajax({
			method: "PUT",
			url: "/api/todos/" + clickedId,
			data: updateData 
		})
		.then(function(updated){
			console.log(update);
			update.toggleClass("completed");
			update.data("completed", !isDone);
		})
		.catch(function(err){
			console.log(err);
		})
	});

	//remove todo when click on X
	//add listener on list class, only on span elements
	$(".list").on("click", "span", function(event){	
		//stops the bubling process
		event.stopPropagation();
		//add id
		var clickedId = $(this).parent().data("id");
		var parent = $(this).parent();
		$.ajax({
			method: "DELETE",
			url: "/api/todos/" + clickedId 
		})
		.then(function(data){
			console.log(data);
			parent.fadeOut(500, function(){
				parent.remove();
			});
		})
		.catch(function(err){
			console.log(err);
		})
	});
});
/*
function addTodos(todos) {
	//add todos to page here
	todos.forEach(function(todo){
	  addTodo(todo);
	});
  }

function createTodo(){
	//send request to create new todo
	var usrInput = $('#todoInput').val();
	$.post('/api/todos',{name: usrInput})
	.then(function(newTodo){
	  $('#todoInput').val('');
	  addTodo(newTodo);
	})
	.catch(function(err){
	  console.log(err);
	})
  }

  function addTodo(todo){
	var newTodo = $('<li class="task">'+todo.name +' <span>X</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if(todo.completed){
	  newTodo.addClass("done");
	}
	$('.list').append(newTodo);
  }

  $('#todoInput').keypress(function(event){
    if(event.which == 13) {
      createTodo();
    }
  });
  */