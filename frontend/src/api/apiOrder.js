import axios from "axios"
import { API } from "../utils/config"

export const addToCart = (token, cartItem) => {
    return axios.post(`${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Creare ${token}`
        }
    })
}

export const getCartItem = (token) => {
    return axios.get(`${API}/cart`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const updateCartItems = (token, cartItem) => {
    return axios.put(`${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Creater ${token}`
        }
    })
}

export const deleteCartItem = (token, cartItem) => {
    return axios.delete(`${API}/cart/${cartItem._id}`, {
        headers: {
            "Authorization": `Creater ${token}`
        }
    })
}

export const getProfile = token => {
    return axios.get(`${API}/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}


export const updateProfile = (token, data) => {
    return axios.post(`${API}/profile`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}


export let initPayment = token => {
    return axios.get(`${API}/payment`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getOrderProduct = (token) => {
    return axios.get(`${API}/purchas`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getAllOrders = (token) => {
    return axios.get(`${API}/allorders`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export const productStatusManage = (token, id, status) => {
    return axios.put(`${API}/orderUpdate/${id}`, status, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Creare ${token}`
        }
    })
}
