
import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL as string



export async function getAllItems() {
    return axios.get(BASE_URL + "items")
}






