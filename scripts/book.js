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
console.log(myLibrary);

// Build and fill out the table with data from myLibrary array

// Function to render the library table
function renderLibraryTable() {
  const tbody = document.querySelector("#bookDetails");
  // Clear existing rows
  tbody.innerHTML = "";
  // Loop through each book in the library and add a row to the table
  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    Object.entries(book).forEach(([key, value]) => {
      if (key !== "id") {
        const td = document.createElement("td");
        if (key === "hasRead") {
          td.textContent = value ? "read" : "unread";
          td.classList.add(value ? "read" : "unread");
        } else {
          td.textContent = value;
        }
        row.appendChild(td);
      }
    });
    tbody.appendChild(row);
  });
}

// Initial render
renderLibraryTable();

function parseBool(str) {
  return String(str).toLowerCase() === "true";
}

// Adding a book via the new book form
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
    renderLibraryTable();
    // Clear form
    newBookForm.reset();
  });
}
