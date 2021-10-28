import React, { useEffect, useState } from 'react'
import { getProductDetails } from '../../api/api.Product';

export default function ProductName(props) {
    let { product } = props.product
    const [productname, setProduct] = useState({})

    useEffect(() => {
        getProductDetails(product)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [product])
    return (
        <li>
            {productname.name}
        </li>
    )
}
