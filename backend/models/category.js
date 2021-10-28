const { model, Schema } = require("mongoose");

exports.Category = model("Category", Schema({
    name: {
        type: String, unique: true
    }
}, { timestamps: true }))