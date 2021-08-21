/* eslint-disable indent */
{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list', 
    },
    book: {
      image: 'book__image',
      favorite: '.books-list .favorite',
    },
  };

  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
  };

  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  class BookList{

    constructor (){
      const thisBook = this;

      thisBook.initData();
      thisBook.getElements();
      thisBook.render();
      thisBook.initActions();

      thisBook.favoriteBooks = [];
    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      const thisBook = this;

      thisBook.menuContainer = document.querySelector(select.containerOf.booksList);
      thisBook.favoriteBooks = [];
      console.log('menuContainer',thisBook.menuContainer);


    }
    render() {
      const thisBook = this;

      for (let eachBook of dataSource.books){
        const generatedHTML = templates.bookTemplate(eachBook);
        
        // element dom from html
        const element = utils.createDOMFromHTML(generatedHTML);
        //console.log ('element:', element);

        // genedated DOM add to list .books-list as new child
        //const bookListContainer = document.querySelector(select.containerOf.booksList);
        //console.log('bookListContainer:', bookListContainer);

        thisBook.menuContainer.appendChild(element);
      }
    }

    initActions() {
      const thisBook = this;
      // console.log(this);

      thisBook.menuContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const elem = event.target.offsetParent;
        console.log(elem);
        if (elem.classList.contains(select.book.image)) {
          // console.log(select.book.image);
          const id = elem.getAttribute('data-id');

          if (thisBook.favoriteBooks.includes(id)) {
            const indexOfBookID = thisBook.favoriteBooks.indexOf(id);
            elem.classList.remove(classNames.favoriteBook);
            thisBook.favoriteBooks.splice(indexOfBookID, 1);
          }
          else {
            elem.classList.add(classNames.favoriteBook);
            thisBook.favoriteBooks.push(id);
          }
        }
      });
      
      console.log('favoriteBooks', thisBook.favoriteBooks);
    }
 
  }

// eslint-disable-next-line no-unused-vars
const app = new BookList();


}
