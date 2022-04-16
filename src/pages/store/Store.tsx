

import "./Store.scss";
import CategoryBox from "../../components/categorybox/CategoryBox";
import icon from "../../assets/categories/weapons.png";

export default function Store() {
    return (
        <div className="Store mt-5">
            <div className="main-store container">
                <div className="heading text-center">
                    <h4 className="title">STORE</h4>
                </div>


                <div className="section-heading">
                    <div className="heading">
                        <h1 className="title">CATEGORIES</h1>
                    </div>
                </div>

                <div className="container mx-auto row pb-5">
                    <CategoryBox title="WEAPONRY" icon={icon} />
                </div>
            </div>
        </div>
    )
}
