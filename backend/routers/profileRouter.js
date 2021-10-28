const { setProfile, getProfile } = require("../controllers/profileControllers")
const { authorize } = require("../middlewares/authorize")

let router = require("express").Router()

router.route("/")
    .post(authorize, setProfile)
    .get(authorize, getProfile)

module.exports.profileRouter = router