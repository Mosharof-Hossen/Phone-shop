import React, { useEffect, useState } from 'react'
import { getProductDetails } from '../../api/api.Product'
import { API } from '../../utils/config'
import moment from "moment"
import ProductName from './ProductName';
import { userInfo } from '../../utils/auth';
import { productStatusManage } from '../../api/apiOrder';

export default function OrderManage(props) {
    let { status, address, createdAt, user, _id } = props.items
    let item = props.items.cartItems
    console.log(item);


    let [orderStatus, setOrderStatus] = useState(status)
    console.log(orderStatus);
    let token = userInfo().token
    let handleChange = (e, _id) => {
        console.log(e.target.value, _id);
        let status = { status: e.target.value }
        productStatusManage(token, _id, status)
            .then(res => setOrderStatus(status.status))
            .catch(err => console.log(err))
    }
    return (
        <tr>
            <th>{user}</th>
            <th>
                <ul>
                    {
                        item.map(item => <li key={item._id}><img src={`${API}/product/photo/${item.product}`} alt={item.product} width="35px" /></li>)
                    }
                </ul>
            </th>
            <td>
                <ul>
                    {
                        item.map(item => <ProductName key={item._id} product={item}></ProductName>)
                    }
                </ul>
            </td>
            <td>
                <ul>
                    {
                        item.map(item => <li key={item._id}>{item.count} </li>)
                    }
                </ul>
            </td>
            <td>
                <ul>
                    {
                        item.map(item => <ul key={item._id}>{item.price * item.count}</ul>)
                    }
                </ul>
            </td>
            <td>{moment(createdAt).fromNow()}</td>
            <td>{address.address1},{address.address2},{address.city},{address.postcode}</td>
            <td>
                <select name="category" value={orderStatus} onChange={e => handleChange(e, _id)} className="form-control" required id="">
                    <option value={orderStatus}>{orderStatus}</option>
                    <option value="Pending">Pending</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Complite">Complite</option>

                </select>
            </td>
        </tr>
    )
}
