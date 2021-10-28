const { createCategory, getCategories } = require("../controllers/categoryControllers")
const { admin } = require("../middlewares/admin")
const { authorize } = require("../middlewares/authorize")

let router = require("express").Router()

router.route("/")
    .post([authorize, admin], createCategory)
    .get(getCategories)


module.exports.categoryRouters = router