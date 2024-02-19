'use-strict'

const { ApiController } = require('../foundation/api-controller');
const AuthorService = require('../bll/author-service');
const Utils = require('../foundation/utils');

class AuthorController extends ApiController {
    constructor() {
        super();
    }

    async createNewAuthor(req, res) {
        try {
            const requestData = req.body;
            if (Utils.notAssigned(requestData) ||
                Utils.isEmptyObject(requestData)) {
                return this.sendSuccess(res, null, 400, 'Request data can not be empty');
            }

            const authorService = new AuthorService();
            const responseData = await authorService.createNewAuthor(requestData);
            if (Utils.notAssigned(responseData)) {
                return this.sendError(res, 500, 'Unexpected error was occurred');
            }

            return this.sendSuccess(res, responseData.Data, responseData.ApiStatusCode, responseData.Message);
        } catch (error) {
            console.log(`An error occurred while creating new author.Err:${error}`);
            return this.sendError(res, 500, 'Unexpected error was occurred on server side');

        }
    }
}

module.exports = AuthorController;