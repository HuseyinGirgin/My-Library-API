'use-strict';

const express = require('express');
const auth = require('../middleware/auth');

const AuthorController = require('../controller/author-controller');
const BookController = require('../controller/book-controller');

const router = new express.Router();

router.post('/author/create-new-author',auth, (req, res) => new AuthorController().createNewAuthor(req, res));

router.post('/book/create-new-book', auth, (req, res) => new BookController().createNewBook(req, res));

router.get('/book/', auth,  (req, res) => { new BookController().getAllBookList(req, res) });

router.get('/book/:id', auth, (req, res) => new BookController().getBookByBookId(req, res));

router.patch('/book/:id', auth, (req, res) => { new BookController().updateBookByBookId(req, res) });

router.delete('/book/', auth, (req, res) => { new BookController().deleteAllBookList(req, res) });

router.delete('/book/:id', auth, (req, res) => { new BookController().deleteBookByBookId(req, res) });

module.exports = router