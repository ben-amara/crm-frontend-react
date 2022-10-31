const { UserSchema } = require("./User.schema");



const createUser = usrObj => {
    return UserSchema(usrObj).save()
}


const getUserByEmail = email => {
    return new Promise((resolve, reject) => {
        if (!email) reject(false)

        UserSchema.findOne({ email }, (error, data) => {
            if (error)
                reject(error)

            resolve(data)
        })
    })

}
module.exports = {
    createUser,
    getUserByEmail
}