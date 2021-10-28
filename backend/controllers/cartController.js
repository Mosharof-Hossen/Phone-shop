const { pick } = require("lodash")
const { CartItem } = require("../models/cartItem")

exports.createCartItem = async (req, res) => {
    try {
        console.log(req.user._id)
        let { price, product } = pick(req.body, ["price", "product"])
        console.log(product)
        const item = await CartItem.findOne({
            user: req.user._id,
            product: product
        })
        if (item) return res.status(400).send("Item already Exists is Cart")
        let cartItem = new CartItem({
            product: product,
            price: price,
            user: req.user._id
        })
        let result = await cartItem.save()
        res.status(201).send({
            message: "Added successfully",
            item: result
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getCartItem = async (req, res) => {
    try {
        let item = await CartItem.find({ user: req.user._id })
            .populate("product", "name")
            .populate("user", "name")
        res.status(201).send({
            data: item
        })

    } catch (err) {

    }
}

exports.updateCartItem = async (req, res) => {
    const { _id, count } = pick(req.body, ['count', "_id"])
    let result = await CartItem.updateOne({ _id: _id, user: req.user._id }, { count: count })
    return res.status(200).send({
        message: "Item Updated!!",
        data: result
    })
}

exports.deleteCartItem = async (req, res) => {
    try {
        let itemId = req.params.id
        let result = await CartItem.deleteOne({ _id: itemId, user: req.user._id })
        console.log(result)
        res.status(200).send("Successfully deleted")
    } catch (err) {
        console.log(err)
    }
}