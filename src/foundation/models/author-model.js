'use-strict'

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    birthDate: {
        type: String,
    }
}, {
    timestamps: true
});

const AuthorModel = mongoose.model('Author', authorSchema);

module.exports = AuthorModel;