const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.JWT_SECRET;

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compareSync(plainPassword, hashedPassword);
}

exports.loginForm = (req, res, next) => {
    res.render('signin');
}

exports.loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return next(new Error('password does not exist'));


        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error('password is not correct'));

        const token = jwt.sign({userId: req.body._id}, secret, {expiresIn: "1d"}, {algorithm: "HS256"} );

        await User.findByIdAndUpdate(user._id, {token})
        res.status(200).redirect('/users');
        console.log(user);
    } catch (error) {
        next(error);
    }
}

exports.verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

// TODO: logout