const { verifyJWT } = require("../helpers/jwt.helpers");
const { getJWT, deleteJWT } = require("../helpers/redis.helpers");

const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;

    const decoded = await verifyJWT(authorization);
    if (decoded.payload) {
        const userId = await getJWT(authorization)

        if (!userId) return res.status(403).json({ message: '1Forbidden!' })

        req.userId = userId;
        return next()
    }

    deleteJWT(authorization)
    return res.status(403).json({ message: 'Forbidden!' })
}

module.exports = {
    userAuthorization
}