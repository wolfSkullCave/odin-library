/* script.js
Book
- Stores properties for a book objects
*/

class Book {
  constructor(title, author, pages, readStatus) {
    this.id = crypto.randomUUID(); // generate a unique ID for each book
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

// Render Library -------------------------------------------------------

class Library {
  constructor(books, divList) {
    this.books = books;
    this.divList = divList;
  }

  render() {
    this.books.map((book) => {
      // Create HTML elements
      const bookCard = document.createElement("div");
      const cardTitle = document.createElement("h3");
      const cardAuthor = document.createElement("p");
      const cardPages = document.createElement("p");
      const cardStatus = document.createElement("span");
      const cardBtnRead = document.createElement("button");
      const cardBtnDel = document.createElement("button");

      // Add HTML elements to DOM
      this.divList.appendChild(bookCard);
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
    });
  }

  

  clear() {
    while (this.divList.firstChild) {
      this.divList.removeChild(this.divList.firstChild);
    }
  }

  listTitles() {
    return this.books.map((book) => book.title);
  }
}

// Creating Book objects
const drizzt_1 = new Book("Homeland", "R.A. Salvatore", 384, true);
const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 310, true);
const cradle_1 = new Book("Unsouled", "Will Wight", 384, true);
const Katabasis = new Book("Katabasis", "R.F.Kuang R.", 567, false);
const divList = document.querySelector(".book-list");

const myLib = new Library([drizzt_1, hobbit, cradle_1, Katabasis], divList);

// tests
console.log(myLib.listTitles());
myLib.render();
