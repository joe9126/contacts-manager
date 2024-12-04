const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT||5000;
connectDB();

app.use(express.json());
app.use('/api/contacts', require("./routes/contactRouter"));
app.use('/api/users', require("./routes/userRouter.js"));

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
});