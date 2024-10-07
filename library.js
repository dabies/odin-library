const myLibrary = [];
const libraryGrid = document.getElementById('library');

class Book {
    constructor(title, author, pages, stars, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.stars = stars,
        this.read = read
    }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

//function that iterates through grid and deletes every node from display
function eraseDisplay() {
    while (libraryGrid.firstChild) {
        libraryGrid.removeChild(libraryGrid.lastChild);
    }
}

//function to add event listener to the 'remove' buttons to delete
//book associated with that div from library. does this by
//looking at class name associated with div which corresponds with library
function addEraseListener(button) {
    button.addEventListener('click', () => {
        eraseDisplay();
        let parent = button.closest('div');
        let number = Number(parent.className);
        //went with delete as I am not concerned with empty values as they
        //do not get displayed. only way I could get it to work
        delete myLibrary[number]
        displayLibrary(myLibrary);
    });
}

//function to display library. starts by erasing current display
//then creates a new div card for every book in the library
function displayLibrary(library) {
    eraseDisplay();
    for (book in library) {
        let card = document.createElement('div');
        //assigns class value to the index in library
        card.setAttribute('class', `${book}`);
        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let stars = document.createElement('p');
        let readLabel = document.createElement('label');
        readLabel.setAttribute('for', 'read');
        let read = document.createElement('input');
        let remove = document.createElement('button');
        remove.setAttribute('class', 'remove');
        remove.textContent += 'Remove';
        addEraseListener(remove);
        read.setAttribute('id', 'read');
        read.setAttribute('type', 'checkbox');
        title.textContent += `Title: ${library[book].title}`;
        card.appendChild(title);
        author.textContent += `Author: ${library[book].author}`;
        card.appendChild(author);
        pages.textContent += `Pages: ${library[book].pages}`;
        card.appendChild(pages);
        stars.textContent += `Stars: ${library[book].stars}`;
        card.appendChild(stars);
        readLabel.textContent += 'Read? '
        //checks read status of book and assigns value for checkbox
        if (library[book].read === 'true') {
            read.checked = true;
        } else {
            read.checked = false;
        }
        card.appendChild(readLabel);
        card.appendChild(read);
        card.appendChild(remove);
        libraryGrid.appendChild(card);
    } 
}


//gets values from book form when submitted and creates new book element
//then adds book to library and displays the new library
let bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let title = document.getElementById('newTitle');
    let author = document.getElementById('newAuthor');
    let pages = document.getElementById('newPages');
    let stars = document.getElementById('newStars');
    let read = document.getElementById('newRead');

    if (title.value === '' || author.value === '' || pages.value === '' || stars.value === '') {
        alert('All values must be filled.');
    } else {
        if (read.checked === true) {
            read.value = true;
        } else {
            read.value = false;
        }
        let newBook = new Book(title.value, author.value, pages.value, stars.value, read.value);
        addBookToLibrary(newBook);
        displayLibrary(myLibrary);
    }
    //clears book form for future books to be added
    title.value = '';
    author.value = '';
    pages.value = '';
    stars.value = '';
    read.checked = false;
});
//sample book so library isn't empty for when user first enters it. great read.
let sample = new Book('The Subtle Art of Not Giving a F*ck', 'Mark Manson', '224', '5', 'true');
addBookToLibrary(sample);
let sampleBtn = document.querySelector('.remove');
addEraseListener(sampleBtn);
console.log(myLibrary);