const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema(
    {
        user_id: String,
        order_id: {
            type: String,
            required: true,
        },
        payment_id: String,
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["CREATED", "FAILURE", "SUCCESS", "PENDING", "DECLINED"],
            default: "CREATED",
        },
    },
    {
        timestamps: true
    }
);

const PaymentModel = mongoose.model("payment",paymentSchema);
module.exports = PaymentModel;