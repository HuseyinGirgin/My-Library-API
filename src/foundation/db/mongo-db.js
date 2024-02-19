'use-strict';

const mongoose = require('mongoose');
const  Utils  = require('../utils');
const MONGODB_URL = process.env.MONGODB_URL;
const DEFAULT_OPTIONS = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}

class MongoDb {
    constructor(config) {
        if (Utils.assigned(config)) {
            this.mongoDbUrl = config.mongoDbUrl;
            this.opts = config.opts;
        }

        this.mongoDbUrl = MONGODB_URL;
        this.opts = DEFAULT_OPTIONS;
    }

    connectMongoDb() {
        try {
            mongoose.connect(this.mongoDbUrl, this.opts);
        } catch (error) {
            console.log('An error occcurred while connecting mongo db');
        }
    }
}

module.exports = MongoDb;