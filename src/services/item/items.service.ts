import {items} from "../../data/data";


export function getAllItems() {
    return items;
}

export function filterItems(category: string) {
    return getAllItems().filter(item => item.category === category);
}

export function searchByName(name: string) {
    return getAllItems().filter(item => item.name === name);
}
