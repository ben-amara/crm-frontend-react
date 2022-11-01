const { verifyRefreshJWT, generateToken } = require("../helpers/jwt.helpers");
const { deleteJWT } = require("../helpers/redis.helpers");
const { getUserByEmail } = require("../model/user/User.model");

module.exports = app => {
    const router = require("express").Router();

    // refresh token
    router.get('/refresh', async (req, res, next) => {
        const { authorization } = req.headers
        const decoded = await verifyRefreshJWT(authorization)

        if (decoded.payload) {

            const user = await getUserByEmail(decoded.payload)
            if (user) {
                let tokenExp = user.refreshJWT.addedAt
                tokenExp = tokenExp.setDate(
                    tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)

                const today = new Date()
                if (tokenExp < today) {
                    res.status(403).json({ message: 'Forbidden' })
                }

                const accessJWT = await generateToken(user._id.toString(), user.email)

                return res.json({ status: 'success', accessJWT })
            }

        }
        deleteJWT(authorization)
        return res.status(403).json({ message: 'Forbidden' })
    })

    app.use("/v1/token", router)
}