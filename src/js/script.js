{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list', 
      images: '.book__image',
      
    },
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  function render() {
    //const thisBook = this;

    for (let eachBook of dataSource.books){
      const generatedHTML = templates.bookTemplate(eachBook);
      
      // element dom from html
      const element = utils.createDOMFromHTML(generatedHTML);
      //console.log ('element:', element);

      // genedated DOM add to list .books-list as new child
      const bookListContainer = document.querySelector(select.containerOf.booksList);
      //console.log('bookListContainer:', bookListContainer);

      bookListContainer.appendChild(element);
    }
  }

  function initActions() {
    const thisBook = this;
    const favoriteBooks = [];

    const booksImages = document.querySelectorAll(select.containerOf.images);
    for(let image of booksImages){
      //console.log('image', image);
      image.addEventListener('click', function(event){
        event.preventDefault();
        image.classList.add('favorite');
        const idBook = thisBook.booksList.getAttribute('data-id');
        favoriteBooks.push(idBook);
      });
    }
    
    console.log('favoriteBooks', favoriteBooks);
    console.log('select.booksImages.images', booksImages);
  }
  // wywołanie funkcji
  
  render();
  initActions();
 

}
