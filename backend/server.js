require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI || "mongodb+srv://ysdf:ysdfpassword@cluster0.nvdqk.mongodb.net/ysdf?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully at",uri);
})

const registrationRouter = require('./routes/registration');
const authRouter = require('./routes/auth');
app.use('/registration', registrationRouter);
app.use('/auth', authRouter);




app.listen(port,() => 
{
    console.log(`Server is running on port : ${port}`)
})