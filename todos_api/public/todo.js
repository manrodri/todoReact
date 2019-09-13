/* global $ */

function addTodos (todos) {
    // take name and appned to page as <li>
    todos.forEach(function (todo) {
        addTodo(todo);
    });
}

function addTodo(todo){
        var newTodo = $('<li class="task">' + todo.name + '</li>');
        if (todo.completed){
            newTodo.addClass("done");
        }
        $('.list').append(newTodo);
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

$(document).ready(function () {
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function (err) {
        console.log(err);
    });
    
    $("#todoInput").keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });
});



