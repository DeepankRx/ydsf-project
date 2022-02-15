const router = require('express').Router();
const Registration = require('../models/register.model');


router.route('/').get((req, res) => {
    Registration.find()
        .then(registrations => res.json(registrations))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Registration.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Registration.findByIdAndUpdate(req.params.id)
        .then(
            registration => {
                registration.fullName = registration.fullName;
                registration.password = req.body.password;
                registration.email = req.body.email;
                registration.phone = req.body.phone;
                registration.dateOfBirth = req.body.dateOfBirth;
                registration.country = req.body.country;
                registration.gender = req.body.gender;
                registration.save()
                    .then(() => res.json('User updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        )
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports =  router;