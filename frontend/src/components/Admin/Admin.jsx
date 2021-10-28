import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllOrders, getOrderProduct } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import Layout from '../Layout';
import OrderManage from './OrderManage';

export default function Admin() {
    let { name, email, role, token } = userInfo()
    let [orderProduct, setOrderProduct] = useState([])
    useEffect(() => {
        getAllOrders(token)
            .then(res => setOrderProduct(res.data))
    }, [token])
    console.log(orderProduct);
    const UserLink = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/create/category" className="nav-link">Create Category</Link></li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/create/product" className="nav-link">Create Product</Link></li>
                </ul>
            </div>
        )
    }
    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">Email: {email}</li>
                <li className="list-group-item">Role: {role}</li>
            </ul>
        </div>
    )
    const OrderHistory = () => (
        <div className=" mb-5">
            <h3 className="card-header">Total Orders</h3>
            <table className="table table-hover " >
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="col">Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scop="col">Date/Time</th>
                        <th scop="col">Address</th>
                        <th scop="col">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        orderProduct.map((items, i) => <OrderManage key={items._id} _id={items._id} items={items}></OrderManage>)
                    }
                </tbody>
            </table>
        </div>
    )

    return (
        <Layout title="Dashboard" className="container">
            <div className="row">
                <div className="col-md-3">
                    <UserLink></UserLink>
                </div>
                <div className="col-md-9">
                    <UserInfo></UserInfo>
                </div>
            </div>
            <div>
                <OrderHistory></OrderHistory>

            </div>
        </Layout>
    )
}