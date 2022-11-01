const redis = require('redis');
// url : 'redis://redis-api:6379'
const client = redis.createClient(process.env.REDIS_URL);

(async function () {
    await client.connect()
})();
const setJWT = async (key, value) => {
    try {
        await client.set(key, value)

    } catch (error) {
        reject(error)
    }
}

const getJWT = async (key) => {
    try {

        return Promise.resolve(client.get(key))
    } catch (error) {
        return Promise.reject(error)
    }
}

const deleteJWT = async (key) => {
    try {

        client.del(key)
    } catch (error) {
        return Promise.reject(error)
    }
}

module.exports = {
    setJWT,
    getJWT,
    deleteJWT
}







