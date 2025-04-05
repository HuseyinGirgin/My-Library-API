const request = require('supertest')
const app = require('../app')
const BookModel = require('../foundation/models/book-model');
const AuthorModel = require('../foundation/models/book-model');

const AUTH_TOKEN = process.env.TOKEN;
let testBookId;
let testAuthorId;
//
//POST: /book/create-new-author
// Document should be created for author collection and each field should be equals with request body 
test('Should create author', async () => {
    const response = await request(app)
        .post('/author/create-new-author')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
            "name": "test-name",
            "country": "turkey",
            "birthdate": "01-01-1997"
        })
        .expect(200);
    testAuthorId = response.body.Data.authorId;
    const authorModel = await AuthorModel.findById(testAuthorId);
    expect(authorModel).not.toBeNull();
    expect(authorModel.name).toEqual("test-name");
    expect(authorModel.country).toEqual("turkey");
    expect(authorModel.birthdate).toEqual("01-01-1997");
});

//POST: /book/create-new-book
// Document should be created for books collection and each field should be equals with request body 
test('Should create book', async () => {
    const response = await request(app)
        .post('/book/create-new-book')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
            "title": "test-title",
            "author": testAuthorId,
            "price": 150,
            "language": "fr",
            "numberOfPages": 58
        })
        .expect(200);
    testBookId = response.body.Data.bookId;
    const bookModel = await BookModel.findById(testBookId);
    expect(bookModel).not.toBeNull();
    expect(bookModel.title).toEqual("test-title");
    expect(bookModel.author.toString()).toEqual(testAuthorId);
    expect(bookModel.price >= 0).toBeTruthy();
    expect(bookModel.price).toEqual(150);
    expect(bookModel.language).toEqual("fr");
    expect(bookModel.numberOfPages > 0).toBeTruthy();
    expect(bookModel.numberOfPages).toEqual(58);
});

//POST: /book/create-new-book
// Document should not be created when request body is null
test('Should not create book', async () => {
    await request(app)
        .post('/book/create-new-book')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(400);
});

//POST: /book/create-new-book
// Document should not be created if authors collections do not have author for related author id
test('Should not create book if there is no author in authors collections', async () => {
    await request(app)
        .post('/book/create-new-book')
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
            "title": "test-title",
            "author": "65d281c411ff591ea8e1d54ass",
            "price": 150,
            "language": "fr",
            "numberOfPages": 58
        })
        .expect(404);
});

//PATCH: /book/:id
test('Should update book for book id', async () => {
    await request(app)
        .patch(`/book/${testBookId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
            "title": "title-4",
            "price": 110
        })
        .expect(200)
});

//PATCH: /book/:id
//Document should not be updated for book id when request body is empty
test('Should not update book for book id if request body is empty', async () => {
    await request(app)
        .patch(`/book/${testBookId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(400)
});


//PATCH: /book/:id
//Document should not be updated for book id when book collections do not have book document for param id
test('Should not update book for book id if there is no books for params id', async () => {
    await request(app)
        .patch(`/book/${testBookId}45`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
            "title": "title-4",
            "price": 110
        })
        .expect(404)
});

//PATCH: /book/:id
//Document should not be updated for book id when request body attributes are not equals [title,price]
test('Should not update book for book id if request body attributes are not valid', async () => {
    await request(app)
        .patch(`/book/${testBookId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send({
            "title": "title-4",
            "price": 110,
            "isbn:": "ereresda23443"
        })
        .expect(400)
});

//GET: /book/:id
// Document should not be fetched for book id
test('Should not fetch book for book id', async () => {
    await request(app)
        .get(`/book/${testBookId}23`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(404)
});

//GET: /book/:id
// Document should be fetched for book id
test('Should fetch book for book id', async () => {
    await request(app)
        .get(`/book/${testBookId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(200)
});

//GET: /book/
// Document should be fetched for all books
test('Should fetch all book list', async () => {
    await request(app)
        .get(`/book/`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(200)
});

//DELETE: /book/:id
// Document should not be deleted for book id
test('Should not delete book for book id', async () => {
    await request(app)
        .delete(`/book/${testBookId}34`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(404)
});

//DELETE: /book/:id
// Document should be deleted for book id
test('Should delete book for book id', async () => {
    await request(app)
        .delete(`/book/${testBookId}`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(200)
});

//DELETE: /book/
// All documents for book should be deleted
test('Should delete all book', async () => {
    await request(app)
        .delete(`/book/`)
        .set('Authorization', `Bearer ${AUTH_TOKEN}`)
        .send()
        .expect(200)
});