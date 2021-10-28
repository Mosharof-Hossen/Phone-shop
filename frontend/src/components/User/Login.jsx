import React, { useContext, useState } from 'react'
import Layout from '../Layout'
import { Col, Form, Row } from 'react-bootstrap'
import { showError, showLoading, showSuccess } from '../../utils/message'
import { useHistory } from 'react-router'
import { authenticate, isAuthenticated, userInfo } from '../../utils/auth'
import { login } from '../../api/ApiAuth'
import { ItemContext } from '../../App'
import { getCartItem } from '../../api/apiOrder'

export default function Login() {
    let history = useHistory();
    let itemCounterFunction = useContext(ItemContext)[1]
    function RedirectDashboard() {
        history.push(`/${userInfo().role}/dashboard`);
        getCartItem(userInfo().token)
            .then(res => itemCounterFunction(res.data.data.length))
    }
    if (isAuthenticated()) {
        history.push(`/`);
    }
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false,
        loading: false,
        disabled: false,
        success: false
    })
    let { email, password, error, loading, disabled, success } = values
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
            success: false
        })
        login({ email, password })
            .then(res => {
                console.log(res.data.token);
                authenticate(res.data.token, () => {

                })
                setValues({
                    ...values,
                    error: false,
                    loading: false,
                    disabled: false,
                    success: res.data.message
                })
                RedirectDashboard()
            })
            .catch(err => {
                let msg = "Server Problem"
                if (err.response) {
                    msg = err.response.data
                }
                setValues({
                    ...values,
                    error: msg,
                    loading: false,
                    disabled: false,
                    success: false
                })

            })


    }


    let loginForm = () => {
        return (
            <Form className="p-3" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" name="email" value={values.email} onChange={e => handleChange(e)} placeholder="Your Email" required />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" name="password" value={values.password} onChange={e => handleChange(e)} placeholder="Password" required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="">
                    </Form.Label>
                    <Col sm="10">
                        <button className="btn btn-primary" disabled={disabled}>LogIn</button>
                    </Col>
                </Form.Group>

            </Form>
        )
    }

    return (
        <div>
            <Layout title="Login" className="container col-md-8 offset-md-2" >
                {showLoading(loading)}
                {showError(error, error)}
                {showSuccess(success, success)}
                <h2>Login here</h2>
                <hr />
                {loginForm()}
            </Layout>
        </div>
    )
}
