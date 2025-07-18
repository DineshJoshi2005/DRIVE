const express = require("express");
const{body, validationResult} = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/register", (req,res)=>{
    res.render("register");
});

router.post("/register",body('username').trim().isLength({min:3}),body('email').trim().isEmail(),body('password').trim().isLength({min:3}),async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Invalid Data"
        })
    }
    const {username, email, password} = req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username: username,
        email: email,
        password: hashPass
    });
    res.json(user);
})

router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login",body('username').trim().isLength({min: 3}),body('password').trim().isLength({min: 3}),async(req,res)=>{
    const {username,password} = req.body;
    const user = await userModel.findOne({
        username: username
    });
    const errors = validationResult(req);
    if(!user){
        return res.status(400).json({
            error: errors.array(),
            message: "username or password is not correct"
        })
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            error: errors.array(),
            message:" password is incorrect"
        });
    }

    const token = jwt.sign({
        username: user.username,
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET);

    res.json(token);

});

module.exports = router;