/*
This is the controller for all the routes of the application. 
*/
const express = require('express')
const router = express.Router()

// this is for the root of the webpage
// get request. HTTP Request Response
router.get('/', (req, res) => {
    res.render('index')
})

// export the router that we set up
module.exports = router