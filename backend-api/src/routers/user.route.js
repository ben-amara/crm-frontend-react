
const { hashPassword, comparePassword } = require('../helpers/bcrypt.helpers');
const { sendMail } = require('../helpers/email.helpers');
const tokenGenerator = require('../helpers/jwt.helpers');
const { userAuthorization } = require('../middlewares/authorization.middlewares');
const { setPasswordRestPin } = require('../model/restPin/RestPin.model');
const { createUser, getUserByEmail, getUserById } = require('../model/user/User.model');

module.exports = app => {
    const router = require('express').Router();

    router.get('/', userAuthorization, async (req, res) => {
        const _id = req.userId
        try {
            const user = await getUserById(_id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }

    })

    // add new user
    router.post('/', async (req, res) => {
        const { name, company, address, phone, email, password } = req.body
        // hash password
        const hashedPass = await hashPassword(password)
        const newUser = {
            name, company, address, phone,
            email,
            password: hashedPass
        }
        createUser(newUser)
            .then(data =>
                res.status(200).json(data)
            )
            .catch(error => res.status(500).json({ message: error.message }))
    })


    // user sign in 
    router.post('/login', async (req, res) => {
        const { email, password } = req.body

        if (!email || !password) {
            res.json({ status: "error", message: "invalide credentials.." })
        }

        //get user data
        const userObj = await getUserByEmail(email);
        passFromDb = userObj && userObj._id ? userObj.password : null;

        // hash password
        const result = await comparePassword(password, passFromDb)
        if (!result) {
            res.json({ status: "error", message: "invalide credentials.." })
        }

        const tokenJWT = await tokenGenerator.generateToken(userObj._id.toString(), userObj.email)
        const tokenJWTRefrsh = await tokenGenerator.refreshToken(userObj._id.toString(), userObj.email)

        res.json({
            status: "success",
            message: "Login successfully!",
            tokenJWT,
            tokenJWTRefrsh
        })
    })

    router.post('/reset-password', async (req, res) => {
        const { email } = req.body

        const user = await getUserByEmail(email)
        if (user && user._id) {

            const setPin = await setPasswordRestPin(user.email)
            const result = await sendMail(user.email, setPin.pin)
            if (result.messageId) {
                return res.json({
                    status: 'success',
                    message: 'If the email is exist in our DB, the password reset pin will be sent shortly..'
                })
            }
            return res.json({
                status: 'error',
                message: 'Unable to process your resquet, Please try again later!'
            })

        }
        return res.json({
            status: 'error',
            message: 'If the email is exist in our DB, the password reset pin will be sent shortly..'
        })
    })



    router.post('/login', async (req, res) => { })

    app.use('/v1/user', router)
}