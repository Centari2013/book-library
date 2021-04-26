//Library Display and Data Storage
const bookDisplay = document.querySelector("#book-display");
let myLibrary = [];
const Book = (title, author, pages, readStatus, position) => {
    const info = function() {
        let read = (readStatus) ? "read" : "not read yet";
        return `${title}\n\nAuthor: ${author}\nPages: ${pages}\nRead Status: ${read}`;
    }
    const toggleReadStatus = function() {
        readStatus = (readStatus) ? false: true;
    }

    return {title, author, pages, readStatus, position, info, toggleReadStatus};
}

function addBookToLibrary(title, author, pages, readStatus) {
    let position = myLibrary.length;
    let book = Book(title, author, pages, readStatus, position);
    myLibrary.push(book);
}

function removeBookFromLibrary(position) {
    myLibrary.splice(parseInt(position), 1);
    for (let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        if (position < book.position){
            let bookDiv = document.querySelector(`[data-index="${i}"]`);
            book.position--;
            bookDiv.id = bookDiv.position;
        }
    }
    clearBookDisplay();
    displayLibrary();
} 

//displays books and buttons for removing them and toggling their readStatus
function displayLibrary() {
    myLibrary.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card");
        bookDiv.setAttribute("data-index", book.position);
        bookDiv.textContent = book.info();

        //sets book remove button
        let removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "Delete";
        removeBookBtn.type = "button";
        removeBookBtn.classList.add("remove-book-btn");
        removeBookBtn.addEventListener("click", function () {
            removeBookFromLibrary(bookDiv.getAttribute("data-index"));
        })

        //sets readStatus toggle button
        let readStatusToggle = document.createElement("button");
        readStatusToggle.textContent = "Read Status";
        readStatusToggle.type = "button";
        readStatusToggle.classList.add("status-toggle-btn")
        readStatusToggle.addEventListener("click", function () {
            book.toggleReadStatus();
            clearBookDisplay();
            displayLibrary();
        })
        
        bookDiv.appendChild(readStatusToggle);
        bookDiv.appendChild(removeBookBtn);
        bookDisplay.appendChild(bookDiv);
    })
}

function clearBookDisplay() {
    while(bookDisplay.firstChild){
        bookDisplay.removeChild(bookDisplay.firstChild);
    }
}

//HTML Add Book Form Functionality
const newBookBtn = document.querySelector("#open-popup");
const addBookForm = document.querySelector("#add-book-form");
const bookSubmitBtn = document.querySelector("#book-submit");
const bookCancelBtn = document.querySelector("#book-cancel");

newBookBtn.addEventListener("click", function (){
    openPopup(addBookForm);
});

bookSubmitBtn.addEventListener("click", function (){
    getBookFormData();
});

bookCancelBtn.addEventListener("click", function (){
    closePopup(addBookForm);
});

function openPopup(popup) {
    popup.style.display = "grid";
}

function closePopup(popup) {
    popup.style.display = "none";
}

function getBookFormData() {
    const title = document.querySelector('[name="title"]').value;
    const author = document.querySelector('[name="author"]').value;
    const pages = document.querySelector('[name="pages"]').value;
    const readStatus = document.querySelectorAll('[name="read-status"]');
 
    for (let i = 0; i < readStatus.length; i++) {
        read = (readStatus[i].checked && readStatus[i].value == "true") ? true : false;
    }

    if (validateBookSubmit(title, author, pages, read)) {
        addBookToLibrary(title, author, pages, read);
        closePopup(addBookForm);
        clearBookDisplay();
        displayLibrary();
        console.log("SUCCESS: ", title, author, pages, read)
    }else{
        console.log("ERROR ", title, author, pages, read)
    }
}

//keeps form data from submitting when field is empty
function validateBookSubmit(title, author, pages, read) {
    let args = Array.from(arguments);
    for (let i = 0; i < args.length - 1; i++){
        if (args[i] == ""){
            return false;
        }
    }
    if (!typeof read === "boolean"){
        return false;
    }
    return true;
}

//Library Display Tests
addBookToLibrary("Test Book", "Zaria S. Burton", 0, false);
displayLibrary();
