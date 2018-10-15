const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(nav) {
  const url = 'mongodb://localhost:27017';
  const dbname = 'libraryApp';
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  function getBooks(req, res) {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to server!');
        const db = client.db(dbname);
        const response = await db.collection('books');
        const books = await response.find().toArray();
        res.render('books', {
          nav,
          title: 'Library',
          books
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  }
  function getBookById(req, res) {
    const { id } = req.params;

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to server!');
        const db = client.db(dbname);
        const response = await db.collection('books');
        const book = await response.findOne({ _id: new ObjectID(id) });
        res.render('book', {
          nav,
          title: 'Library',
          book
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  }
  return {
    middleware,
    getBooks,
    getBookById
  };
}

module.exports = bookController;
