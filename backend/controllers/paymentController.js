const SSLCommerz = require("ssl-commerz-node");
const { CartItem } = require("../models/cartItem");
const { Order } = require("../models/Order");
const { Payment } = require("../models/Payment");
const { Profile } = require("../models/profile");
const PaymentSession = SSLCommerz.PaymentSession;
const path = require('path');

// Request a session
// Payment Process
// Receive IPN
// Create and Order -after response


exports.ipn = async (req, res) => {
    const payment = new Payment(req.body)
    const tran_id = payment.tran_id
    let order = await Order.find({ transactionId: tran_id })
    console.log(req.body)
    console.log(payment)
    console.log(tran_id)
    console.log(order)
    if (payment.status === "VALID") {
        await CartItem.deleteMany(order.cartItems)
    }
    else {
        await Order.deleteOne({ transactionId: tran_id })
    }
    await payment.save()
    return res.status(200).send("IPN")
}

exports.initPayment = async (req, res) => {

    const userId = req.user._id
    let cartItem = await CartItem.find({ user: userId })

    let profile = await Profile.findOne({ user: userId })
    const { address1, address2, city, state, postcode, country, phone } = profile


    const priceArr = cartItem.map(item => item.count * item.price)
    const totalAmount = priceArr.reduce((a, b) => a + b, 0)

    const totalItem = cartItem.map(item => item.count).reduce((a, c) => a + c, 0)

    let tran_id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    const payment = new PaymentSession(
        true,
        process.env.SSLCOMMERZ_STORE_ID,
        process.env.SSLCOMMERZ_STORE_PASSWORD
    );
    // Set the urls
    payment.setUrls({
        success: "https://fierce-crag-96832.herokuapp.com/api/payment/success", // If payment Succeed
        fail: "yoursite.com/fail", // If payment failed
        cancel: "yoursite.com/cancel", // If user cancel payment
        ipn: "https://fierce-crag-96832.herokuapp.com/api/payment/ipn", // SSLCommerz will send http post request in this link
    });

    // Set order details
    payment.setOrderInfo({
        total_amount: totalAmount, // Number field
        currency: "BDT", // Must be three character string
        tran_id: tran_id, // Unique Transaction id
        emi_option: 0, // 1 or 0
    });

    // Set customer info
    payment.setCusInfo({
        name: req.user.name,
        email: req.user.email,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
        phone: phone,
        fax: phone,
    });
    // Set shipping info
    payment.setShippingInfo({
        method: "Courier", //Shipping method of the order. Example: YES or NO or Courier
        num_item: totalItem,
        name: req.user.name,
        add1: address1,
        add2: address2,
        city: city,
        state: state,
        postcode: postcode,
        country: country,
    });

    // Set Product Profile
    payment.setProductInfo({
        product_name: "phone products",
        product_category: "General",
        product_profile: "general",
    });

    let response = await payment.paymentInit()
    console.log(profile)
    let order = new Order({
        cartItems: cartItem,
        user: userId,
        transactionId: tran_id,
        address: {
            phone: phone,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            postcode: postcode,
            country: country
        }
    })
    console.log(order)
    if (response.status === "SUCCESS") {
        order.sessionKey = response["sessionkey"]
        await order.save()
    }
    return res.status(200).send(response)
}

module.exports.paymentSuccess = async (req, res) => {
    res.sendFile(path.join(__basedir + "/public/success.html"))
}