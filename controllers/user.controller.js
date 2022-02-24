const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET;

async function hashPassword (password) {
    return  bcrypt.hashSync(password, 8);
}

exports.registrationForm = (req, res, next) => {
    res.render('signup');
}

exports.userCreate = async (req, res, next) => {
    try {
        const newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: await hashPassword(req.body.password)
        });
        const token = jwt.sign({userId: newUser._id.toString()}, secret, {expiresIn: "1d"}, {algorithm: "HS256"} );
        newUser.token = token;
        await newUser.save(err => {
            if (err) {
                return res.status(400).json("registration failed");
            } else {
                res.redirect('/login');
            }
        })
        console.log(newUser);
    } catch (error) {
        next(error);
    }
};

//exports.usersList = async (req, res, next) => {
//    res.render('usersList.ejs');
//}

exports.getUsers = function(req, res) {
    User.find( function(err, users) {
        if (err) return;
        res.render('usersList.ejs', { users: users });
    });
}

