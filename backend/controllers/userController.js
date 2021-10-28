const { genSalt, hash, compare } = require("bcrypt")
const { pick } = require("lodash")
const { User } = require("../models/user")
const { userValidator } = require("../validators/userValidator")

exports.signUp = async (req, res) => {
    try {
        console.log(req.body)

        let user = req.body

        let findUser = await User.findOne({ email: user.email })
        if (findUser) {
            return res.status(400).send("Allready registered with this email")
        }
        let { error } = userValidator(user)
        if (error) {
            console.log(error.details[0].message)
            return res.status(400).send(error.details[0].message)
        }


        user = new User(pick(user, ["name", "email", "password", 'role']))
        let salt = await genSalt(10)
        user.password = await hash(user.password, salt)
        const token = user.generateJWT()
        const result = await user.save()

        return res.status(201).send({
            message: "New Account Created. Please",
            token: token,
            user: pick(result, ["_id", "name", "email"])
        })
    } catch (err) {
        return res.status(500).send("Something wrong")
    }
}
exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("Invalid Email or password")
        }

        let validUser = await compare(req.body.password, user.password)
        if (!validUser) {
            return res.status(400).send("Invalid Email or password")
        }

        let token = user.generateJWT()
        res.send({
            message: "Login Successfull",
            token: token,
            user: pick(user, ["_id", "name", "email"])
        })

    } catch (err) {
        return res.status(500).send("Something wrong")
    }
}