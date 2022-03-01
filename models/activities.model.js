const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
    activity: String,
})

module.exports = new mongoose.model('Activities', activitiesSchema);