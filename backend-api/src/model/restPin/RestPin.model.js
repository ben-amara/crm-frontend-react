const { randomPinNumber } = require("../../utils/randomGenerator");
const { RestPinSchema } = require("./RestPin.schema");

const setPasswordRestPin = email => {
    return new Promise((resolve, reject) => {

        const randPin = randomPinNumber(6)
        const restObj = {
            email,
            pin: randPin
        }
        return RestPinSchema(restObj).save()
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

module.exports = {
    setPasswordRestPin
}

















