const express = require("express");
const routes = require("./routes/payment.routes");
const connectDB = require("./config/DB");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors({
    origin:"*",
}))

//connect DB
connectDB();

//middlewares
app.use(express.json());
app.use("/api/payment",routes)




app.get("/",(req,res)=>{
    res.send("hii from server");
})

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("working on port ",port);
    
})