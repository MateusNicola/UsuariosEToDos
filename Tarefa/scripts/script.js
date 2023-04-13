// Carregar lista de usuários no select
$.get("https://jsonplaceholder.typicode.com/users", function(users) {
    users.forEach(function(user) {
        $("#userSelect").append("<option value='" + user.id + "'>" + user.name + "</option>");
    });
});

// Mostrar detalhes do usuário e seus ToDos quando selecionado no select
$("#userSelect").change(function() {
    var userId = $(this).val();
    
    // Limpar os detalhes do usuário e seus ToDos
    $("#name").empty();
    $("#userName").empty();
    $("#userEmail").empty();
    $("#userPhone").empty();
    $("#userAdress").empty();
    $("#userWebsite").empty();
    $("#userCompanyName").empty();
    $("#userCompanyPhrase").empty();
    $("#userCompanyBs").empty();
    $("#userTodos").empty();
    
    // Fazer requisição para a API para obter detalhes do usuário
    $.get("https://jsonplaceholder.typicode.com/users/" + userId, function(user) {
        $("#name").text(user.name);
        $("#userName").text(user.username);
        $("#userEmail").text(user.email);
        $("#userPhone").text(user.phone);
        $("#userAdress").text(user.address.street + ", " + user.address.suite + " - " + user.address.city + " - " + user.address.zipcode);
        $("#userWebsite").text(user.website);
        $("#userCompanyName").text(user.company.name);
        $("#userCompanyPhrase").text(user.company.catchPhrase);
        $("#userCompanyBs").text(user.company.bs);
    });
    
    // Fazer requisição para a API para obter os ToDos do usuário
    $.get("https://jsonplaceholder.typicode.com/todos?userId=" + userId, function(todos) {
      todos.forEach(function(todo) {
          var divElement = $('<div id="todos-item"><strong>Título:</strong> ' + todo.title + "<br><strong>Status:</strong> " + (todo.completed ? "Completo" : "Incompleto") + "</div>");
          if (todo.completed) {
            divElement.css("background-color", "green"); // Altera a cor de fundo para verde
          }
          else
          {
            divElement.css("background-color", "red"); // Altera a cor de fundo para vermelho
          }
          $("#userTodos").append(divElement);
      });
    });
});