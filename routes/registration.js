const router = require('express').Router();
const bcrypt = require('bcrypt');
const Registration = require('../models/register.model');


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

module.exports = router;

        