const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoute');

const bookRouter = express.Router();
let books = [];
function router(nav) {
  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbname = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected to server!');
        const db = client.db(dbname);
        const response = await db.collection('books');
        books = await response.find().toArray();
      } catch (err) {
        debug(err.stack);
      }
      res.render('books', {
        nav,
        title: 'Library',
        books
      });
    }());
  });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      const url = 'mongodb://localhost:27017';
      const dbname = 'libraryApp';
      const { id } = req.params;

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('connected to server!');
          const db = client.db(dbname);
          const response = await db.collection('books');
          req.book = await response.findOne({ _id: new ObjectID(id) });
        } catch (err) {
          debug(err.stack);
        }
        next();
      }());
    })
    .get((req, res) => {
      res.render('book', {
        nav,
        title: 'Library',
        book: req.book
      });
    });
  return bookRouter;
}

module.exports = router;
