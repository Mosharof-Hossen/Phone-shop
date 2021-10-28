const { purchas, allOrder, orderUpdate } = require("../controllers/orderController")
const { admin } = require("../middlewares/admin")
const { authorize } = require("../middlewares/authorize")

const router = require("express").Router()

router.route("/purchas")
    .get(authorize, purchas)
router.route("/allorders")
    .get([authorize, admin], allOrder)
router.route("/orderUpdate/:id")
    .put([authorize, admin], orderUpdate)





module.exports.purchasRouter = router