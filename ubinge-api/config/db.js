const mongoose= require('mongoose');
const colors= require('colors')

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongodb database ${mongoose.connection.host}`.bgCyan.white);
    }catch(err){
        console.log(`Mongodb database error ${err}`.bgRed.white)
    }
}

module.exports = connectDB;