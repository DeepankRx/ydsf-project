const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email already exists'],
        unique: true,
    },
},
{
    timestamps: true,
});


const newsLetter = mongoose.model('newsletter',newsletterSchema);

module.exports = newsLetter;