// @ts-ignore: Ignoring issue with js-datepiker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // Set to today's date

window.onload = function() {
    let addItemBtn = getById("add-item");
    addItemBtn.onclick = getToDo;

    //Loads saved item
    loadSavedItems();
}

function loadSavedItems() {
    let itemArray = getToDoItems();
    if(itemArray != null){
        for(let i = 0; i < itemArray.length; i++){
            displayToDoItem(itemArray[i]);
        }
    }
}

class ToDoItem {
    id:number;
    title:string;
    dueDate:string;
    isCompleted:boolean;

    constructor(id:number, title:string, dueDate:string, isCompleted:boolean){
        this.id = id;
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
function getToDo() {
    clearErrors();
    let itemId = generateRandomNumber();
    let itemTitle = (<HTMLInputElement>getById("title")).value;
    let itemDueDate = (<HTMLInputElement>getById("due-date")).value
    let itemCompleted = (<HTMLInputElement>getById("is-complete")).checked

    if(isValid(itemTitle, itemDueDate)){
        let item = new ToDoItem(itemId, itemTitle, itemDueDate, itemCompleted);
        displayToDoItem(item);
        saveToDo(item);
    }   
}

function generateRandomNumber(){
    return Math.floor(Math.random() * 999999);
}

/**
 * Displays the item that was created.
 * @param item 
 */
function displayToDoItem(item:ToDoItem):void {
    let toDoItem = document.createElement("div")
    toDoItem.setAttribute("class", "todo")
    toDoItem.setAttribute("id", item.id.toString())

    let toDoTitle = document.createElement("h3");
    toDoTitle.innerText = item.title;
    toDoItem.appendChild(toDoTitle);

    let toDoDueDate = document.createElement("p");
    toDoDueDate.innerText = "Due: " + item.dueDate;
    toDoItem.appendChild(toDoDueDate);

    //If it is complete
    if(item.isCompleted){
        getById("is-completed").appendChild(toDoItem);
    }
    //If it isn't complete
    else{
        getById("not-completed").appendChild(toDoItem);
        toDoItem.onclick = markAsComplete;
    }
}

function markAsComplete() {
    //Adds the div that was clicked to the "is-completed" div 
    getById("is-completed").appendChild(this);
    let clickedItem = GetClickedItem(this);
    updateItems(clickedItem);
    //Removes the div that was clicked to the "is-completed" div 
    //getById("not-completed").removeChild(this);
}

function saveToDo(item:ToDoItem):void{
    let currItems = getToDoItems();
    if(currItems == null){
        currItems = new Array();
    }
    currItems.push(item);

    sendToLocalStroage(currItems);
}

const todokey = "todo"
function sendToLocalStroage(currItems: ToDoItem[]) {
    let currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}

/**
 * Get stored ToDo items or return null if none exist
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);

    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

/**
 * Updates the ToDoItem array in Locol Storage
 * @param item The Item that will be updated
 */
function updateItems(item:ToDoItem) {
    //Get the ToDoItem Array out of local storage
    let itemArray:ToDoItem[] = getToDoItems();

    for(let i = 0; i < itemArray.length; i++){
        if(item.id == (itemArray[i].id)){
            itemArray[i].isCompleted = true;
        }
        console.log(itemArray[i]);
    }
    sendToLocalStroage(itemArray);
}

/**
 * Finds and retrieves the todo item that was clicked
 * @param itemDiv 
 */
function GetClickedItem(itemDiv:HTMLElement):ToDoItem {
    let itemArray:ToDoItem[] = getToDoItems();
    for (let i = 0; i < itemArray.length; i++) {
        if(itemDiv.getAttribute("id") == itemArray[i].id.toString()){
            return itemArray[i];
        }
    }
}