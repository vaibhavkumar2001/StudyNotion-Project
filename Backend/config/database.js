const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Error in connecting to Database:', error);
        process.exit(1);
    }
};