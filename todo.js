//tüm elementlerin seçimi
const form= document.querySelector("#todo-form");
const todoInput= document.querySelector("#todo");
const todoList= document.querySelector(".list-group");
const firstCardBody= document.querySelectorAll(".card-body")[0];
const secondCardBody= document.querySelectorAll(".card-body")[1];
const filter= document.querySelector("#filter");
const clearButton= document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){                                                                      //Tüm eventListenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
            const text=listItem.textContent.toLowerCase();
            if(text.indexOf(filterValue)===-1){
                listItem.setAttribute("style","display:none !important");
            }
            else{
                listItem.setAttribute("style","display:block");
            }
    });
}
function clearAllTodos(){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        // todoList.innerHTML=""                                                               //Yavaş yöntem-Proje büyük değilse kullanmalık
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Todo Başarıyla Silindi ")
    }
}
function deleteTodoFromStorage(deleteTodo){
    let todos=getTodosFromStorage();
    
    todos.forEach(function(todo,index){
        if (todo===deleteTodo) {
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos))

}
function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e){
  
    const newTodo=todoInput.value.trim();       
    if(newTodo===""){
        showAlert("danger","Todo yukleyin");
        }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo yüklendi")
    }      
    e.preventDefault();
}
function getTodosFromStorage(){ //storage'dan todoları alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos= getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){                                              //setTimeout methodu 
        alert.remove();
        },3000);                                                                  ///////1000milisaniye=1sn
}

function addTodoToUI(newTodo){                                             //string değerini list-item olarak UI'ya ekliycek
    const listItem=document.createElement("li");
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item"
    link.innerHTML="<i class = 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
}