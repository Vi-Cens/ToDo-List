//check off specific todos when clicked
$("ul").on("click", "li", function(){	//use on not click function hear on already created item
	$(this).toggleClass("completed");
});

//remove todo when click on X
$("ul").on("click", "span", function(event){	// stops the bubling process
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
event.stopPropagation();
});

//create new todo
$("input[type = 'text']").keypress(function(event){		//listens to keypress
	if(event.which === 13){
		//grabs the new todo from input
		var todoText = $(this).val();
		//crates the new li
		$("ul").append("<li><span>X </span>" + todoText + "</li>")
	}
});