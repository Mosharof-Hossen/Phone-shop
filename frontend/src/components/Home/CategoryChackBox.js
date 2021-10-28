import React, { useState } from 'react'

export default function CategoryChackBox({ categories, handleFileters }) {
    const [checked, setChecked] = useState([])
    let totalId = [...checked]
    const handleToggle = id => {
        let foundId = totalId.indexOf(id)
        if (foundId === -1) {
            totalId.push(id)
        } else {
            totalId.splice(foundId, 1)
        }
        setChecked(totalId)
        handleFileters(totalId, "category")
    }
    return categories.map(category => (
        <div className="form-check" key={category._id}>
            <input className="form-check-input" type="checkbox" value="" onChange={() => handleToggle(category._id)} />
            <label className="form-check-label" >
                {category.name}
            </label>
        </div>
    ))
}
