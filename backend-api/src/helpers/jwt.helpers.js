const jwt = require('jsonwebtoken');
const { storeUserRefreshJWT } = require('../model/user/User.model');
const { setJWT } = require('./redis.helpers');

const generateToken = async (_id, payload) => {
    try {
        const token = jwt.sign({ payload },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' });

        await setJWT(token, _id)
        return Promise.resolve(token)
    } catch (error) {
        return Promise.reject(error)
    }
}

const refreshToken = async (_id, payload) => {
    const refreshToken = jwt.sign({ payload },
        process.env.JWT_REFRESH_ACCESS_SECRET,
        { expiresIn: '30d' });

    await storeUserRefreshJWT(refreshToken, _id)
    return Promise.resolve(refreshToken)
}

const verifyJWT = async token => {
    try {
        return Promise.resolve(jwt.verify(token, process.env.JWT_ACCESS_SECRET))
    } catch (error) {
        return Promise.reject(error)
    }
}

const verifyRefreshJWT = async token => {
    try {
        return Promise.resolve(jwt.verify(token, process.env.JWT_ACCESS_SECRET))
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = {
    generateToken,
    refreshToken,
    verifyJWT,
    verifyRefreshJWT
}