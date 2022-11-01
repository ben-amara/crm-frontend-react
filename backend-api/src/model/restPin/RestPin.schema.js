const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestPinSchema = new Schema({
    pin: {
        type: Number,
        minLength: 6,
        maxLength: 6
    },
    email: {
        type: String,
        maxLength: 50,
        required: true
    }
})

//RestPinSchema.index({ email: 1 }, { unique: true })
module.exports = {
    RestPinSchema: mongoose.model('RestPin', RestPinSchema)
}