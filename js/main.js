var picker = datepicker("#due-date");
picker.setMin(new Date());
window.onload;
{
    var addItemBtn = getById("add-item");
    addItemBtn.onclick = getToDoItem;
}
var ToDoItem = (function () {
    function ToDoItem(title, dueDate, isCompleted) {
        this.title = title;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }
    return ToDoItem;
}());
function getById(id) {
    return document.getElementById(id);
}
function isValid(title, dueDate) {
    var isValid = true;
    if (title.trim() == "") {
        displayError("title", "Title is Required");
        isValid = false;
    }
    if (dueDate.trim() == "") {
        displayError("due-date", "A due date is Required");
        isValid = false;
    }
    return isValid;
}
function displayError(errorType, errorMsg) {
    var error = getById(errorType).nextElementSibling;
    error.innerHTML = errorMsg;
}
function clearErrors() {
    displayError("title", "*");
    displayError("due-date", "*");
}
function getToDoItem() {
    clearErrors();
    var itemTitle = getById("title").value;
    var itemDueDate = getById("due-date").value;
    var itemCompleted = getById("is-complete").checked;
    if (isValid(itemTitle, itemDueDate)) {
        var item = new ToDoItem(itemTitle, itemDueDate, itemCompleted);
        displayToDoItem(item);
    }
}
function displayToDoItem(item) {
    var toDoList = getById("ToDo");
    var toDoItem = document.createElement("div");
    toDoList.appendChild(toDoItem);
    var toDoTitle = document.createElement("h1");
    toDoTitle.innerText = item.title;
    toDoItem.appendChild(toDoTitle);
    var toDoDueDate = document.createElement("p");
    toDoDueDate.innerText = "Due: " + item.dueDate;
    toDoItem.appendChild(toDoDueDate);
    if (item.isCompleted) {
        toDoItem.setAttribute("id", "isCompleted");
    }
    else {
        toDoItem.setAttribute("id", "notCompleted");
    }
}
