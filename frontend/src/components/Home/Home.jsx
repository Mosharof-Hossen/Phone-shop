import React, { useContext, useEffect, useState } from 'react'
import { getFilteredProduct, getProducts } from '../../api/api.Product'
import { getCategories } from '../../api/ApiAdmin'
import { addToCart, getCartItem } from '../../api/apiOrder'
import { ItemContext } from '../../App'
import { isAuthenticated, userInfo } from '../../utils/auth'
import { showError, showLoading } from '../../utils/message'
import { pricess } from '../../utils/price'
import Layout from '../Layout'
import Cart from './Cart'
import CategoryChackBox from './CategoryChackBox'
import PriceCategory from './priceCategory'

export default function Home() {
    const [products, setProducts] = useState([])
    const [sortBy, setSortBy] = useState("price")
    const [order, setOrder] = useState("desc")
    const [limit, setLimit] = useState(20)
    const [skip, setSkip] = useState(0)
    const [prices, setPrices] = useState(pricess)

    let itemCounterFunction = useContext(ItemContext)[1]
    // console.log(itemCounterFunction);

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const [categories, setCategories] = useState([])
    const [filters, setFilters] = useState({
        category: [],
        price: []
    })


    useEffect(() => {
        setLoading(true)
        getProducts(sortBy, order, limit)
            .then(res => {
                setProducts(res.data)
                setLoading(false)

            })
            .catch(err => setError("Failed to load products"))

        getCategories()
            .then(res => setCategories(res.data))
            .catch(err => setError("Failed to load categories"))
    }, [sortBy, order, limit])

    let handleFileters = (myfilters, filterBy) => {
        let newFilters = { ...filters }
        if (filterBy === "category") {
            newFilters[filterBy] = myfilters
        }
        if (filterBy === "price") {
            let priceArr = prices.filter(price => price.id === parseInt(myfilters))[0].arr
            newFilters[filterBy] = priceArr
        }
        setFilters(newFilters)
        getFilteredProduct(skip, limit, newFilters, order, sortBy)
            .then(res => setProducts(res.data))
            .catch(err => setError("Failed to load products"))
    }

    const handleAddToCart = product => {
        if (isAuthenticated()) {
            // setError(false)
            // setSuccess(false)
            const user = userInfo()
            const cartItem = {
                user: user._id,
                product: product._id,
                price: product.price
            }
            addToCart(user.token, cartItem)
                .then(res => {
                    setSuccess(res.data.message)
                    setError(false)
                    getCartItem(user.token)
                        .then(res => itemCounterFunction(res.data.data.length))
                })
                .catch(err => {
                    if (err.response) {
                        setError(err.response.data)
                        setSuccess(false)
                    }
                    else {
                        setError("Adding to cart Failed")
                        setSuccess(false)
                    }
                })
        } else {
            setSuccess(false)
            setError("Please Login First")
        }
        setTimeout(() => {
            setSuccess(false)
            setError(false)
        }, 2000);
    }

    let showFilters = () => {
        return (
            <div className="row">
                <div className="col-md-3 p-4">
                    <h5>Filter By Categories:</h5>
                    <CategoryChackBox categories={categories} handleFileters={handleFileters}></CategoryChackBox>
                </div>
                <div className="col-md-5 p-4">
                    <h5>Filter By Price:</h5>
                    <div className="row">
                        <PriceCategory prices={prices} handleFileters={handleFileters}></PriceCategory>
                    </div>
                </div>
            </div>
        )
    }
    let showSuccess = (success, msg) => {
        if (success) {
            return <div className="alert alert-success">{msg}</div>
        }
    }

    return (
        <div>
            <Layout title="Home Page" className="container">
                {showFilters(success, "Added to Cart")}
                <div style={{ width: "100%" }}>
                    {showError(error, error)}
                    {showLoading(loading)}
                    {showSuccess(success, success)}
                </div>
                <div className="d-flex justify-content-around  flex-wrap">
                    {products && products.map(product => <Cart product={product} handleAddToCart={handleAddToCart} key={product._id} />)}
                </div>

            </Layout>
        </div>
    )
}
