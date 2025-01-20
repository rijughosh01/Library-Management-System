const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Create a new book
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all books with optional search parameters
router.get('/', async (req, res) => {
    const { title, author, genre, publicationDate } = req.query;
    const query = {};

    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    if (publicationDate) query.publicationDate = publicationDate;

    try {
        const books = await Book.find(query);
        res.status(200).send(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a book
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.status(200).send('Book deleted');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
