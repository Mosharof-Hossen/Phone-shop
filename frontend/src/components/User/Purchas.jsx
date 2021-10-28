import React, { useEffect, useState } from 'react'
import { getProductDetails } from '../../api/api.Product';
import { API } from '../../utils/config';
import moment from "moment"
import ProductName from '../Admin/ProductName';
export default function Purchas(props) {
    let { status, address, createdAt, user, _id } = props.items
    let item = props.items.cartItems
    console.log(item);

    return (
        <tr>
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
            <td className="text-primary">{status}</td>
        </tr>
    )
}
