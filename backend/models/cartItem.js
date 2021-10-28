const { Schema, model } = require("mongoose");

const CartItemSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    price: Number,
    count: { type: Number, default: 1 },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })


exports.CartItemSchema = CartItemSchema
exports.CartItem = model("CartItem", CartItemSchema)