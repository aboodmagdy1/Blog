const mongoose  = require('mongoose');

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.DATABASE_URI)
        console.log(`Database connected: ${connection.connection.host}`)
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB;