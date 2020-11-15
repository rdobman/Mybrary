/*
This is the controller for all the routes of the application. 
*/
const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

// All Authors Route
router.get('/', async (req, res) => {
    searchOptions = {}
    if (req.query.name != null && req.query.name !== ' ') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query
        })
    } catch (e) {
        res.redirect('/')
    }

})

// New Authors Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new author() })
})

// Create Author route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuther = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } 
    catch (e) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    
    }        
})


// export the router that we set up
module.exports = router