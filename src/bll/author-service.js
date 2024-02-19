'use-strict'

const AuthorModel = require('../foundation/models/author-model');

class AuthorService {

    async createNewAuthor(authorDataObj) {
        try {
            const authorModel = new AuthorModel(authorDataObj);
            await authorModel.save();
            return {
                ApiStatus: true,
                ApiStatusCode: 200,
                Message: 'Succesfully created new author',
                Data: {
                    authorId: authorModel.id
                }
            }
        }
        catch (err) {
            console.log(`An error occurred while creating new author.Error:${err}`);
        }

        return null;
    }
}

module.exports = AuthorService;