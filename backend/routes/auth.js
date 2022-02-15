const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const
    Registration = require('../models/register.model');

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const user = Registration.findOne({
            email: req.body.email
        })
        .then(user => {
            const password = req.body.password;
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            _id: user._id
                        }, "process.env.JWTPRIVATEKEY", {
                            expiresIn: '7d'
                        });
                        console.log("Token:"+token);
                        res.cookie('nToken', token, {
                            maxAge: 3600000 * 24 * 7,
                            httpOnly: true
                            });
                        return res.json({
                            success: true,
                            token: token,
                            user: {
                                _id: user._id,
                                fullName: user.fullName,
                                email: user.email,
                                phone: user.phone,
                                dateOfBirth: user.dateOfBirth,
                                country: user.country,
                                gender: user.gender
                            }
                        });
                    } else {
                        return res.status(400).json(
                            'Invalid Password'
                        );
                    }
                })
            } else {
                return res.status(400).json({
                    message: 'Invalid email'
                });
            }
        })
        .catch(err => console.log(err));
});

router.route('/logout').get((req, res) => {
    res.clearCookie('nToken');
    res.json(
     'Logged out'
    );
});



module.exports = router;