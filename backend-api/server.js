const express = require('express')
const app = express()
const BodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const handlerError = require('./src/utils/errorHandler')
dotenv.config();
//API security
app.use(helmet())

//handle CORS ERROR
app.use(cors())

// Set body BodyParser
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())

const port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

if (process.env.NDE_ENV !== 'production') {
    const mDb = mongoose.connection;

    mDb.on('open', () => {
        console.log('MongoDB is connected')
    })
    mDb.on('error', (error) => {
        console.log(error)
    })

    //Logger
    app.use(morgan('tiny'))
}


require('./src/routers/tokens.route')(app)
require('./src/routers/user.route')(app)
require('./src/routers/ticket.route')(app)

app.use((req, res, next) => {
    const error = new Error('Resources not found..!')
    error.status = 404

    next(error)
})

app.use((error, req, res, next) => {
    //Erro handler
    handlerError(error, res)
})


app.listen(port, () => {
    console.log(`API is ready on http://localhost:${port}`)
})













