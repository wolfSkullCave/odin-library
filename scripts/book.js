// Array to store all book objects
const myLibrary = [];

// Constructor function for creating a new Book object
function Book(title, author, noPages, hasRead) {
  // Generate a unique ID for each book
  this.id = crypto.randomUUID();
  // Set book properties
  this.title = title;
  this.author = author;
  this.noPages = noPages;
  this.hasRead = hasRead;
}

// Prototype method to toggle the read status of a book
Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

// Function to create a Book object and add it to the library array
function addBookToLibrary(title, author, noPages, hasRead) {
  // Create a Book object and add it to myLibrary
  const newBook = new Book(title, author, noPages, hasRead);
  myLibrary.push(newBook);
}

// Help text for addBookToLibrary function
addBookToLibrary.info =
  "addBookToLibrary(title, author, noPages, hasRead): Adds a new book to the library.\nParameters:\n- title (string): The book's title\n- author (string): The book's author\n- noPages (number): Number of pages\n- hasRead (boolean): Read status";

addBookToLibrary.prototype.info = function () {
  return "Title, author, number of pages, read status";
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);

// Initial render

function renderLibraryCards() {
  const bookList = document.querySelector(".book-list");

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");

    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const status = document.createElement("p");
    const btnRead = document.createElement("button");
    const btnDel = document.createElement("button");

    title.textContent = book.title;
    author.textContent = "Author: " + book.author;
    pages.textContent = "Pages: " + book.noPages;
    status.textContent = "Status: " + book.hasRead;
    btnRead.textContent = "Toggle Read";
    btnDel.textContent = "Delete";

    bookList.appendChild(bookCard);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(status);
    bookCard.appendChild(btnRead);
    bookCard.appendChild(btnDel);

    bookCard.classList.add("book-card");
    btnRead.classList.add("toggle-read");
    btnDel.classList.add("delete-book");

    btnRead.type = "button";
    btnDel.type = "button";
  });
}

renderLibraryCards();

// Adding a book via the new book form

function parseBool(str) {
  return String(str).toLowerCase() === "true";
}

const newBookForm = document.getElementById("bookForm");

if (newBookForm) {
  newBookForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload
    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readStatus = document.querySelector(
      'input[name="read"]:checked'
    ).value;
    // Add book to library
    addBookToLibrary(title, author, pages, parseBool(readStatus));
    // Update the book table
    renderLibraryCards();
    // Clear form
    newBookForm.reset();
  });
}
