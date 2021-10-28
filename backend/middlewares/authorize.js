const { verify } = require("jsonwebtoken")

exports.authorize = async (req, res, next) => {
    try {
        let token = req.header("Authorization")
        if (!token) {
            return res.status(400).send("Access denied. No token Provided")
        }
        token = token.split(" ")[1].trim()
        console.log(token)
        let decoded = verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(400).send("Invalid token")
        }
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).send("Invalid Token")
    }
}