import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCartItem, getProfile } from '../../api/apiOrder'
import { userInfo } from '../../utils/auth'
import Layout from '../Layout'

export default function CheckOut() {
    const [orderItems, setOrderItems] = useState([]);
    const [values, setValues] = useState({
        phone: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: ''
    });

    const { phone, address1, address2, city, postcode, country } = values;
    const loadCart = () => {
        getCartItem(userInfo().token)
            .then(res => setOrderItems(res.data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getProfile(userInfo().token)
            .then(response => setValues(response.data))
            .catch(err => { })
        loadCart()
    }, [])
    const shippinDetails = () => (
        <>
            To,<br />
            <b>{userInfo().name}</b>
            <br /> Phone: {phone}
            {address2 ? (<><br />{address2}</>) : ""}
            <br /> {city}-{postcode}, {country}
        </>
    )
    const getOrderTotal = () => {
        let sum = orderItems.map(item => item.price * item.count).reduce((a, c) => a + c, 0)
        return sum
    }
    if (address1 && city && phone && postcode && country) return (<>
        <Layout title="CheckOut" className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/shopping">Shopping</Link></li>
                    <li className="breadcrumb-item"><Link to="/card-item">Cart</Link></li>
                    <li className="breadcrumb-item"><Link to="/shippingAdress">Shipping Address</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                </ol>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <div className="card mb-5" style={{ height: 'auto' }}>
                            <div className="card-header">Shipping Details</div>
                            <div className="card-body">
                                {shippinDetails()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card" style={{ height: 'auto' }}>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">

                                    {orderItems.map(item => <li key={item._id} className="list-group-item" align="left" >{item.product ? item.product.name : ""} * {item.count} = ৳ {item.price * item.count}</li>)}

                                </ul>
                            </div>
                            <div className="card-footer">
                                <span className="float-left"><b>Order Total</b></span>
                                <span className="float-right"><b>৳ {getOrderTotal()}</b></span>
                            </div>
                        </div>
                        <br />
                        <p><Link className="btn btn-warning btn-md" to="/payment">Make Payment</Link></p>
                    </div>
                </div>

            </div>
        </Layout>
    </>
    )
    else return (<></>)
}
