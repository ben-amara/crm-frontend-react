const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    company: {
        type: String,
        maxLength: 50,
        required: true
    },
    address: {
        type: String,
        maxLength: 100
    },
    phone: {
        type: Number,
        maxLength: 11
    },
    email: {
        type: String,
        maxLength: 50,
        required: true
    },
    password: {
        type: String,
        maxLength: 100,
        minLength: 8,
        required: true
    },
    refreshJWT: {
        token: {
            type: String,
            maxLength: 500,
            default: ''
        },
        addedAt: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
})

UserSchema.index({ email: 1 }, { unique: true })
module.exports = {
    UserSchema: mongoose.model('User', UserSchema)
}