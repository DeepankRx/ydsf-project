const router = require('express').Router();
const newsLetter = require('../models/newsletter.model');

router.route('/').post(  (req, res) => {
    const email = req.body.email;
    const newEmail = new newsLetter({
        email: req.body.email,
    });
    newEmail.save().
    then(() => res.json('Email added to newsletter')).
    catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

        