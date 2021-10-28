const { initPayment, ipn, paymentSuccess } = require("../controllers/paymentController")
const { authorize } = require("../middlewares/authorize")

const router = require("express").Router()

router.route('/')
    .get(authorize, initPayment)

router.route("/ipn")
    .post(ipn)

router.route("/success")
    .post(paymentSuccess)

module.exports.paymentRoute = router