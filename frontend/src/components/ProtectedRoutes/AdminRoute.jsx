import React from 'react'
import { Redirect, Route } from 'react-router'
import { isAuthenticated, userInfo } from '../../utils/auth'

export default function AdminRoute({ children, ...rest }) {
    const { role } = userInfo()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() && role === "admin" ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
