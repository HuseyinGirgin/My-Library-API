'use-strict';

const express = require('express');
const libraryRouter = require('./routers/library');
const MongoDb = require('./foundation/db/mongo-db');

const mongoDb = new MongoDb();
mongoDb.connectMongoDb();

const app = express();
app.use(express.json());
app.use(libraryRouter);

module.exports = app