import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCartItem, getCartItem, updateCartItems } from '../../api/apiOrder'
import { ItemContext } from '../../App'
import { userInfo } from '../../utils/auth'
import Layout from '../Layout'
import CartItem from './CartItem'

export default function Cart() {
    const [cartItems, setCardItem] = useState([])
    console.log(cartItems)
    const loadCart = () => {
        getCartItem(userInfo().token)
            .then(res => setCardItem(res.data.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        loadCart()
    }, [])

    const increaseItem = item => {
        if (item.count === 5) return
        let cartItem = {
            ...item,
            count: item.count + 1
        }
        updateCartItems(userInfo().token, cartItem)
            .then(res => loadCart())
    }

    const decreaseItem = item => {
        if (item.count === 0) return
        let cartItem = {
            ...item,
            count: item.count - 1
        }
        updateCartItems(userInfo().token, cartItem)
            .then(res => loadCart())
    }

    const getCartTotal = () => {
        const sum = cartItems.map(item => item.price * item.count).reduce((a, b) => a + b, 0)
        return sum
    }
    let itemCounterFunction = useContext(ItemContext)[1]
    const removeItem = item => {
        if (!window.confirm("Delete Item?")) return
        deleteCartItem(userInfo().token, item)
            .then(res => {
                loadCart()
                getCartItem(userInfo().token)
                    .then(res => itemCounterFunction(res.data.data.length))
            })
            .catch(err => console.log(err))
    }
    return (
        <Layout title="Your Cart" description="Hurry up! Place your order!" className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Shopping</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Cart</li>
                </ol>
            </nav>
            <div className="container my-5 text-center">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="15%">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" align="right">Price</th>
                            <th scop="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            cartItems?.map((item, i) => <CartItem item={item} serial={i + 1} key={item._id} decreaseItem={decreaseItem} increaseItem={increaseItem} removeItem={removeItem}></CartItem>)
                        }

                        <tr>
                            <th scope="row" />
                            <td colSpan={1} style={{ fontWeight: "bolder" }}>Total</td>
                            <td colSpan={2} />
                            <td align="right" style={{ fontWeight: "bolder" }}>৳ {getCartTotal()}</td>
                            <td />
                        </tr>
                        <tr>
                            <th scope="row" />
                            <td colSpan={4} className="text-right">
                                <Link to="/"><button className="btn btn-warning mr-4 mx-5">Continue Shoping</button></Link>
                                <Link to="/shippingAdress" className="btn btn-success mr-4">Proceed To Checkout</Link>
                            </td>
                            <td />
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )

}
