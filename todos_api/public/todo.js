/* global $ */

function addTodos (todos) {
    // take name and appned to page as <li>
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}

function addTodo(todo){
        var newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
        newTodo.data('id', todo._id);
        newTodo.data('completed', todo.completed);
        if (todo.completed){
            newTodo.addClass("done");
        }
        console.log("got here");
        $('.list').append(newTodo);
        $('#todoInput').val('');
}

function createTodo() {
    var url = '/api/todos'
    var userInput = $('#todoInput').val();
    $.post(url, {
        name: userInput
    })
    .then(function (newTodo) {
        addTodo(newTodo);
    })
    .catch(function (err) {
        console.log(err);
    })
}

function removeTodo(todo) {
      var clickedId = todo.data('id');
      var deleteUrl = '/api/todos/' + clickedId;
      $.ajax({
          method: 'DELETE',
          url:deleteUrl
      })
      .then(function (data) {
         todo.remove();
      })
      .catch(function (err) {
         console.log(err);
      })
}


function updateTodo(todo) {
    //send put request
    var clickedId = todo.data('id');
    var updateUrl = '/api/todos/' + clickedId;
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
  
    $.ajax({
          method: 'PUT',
          url:updateUrl,
          data: updateData
      })
     .then(function (updatedTodo){
         todo.toggleClass("done");
         todo.data('completed', isDone);
     })
     .catch(function(err){
         console.log(err);
     })
    // update page
    
}

$(document).ready(function () {
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function (err) {
        console.log(err);
    });
});

$(".list").on('click', 'li', function () {
    updateTodo($(this));
})

$("#todoInput").keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });

$(".list").on('click', 'span', function (event) {
    event.stopPropagation();
    removeTodo($(this).parent());
    });


