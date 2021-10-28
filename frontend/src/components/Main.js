import React from 'react'
import { API } from '../utils/config'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from './Home/Home';
import Login from './User/Login';
import Register from './User/Register';
import Dashoard from './User/Dashoard';
import PrivateRoute from './ProtectedRoutes/privateRoute';
import AdminRoute from './ProtectedRoutes/AdminRoute';
import Admin from './Admin/Admin';
import CreateCategory from './Admin/CreateCategory';
import CreateProduct from './Admin/CreateProduct';
import ProductDetails from './Home/ProductDetails';
import Cart from './Order/Cart';
import ShippingAddress from './Order/ShippingAddress';
import CheckOut from './Order/CheckOut';
import Payment from './Order/Payment';
import ProfileUpdate from './User/ProfileUpdate';


export default function Main() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home></Home>
                </Route>
                <Route exact path="/login">
                    <Login></Login>
                </Route>
                <Route exact path="/register">
                    <Register></Register>
                </Route>
                <Route exact path="/product/:id">
                    <ProductDetails></ProductDetails>
                </Route>
                <PrivateRoute exact path="/user/dashboard">
                    <Dashoard></Dashoard>
                </PrivateRoute>
                <PrivateRoute exact path="/card-item">
                    <Cart></Cart>
                </PrivateRoute>
                <PrivateRoute exact path="/shippingAdress">
                    <ShippingAddress></ShippingAddress>
                </PrivateRoute>
                <PrivateRoute exact path="/checkout">
                    <CheckOut></CheckOut>
                </PrivateRoute>
                <PrivateRoute exact path="/payment">
                    <Payment></Payment>
                </PrivateRoute>
                <PrivateRoute exact path="/profile-update">
                    <ProfileUpdate></ProfileUpdate>
                </PrivateRoute>


                <AdminRoute exact path="/admin/dashboard">
                    <Admin></Admin>
                </AdminRoute>
                <AdminRoute exact path="/create/category">
                    <CreateCategory></CreateCategory>
                </AdminRoute>
                <AdminRoute exact path="/create/product">
                    <CreateProduct></CreateProduct>
                </AdminRoute>
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}
