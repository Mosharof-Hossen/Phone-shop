import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getProductDetails } from '../../api/api.Product'
import { addToCart, getCartItem } from '../../api/apiOrder'
import { ItemContext } from '../../App'
import { isAuthenticated, userInfo } from '../../utils/auth'
import { API } from '../../utils/config'
import { showError, showSuccess } from '../../utils/message'
import Layout from '../Layout'

export default function ProductDetails(props) {
    let { id } = useParams()
    const [product, setProduct] = useState({})

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        getProductDetails(id)
            .then(res => setProduct(res.data))
            .catch(err => setError("Server Failed"))
    }, [id])
    let itemCounterFunction = useContext(ItemContext)[1]
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
                    getCartItem(userInfo().token)
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
            setError(false)
            setSuccess(false)
        }, 2000);
    }

    let showSuccess = (success, msg) => {
        if (success) {
            return <div className="alert alert-success">{msg}</div>
        }
    }

    return (
        <Layout title="Product Details" className="container">
            <nav aria-label="breadcrumb ">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item text-mute">Product</li>
                    <li className="breadcrumb-item active" aria-current="page">{product.category ? product.category.name : ""}</li>
                </ol>
            </nav>
            <div>
                {showError(error, error)}
                {showSuccess(success, success)}
            </div>
            <div className="row ">
                <div className="col-5">
                    <img
                        src={`${API}/product/photo/${product._id}`}
                        alt={product.name}
                        width="100%"
                    />
                </div>
                <div className="col-7">
                    <h3>{product.name}</h3>
                    <span style={{ fontSize: 20 }}>&#2547;</span>{product.price}
                    <p>{product.quentity ? (<span className="badge bg-primary">In Stock: {product.quentity}</span>) : (<span className="badge bg-danger">Out of Stock</span>)}</p>
                    <p>{product.description}</p>
                    {product.quentity ? <>
                        &nbsp;<button className="btn btn-outline-primary btn-md" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </> : ""}
                </div>
            </div>
        </Layout>
    )
}
