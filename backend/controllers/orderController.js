const { Order } = require("../models/Order")

exports.purchas = async (req, res) => {
    try {
        let order = await Order.find({ user: req.user._id })
        res.send(order)
    } catch (err) {
        console.log(err)
    }
}
exports.allOrder = async (req, res) => {
    try {
        let order = await Order.find({})
        res.send(order)
    } catch (err) {
        console.log(err)
    }
}

exports.orderUpdate = async (req, res) => {
    try {
        let _id = req.params.id
        let data = req.body
        console.log(data)
        let result = await Order.updateOne({ _id: _id }, { $set: { status: data.status } })
        res.send(result)
    } catch (err) {
        console.log(err)
    }
}