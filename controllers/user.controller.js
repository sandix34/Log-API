const User = require("../model/user");

exports.registrationForm = (req, res, next) => {
    res.render('signup');
}

exports.userCreate = async (req, res, next) => {
    try {
        const newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        });
        await newUser.save(err => {
            if (err) {
                return res.status(400).json("registration failed");
            } else {
                res.json({
                    data: newUser
                });
            }
        })
        console.log(newUser);
    } catch (error) {
        next(error);
    }
};

