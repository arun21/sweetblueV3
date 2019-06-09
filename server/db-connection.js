const mongoose = require('mongoose');
const config = require('./config');

module.exports = {
    connect: () => {
        mongoose.promise = global.Promise;
        
        //Getting the configuration for database
        mongoose.connect(config.dbConnection);
    
        //Mongo DB successfull connection
        mongoose.connection.on('connected', () => {
            console.log('Connected to databse ' + config.dbConnection);
        });
    
        //Mongo DB connection Error
        mongoose.connection.on('error', (err) => {
            console.log('Database Error ' + err);
        });
    }
}