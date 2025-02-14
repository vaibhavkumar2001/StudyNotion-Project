const mongoose = require('mongoose')
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( () => {
        console.log('Database Connected Successfully')
    })
    .catch( (error) => {
        console.log("Error In connecting to DataBase");
        process.exit(1);
    });
}
