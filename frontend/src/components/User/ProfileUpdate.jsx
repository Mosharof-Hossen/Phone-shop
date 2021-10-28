import React, { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../../api/apiOrder';
import { userInfo } from '../../utils/auth';
import Layout from '../Layout'

export default function ProfileUpdate() {
    const [values, setValues] = useState({
        phone: '',
        address1: '',
        address2: '',
        city: '',
        postcode: '',
        country: '',
    })
    const [disabled, setDisabled] = useState(false);
    const [success, setSuccess] = useState(false)
    const { phone, address1, address2, city, postcode, country, } = values;
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        getProfile(userInfo().token)
            .then(res => setValues(res.data))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        setDisabled(true)
        updateProfile(userInfo().token, values)
            .then(res => {
                setDisabled(false)
                setSuccess("Updated SuccesFully")
                setTimeout(() => {
                    setSuccess(false)
                }, 2000);
            })
            .catch(err => console.log(err))
    }
    const profileForm = () => (
        <form onSubmit={handleSubmit}>
            <label className="text-muted">Phone:</label>
            <input name="phone" value={phone} required className="form-control" onChange={handleChange} />
            <label className="text-muted">Address 1:</label>
            <input name="address1" value={address1} required className="form-control" onChange={handleChange} />
            <label className="text-muted">Address 2:</label>
            <input name="address2" value={address2} className="form-control" onChange={handleChange} />
            <div className="row">
                <div className="col-4">
                    <label className="text-muted">City:</label>
                    <input name="city" value={city} required className="form-control" onChange={handleChange} />
                </div>
                <div className="col-4">
                    <label className="text-muted">Post Code: </label>
                    <input name="postcode" value={postcode} type="number" required className="form-control" onChange={handleChange} />
                </div>
                <div className="col-4">
                    <label className="text-muted">Country:</label>
                    <input name="country" value={country} required className="form-control" onChange={handleChange} />
                    <br />
                    <button type="submit" className="btn btn-primary btn-sm float-right" disabled={disabled}>Save</button>
                </div>
            </div>
        </form>
    )
    let showSuccess = (success, msg) => {
        if (success) {
            return <div class="alert alert-primary" role="alert">{msg} </div>
        }
    }
    return (
        <Layout title="Profile-Update" className="container">
            {showSuccess(success, success)}
            {profileForm()}
        </Layout>
    )
}
