var picker = datepicker("#due-date");
picker.setMin(new Date());
window.onload = function () {
    var addItemBtn = getById("add-item");
    addItemBtn.onclick = getToDo;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    if (itemArray != null) {
        for (var i = 0; i < itemArray.length; i++) {
            displayToDoItem(itemArray[i]);
        }
    }
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
function getToDo() {
    clearErrors();
    var itemTitle = getById("title").value;
    var itemDueDate = getById("due-date").value;
    var itemCompleted = getById("is-complete").checked;
    if (isValid(itemTitle, itemDueDate)) {
        var item = new ToDoItem(itemTitle, itemDueDate, itemCompleted);
        displayToDoItem(item);
        saveToDo(item);
    }
}
function displayToDoItem(item) {
    var toDoItem = document.createElement("div");
    toDoItem.setAttribute("class", "todo");
    var toDoTitle = document.createElement("h3");
    toDoTitle.innerText = item.title;
    toDoItem.appendChild(toDoTitle);
    var toDoDueDate = document.createElement("p");
    toDoDueDate.innerText = "Due: " + item.dueDate;
    toDoItem.appendChild(toDoDueDate);
    if (item.isCompleted) {
        getById("is-completed").appendChild(toDoItem);
    }
    else {
        getById("not-completed").appendChild(toDoItem);
        toDoItem.onclick = markAsComplete;
    }
}
function markAsComplete() {
    getById("is-completed").appendChild(this);
    this.isCompleted = true;
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
var todokey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
