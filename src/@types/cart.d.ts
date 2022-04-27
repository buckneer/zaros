import {User} from "./user";
import {Item} from "./item";


export interface Cart {
    _id: string,
    user: User,
    items: Item[]
}


export interface AddToCartSchema {
    itemId: string
}
