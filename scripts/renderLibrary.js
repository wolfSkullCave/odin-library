/**
 * renderLibrary.js
 * ----------------
 * Purpose:
 *  Loads an array of book objects from local storage (see library.js) and renders them to the DOM
 *  via the RenderLibrary object.
 */

const library = JSON.parse(localStorage.getItem("myBooks"));

const list_1 = document.querySelector(".div-readingList");
const list_2 = document.querySelector(".div-collectionList");

function RenderLibrary(list) {
  this.list = list;
}

RenderLibrary.prototype.renderList = function () {
  // Create HTML elements
  this.bookCard = document.createElement("div");
  this.cardTitle = document.createElement("h3");
  this.cardAuthor = document.createElement("p");
  this.cardPages = document.createElement("p");
  this.cardStatus = document.createElement("p");
  this.cardBtnRead = document.createElement("button");
  this.cardBtnDel = document.createElement("button");

  // Add HTML elements to DOM
  this.list.appendChild(this.bookCard);
  this.bookCard.appendChild(this.cardTitle);
  this.bookCard.appendChild(this.cardAuthor);
  this.bookCard.appendChild(this.cardPages);
  this.bookCard.appendChild(this.cardStatus);
  this.bookCard.appendChild(this.cardBtnRead);
  this.bookCard.appendChild(this.cardBtnDel);
};

RenderLibrary.prototype.renderBooks = function (book) {
  this.book = book;

  // Adding text to elements
  this.cardTitle.textContent = this.book.title;
  this.cardAuthor.textContent = "Author: " + this.book.author;
  this.cardPages.textContent = "Pages: " + this.book.pages;
  this.cardStatus.textContent = "Status: " + this.book.readStatus;
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

library.forEach((book) => {
  if (!book.readStatus) {
    const readingList = new RenderLibrary(list_1);
    readingList.renderList();
    readingList.renderBooks(book);
  } else {
    const collectionList = new RenderLibrary(list_2);
    collectionList.renderList();
    collectionList.renderBooks(book);
  }
});
