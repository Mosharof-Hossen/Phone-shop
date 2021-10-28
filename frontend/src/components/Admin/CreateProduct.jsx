import React, { useEffect, useState } from 'react'
import { createProduct, getCategories } from '../../api/ApiAdmin'
import { userInfo } from '../../utils/auth'
import { showError, showLoading } from '../../utils/message'
import Layout from '../Layout'

export default function CreateProduct() {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        categories: [],
        quentity: "",
        loading: false,
        error: false,
        success: false,
        disabled: false,
        formData: new FormData()

    })
    let { name, description, price, category, categories, quentity, loading, error, success, disabled, formData } = values

    console.log(values);
    useEffect(() => {
        getCategories()
            .then(res => {
                setValues({
                    ...values,
                    categories: res.data,
                })
            })
            .catch(err => {
                setValues({
                    ...values,
                    error: "Failed to load Categories!"
                })
            })
    }, [])

    let handleChange = (e) => {
        let value = e.target.name === "photo" ? e.target.files[0] : e.target.value
        formData.set(e.target.name, value)
        setValues({
            ...values,
            loading: false,
            error: false,
            success: false,
            disabled: false,
            [e.target.name]: value
        })
    }

    let handleSubmit = e => {
        e.preventDefault()
        setValues({
            ...values,
            error: false,
            success: false,
            loading: true,
            disabled: true
        })
        const { token } = userInfo()
        createProduct(token, formData)
            .then(res => {
                setValues({
                    ...values,
                    name: '',
                    photo: "",
                    description: '',
                    price: '',
                    category: '',
                    quentity: '',
                    loading: false,
                    disabled: false,
                    success: res.data.message,
                    error: false
                })
            })
            .catch(error => {
                console.log(error.response.data);
                let errMsg = "Server Problem";
                if (error.response) {
                    errMsg = error.response.data.message
                };
                setValues({
                    ...values,
                    error: errMsg,
                    loading: false,
                    success: false,
                    disabled: false
                })
            })
    }

    const productForm = () => (
        <form onSubmit={handleSubmit}>
            <h4 className="text-muted">Photo:</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input type="file" name="photo" accept="image/*" onChange={handleChange} required id="" />
                </label>
            </div>

            <div className="form-group my-3">
                <label className="text-muted">Name:</label>
                <input type="text" name="name" value={name} className="form-control" onChange={e => handleChange(e)} required id="" />
            </div>

            <div className="form-group my-3">
                <label className="text-muted">Description:</label>
                <textarea name="description" className="form-control" value={description} onChange={handleChange} required></textarea>
            </div>
            <div className="form-group my-3">
                <label className="text-muted">Price:</label>
                <input type="number" name="price" value={price} className="form-control" onChange={handleChange} required id="" />
            </div>
            <div className="form-group my-3">
                <label className="text-muted">Quantity:</label>
                <input type="number" name="quentity" value={quentity} className="form-control" onChange={handleChange} required id="" />
            </div>

            <div className="form-group my-3">
                <label className="text-muted">Categoty:</label>
                <select name="category" value={category} onChange={handleChange} className="form-control" required id="">
                    <option value="">---- Select Category ----</option>
                    {
                        categories && categories.map(item => <option value={item._id} key={item._id}>{item.name}</option>)
                    }
                </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={disabled}> Create Product</button>
        </form>
    )
    let showSuccess = (success, msg) => {
        if (success) {
            return <div className="alert alert-success">{msg}</div>
        }
    }
    return (
        <Layout title="Add a new product" className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError(error, error)}
                    {showSuccess(success, success)}
                    {showLoading(loading)}
                    {productForm()}

                </div>
            </div>
        </Layout>
    )
}
