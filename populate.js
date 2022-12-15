require('dotenv').config()

const connectDB = require('./databases/connect');

const Product =  require('./models/Product');

const jsonProducts = require('./products.json');

const populate = async () => {
    try {
        await connectDB(process.env.DATABASE_URI);
        // await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Successful');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);    
    }
}

populate();