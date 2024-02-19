'use-strict'

const AuthorModel = require('../foundation/models/author-model');
const BookModel = require('../foundation/models/book-model');
const Utils = require('../foundation/utils');

class BookService {
    async createNewBook(bookDataObj) {
        try {
            try {
                const authorId = bookDataObj.author;
                const authorModel = !Utils.isStringEmpty(authorId)
                    ? await AuthorModel.findOne({ _id: authorId })
                    : null;
                if (Utils.notAssigned(authorModel)) {
                    throw new Error();
                }
            } catch (err) {
                return {
                    ApiStatus: true,
                    ApiStatusCode: 404,
                    Message: 'There is no author for requested author id.',
                    Data: null
                }
            }

            const bookModel = new BookModel(bookDataObj);
            await bookModel.save();

            return {
                ApiStatus: true,
                ApiStatusCode: 200,
                Message: 'Succesfully created new book',
                Data: {
                    bookId: bookModel.id
                }
            }
        }
        catch (err) {
            console.log(`An error occurred while saving book list.Error:${err}`);
        }

        return null;
    }

    async getBookByBookId(bookId) {
        try {
            let bookModel;
            try {
                bookModel = await BookModel.findOne({ _id: bookId });
                if (Utils.notAssigned(bookModel)) {
                    throw new Error();
                }
            } catch (error) {
                return {
                    ApiStatus: true,
                    ApiStatusCode: 404,
                    Message: 'There is no book for requested id',
                    Data: null
                }
            }

            return {
                ApiStatus: true,
                ApiStatusCode: 200,
                Message: 'Succesfully has been taken book by bookId',
                Data: bookModel
            }
        }
        catch (err) {
            console.log(`An error occurred while getting book by book id.Error:${err}`);
        }

        return null;
    }

    async getAllBookList() {
        try {
            const bookModel = await BookModel.find();

            return {
                ApiStatus: true,
                ApiStatusCode: 200,
                Message: 'Succesfully fetched all book list',
                Data: bookModel
            }
        }
        catch (err) {
            console.log(`An error occurred while saving book list.Error:${err}`);
        }

        return null;
    }

    async deleteBookByBookId(bookId) {
        try {
            let bookModel;
            try {
                bookModel = await BookModel.findOneAndDelete({ _id: bookId })
                if (Utils.notAssigned(bookModel)) {
                    throw new Error();
                }
            } catch (error) {
                return {
                    ApiStatus: true,
                    ApiStatusCode: 404,
                    Message: 'There is no book for requested id',
                    Data: null
                }
            }

            return {
                ApiStatus: true,
                ApiStatusCode: 200,
                Message: 'Succesfull deleted book',
                Data: bookModel

            }
        }
        catch (err) {
            console.log(`An error occurred while deleting book by id.Error:${err}`);
        }

        return null;
    }

    async deleteAllBookList() {
        try {
            await BookModel.deleteMany();

            return {
                ApiStatus: true,
                ApiStatusCode: 200,
                Message: 'Succesfully deleted all book list',
                Data: null
            }
        }
        catch (err) {
            console.log(`An error occurred while deleting book list.Error:${err}`);
        }

        return null;
    }

    async updateBookByBookId(bookId, updateObj) {
        try {
            const updates = Object.keys(updateObj)
            const allowedUpdates = ['title', 'price']
            const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
            if (!isValidOperation) {
                return {
                    ApiStatus: true,
                    ApiStatusCode: 400,
                    Message: 'Invalid updates',
                    Data: null
                }
            }

            let bookModel;
            try {
                bookModel = await BookModel.findOne({ _id: bookId });
                if (Utils.notAssigned(bookModel)) {
                    throw new Error();
                }
            } catch (error) {
                return {
                    ApiStatus: true,
                    ApiStatusCode: 404,
                    Message: 'There is no book for requested id',
                    Data: null
                }
            }

            updates.forEach((update) => bookModel[update] = updateObj[update]);
            await bookModel.save();

            return {
                ApiStatus: true,
                ApiStatusCode: 200,
                Message: 'Succesfully updated book',
                Data: null
            }
        }
        catch (err) {
            console.log(`An error occurred while updating book.Error:${err}`);
        }

        return null;
    }
}

module.exports = BookService;