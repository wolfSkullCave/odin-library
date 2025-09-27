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
const Katabasis = new Book("Katabasis", "R.F.Kuang R.", 567, false);

const library = [drizzt_1, hobbit, cradle_1, Katabasis];

// Render Library -------------------------------------------------------

function renderLibrary(list, book) {
  // Create HTML elements
  const bookCard = document.createElement("div");
  const cardTitle = document.createElement("h3");
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardStatus = document.createElement("span");
  const cardBtnRead = document.createElement("button");
  const cardBtnDel = document.createElement("button");

  // Add HTML elements to DOM
  list.appendChild(bookCard);
  bookCard.appendChild(cardTitle);
  bookCard.appendChild(cardAuthor);
  bookCard.appendChild(cardPages);
  bookCard.appendChild(cardBtnRead);
  bookCard.appendChild(cardBtnDel);

  // Adding text to elements
  cardTitle.textContent = book.title;
  cardAuthor.textContent = "by " + book.author;
  cardPages.textContent = book.pages + " pages";
  cardBtnDel.textContent = "Delete Book";

  if (book.readStatus === true) {
    cardBtnRead.textContent = "Read";
    cardBtnRead.classList.add("bookRead");
  } else {
    cardBtnRead.textContent = "Unread";
    cardBtnRead.classList.add("bookUnread");
  }

  // Adding classes to elements
  bookCard.classList.add("book-card");
  cardBtnRead.classList.add("btn-togRead");
  cardBtnDel.classList.add("btn-ghost");
  cardBtnDel.classList.add("btn-delBook");
  cardAuthor.classList.add("author");

  // Adding types to button elements
  cardBtnRead.type = "button";
  cardBtnDel.type = "button";

  // Adding an Identifier to each book in the DOM
  bookCard.id = book.id;
  cardBtnRead.dataset.id = book.id;
  cardBtnDel.dataset.id = book.id;
}

const bookList = document.querySelector(".book-list");

function renderAllBooks() {
  clearBookList();
  library.forEach((book) => {
    renderLibrary(bookList, book);
  });
}

renderAllBooks();

// Button Functions ---------------------------------------------------------

document.querySelector("#refreshList").addEventListener("click", function () {
  bookList.innerHTML = "";
  renderAllBooks();
});

document.querySelector(".book-list").addEventListener("click", (e) => {
  const book = library.find((item) => item.id === e.target.dataset.id);

  if (e.target.classList.contains("btn-togRead")) {
    // Toggle read status
    book.readStatus = !book.readStatus;
    renderAllBooks();
  }

  if (e.target.classList.contains("btn-delBook")) {
    // Delete a book from the array
    const index = library.findIndex((b) => b.id === e.target.dataset.id);
    library.splice(index, 1);
    renderAllBooks();
  }
});

function clearBookList() {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
}


// Add new book form ----------------------------------------------------------------

document.getElementById("newBookForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.querySelector('input[name="read"]:checked').value;

  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
  renderAllBooks();
});
