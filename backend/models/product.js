const { model, Schema } = require("mongoose");

exports.Products = model("Product", Schema({
    name: String,
    description: String,
    price: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    quentity: Number,
    photo: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true }))