    const { createRazorpayInstance } = require("../config/razorpay.config");
    const crypto = require("crypto");

    require("dotenv").config();
    const razorpayInstance = createRazorpayInstance();
    
    // const courseId = 4;
    // const amount = 4000;
    
    exports.createOrder = async ( req , res ) => {
    const { courseId , amount } = req.body;

    // any purchase should come from the backend and not the frontend as 
    // user can make changes in inspect element and manipulate the price easily


    //create an order 

    const options = {
        amount : amount * 100,
        currency : "INR",
        receipt : `receipt_order_1`
    };


    try {
            razorpayInstance.orders.create(options , ( err , order ) => {
                if(err) {
                    return res.status(500).json({
                        success: false,
                        message: "Something went wrong",
                    });
                }
                return res.status(200).json(order);
            })

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: " Something went wrong ",
        });

    }
};



exports.verifyPayment = async ( req , res ) => {
    const { order_id , payment_Id , signature } = req.body;

    const  secret = process.env.RAZORPAY_KEY_SECRET;

    // create hmac object

    const hmac = crypto.createHmac("sha256", secret)

    hmac.update(order_id + "|" + payment_Id);

    const generateSignature = hmac.digest("hex");

    if (generateSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment not verified",
        });

    }

};