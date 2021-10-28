import axios from "axios"
import { API } from "../utils/config"

export let createCategory = (token, data) => {
    return axios.post(`${API}/category`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export let createProduct = (token, data) => {
    return axios.post(`${API}/product`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getCategories = () => {
    return axios.get(`${API}/category`)
}

