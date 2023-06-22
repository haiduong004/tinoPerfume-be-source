const {Customer} = require("../models");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Register = async(req,res) => {
    try {
        const {fullName,phoneNumber,email,password} = req.body;

        //kiểm tra tài khoản có tồn tại
        const user = await Customer.findOne({ where: { email } });
        const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS = 10);
        if (!user) {
            if (email && password){
                Customer.create({
                    isActive: true,
                    isDelete: false,
                    fullName: fullName,
                    avatar: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
                    phoneNumber: phoneNumber,
                    email: email,
                    password: hashPassword});
                res.status(201).send("Success register user account");
            } else {
                res.status(409).send('Invalid input');
            }
        }
        else {
            res.status(409).send('This email has already existed');
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllCustomer = async(req,res) => {
    try{
        const CustomerList = await Customer.findAll({where : {isActive : true, isDelete : false}});
        res.status(200).send(CustomerList);
    }catch (error){
        res.status(500).send(error)
    }
}

const Login = async(req,res) => {
    try {
        const {email,password} = req.body;
        const user = await Customer.findOne({ where: { email } });
        if (!user) {
            res.status(401).send('Email does not exist');
        } else {
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                const fullName = user.fullName;
                const avatar = user.avatar;
                const phoneNumber = user.phoneNumber;
                const email = user.email;
                const token = jwt.sign(
                    {fullName, email, phoneNumber},
                    'testToken',
                    {expiresIn: 60*60}
                );
                res.status(200).send({"message": "Success login your account",token,fullName,avatar,phoneNumber,email});
            } else {
                res.status(403).send('Wrong password');
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const changePassword = async(req,res) => {
    try {
        const {email,password,newPassword} = req.body;
        const user = await Customer.findOne({ where: { email } });
        if (!user) {
            res.status(401).send('Email does not exist');
        } else {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch){
                const hashNewPassword = bcrypt.hashSync(newPassword, SALT_ROUNDS = 10);
                user.password = hashNewPassword;
                user.save();
                res.status(200).send("Success change password");
            } else {
                res.status(403).send("Wrong Password");
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteCustomer = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await Customer.findOne({ where: { email } });
        if (!user) {
            res.status(401).send('Email does not exist');
        } else {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch){
                user.isActive = false;
                user.isDelete = true;
                res.status(200).send("Delete successfully")
            } else {
                res.status(403).send("Wrong Password");
            }
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    Register,
    getAllCustomer,
    Login,
    changePassword,
    deleteCustomer
}