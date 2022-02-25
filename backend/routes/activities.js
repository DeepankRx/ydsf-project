const router = require('express').Router();
const activities = require('../models/activities.model');


router.route('/').post(  (req, res) => {

    const activity = new activities({
        activity: req.body.activity,
    });
    activity.save().
    then(() => res.json('Activity added!')).
    catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    activities.findByIdAndDelete(req.params.id)
        .then(() => res.json('Activity deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').put((req, res) => {
    activities.findByIdAndUpdate(req.params.id)
    .then(
        activity => {
            activity.activity = req.body.activity;
            activity.save()
                .then(() => res.json('Activity updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
    )
    

})
module.exports = router;
