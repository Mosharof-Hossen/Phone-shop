import axios from "axios";
import { API } from "../utils/config";

export const getProducts = (sortBy, order, limit) => {
    return axios.get(`${API}/product?sortBy=${sortBy}&order=${order}&limit=${limit}`)
}

export const getProductDetails = (id) => {
    return axios.get(`${API}/product/${id}`)
}

export const getFilteredProduct = (skip, limit, filters = {}, order, sortBy) => {
    let data = {
        order: order,
        sortBy: sortBy,
        limit: limit,
        skip: skip,
        filters: { ...filters }
    }
    return axios.post(`${API}/product/filter`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}