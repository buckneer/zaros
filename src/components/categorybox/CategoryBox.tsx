
import "./CategoryBox.scss";



export default function CategoryBox({title, icon}: {title: string, icon: string}) {
    return (
        <div className="CategoryBox col-1">
            <img className="ms-4 mt-1" src={icon}  alt="weapon"/>
            <h2 className="my-3 p-0">{title}</h2>
        </div>
    )
}
