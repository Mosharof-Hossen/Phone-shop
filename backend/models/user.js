const { sign } = require("jsonwebtoken");
const { Schema, model } = require("mongoose");

let userSchema = Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true })


userSchema.methods.generateJWT = function () {
    let token = sign({
        _id: this._id,
        email: this.email,
        role: this.role,
        name: this.name
    }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })
    return token
}


module.exports.User = model("User", userSchema)