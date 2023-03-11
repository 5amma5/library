let myLibrary = [];


function toggleForm() {
  const form = document.getElementById('book-form');
  const buttonText = document.getElementById('show-form');
  
  if (buttonText.textContent == "Add a New Book"){
    form.classList.add('viewable');
    buttonText.innerHTML = "Hide Form";
  } else {
    form.classList.remove('viewable');
    buttonText.innerHTML = "Add a New Book";
  }
}

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function() {
  if (this.read) {
    return `${this.title} by ${this.author}, ${this.pages} pages, has been read`
  } else {
    return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
  }
}

Book.prototype.toggleRead = function() {
  if (this.read === true) {
    this.read = false;
  } else {
    this.read = true;
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const dune = new Book('Dune', 'Frank Herbert', 412, true);
myLibrary.push(theHobbit);
myLibrary.push(dune);

function addBookToLibrary(form) {
  //get user input
  const title = form.title.value;
  const author = form.author.value;
  const pages = form.pages.value;
  const read = form.read.value;

  // create book object from user input
  const newBook = new Book(title, author, pages, read)

  // push book object into myLibrary
  myLibrary.push(newBook);

  displayBooks();
  form.reset();
}

function displayBooks() {
  const cardsEle = document.getElementById('cards');
  cardsEle.innerHTML = "";
  
  // loop through myLibrary
  console.log("Now looping through myLibrary array:");
  let i = 0;
  while (i < myLibrary.length) {
    const book = myLibrary[i]

    // create card container and elements for each book attribute
    const cardEle = document.createElement('div');
    const bookEle = document.createElement('div');
    const authorEle = document.createElement('div');
    const pagesEle = document.createElement('div');
    const readEle = document.createElement('div');
  
    // set the text for each book attribute
    bookEle.innerHTML = `Book Title: ${book.title}`;
    authorEle.innerHTML = `Author: ${book.author}`;
    pagesEle.innerHTML = `Pages: ${book.pages}`;
    readEle.innerHTML = `Read: ${book.read}`;
  
    // create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'Delete Book';
    deleteBtn.dataset.idx = i;
    deleteBtn.addEventListener("click", () => deleteBook(deleteBtn.dataset.idx));


    // create a toggle button for read books
    const readBtn = document.createElement('button');
    readBtn.className = 'read-btn';
    readBtn.innerText = 'Toggle Read';
    readBtn.addEventListener('click', () => {
      book.toggleRead();
      readEle.innerHTML = `Read: ${book.read}`;
    });

    // append created elements to the card and then to the main cards container
    cardEle.appendChild(bookEle);
    cardEle.appendChild(authorEle);
    cardEle.appendChild(pagesEle);
    cardEle.appendChild(readEle);
    cardEle.appendChild(readBtn);
    cardEle.appendChild(deleteBtn);

    // cardEle.setAttribute('data-idx', i);
    cardsEle.appendChild(cardEle);
    cardsEle.appendChild(document.createElement('br'));
    
    i++;
  }
}

function deleteBook(idx) {
  myLibrary.splice(Number(idx), 1);
  displayBooks();
}

// function toggleRead() {
//   if (this.textContent == 'Mark Book as Unread') {
//     this.textContent = 'Mark Book as Read';
//     myLibrary[this.value].read = false;
//   } else {
//     this.textContent = 'Mark Book as Unread';
//     myLibrary[this.value].read = true;
//   }
//   displayBooks();
// }

// function displayBook(book) {
//   const cardsEle = document.getElementById('cards');
//   const cardEle = document.createElement('div');
//   const bookEle = document.createElement('div');
//   const authorEle = document.createElement('div');
//   const pagesEle = document.createElement('div');
//   const readEle = document.createElement('div');

//   bookEle.innerHTML = book.title;
//   authorEle.innerHTML = `Author: ${book.author}`;
//   pagesEle.innerHTML = `Pages: ${book.pages}`;
//   readEle.innerHTML = `Read: ${book.read}`;

//   const deleteBtn = document.createElement('button');
//   deleteBtn.className = 'delete-btn';
//   deleteBtn.innerText = 'Delete';
//   deleteBtn.dataset.idx = i;

//   cardEle.appendChild(bookEle);
//   cardEle.appendChild(authorEle);
//   cardEle.appendChild(pagesEle);
//   cardEle.appendChild(readEle);
//   cardEle.appendChild(deleteBtn);
//   cardEle.setAttribute('data-idx', i);
//   cardsEle.appendChild(cardEle);
//   cardsEle.appendChild(document.createElement('br'));
// }

displayBooks();

// console.log(theHobbit.info());
// console.log(dune.info());
// console.log(myLibrary[0].title);