'use-strict'

const Utils = require('../utils');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    price: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Price must be a positive number');
            }
        }
    },
    isbn: {
        type: String,
        default: Utils.createUuid()
    },
    language: {
        type: String,
        default: false
    },
    numberOfPages: {
        type: Number,
        validate(value) {
            if (value <= 0) {
                throw new Error('Number of pages bigger than zero');
            }
        }
    }
}, {
    timestamps: true
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;