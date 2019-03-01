//get elements from api db
$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(addAllTodos)

	//listener on sortAZ button
	$("#sortAZ").on("click", function(){
		//empty list
		$("#ulTodo").empty();
		$.getJSON("/api/todos")
		.then(addSortedAZ)
	});

	//listener on sortZA button
	$("#sortZA").on("click", function(){
		//empty list
		$("#ulTodo").empty();
		$.getJSON("/api/todos")
		.then(addSortedZA)
	});

	//listener on creation date button
	$("#createdDate").on("click", function(){
		console.log("ok")
		//empty list
		$("#ulTodo").empty();
		$.getJSON("/api/todos")
		.then(addSortedDate)
	});

	//create new todo
	//listens to keypress
	$("#todoInput").keypress((event) =>{	
		let userInput = $("#todoInput").val();	
		//listen for enter key and check that input is not empty
		if(event.which === 13 && userInput.length != 0){
			//send request to create todo
			$.post("/api/todos", {name: userInput})
			.then((todoData)  => {
				//clear user input
				$('#todoInput').val('');
				addSingleTodo(todoData);
			})
			.catch((err) => {
				console.log(err);
			})
		}
	});

	$(document).on('click', '#editable', function(event){
	event.preventDefault(); 
	if($(this).attr('edit_type') == 'button')
	{
		return false; 
	}
	//make editable
	$(this).closest('li').attr('contenteditable', 'true');
	$(this).focus();
	//watch for enter key to finish edit
	$("li").keypress((event) =>{
		//get todo id
		let editId = $(this).data("id");
		//get editted name
		let edittedName = $(this).text();
		//console.log(edittedName);
		if(event.which === 13){
			event.preventDefault();
			$.ajax({
				method: "PUT",
				url: "/api/todos/" + editId,
				data: {name: edittedName} 
				})
				.then(function(){
				console.log("succes")
				})
				.catch(function(err){
				console.log(err);
				});	
			}
		});
	});

	//check off specific todos when clicked
	//use on not click function to listen on already created item
	$("ul").on("click", ".fa-check-circle", function(event){	
		event.stopPropagation();
		let clickedId = $(this).parent().data("id");
		//get completed status from db
		let isDone = $(this).parent().data("completed");
		//cant call this inside then function, out of scope
		let update = $(this).parent();
		//put request !isDone so true => false
		let updateData = {completed: !isDone}
		$.ajax({
			method: "PUT",
			url: "/api/todos/" + clickedId,
			data: updateData 
		})
		.then(function(updated){
			update.toggleClass("completed");
			update.data("completed", !isDone);
		})
		.catch(function(err){
			console.log(err);
		})
	});
	
	//remove todo when click on X
	//add listener on list class, only on span elements
	$("ul").on("click", "span", function(event){	
		//stops the bubling process
		event.stopPropagation();
		//add id
		let clickedId = $(this).parent().data("id");
		let parent = $(this).parent();
		$.ajax({
			method: "DELETE",
			url: "/api/todos/" + clickedId 
		})
		.then((data) =>{
			console.log(data);
			parent.fadeOut(500, function(){
				parent.remove();
			});
		})
		.catch(function(err){
			console.log(err);
		})
	});

	//toggle input
	$(".fas").click(function(){
		$("#todoInput").fadeToggle();
	});
	//toggle for mobile
	$("#plusSign").click(function(){
		$("#todoInput").fadeToggle();
	});
});

//insert todos from db to page
function addAllTodos(todos){
	todos.forEach((todo) => {
		//duplicated code made into function
		addSingleTodo(todo);
	});
};

//adds only one todo, for loop to add all of them
function addSingleTodo(todoData){
	//create our new todo
	let newTodo = $("<li id='editable' contenteditable='false'><span contenteditable='false'><i class='far fa-trash-alt'></i></span>" + todoData.name + "<i contenteditable='false' class='far fa-check-circle'></i></li>");
	//store todo id
	newTodo.data("id", todoData._id);
	//add completed boolean
	newTodo.data("completed", todoData.completed);
	//add completed class to todo
	if(todoData.completed){
		newTodo.addClass("completed");
	}
	//append new todo
	$("#ulTodo").append(newTodo);
};

//sorts todos from a to z
function addSortedAZ(todos) {
	var sorted = todos.sort((a, b) => {
		if (a.name < b.name) return -1;
		else if (a.name > b.name) return 1;
		else return 0;
	});
	todos.forEach((todo) => {
		//duplicated code made into function
		addSingleTodo(todo);
	});
};

//sorts todos from z to a
function addSortedZA(todos) {
	var sorted = todos.sort((a, b) => {
		if (a.name < b.name) return 1;
		else if (a.name > b.name) return -1;
		else return 0;
	});
	todos.forEach((todo) => {
		//duplicated code made into function
		addSingleTodo(todo);
		});
};

//sorts todos by date
function addSortedDate(todos) {
	var sorted = todos.sort((a, b) => {
		if (a.created_date < b.created_date) return -1;
		else if (a.created_date > b.created_date) return 1;
		else return 0;
	});
	todos.forEach((todo) => {
		//duplicated code made into function
		addSingleTodo(todo);
		});
};
