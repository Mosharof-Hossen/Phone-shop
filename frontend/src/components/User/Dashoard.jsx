import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getOrderProduct } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth'
import Layout from '../Layout';
import Purchas from './Purchas';

export default function Dashoard() {
    let { name, email, role, token } = userInfo()
    let [orderProduct, setOrderProduct] = useState([])
    useEffect(() => {
        getOrderProduct(token)
            .then(res => setOrderProduct(res.data))
    }, [])
    const UserLink = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/card-item" className="nav-link">My Cart</Link></li>
                </ul>
                <ul className="list-group">
                    <li className="list-group-item"><Link to="/profile-update" className="nav-link">Update Profile</Link></li>
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

    const PurchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase History</h3>
            <table className="table table-hover " >
                <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col" align="right">Price</th>
                        <th scop="col">Date/Time</th>
                        <th scop="col">Address</th>
                        <th scop="col">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        orderProduct.map((items, i) => <Purchas key={items._id} _id={items._id} items={items}></Purchas>)
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
                    <PurchaseHistory></PurchaseHistory>
                </div>
            </div>

        </Layout>
    )
}
