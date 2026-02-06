const PaymentModel = require("../models/payment.model");
const RazorpayInstance = require("../services/payment.services");
const crypto = require("crypto");

const CreateOrderController = async (req, res) => {
  try {
    let { amount } = req.body;

    if (!amount) {
      return res.status(404).json({
        success: false,
        message: "Amount is required",
      });
    }

    let options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    //creating the order
    let order = await RazorpayInstance.orders.create(options);

    let newOrder = await PaymentModel.create({
      order_id: order.id,
      amount: amount,
    });

    return res.status(201).json({
      success: true,
      message: "order created successfully",
      order: newOrder,
      rzp_key_id: process.env.RZP_KEY_ID,
    });
  } catch (error) {
    // console.log("error : ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const VerifyPaymentController = async (req, res) => {
  try {
    let { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed!",
      });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    
    let expectedSign = crypto
      .createHmac("sha256", process.env.RZP_SECRET_ID)
      .update(body.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      await PaymentModel.findOneAndUpdate(
        {
          order_id: razorpay_order_id,
        },
        {
          payment_id: razorpay_payment_id,
          status: "SUCCESS",
        },
        {
          new: true,
        },
      );
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: error.message,
    });
  }
};

module.exports = { CreateOrderController, VerifyPaymentController };
