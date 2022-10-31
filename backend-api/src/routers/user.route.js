
const { hashPassword, comparePassword } = require('../helpers/bcrypt.helpers');
const { createUser, getUserByEmail } = require('../model/user/User.model');

module.exports = app => {
    const router = require('express').Router();

    router.get('/', (req, res) => {
        res.json({ 'message': 'user api is up!' })
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


        res.json(req.body)
    })




    app.use('/v1/user', router)
}