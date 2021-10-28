import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { signup } from '../../api/ApiAuth';
import { isAuthenticated } from '../../utils/auth';
import { showError, showLoading, showSuccess } from '../../utils/message';
import Layout from '../Layout'

export default function Register() {
    let history = useHistory();

    if (isAuthenticated()) {
        history.push(`/`);
    }
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        loading: false,
        disabled: false,
        success: false
    })
    let { name, email, password, error, loading, disabled, success } = values
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
        signup({ name, email, password })
            .then(response => {
                setValues({
                    ...values,
                    error: false,
                    loading: false,
                    disabled: false,
                    success: response.data.message
                })
            })
            .catch(err => {
                let msg = "Server Problem"
                if (err.response) {
                    msg = err.response.data
                    console.log(msg);

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

    let signUpForm = () => {
        return (
            <Form className="p-3" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="2">
                        Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" name="name" value={values.name} onChange={e => handleChange(e)} placeholder="Your name" required />
                    </Col>
                </Form.Group>
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
                        <button className="btn btn-primary" disabled={values.disabled}>Create Account</button>
                    </Col>
                </Form.Group>
            </Form>
        )
    }
    return (
        <div>
            <Layout title="Register" className="container col-md-8 offset-md-2" >
                {showLoading(loading)}
                {showError(error, error)}
                {showSuccess(success, success)}
                <h3>Register  here</h3>
                <hr />
                {signUpForm()}
            </Layout>
        </div>
    )
}
