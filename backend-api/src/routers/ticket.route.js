module.exports = app => {
    const router = require("express").Router();

    app.use("/v1/ticket", router)
}