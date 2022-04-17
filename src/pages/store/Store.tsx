

import "./Store.scss";
import CategoryBox from "../../components/categorybox/CategoryBox";
import icon from "../../assets/categories/weapons.png";
import {CategoryType} from "../../services/item/category.type";

let categories : CategoryType[] = [
    {
        name: "weaponry",
        icon: "https://i.ibb.co/QXfHkVh/armadyl-godsword.png"
    },
    {
        name: "armory",
        icon: "https://i.ibb.co/VgP5ks0/fighter-torso.png"
    },
    {
        name: "supplies",
        icon: "https://i.ibb.co/B3xkDzG/super-combat-potions.png"
    },
    {
        name: "boosts",
        icon: "https://i.ibb.co/tDwW07L/slayer-task-skip-scroll.png"
    },
    {
        name: "pets",
        icon: "https://i.ibb.co/NmTJG7L/pet-penance-queen.png"
    },
    {
        name: "misc",
        icon: "https://i.ibb.co/zrR4hNJ/mystery-box.png"
    },
    {
        name: "cosmetic",
        icon: "https://i.ibb.co/dGrVpYZ/interted-santahat.png"
    },
]

export default function Store() {
    return (
        <div className="Store mt-5">
            <div className="main-store container">
                <div className="heading text-center">
                    <h4 className="title">STORE</h4>
                </div>

                <div className="row">
                    <div className="col-md-8 col-12">
                        <div className="section-heading">
                            <div className="heading">
                                <h1 className="title" style={{letterSpacing: "1px"}}>CATEGORIES</h1>
                            </div>
                        </div>

                        <div className="container mx-auto row pb-5 justify-content-center">

                            {categories.map(category => (
                                <CategoryBox title={category.name} icon={category.icon} />
                            ))}

                        </div>

                        <div className="row filters">
                            <div className="col-12 col-md-6 col-lg-3">
                                <input type="text" placeholder="Search for an item"/>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">

                            </div>
                        </div>

                        <hr style={{border: "2px solid #463b46", marginTop: "25px", marginBottom: "25px"}} />
                    </div>

                    <div className="sidebar col-md-3 col-12">
                        <button className="btn btn-success">Buy Scrolls</button>
                        <button className="btn btn-info">Custom Donations</button>

                        <div className="section-heading">
                            <div className="heading text-center">
                                <h1 className="title" style={{letterSpacing: "1.5px", lineHeight: "1.2", fontSize: "3.56rem"}}>YOUR CART</h1>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
