const express = require('express');

const errorHandler = require('./middleware/erroeHandler');
const { connectDb } = require('./config/dbConnection');
const validateToken = require('./middleware/validateTokdenHandler');
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
connectDb();
const port = process.env.PORT || 5000;
app.use(validateToken)
app.use('/api/users', require('./routes/userRoutes'));
app.use("/api/contacts", require("./routes/contactRoutes.js"))
// app.use(errorHandler)
app.listen(port, (res, req) => {
    console.log("Jai Shree Ram");
    
}) 