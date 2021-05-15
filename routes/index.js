/*
This is the controller for all the routes of the application. 
*/
const express = require('express')
const router = express.Router()
const Book = require('../models/book')

// this is for the root of the webpage
// get request. HTTP Request Response
router.get('/', async (req, res) => {
    let books
    try {
        books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
    } catch(e) {
        books = []
    }
    res.render('index', { books: books })
})

// export the router that we set up to the server.js file
module.exports = router