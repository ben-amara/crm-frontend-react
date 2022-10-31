const { verifyJWT } = require("../helpers/jwt.helpers");
const { getJWT } = require("../helpers/redis.helpers");

const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) res.status(403).json({ message: 'Forbidden!' })
    const decoded = verifyJWT(authorization);

    if (decoded.email) {
        const userId = await getJWT(authorization)

        if (!userId) res.status(403).json({ message: 'Forbidden!' })
    }

    req.userID = userId;
    next()
}

module.exports = {
    userAuthorization
}