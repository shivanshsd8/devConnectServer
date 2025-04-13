const mongoose = require('mongoose');
require('dotenv').config()


// Just connecting to the db here :
async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://test:test@cluster0.zlxnz.mongodb.net/DevconnectDB");
        console.log('DB Connected !');
    }
    catch(err){
        console.log('Error connecting to db!' + err);
        
    }
}

module.exports = connectDB;