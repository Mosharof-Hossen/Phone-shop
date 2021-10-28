import React from 'react'
import { Link } from 'react-router-dom';
import { API } from '../../utils/config';
import "./home.css"

export default function Cart({ product, handleAddToCart }) {
    const titleStyle = {
        display: "block",
        textOverflow: "ellipsis",
        wordWrap: "break-word",
        overflow: "hidden",
        maxHeight: "2em",
        lineHeight: "1em"
    }
    const imgStyle = {
        height: 250,
        objectFit: "cover",
        objectPosition: "0px 0px"
    }
    return (
        <div className=" my-3 cardStyle">
            <div className="card" style={{ width: "15rem" }}>
                <img
                    src={`${API}/product/photo/${product._id}`}
                    alt={product.name}
                    style={imgStyle}
                    className="card-img-top"
                />
                <div className="card-body">
                    <div style={{ minHeight: "" }}>
                        <h6 style={titleStyle}>{product.name}</h6>
                    </div>

                    <small><span style={{ fontSize: 20 }}>&#2547;</span> {product.price}</small>
                    <p>{product.quentity ? (<span className="badge bg-primary">In Stock</span>) : (<span className="badge  bg-danger">Out of Stock</span>)}</p>
                    <Link to={`/product/${product._id}`}>
                        <button className="btn btn-outline-warning btn-sm">View Product</button>
                    </Link>
                    {product.quentity ? <>
                        &nbsp;<button className="btn btn-outline-primary btn-sm" onClick={() => handleAddToCart(product)} >Add to Cart</button>
                    </> : ""}
                </div>
            </div>
        </div>
    )
}
