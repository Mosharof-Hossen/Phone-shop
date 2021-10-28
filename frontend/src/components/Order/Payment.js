import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { initPayment } from '../../api/apiOrder'
import { userInfo } from '../../utils/auth'

export default function Payment() {
    const [sessionSuccess, setSessionSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [redirectUrl, setRedirectUrl] = useState('')
    useEffect(() => {
        initPayment(userInfo().token)
            .then(res => {
                if (res.data.status === "SUCCESS") {
                    setSessionSuccess(true)
                    setRedirectUrl(res.data.GatewayPageURL)
                    setFailed(false)
                }
            })
            .catch(err => {
                setFailed(true)
                setSessionSuccess(false)
            })
    }, [])
    console.log(redirectUrl)
    return (
        <div>
            {sessionSuccess ? window.location = redirectUrl : "Payment is processing..."}
            {failed ? <><p>Failed to start payment session....</p><Link to="/cart">Go to cart</Link></> : ""}
        </div>
    )
}
