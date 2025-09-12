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

  bindEvents() {
    this.container.addEventListener('click', e => {
      if (e.target.matches('.delete-book')) {
        const idx = parseInt(e.target.dataset.index, 10);
        this.deleteBook(idx);
        
        // ← Call renderBook here
        this.renderBook(this.books[idx], idx);
      }
    });
  }