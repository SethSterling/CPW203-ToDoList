// @ts-ignore: Ignoring issue with js-datepiker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

window.onload = function() {
    let addItemBtn = getById("add-item");
    addItemBtn.onclick = getToDoItem;
}

class ToDoItem {
    title:string;
    dueDate:String;
    isCompleted:boolean;

    constructor(title:string, dueDate:String, isCompleted:boolean){
        this.title = title;
        this.dueDate = dueDate;
        this.isCompleted = isCompleted;
    }
}
function getById(id:string) {
    return document.getElementById(id);
}

/**
 * Checks if the data is valid
 */
function isValid(title:string, dueDate:String):boolean {
    let isValid = true;
    if(title.trim() == ""){
        displayError("title", "Title is Required");
        isValid = false;
    }

    if(dueDate.trim() == ""){
        displayError("due-date", "A due date is Required");
        isValid = false;
    }
    
    return isValid;
}

/**
 * Displays an error message.
 * @param errorType The id of the HTML element
 * @param errorMsg The messeage that will be displayed
 */
function displayError(errorType:string, errorMsg:string) {
    let error = (<HTMLElement>getById(errorType)).nextElementSibling;
    error.innerHTML = errorMsg;
}

function clearErrors() {
    displayError("title", "*");
    displayError("due-date", "*");
}

/**
 * Creates ToDoItem object
 */
function getToDoItem() {
    clearErrors();
    let itemTitle = (<HTMLInputElement>getById("title")).value;
    let itemDueDate = (<HTMLInputElement>getById("due-date")).value
    let itemCompleted = (<HTMLInputElement>getById("is-complete")).checked

    if(isValid(itemTitle, itemDueDate)){
        let item = new ToDoItem(itemTitle, itemDueDate, itemCompleted);
        displayToDoItem(item);
    }   
}

/**
 * Displays the item that was created.
 * @param item 
 */
function displayToDoItem(item:ToDoItem):void {
    let toDoItem = document.createElement("div");

    let toDoTitle = document.createElement("h1");
    toDoTitle.innerText = item.title;
    toDoItem.appendChild(toDoTitle);

    let toDoDueDate = document.createElement("p");
    toDoDueDate.innerText = "Due: " + item.dueDate;
    toDoItem.appendChild(toDoDueDate);

    if(item.isCompleted){
        getById("is-completed").appendChild(toDoItem);
    }
    else{
        getById("not-completed").appendChild(toDoItem);
    }
}

// Task: Allow user to mark a ToDoItem as Completed