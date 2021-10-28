import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { createCategory } from '../../api/ApiAdmin';
import { userInfo } from '../../utils/auth';
import { API } from '../../utils/config';
import { showError, showLoading } from '../../utils/message';
import Layout from '../Layout'

export default function CreateCategory() {
    let [values, setValues] = useState({
        name: "",
        error: false,
        success: false,
        loading: false
    })
    let { name, error, success, loading } = values

    let handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: false,
            success: false,
            loading: false
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            loading: true
        })
        const { token } = userInfo()
        createCategory(token, { name })
            .then(res => {
                if (res.data.index === 0) {
                    return setValues({
                        ...values,
                        error: "Already Created",
                        success: false,
                        loading: false
                    })
                } else {
                    return setValues({
                        ...values,
                        name: "",
                        error: false,
                        success: res.data.message,
                        loading: false
                    })
                }

            })
            .catch(err => {
                let msg = "Server Prolem"
                console.log(err.response);
                if (err.response) {
                    msg = err.response.data
                }
                setValues({
                    ...values,
                    error: msg,
                    success: false,
                    loading: false
                })

            })



    }
    const createCategoryForm = () => {
        return (
            <Form className="p-3" onSubmit={handleSubmit}>
                <h3>New Category</h3>

                <Form.Control type="text" name="name" value={values.name} onChange={e => handleChange(e)} placeholder="Category Name" required />

                <button className="btn btn-primary  my-3">Create Category</button>

            </Form>
        )
    }

    let showSuccess = (success, msg) => {
        if (success) {
            return <div className="alert alert-success">{msg}</div>
        }
    }
    return (
        <Layout title="Add a new category" className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError(error, error)}
                    {showLoading(loading)}
                    {showSuccess(success, success)}
                    {createCategoryForm()}
                </div>
            </div>

        </Layout>
    )
}
