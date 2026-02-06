const razorpay = require("razorpay");
require("dotenv").config();


if (!process.env.RZP_KEY_ID || !process.env.RZP_SECRET_ID) {
  throw new Error("Razorpay keys missing in environment variables");
}

const RazorpayInstance = new razorpay({
    key_id:process.env.RZP_KEY_ID,
    key_secret:process.env.RZP_SECRET_ID,
})

module.exports = RazorpayInstance;
