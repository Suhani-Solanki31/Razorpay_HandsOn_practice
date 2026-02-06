const express = require("express");
const { CreateOrderController, VerifyPaymentController } = require("../controllers/payment.controllers");

const routes = express.Router();

routes.post("/create-order",CreateOrderController);
routes.post("/verify-payment",VerifyPaymentController);

module.exports = routes;