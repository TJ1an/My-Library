const addbook = document.getElementById("add-book")
const popupWindow = document.getElementById("popup-window");
const closeButton = document.getElementById("close-button");
const overlay = document.getElementById("overlay")
const submitbtn = document.querySelector(".submitbtn")
const libraryGrid = document.querySelector(".library-grid");
const errorMessage = document.getElementById("error-message")
const myLibrary = JSON.parse(localStorage.getItem('books')) || [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    localStorage.setItem('books', JSON.stringify(myLibrary));
}

function displayBooks() {
    libraryGrid.innerHTML = ''; // Clear the existing content
    const books = JSON.parse(localStorage.getItem('books'))
    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        // Display book information
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.isRead ? 'Yes' : 'No'}</p>
            <button data-index="${index}" class="remove-book">Remove</button>
            <button data-index="${index}" class="toggle-read-status">Toggle Read Status</button>
        `;

        libraryGrid.append(bookCard);
    });
}

libraryGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("toggle-read-status")) {
        const index = event.target.getAttribute("data-index");
        myLibrary[index].isRead = !myLibrary[index].isRead; // Toggle the read status
        localStorage.setItem('books', JSON.stringify(myLibrary))
        displayBooks(); // Update the displayed books
    }
});

libraryGrid.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-book")) {
        const index = event.target.getAttribute("data-index");
        myLibrary.splice(index, 1); // Remove the book from the library array
        localStorage.setItem('books', JSON.stringify(myLibrary))
        displayBooks(); // Update the displayed books
    }
});


submitbtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const isRead = document.getElementById("isRead").checked;

    if (!title || !author || isNaN(pages) || pages <= 0) {
        // Display an error message if any of the form fields are empty or invalid
        errorMessage.textContent = "Please fill in all fields";
        return; // Exit the function and prevent further execution
    }

    addBookToLibrary(title, author, pages, isRead);

    // Clear the form and close the popup
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("isRead").checked = false;
    errorMessage.textContent = "";

    displayBooks(); // Update the displayed books
    popupWindow.style.display = "none";
    overlay.style.display = "none";
});

addbook.addEventListener("click", () =>{
    event.preventDefault();
    popupWindow.style.display = "block";
    overlay.style.display = "block";
})

overlay.addEventListener("click", () => {
    popupWindow.style.display = "none";
    overlay.style.display = "none";
    errorMessage.textContent = "";
})

displayBooks();
console.log(myLibrary)