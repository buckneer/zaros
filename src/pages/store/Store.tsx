

import "./Store.scss";
import CategoryBox from "../../components/categorybox/CategoryBox";
import {CategoryType} from "../../services/item/category.type";
import ItemBox from "../../components/itembox/ItemBox";
import {useEffect, useState} from "react";
import {ItemType} from "../../services/item/item.type";
import {filterItems} from "../../services/item/items.service";
import coins from "../../assets/main/coins.png";
import {getCategories} from "../../services/item/category.service";


export default function Store() {


    const [filteredItems, setFilteredItems] = useState<ItemType[] | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [searchString, setSearchString] = useState("");

    let handleFilter = (filter: string) => {
        setFilteredItems(filterItems(filter));
    }

    let handleSearch = (e: any) => {
        setSearchString(e.target.value)
    }

    useEffect(() => {
        setCategories(getCategories());
        setFilteredItems(filterItems('weaponry'));
    }, []);


    return (
        <div className="Store mt-5">
            <div className="main-store container">
                <div className="heading text-center">
                    <h4 className="title">STORE</h4>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8 col-12">
                        <div className="section-heading">
                            <div className="heading">
                                <h1 className="title" style={{letterSpacing: "1px"}}>CATEGORIES</h1>
                            </div>
                        </div>

                        <div className="container mx-auto row pb-5 justify-content-center">

                            {categories.map(category => (
                                <CategoryBox key={category.name} category={category} handleFilter={handleFilter} />
                            ))}

                        </div>

                        <div className="row filters">
                            <div className="col-12 col-md-6 col-lg-3">
                                <input type="text" placeholder="Search for an item"
                                       onChange={e => handleSearch(e)}
                                value={searchString}/>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Popularity</option>
                                    <option value="1">Price (high to low)</option>
                                    <option value="2">Price (low to high)</option>
                                    <option value="3">Alphabetical (A - Z)</option>
                                    <option value="4">Alphabetical (Z - A)</option>
                                </select>
                            </div>
                        </div>

                        <hr style={{border: "2px solid #463b46", marginTop: "25px", marginBottom: "25px"}} />


                        <div className="row items justify-content-between">
                            {filteredItems && filteredItems.map(item => (
                                <ItemBox title={item.name} price={item.price} icon={item.icon} key={item.name} />
                            ))}

                        </div>
                    </div>

                    <div className="sidebar col-md-3 col-12">
                        <button className="btn btn-success">Buy Scrolls</button>
                        <button className="btn btn-info">Custom Donations</button>

                        <div className="section-heading">
                            <div className="heading text-center">
                                <h1 className="title" style={{letterSpacing: "1.5px", lineHeight: "1.2", fontSize: "3.56rem"}}>YOUR CART</h1>
                            </div>
                            <div className="cart">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{textAlign: "left", fontSize: "0.9rem"}}>
                                                <h2 className="cart-user">
                                                    You are buying as: ...
                                                </h2>
                                            </td>
                                            <td style={{textAlign: "left", fontSize: "0.9rem"}}>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{textAlign: "left", fontSize: "0.9rem"}}>
                                                <img src={coins} alt="coins" />
                                            </td>
                                            <td style={{textAlign: "left", fontSize: "0.9rem"}}>
                                                <h2 className="cart-title">
                                                    You have: &nbsp; &nbsp;
                                                    <span style={{color: "#ffcb90"}}>
                                                        0 Tokens
                                                    </span>
                                                </h2>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <hr />

                                <h4 style={{fontSize: "1rem"}}>
                                    Total: <span className="basket-total"
                                                 style={{color: "#ffcb90", fontSize: "1.1rem", fontWeight: "600"}}>0 Tokens</span>
                                </h4>

                                <button className="btn btn-info">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
