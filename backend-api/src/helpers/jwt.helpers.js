const jwt = require('jsonwebtoken');
const { storeUserRefreshJWT } = require('../model/user/User.model');
const { setJWT } = require('./redis.helpers');

const generateToken = async (payload) => {
    try {
        const token = jwt.sign({ payload },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' });

        //await setJWT(token)
        return Promise.resolve(token)
    } catch (error) {
        return Promise.reject(error)
    }
}

const refreshToken = async (payload, _id) => {
    const refreshToken = jwt.sign({ payload },
        process.env.JWT_REFRESH_ACCESS_SECRET,
        { expiresIn: '30d' });

    await storeUserRefreshJWT(_id, refreshToken)
    return Promise.resolve(refreshToken)
}

module.exports = {
    generateToken,
    refreshToken
}