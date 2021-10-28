import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap';
import "./menu.css"
import { isAuthenticated, signOut, userInfo } from '../utils/auth';
import { useHistory } from 'react-router'
import { ItemContext } from '../App';

export default function Menu(props) {
    let history = useHistory();
    let [selectedItem, setSelectedItem] = useState(0)
    let value = useContext(ItemContext)[0]

    // setSelectedItem(value)

    let onlyUser = () => {
        if (isAuthenticated() && userInfo().role === "user") {
            return (
                <Link to="/card-item" className="link">
                    <div type="button" className="btn btn-primary btn-sm position-relative">
                        <i className="fas fa-shopping-cart icon"></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {value}

                        </span>
                    </div>
                </Link>
            )
        }
        else {
            return ""
        }
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container >
                <Link to="/" className="name">Mobile-Shop</Link >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="">
                    <Nav className="me-auto" >
                        <NavLink to="/" exact activeStyle={{
                            fontWeight: "bold",
                            color: "red"
                        }} className="link">Home</NavLink>

                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item Link="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item Link="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item Link="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item Link="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {
                        !isAuthenticated() && (<>
                            <NavLink to="/login" exact activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }} className="link">Login</NavLink>
                            <NavLink to="/register" exact activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }} className="link">Register</NavLink>
                        </>)
                    }
                    {onlyUser()}
                    {
                        isAuthenticated() && (<>

                            <NavLink to={`/${userInfo().role}/dashboard`} exact activeStyle={{
                                fontWeight: "bold",
                                color: "red"
                            }} className="link">Dashboard</NavLink>

                            <span style={{ cursor: "pointer" }} className="link" onClick={() => signOut(() => { history.push("/login") })}>Logout</span>
                        </>)

                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
