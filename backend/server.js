require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const User = require('./models/register.model');

const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

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

app.use('/registration', registrationRouter);
app.use('/auth', authRouter);
app.use('/newsletter', newsletterRouter);
app.use('/admin', requireAdmin, adminRouter);


app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})