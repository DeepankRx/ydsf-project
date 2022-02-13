const router = require('express').Router();
const bcrypt = require('bcrypt');
const Registration = require('../models/register.model');

router.route('/').get((req, res) => {
    Registration.find()
    .then(registrations => res.json(registrations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(  (req, res) => {
    const fullName = req.body.fullName;
    const password = (req.body.password);
    const email = (req.body.email);
    const phone = (req.body.phone);
    const dateOfBirth = (req.body.dateOfBirth);
    const country = (req.body.country);
    const gender = (req.body.gender);

   const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
            console.error(err);
        }
        const registration = new Registration({
            fullName,
            password: hash,
            email,
            phone,
            dateOfBirth,
            country,
            gender
    });
    registration.save()
    .then(() => res.json('Registration added!'))
    .catch(err => res.status(400).json('Error: ' + err));
    });
});


router.route('/:id').get((req, res) => {
    Registration.findById(req.params.id)
      .then(registration => res.json(registration))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Registration.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').put((req,res) => {
    Registration.findByIdAndUpdate(req.params.id)
    .then(
        registration => 
        {
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

module.exports = router;

        