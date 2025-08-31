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

// Select the table body element where book rows will be added
const tbody = document.querySelector("#bookDetails");

// Loop through each book in the library and add a row to the table
myLibrary.forEach((book) => {
  // Create a new table row for the current book
  const row = document.createElement("tr");
  // Iterate over each property of the book object
  Object.entries(book).forEach(([key, value]) => {
    // Skip the 'id' property since it's not displayed in the table
    if (key !== "id") {
      // Create a table cell for the current property
      const td = document.createElement("td");
      // If the property is 'hasRead', display 'read' or 'unread' and add a class
      if (key === "hasRead") {
        td.textContent = value ? "read" : "unread";
        td.classList.add(value ? "read" : "unread");
      } else {
        // For other properties, just display the value
        td.textContent = value;
      }
      // Append the table cell to the row
      row.appendChild(td);
    }
  });
  // Append the row to the table body
  tbody.appendChild(row);
});
