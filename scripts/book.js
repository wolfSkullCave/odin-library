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
addBookToLibrary("Unsouled", "Will Wight", 384, true);

// experimental book render

function BookList(book, list) {
  this.book = book;
  this.list = list;
}

BookList.prototype.renderCard = function () {
  this.bookCard = document.createElement("div");
  this.cardTitle = document.createElement("h3");
  this.cardAuthor = document.createElement("p");
  this.cardPages = document.createElement("p");
  this.cardStatus = document.createElement("p");
  this.cardBtnRead = document.createElement("button");
  this.cardBtnDel = document.createElement("button");

  this.list.appendChild(this.bookCard);
  this.bookCard.appendChild(this.cardTitle);
  this.bookCard.appendChild(this.cardAuthor);
  this.bookCard.appendChild(this.cardPages);
  this.bookCard.appendChild(this.cardStatus);
  this.bookCard.appendChild(this.cardBtnRead);
  this.bookCard.appendChild(this.cardBtnDel);
};

BookList.prototype.renderBook = function () {
  this.cardTitle.textContent = this.book.title;
  this.cardAuthor.textContent = "Author: " + this.book.author;
  this.cardPages.textContent = "Pages: " + this.book.pages;
  this.cardStatus.textContent = "Status: " + this.book.hasRead;
  this.cardBtnRead.textContent = "Toggle Read";
  this.cardBtnDel.textContent = "Delete Book";

  // Adding classes to elements
  this.bookCard.classList.add("book-card");
  this.cardStatus.classList.add("status");
  this.cardBtnRead.classList.add("btn-togRead");
  this.cardBtnDel.classList.add("btn-delBook");

  // Adding types to button elements
  this.cardBtnRead.type = "button";
  this.cardBtnDel.type = "button";

  // Adding an Identifier to each book in the DOM
  this.bookCard.id = this.book.id;
  this.cardBtnRead.dataset.id = this.book.id;
  this.cardBtnDel.dataset.id = this.book.id;
};



const myReadingList = document.querySelector(".div-readingList");
const myBookCollection = document.querySelector(".div-bookCollection");

myLibrary.forEach((book) => {
  if (book.hasRead === true) {
    const readingList = new BookList(book, myReadingList);
    readingList.renderCard();
    readingList.renderBook();
  } else {
    const bookCollection = new BookList(book, myBookCollection);
    bookCollection.renderCard();
    bookCollection.renderBook();
  }
});

// Render books to web page

function toggleReadStatus(id) {
  // Toggle the read status of books
  const bookId = id.dataset.id;
  const book = myLibrary.find((b) => b.id === bookId);
  book.toggleRead();
}

function renderLibraryCards(book, list) {
  // This function Creates a layout card for a book item from
  // the myLibrary array

  // Getting references for elements
  const bookList = list;
  const bookCard = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const status = document.createElement("p");
  const btnRead = document.createElement("button");
  const btnDel = document.createElement("button");

  // Adding text content to elements
  title.textContent = book.title;
  author.textContent = "Author: " + book.author;
  pages.textContent = "Pages: " + book.noPages;
  status.textContent = "Status: " + book.hasRead;
  btnRead.textContent = "Toggle Read";
  btnDel.textContent = "Delete";

  // Adding elements to web page DOM
  bookList.appendChild(bookCard);
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(status);
  bookCard.appendChild(btnRead);
  bookCard.appendChild(btnDel);

  // Adding classes to elements
  bookCard.classList.add("book-card");
  status.classList.add("status");
  btnRead.classList.add("btn-togRead");
  btnDel.classList.add("btn-delBook");

  // Adding types to button elements
  btnRead.type = "button";
  btnDel.type = "button";

  // Adding an Identifier to each book in the DOM
  bookCard.id = book.id;
  btnRead.dataset.id = book.id;
  btnDel.dataset.id = book.id;

  // Add functions to buttons
  btnRead.addEventListener("click", function () {
    const bookId = this.dataset.id;
    const book = myLibrary.find((b) => b.id === bookId);

    book.toggleRead();

    // Update DOM
    const statusElem = this.parentElement.querySelector(".status");
    statusElem.textContent = "Status: " + book.hasRead;
  });

  btnDel.addEventListener("click", function () {
    const bookId = this.dataset.id;
    const index = myLibrary.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      myLibrary.splice(index, 1);
    }

    // Update DOM
    document.querySelector(`#${CSS.escape(bookId)}`).remove();
  });
}

// Render books to a list
const readingList = document.querySelector(".book-list");
const collectionList = document.querySelector(".div-bookCollection");

myLibrary.forEach((book) => {
  if (book.hasRead === true) {
    // renderLibraryCards(book, readingList);
  } else {
    // renderLibraryCards(book, collectionList);
  }
});

// Adding new books to the array

function parseBool(str) {
  // Converts booleans into strings
  return String(str).toLowerCase() === "true";
}

function clearBookList() {
  document.querySelector(".book-list").innerHTML = "";
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

    // Render new book to web page
    clearBookList();
    // renderLibraryCards();
    myLibrary.forEach((book) => {
      renderLibraryCards(book);
    });

    // Clear form
    newBookForm.reset();
  });
}
