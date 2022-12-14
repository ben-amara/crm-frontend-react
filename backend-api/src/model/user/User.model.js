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

const storeUserRefreshJWT = (token, _id) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findByIdAndUpdate(
                { _id },
                {
                    $set: {
                        "refreshJWT.token": token,
                        "refreshJWT.addedAt": Date.now(),
                    }
                },
                { new: true }
            ).then(data => resolve(data))
                .catch(err => reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

const getUserById = async (_id) => {
    return new Promise((resolve, reject) => {
        UserSchema.findById(_id, { _id: 0, refreshJWT: 0, password: 0 }, (error, data) => {
            if (error)
                reject(error)

            resolve(data)
        })
    })
}
module.exports = {
    createUser,
    getUserByEmail,
    storeUserRefreshJWT,
    getUserById
}

















