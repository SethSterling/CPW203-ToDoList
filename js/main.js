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
    function ToDoItem(id, title, dueDate, isCompleted) {
        this.id = id;
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
        displayError("title", "Required");
        isValid = false;
    }
    if (dueDate.trim() == "") {
        displayError("due-date", "Required");
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
    var itemId = generateRandomNumber();
    var itemTitle = getById("title").value;
    var itemDueDate = getById("due-date").value;
    var itemCompleted = getById("is-complete").checked;
    if (isValid(itemTitle, itemDueDate)) {
        var item = new ToDoItem(itemId, itemTitle, itemDueDate, itemCompleted);
        displayToDoItem(item);
        saveToDo(item);
    }
}
function generateRandomNumber() {
    return Math.floor(Math.random() * 999999);
}
function displayToDoItem(item) {
    var toDoItem = document.createElement("div");
    toDoItem.setAttribute("class", "todo");
    toDoItem.setAttribute("id", item.id.toString());
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
    var clickedItem = GetClickedItem(this);
    updateItems(clickedItem);
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    sendToLocalStroage(currItems);
}
var todokey = "todo";
function sendToLocalStroage(currItems) {
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
function updateItems(item) {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        if (item.id == (itemArray[i].id)) {
            itemArray[i].isCompleted = true;
        }
        console.log(itemArray[i]);
    }
    sendToLocalStroage(itemArray);
}
function GetClickedItem(itemDiv) {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        if (itemDiv.getAttribute("id") == itemArray[i].id.toString()) {
            return itemArray[i];
        }
    }
}
