const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        let res = await mongoose.connect("mongodb://localhost:27017/razorPay_dataBase");
        if(res){
            console.log("Database is connected");
        }
    } catch (error) {
        console.log("Error in connect DB : ",error)
    }
}

module.exports = connectDB;