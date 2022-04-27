import {AddToCartSchema} from "../../@types/cart";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_URL as string


export function getCart() {
    return axios.get(BASE_URL + "cart", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": `${localStorage.getItem("authRefresh")}`
        }
    })
}

export function addToCart(data: AddToCartSchema) {
    return axios.post(BASE_URL + "cart", data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": `${localStorage.getItem("authRefresh")}`
        }
    })
}

export function removeItem(_id: string) {

    return axios.delete(BASE_URL + "cart", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": `${localStorage.getItem("authRefresh")}`
        },
        data: {
            itemId: _id
        }
    })
}

export function doCheckout() {
    return axios.get(BASE_URL + "cart/checkout", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": `${localStorage.getItem("authRefresh")}`
        }
    })
}
