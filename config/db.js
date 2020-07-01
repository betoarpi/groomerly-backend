const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});

const databaseConection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Successfuly connected to the database!')
    } catch (error) {
        console.log('There was an error trying to connect to the database.');
        console.log(error);
        process.exit(1); //stop the app
    }
}

module.exports = databaseConection;