function Book(title, author, pages, readStatus) {
  this.id = crypto.randomUUID(); // generate a unique ID for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Creating Book objects
const drizzt_1 = new Book("Homeland", "R.A. Salvatore", 384, true);
const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const cradle_1 = new Book("Unsouled", "Will Wight", 384, true);
const Katabasis = new Book("Katabasis", "R.F.KuangR.", 567, false);

const library = [drizzt_1, hobbit, cradle_1, Katabasis];

// Render Library -------------------------------------------------------

function renderLibrary(list, book) {
  // Create HTML elements
  const bookCard = document.createElement("div");
  const cardTitle = document.createElement("h3");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardStatus = document.createElement("p");
  const cardBtnRead = document.createElement("button");
  const cardBtnDel = document.createElement("button");

  // Add HTML elements to DOM
  list.appendChild(bookCard);
  bookCard.appendChild(cardTitle);
  bookCard.appendChild(cardAuthor);
  bookCard.appendChild(cardPages);
  bookCard.appendChild(cardStatus);
  bookCard.appendChild(cardBtnRead);
  bookCard.appendChild(cardBtnDel);

  // Adding text to elements
  cardTitle.textContent = book.title;
  cardAuthor.textContent = "Author: " + book.author;
  cardPages.textContent = "Pages: " + book.pages;
  cardStatus.textContent = "Status: " + book.readStatus;
  cardBtnRead.textContent = "Toggle Read";
  cardBtnDel.textContent = "Delete Book";

  // Adding classes to elements
  bookCard.classList.add("book-card");
  cardStatus.classList.add("status");
  cardBtnRead.classList.add("btn-togRead");
  cardBtnDel.classList.add("btn-delBook");

  // Adding types to button elements
  cardBtnRead.type = "button";
  cardBtnDel.type = "button";

  // Adding an Identifier to each book in the DOM
  bookCard.id = book.id;
  cardBtnRead.dataset.id = book.id;
  cardBtnDel.dataset.id = book.id;

  // Adding classes to elements
  bookCard.classList.add("book-card");
  cardStatus.classList.add("status");
  cardBtnRead.classList.add("btn-togRead");
  cardBtnDel.classList.add("btn-delBook");
}

// const readingList = document.querySelector(".div-readingList");
// const colLibrary = document.querySelector(".div-collectionList");
const bookList = document.querySelector(".book-list");

function renderAllBooks() {
  library.forEach((book) => {
    renderLibrary(bookList, book);
  });
}

renderAllBooks();

// Button Functions ---------------------------------------------------------

document.querySelector("#refreshList").addEventListener("click", function () {
  console.log("refresh");
  bookList.innerHTML = "";
  renderAllBooks();
});

document.querySelectorAll(".btn-delBook").forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log("delete book");
  });
});

document.querySelector(".book-list").addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-togRead")) return;

  console.log(e.target.dataset.id);

  const book = library.find((item) => item.id === e.target.dataset.id);
  book.readStatus = !book.readStatus;
  clearBookList();
  renderAllBooks();
});

function clearBookList() {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
}
