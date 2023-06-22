const express = require("express");
const {Register,Login, getAllCustomer, changePassword, deleteCustomer} = require("../controllers/customer.controller.js");
const customerRouter = express.Router();

customerRouter.post("/register",Register);
customerRouter.get("/",getAllCustomer);
customerRouter.post("/login",Login);
customerRouter.put("/changePassword",changePassword)
customerRouter.put("/deleteCustomer",deleteCustomer)

module.exports = {
    customerRouter
}