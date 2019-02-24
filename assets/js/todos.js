//get elements from api db
$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addTodos)

	//insert todos from db to page
	function addTodos(todos){
		todos.forEach(function(todo){
			//create our new todo
			var newTodo = $("<li class='task' >" + "<span class='deleteBtn'>X </span>" + todo.name + "</li>");
			//store todo id
			newTodo.data("id", todo._id);
			//add completed class to todo
			if(todo.completed){
				newTodo.addClass("completed");
			}
			//append new todo
			$(".list").append(newTodo);
		});
	}


	//check off specific todos when clicked
	$("ul").on("click", "li", function(){	//use on not click function hear on already created item
		$(this).toggleClass("completed");
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
			$(this).parent().remove();
			parent.fadeOut(500, function(){
				parent.remove();
			});
		})
		.catch(function(err){
			console.log(err);
		})
	});

	//create new todo
	//listens to keypress
	$("#todoInput").keypress(function(event){		
		if(event.which === 13){
			//send request to create todo
			var userInput = $(this).val();
			$.post("/api/todos", {name: userInput})
			.then(function(newTodo){
				//clear input from user
				$("#todoInput").val("");
				//append users todo 
				$("ul").append("<li><span>X </span>" + userInput + "</li>")
			})
			.catch(function(err){
				console.log(err);
			})
		}
	});
});