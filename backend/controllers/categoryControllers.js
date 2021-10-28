const { pick } = require("lodash")
const { Category } = require("../models/category")
const { categoryValidator } = require("../validators/categoryValidator")

exports.createCategory = async (req, res) => {
    try {
        let { error } = categoryValidator(pick(req.body, ["name"]))
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        let category = new Category(pick(req.body, ["name"]))
        let result = await category.save()
        console.log(result)
        return res.status(200).send({
            message: "category create successfully",
            data: {
                name: result.name
            }
        })

    } catch (err) {
        res.send(err)
    }
}
exports.getCategories = async (req, res) => {
    try {
        const catagories = await Category.find()
            .select({ _id: 1, name: 1 })
            .sort({ "name": 1 })

        return res.status(200).send(catagories)
    } catch (err) {
        console.log(err)
    }
}