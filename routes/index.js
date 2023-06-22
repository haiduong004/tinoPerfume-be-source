const express = require("express");
const { customerRouter } = require("./customer.route.js");
const rootRouter = express.Router();

rootRouter.use("/customer",customerRouter);

module.exports = {
    rootRouter
}  