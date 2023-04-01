let todoItemsContainer = document.getElementById("todoItemsContainer");
let todoUserInput = document.getElementById("todoUserInput");
let addtodobutton = document.getElementById("addtodobutton");
let savetodobutton = document.getElementById("savetodobutton");
let deletetodobutton = document.getElementById("deletetodobutton");

let current_id = 0;

todoUserInput.placeholder = "What needs to be done?"

let todoList = [];

todoList = JSON.parse(localStorage.getItem("Todos"));

current_id = JSON.parse(localStorage.getItem("curr_id"));
if(todoList === null)
todoList = [];

if(current_id===null)
current_id = 0;

function createAndAppendTodo(todoItem){
    let todoItemContainerEl = document.createElement("li");
    todoItemContainerEl.classList.add("todo-item-container");
    todoItemsContainer.appendChild(todoItemContainerEl);

    let checkBoxInputEl = document.createElement("input");
    checkBoxInputEl.classList.add("checkbox-input");
    checkBoxInputEl.type = "checkbox";
    checkBoxInputEl.id = todoItem.id;
    if(todoItem.status===true){
        checkBoxInputEl.checked = true;
    }
    todoItemContainerEl.appendChild(checkBoxInputEl);

    let labelContainerEl = document.createElement("div");
    labelContainerEl.classList.add("label-container", "d-flex", "flex-row", "justify-content-space-between");
    todoItemContainerEl.appendChild(labelContainerEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("checkbox-label");
    if(todoItem.status===true){
        labelEl.classList.add("checked");
    }
    labelEl.textContent = todoItem.text;
    labelEl.setAttribute("for", todoItem.id);
    labelContainerEl.appendChild(labelEl);
    
    

    checkBoxInputEl.onclick = function (){
        labelEl.classList.toggle("checked");
        index = todoList.findIndex(function(todo){
           return todo.id === todoItem.id;
        })
        todoList[index].status = !(todoList[index].status);
    };

    let deleteContainerEl = document.createElement("div");
    deleteContainerEl.classList.add("delete-icon-container", "delete-icon");
    labelContainerEl.appendChild(deleteContainerEl);

    let deleteEl = document.createElement("img");
    deleteEl.src = "./images/trash.svg";
    deleteContainerEl.appendChild(deleteEl);

    deleteEl.onclick = function(){
        todoItemsContainer.removeChild(todoItemContainerEl);
        index = todoList.findIndex(function(todo){
           return todo.id === todoItem.id;
        })
        todoList.splice(index, 1);
    }
}

for(let todoItem of todoList){
    createAndAppendTodo(todoItem);
}


addtodobutton.onclick = function (){
    if(todoUserInput.value === ""){
        alert("Enter task name");
    }

    else{
        let task = {
        text: todoUserInput.value,
        status: false,
        id: current_id
    }

    todoList.push(task);

    current_id++;

    createAndAppendTodo(task);
    
    }
    
}

savetodobutton.onclick = function(){
    if(todoList.length===0)
    current_id = 0;

    localStorage.setItem("Todos", JSON.stringify(todoList));
    localStorage.setItem("curr_id", JSON.stringify(current_id));
} 

deletetodobutton.onclick = function(){
    
    localStorage.removeItem("Todos");
    localStorage.removeItem("curr_id");
}