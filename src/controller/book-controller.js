'use-strict'

const { ApiController } = require('../foundation/api-controller');
const BookService = require('../bll/book-service');
const Utils = require('../foundation/utils');

class BookController extends ApiController {
    constructor() {
        super();
    }

    async createNewBook(req, res) {
        try {
            const requestData = req.body;
            if (Utils.notAssigned(requestData) ||
                Utils.isEmptyObject(requestData)) {
                return this.sendSuccess(res, null, 400, 'Request data can not be empty');
            }

            const bookService = new BookService();
            const responseData = await bookService.createNewBook(requestData);
            if (Utils.notAssigned(responseData)) {
                return this.sendError(res, 500, 'Unexpected error was occurred');
            }

            return this.sendSuccess(res, responseData.Data, responseData.ApiStatusCode, responseData.Message);
        } catch (error) {
            console.log(`An error occurred while creating new book.Err:${error}`);
            return this.sendError(res, 500, 'Unexpected error was occurred on server side');
        }
    }

    async getBookByBookId(req, res) {
        try {
            const bookId = req.params.id
            const bookService = new BookService();
            const responseData = await bookService.getBookByBookId(bookId);
            if (Utils.notAssigned(responseData)) {
                return this.sendError(res, 500, 'Unexpected error was occurred');
            }

            return this.sendSuccess(res, responseData.Data, responseData.ApiStatusCode, responseData.Message);
        } catch (error) {
            console.log(`An error occurred while getting book by id.Err:${error}`);
            return this.sendError(res, 500, 'Unexpected error was occurred on server side');
        }
    }

    async getAllBookList(req, res) {
        try {
            const bookService = new BookService();
            const responseData = await bookService.getAllBookList();
            if (Utils.notAssigned(responseData)) {
                return this.sendError(res, 500, 'Unexpected error was occurred');
            }

            return this.sendSuccess(res, responseData.Data, responseData.ApiStatusCode, responseData.Message);
        } catch (error) {
            console.log(`An error occurred while getting book by id.Err:${error}`);
            return this.sendError(res, 500, 'Unexpected error was occurred on server side');
        }
    }

    async deleteBookByBookId(req, res) {
        try {
            const bookId = req.params.id
            const bookService = new BookService();
            const responseData = await bookService.deleteBookByBookId(bookId);
            if (Utils.notAssigned(responseData)) {
                return this.sendError(res, 500, 'Unexpected error was occurred');
            }

            return this.sendSuccess(res, responseData.Data, responseData.ApiStatusCode, responseData.Message);
        } catch (error) {
            console.log(`An error occurred while deleting book by id.Err:${error}`);
            return this.sendError(res, 500, 'Unexpected error was occurred on server side');
        }
    }

    async deleteAllBookList(req, res) {
        try {
            const bookService = new BookService();
            const responseData = await bookService.deleteAllBookList();

            return this.sendSuccess(res, responseData.Data, responseData.ApiStatusCode, responseData.Message);
        } catch (error) {
            console.log(`An error occurred while deleting book by id.Err:${error}`);
            return this.sendError(res, 500, 'Unexpected error was occurred on server side');
        }
    }

    async updateBookByBookId(req, res) {
        try {
            const bookId = req.params.id;
            const requestData = req.body;
            if (Utils.notAssigned(requestData) ||
                Utils.isEmptyObject(requestData)) {
                return this.sendSuccess(res, null, 400, 'Request data can not be empty');
            }

            const bookService = new BookService();
            const responseData = await bookService.updateBookByBookId(bookId, requestData);
            if (Utils.notAssigned(responseData)) {
                return this.sendError(res, 500, 'Unexpected error was occurred');
            }

            return this.sendSuccess(res, responseData.Data, responseData.ApiStatusCode, responseData.Message);
        } catch (error) {
            console.log(`An error occurred while updating book by id.Err:${error}`);
            return this.sendError(res, 500, 'Unexpected error was occurred on server side');
        }
    }
}

module.exports = BookController;