require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');
const connectDB = require('./databases/connect');
// async errors
const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/error-handler');
const PORT = process.env.PORT || 3500;
const ProductsRouter = require('./routes/productRoutes');
// Connect to DB
connectDB();

// Express JSON middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Routes
app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products"> Product Routes</a>')
} )

app.use('/api/v1/products', ProductsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Connect DB/2
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});