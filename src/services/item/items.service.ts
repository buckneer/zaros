
import axios from "axios";
import {ItemType} from "./item.type";

const BASE_URL = process.env.REACT_APP_URL as string



export async function getAllItems() {
    return axios.get(BASE_URL + "items")
}

export async function addItem(data: ItemType) {
    return axios.post(BASE_URL + "items", data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": localStorage.getItem("authRefresh") as string
        }
    })
}

export async function deleteItem(itemId: string) {

    let data = {
        itemId
    }

    return axios.delete(BASE_URL + "items", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("authAccess")}`,
            "x-refresh": localStorage.getItem("authRefresh") as string
        },
        data
    })
}





