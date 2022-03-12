if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} // If not in prodcution mode then require the DotEnv
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/register.model');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded(true))
//initializing static directory
app.use(express.static(__dirname + '/static/'));
// Set the template engine as pug
app.set('view engine', 'pug')
// Set the views directory
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser());
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || "mongodb+srv://ysdf:ysdfpassword@cluster0.nvdqk.mongodb.net/ysdf?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully at", uri);
})

const registrationRouter = require('./routes/registration');
const authRouter = require('./routes/auth');
const newsletterRouter = require('./routes/newsletter');
const adminRouter = require('./routes/admin');
const quizRouter = require('./routes/quiz');
const mediaRouter = require('./routes/media');
const activityRouter = require('./routes/activities');
const requireAdmin = function (req, res, next) {
    const authorization = req.cookies.nToken;
    const decoded = jwt.verify(authorization, "process.env.JWTPRIVATEKEY");
    const userId = decoded._id;
    User.findById(userId, function (err, foundID) {
        const isAdmin = foundID.isAdmin;
        if (isAdmin) {
            next();
        } else {
            return res.json({
                message: "You are not authorized to perform this action"
            });
        }
    })
}

app.use('/activity', activityRouter);
app.use('/registration', registrationRouter);
app.use('/auth', authRouter);
app.use('/newsletter', newsletterRouter);
app.use('/admin', requireAdmin, adminRouter);
app.use('/quiz', quizRouter);
app.use('/media', mediaRouter);

app.get('/', (req, res) => {
    res.status(200).render('index');
});
app.get('/blog', (req, res) => {
    res.status(200).render('blog');
})
app.get('/campaigns', (req, res) => {
    res.status(200).render('campaigns');
})
app.get('/discuss', (req, res) => {
    res.status(200).render('discuss');
})
app.get('/groups', (req, res) => {
    res.status(200).render('groups');
})
app.get('/login', (req, res) => {
    res.status(200).render('login');
})
app.get('/myGovRegister', (req, res) => {
    res.status(200).render('myGovRegister');
})
app.get('/podcast', (req, res) => {
    res.status(200).render('podcast');
})
app.get('/poll', (req, res) => {
    res.status(200).render('poll');
})
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    axios.post('http://localhost:5000/auth/login', {
        email: req.body.email,
        password: req.body.password
    }).then(response => {
        console.log(response.data);
        res.render('index',{isLogged: "Logged In"});
    }).catch(err => {
        res.render('index', {isLoggedFailed: "Failed to Login"});
    });
})
app.post('/myGovRegister', (req, res) => {

    axios.post('http://localhost:5000/registration/add', {
        fullName : req.body.name,
        email : req.body.email,
        password : req.body.password,
        country : req.body.country,
        phone : req.body.phone,
        gender : req.body.gender,
    }).then(response => {
        res.render('index', {
            success : "Registration successful"
        });
    }).catch(err => {
        res.render('index', {
            failed : "Registration failed . Email or Phone number already exists"
        });
    });
})
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})