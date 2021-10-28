import React from 'react'

export default function PriceCategory({ prices, handleFileters }) {

    const handleChange = e => {
        handleFileters(e.target.value, "price")
    }

    return prices.map(price => (
        <div className="form-check col-6" key={price.id}>
            <input className="form-check-input" type="radio" value={price.id} onChange={handleChange} name="price_filter" />
            <label className="form-check-label" >
                {price.name}
            </label>
        </div>
    ))
}
