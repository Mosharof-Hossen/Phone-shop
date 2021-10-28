let formidable = require("formidable")
const { productValidator } = require("../validators/productValidator")
const { pick, assignIn } = require("lodash")
const { Products } = require("../models/product")
let fs = require("fs")
exports.createProduct = async (req, res) => {
    let form = new formidable.IncomingForm;
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {

        if (err) return res.status(400).send('Something went wrong!');
        const { error } = productValidator(pick(fields, ['name', 'description', 'price', 'quentity', 'category']));
        if (error) return res.status(400).send(error.details[0].message);

        if (files.photo) {
            const product = new Products(fields);

            const path = files.photo.path
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
            product.save((err, result) => {
                if (err) return res.status(400).send('There is a problem in file');
                else {
                    return res.status(200).send({
                        message: 'Product added successfully',
                        data: pick(fields, ['name', 'description', 'price', 'quentity', 'category'])
                    })
                }
            })

        } else {
            return res.status(400).send('No Image is uploaded!');
        }
    })
}


exports.getProduct = async (req, res) => {
    try {
        let order = req.query.order === "desc" ? -1 : 1;
        let sortBy = req.query.sortBy ? req.query.sortBy : "name";
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const products = await Products.find()
            .select({ photo: 0 })
            .sort({ [sortBy]: order })
            .limit(limit)
            .populate("category", "name")
        res.status(200).send(
            products
        )
    } catch (err) {
        console.log(err)
    }
}


exports.getProductById = async (req, res) => {
    try {
        let product = await Products.findById(req.params.id)
            .populate("category", "name")
            .select({ photo: 0 })
        if (!product) return res.status(400).send("Not found")
        return res.status(200).send(product)
    } catch (err) {
        console.log(err)
    }
}
exports.getPhoto = async (req, res) => {
    try {
        let productId = req.params.id
        const product = await Products.findById(productId)
            .select({ photo: 1 })
        res.set("Content-Type", product.photo.contentType)
        return res.status(200).send(product.photo.data)

    } catch (err) {
        console.log(err)
    }
}
exports.updateProductById = async (req, res) => {
    try {
        let productId = req.params.id
        const product = await Products.findById(productId)
        let form = new formidable.IncomingForm()
        form.keepExtensions = true;
        form.parse(req, (err, fields, files) => {
            if (err) return res.status(400).send("Form data error")
            const updatedFields = pick(fields, ["name", "description", "price", "category", "quentity"])
            assignIn(product, updatedFields)
            if (files.photo) {
                fs.readFile(files.photo.path, (err, data) => {
                    if (err) return res.status(400).send("Problem in file data")
                    product.photo.data = data
                    product.photo.contentType = files.photo.type
                    product.save((err, result) => {
                        if (err) return res.status(500).send("Something Failed")
                        else return res.status(200).send({
                            message: "Product Updated Successully"
                        })
                    })
                })
            } else {
                product.save((err, result) => {
                    if (err) return res.status(500).send("Something Failed")
                    else return res.status(200).send({
                        message: "Product Updated Successully"
                    })
                })
            }
        })

    } catch (err) {
        console.log(err)
    }
}
// let body = {
//     order: "desc",
//     sortBy: "price",
//     limit: 6,
//     skip: 20,
//     fileters: {
//         price: [100, 10000],
//         category: [category Id]
//     }
// }

exports.filterProducts = async (req, res) => {
    try {
        let order = req.body.order === "desc" ? -1 : 1;
        let sortBy = req.body.sortBy ? req.body.sortBy : "name";
        let limit = req.body.limit ? parseInt(req.body.limit) : 10;
        let skip = parseInt(req.body.skip)

        let filters = req.body.filters
        let args = {}

        for (let key in filters) {
            if (filters[key].length > 0) {
                if (key === "price") {
                    args[key] = {
                        $lte: filters.price[1],
                        $gte: filters.price[0]
                    }
                }
                if (key === "category") {
                    args[key] = {
                        $in: filters.category
                    }
                }
            }
        }

        let product = await Products.find(args)
            .select({ photo: 0 })
            .populate("category", "name")
            .sort({ [sortBy]: order })
            // .skip(skip)
            .limit(limit)
        return res.status(200).send(product)
    } catch (err) {
        console.log(err)
    }
}