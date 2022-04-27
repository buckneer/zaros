

import "./Store.scss";
import CategoryBox from "../../components/categorybox/CategoryBox";
import {CategoryType} from "../../services/item/category.type";
import ItemBox from "../../components/itembox/ItemBox";
import {useContext, useEffect, useState} from "react";
import {getAllItems} from "../../services/item/items.service";
import coins from "../../assets/main/coins.png";
import {getCategories} from "../../services/item/category.service";
import {AuthContext} from "../../context/AuthProvider";
import {getUser, logout} from "../../services/user/user.service";
import {useNavigate} from "react-router-dom";
import {Item} from "../../@types/item";
import {User} from "../../@types/user";
import {Cart} from "../../@types/cart";
import {doCheckout, getCart, removeItem} from "../../services/cart/cart.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {toast, ToastContainer} from "react-toastify";
import CustomModal from "../../components/CustomModal";


export default function Store() {


    const [filteredItems, setFilteredItems] = useState<Item[] | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [searchString, setSearchString] = useState("");
    const {user, login, logout : logoutContext} = useContext(AuthContext);
    const [cart, setCart] = useState<Cart | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [notEnough, setNotEnough] = useState(false);
    const [show, setShow] = useState(false);


    const toggleModal = () => {
        setShow(prevState => {return !prevState})
    }


    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);



    let updateCart = () => {
        getCart().then(response => {

            if(response.headers['x-access-token']) {
                localStorage.removeItem("authAccess");
                localStorage.setItem('authAccess', response.headers['x-access-token'])
            }

            let newCart = response.data as Cart;

            let prices: number[] = []

            newCart.items.map(item => {
                prices.push(parseInt(item.price))
            })

            setTotal(prices.reduce((a, b) => a+b, 0))

            setCart(newCart)
        })
    }

    // HANDLERS

    let handleFilter = (filter: string) => {
        getAllItems().then(response => {
            let items = response.data as Item[]
            setFilteredItems(items.filter(item => {
                return item.category === filter
            }))
        })
    }


    let handleSearch = (e: any) => {
        setSearchString(e.target.value)
    }

    let handleLogout = (e: any) => {
        e.preventDefault();

        logout().then(response => {
            localStorage.removeItem("authAccess");
            localStorage.removeItem("authRefresh");

            logoutContext();

            navigate("/login")

        })
    }


    let handleDelete = (_id: string) => {


        removeItem(_id).then(response => {
            toast.success("Item Removed");
            updateCart()
        }).catch(error => {
            toast.error("Internal Server Error")
        })
    }

    let handleCheckout = (e: any) => {
        e.preventDefault();

        doCheckout().then(response => {
            if(response.data.message) {
                // toast.error(response.data.message);
                toggleModal();
            } else {
                login(response.data as User);
                toast.success("Checkout done")
            }
            updateCart();
        }).catch(error => {
            toast.error("An error occurred");
        })
    }

    // EFFECTS

    // Update the data
    useEffect(() => {


        if(!localStorage.getItem("authRefresh")) {
            navigate("/login");
        }

        setCategories(getCategories());

        getAllItems().then(response => {
            let items = response.data as Item[]
            setFilteredItems(items.filter(item => {
                return item.category === "weaponry"
            }))
        })
    }, []);

    // Update the view
    useEffect(() => {


        if(localStorage.getItem("authRefresh")) {


            updateCart();

            getUser(localStorage.getItem("authAccess") as string
                ,localStorage.getItem("authRefresh") as string).then(response => {
                if(response.headers['x-access-token']) {
                    localStorage.removeItem("authAccess");
                    localStorage.setItem('authAccess', response.headers['x-access-token'])
                }

                if(!user) {
                    login(response.data as User)
                }
            })




            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [localStorage.getItem("authRefresh")]);


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
                                <ItemBox item={item} updateCart={updateCart} key={item.name} />
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
                                                {!loggedIn && <h2 className="cart-user">You are not logged in</h2>}
                                                {loggedIn && (
                                                    <>
                                                        <h2 className="cart-user">
                                                            You are buying as: <b>{user?.name}</b>
                                                        </h2>
                                                        <h2 className="cart-user text-end" style={{cursor: "pointer"}} onClick={e => handleLogout(e)}>Log out</h2>
                                                    </>
                                                )}

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
                                                    You have: &nbsp;
                                                    <span style={{color: "#ffcb90"}}>
                                                        {user?.zeahCoins} Tokens
                                                    </span>
                                                </h2>
                                            </td>
                                        </tr>

                                        {cart?.items && cart?.items.map(item => (
                                            <tr key={item._id}>
                                                <td style={{textAlign: "left", fontSize: "0.9rem"}}>
                                                    <h2 className="cart-title" style={{color: "#eed7ff"}}>
                                                        {item.name}
                                                    </h2>
                                                </td>
                                                <td>
                                                    <h2 className="cart-title" style={{color: "#ffcb90"}}>
                                                        {item.price} Tokens
                                                    </h2>
                                                </td>
                                                <td className="delete-item">
                                                    <FontAwesomeIcon icon={faClose} onClick={() => handleDelete(item._id)}/>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>

                                <hr />

                                <h4 style={{fontSize: "1rem"}}>
                                    Total: <span className="basket-total"
                                                 style={{color: "#ffcb90", fontSize: "1.1rem", fontWeight: "600"}}>
                                    {total}
                                </span>
                                </h4>

                                <button className="btn btn-info" onClick={(e) => handleCheckout(e)}>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <CustomModal message={"Not enough coins"} show={show} closeModal={toggleModal} />
            <ToastContainer autoClose={2000} />
        </div>
    )
}
