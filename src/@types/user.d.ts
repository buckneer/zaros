
import {Item} from "./item";


export interface User {
    _id: string,
    name: string,
    email: string,
    zeahCoins: string,
    items: Item[]
}


export type UserContextType = {
    user: User | null,
    logout: () => void;
    login: (user: User) => void;
}
