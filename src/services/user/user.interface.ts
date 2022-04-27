import {ItemType} from "../item/item.type";


export interface UserInterface {
    _id: string | null,
    email: string,
    zeahCoins: string,
    items: ItemType[]
}
