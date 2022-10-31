const handlerError = (error, res) => {

    res.status(error.status || 500).json({ message: error.message })
}

module.exports = handlerError