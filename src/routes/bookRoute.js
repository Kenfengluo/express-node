const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lew Nikolayevich Tolstoy',
    read: false
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  },
  {
    title: 'Things Fall Apart',
    genre: 'Historical Fiction',
    author: 'Chinua Achebe',
    read: false
  },
  {
    title: 'Fairy tales',
    genre: 'Historical Fiction',
    author: 'Hans Christian Andersen',
    read: false
  }
  ];
  bookRouter.route('/').get((req, res) => {
    res.render('books', {
      nav,
      title: 'Library',
      books
    });
  });

  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('bookListView', {
      nav,
      title: 'Library',
      book: books[id]
    });
  });
  return bookRouter;
}

module.exports = router;
