const { model, Schema } = require("mongoose");
const { CartItemSchema } = require("./cartItem");

module.exports.Order = model("Order", Schema({
    cartItems: [CartItemSchema],
    transactionId: {
        type: String,
        unique: true
    },
    address: {
        phone: String,
        address1: String,
        address2: String,
        city: String,
        postcode: Number,
        country: String
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Ongoing", "Complete"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    sessionKey: String
}, { timestamps: true }))