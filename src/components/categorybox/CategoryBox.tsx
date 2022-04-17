
import "./CategoryBox.scss";



export default function CategoryBox({title, icon}: {title: string, icon: string}) {
    return (
        <div className="CategoryBox ms-2 col-1 mt-2">
            <img className="ms-2 mt-2" src={icon}  alt="weapon"/>
            <h2 className="my-3 p-0">{title.toUpperCase()}</h2>
        </div>
    )
}
