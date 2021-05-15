/*
This is the express server setup.
Open application using https://mybrary-rhyno.herokuapp.com/
*/
// check if we are running production or development environment
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// Import routers into the server so the server know the routes exist
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

// i have no idea. need to research express
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// setting up mongoose database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db= mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// use the routes we created using the necessary path
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log ('Server started on port:', PORT));