const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    isAdmin: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of Birth is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    }
},
{
    timestamps: true,
});

registrationSchema.methods.generateAuthToken = function()
{
    const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:'7d'});
    return token;
}


const Registration = mongoose.model('Registration',registrationSchema);



module.exports = Registration;