import axios from "axios";
import {LoginSchema, RegisterSchema} from "./user.schema";

const BASE_URL = process.env.REACT_APP_URL as string



export function login(data: LoginSchema) {
    return axios.post(BASE_URL + "sessions", data)
}

export function getUser(accessToken: string, refreshToken: string) {
    return axios.get(BASE_URL + "user", {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "x-refresh": refreshToken
        }
    });
}

export function register(data: RegisterSchema) {
    return axios.post(BASE_URL + "users", data)
}

export function logout() {
    return axios.delete(BASE_URL + "sessions", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": `${localStorage.getItem("authRefresh")}`
        }
    })
}

export function addCoins(quantity: number) {
    return axios.post(BASE_URL + "zeah", {quantity},{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": `${localStorage.getItem("authRefresh")}`
        }
    })
}
