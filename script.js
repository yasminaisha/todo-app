var list = document.getElementById("todos-list");
var addBtn = document.getElementById("todo-add-btn");
var addInput = document.getElementById("todo-input");

function createTodo() {

    var text = addInput.value;

    if (text === "") {
        return;
    }

    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";

    var paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.textContent = text;

    var remove = document.createElement("span");
    remove.classList.add("remove");
    remove.innerHTML = "&cross;";

    li.appendChild(checkbox);
    li.appendChild(paragraph);
    li.appendChild(remove);
    list.appendChild(li);

    addInput.value = "";
}

function showEditInput(paragraphElement) {
    var editInput = document.getElementsByName("editInput")[0];
    if (editInput) {
        editInput.remove();
    }

    var input = document.createElement("input");
    input.type = "text";
    input.name = "editInput";
    input.value = paragraphElement.textContent;
    input.classList.add("editInput");

    paragraphElement.parentElement.appendChild(input);
    input.focus();
}

function updateTodo() {
    var editInput = document.getElementsByName("editInput")[0];
    if (!editInput) {
        return;
    }

    var newText = editInput.value;

    if (newText !== "") {
        var paragraph = editInput.parentElement.querySelector(".paragraph");
        paragraph.textContent = newText;
    }

    editInput.remove();
}

function removeTodo(removeElement) {
    removeElement.parentElement.remove();
}

function toggleComplete(inputElement) {
    if (inputElement.checked === false) {
        inputElement.parentElement.classList.remove("complete");
    } else {
        inputElement.parentElement.classList.add("complete");
    }
}

list.addEventListener("click", function (event){

    event.stopPropagation();

    switch (event.target.tagName) {
        case "p":
            showEditInput(event.target);
            break;
        case "SPAN":
            removeTodo(event.target);
            break;    
    }
});

list.addEventListener("change", function (event) {
    if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
        toggleComplete(event.target);
    }
});

list.addEventListener("keypress", function (event) {
    if (event.target.tagName === "INPUT" && event.target.type === "text" && event.key === "Enter") {
        updateTodo();
    }
});

document.addEventListener("click", updateTodo);

addBtn.addEventListener("click", function (event){
    event.stopPropagation();
    createTodo();
});

addInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        createTodo();
    }
});
