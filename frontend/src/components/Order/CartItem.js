import React from 'react'
import { API } from '../../utils/config'

export default function CartItem({ item, serial, increaseItem, decreaseItem, removeItem }) {
    return (
        <tr>
            <th scope="row">{serial}</th>
            <th> <img src={`${API}/product/photo/${item.product._id}`} alt={item.product.name} width="35px" /> </th>
            <td>{item.product ? item.product.name : ""}</td>
            <td>
                <button onClick={() => decreaseItem(item)} className="btn btn-outline-primary btn-sm">-</button>
                &nbsp;&nbsp; {item.count} &nbsp;&nbsp;
                <button onClick={() => increaseItem(item)} className="btn btn-outline-primary btn-sm">+</button>
            </td>
            <td align="right">৳ {item.price * item.count} </td>
            <td><button className="btn btn-danger btn-sm" onClick={() => removeItem(item)}>Remove From Cart</button></td>
        </tr>)
}
