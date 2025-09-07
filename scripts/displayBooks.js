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
    renderLibraryCards(book, readingList);
  } else {
    renderLibraryCards(book, collectionList);
  }
});
