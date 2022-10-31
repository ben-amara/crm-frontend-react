const bcrypt = require('bcrypt');
const saltRounds = 10;


const hashPassword = (plaintextPassword) => {
    return new Promise(resolve => {
        resolve(bcrypt.hash(plaintextPassword, saltRounds));
    })
}

const comparePassword = (plaintextPassword, passwordHash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plaintextPassword, passwordHash, (err, result) => {
            if (err) reject(err);

            resolve(result)
        });
    })
}

module.exports = {
    hashPassword,
    comparePassword
}