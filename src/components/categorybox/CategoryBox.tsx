
import "./CategoryBox.scss";
import {MouseEventHandler} from "react";



export default function CategoryBox({title, icon, handleFilter}: {title: string, icon: string, handleFilter: MouseEventHandler}) {
    return (
        <button onClick={e => handleFilter(e)} className="CategoryBox ms-2 col-1 mt-2" value={title} >
            <img className="ms-2 mt-2" src={icon}  alt="weapon"/>
            <h2 className="my-3 p-0">{title.toUpperCase()}</h2>
        </button>
    )
}
