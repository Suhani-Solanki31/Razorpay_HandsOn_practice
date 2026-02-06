import axios from "axios";
import React from "react";
import { useState } from "react";

const App = () => {
  const [amount, setAmount] = useState(0);

  const HandlePay = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        { amount },
      );

      if (res) {
        console.log("res from app.js  => ", res);

        let options = {
          key: res.data?.rzp_key_id,
          amount: res.data?.order.amount,
          currency: "INR",
          order_id: res.data?.order.order_id,
          name: "BASIC RAZORPAY",
          description: "Testing the Transaction",

          handler: async (response) => {
            let res = await axios.post(
              "http://localhost:3000/api/payment/verify-payment",
              response,
            );

            if (res) {
              console.log("res in handler is : ", res);
            }
          },
          theme:{
            color:"gray",
          }
        };

        console.log("options from app.js43 : ",options);

        let rzp = new window.Razorpay(options);
        rzp.open();

      }
    } catch (error) {
      console.log("errror in API : ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Secure Payment
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Enter amount to proceed with payment
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <input
              type="number"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg font-medium placeholder-gray-400 shadow-sm hover:shadow-md"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-sm font-medium text-gray-500">INR</span>
            </div>
          </div>

          <button
            onClick={HandlePay}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center space-x-2 group">
            <span>Pay Now</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>

        <div className="text-center pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            🔒 Secure • Lightning Fast • 100% Safe
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
