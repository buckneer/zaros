import "./ItemBox.scss";
import {Item} from "../../@types/item";
import {addToCart} from "../../services/cart/cart.service";
import {toast} from "react-toastify";
import {useContext, useState} from "react";
import CheckoutModal from "../CheckoutModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/AuthProvider";
import {deleteItem} from "../../services/item/items.service";


export default function ItemBox({item, updateCart}: {item: Item,updateCart: () => void}) {

    const [show, setShow] = useState(false);
    const {user, logout, login} = useContext(AuthContext);

    const toggleModal = () => {
        setShow(prevState => {return !prevState})
    }

    let handleCart = (e: any) => {
        e.preventDefault();

        addToCart({itemId: item._id}).then(response => {
            toast.success(`Added item ${item.name}`);
            updateCart()
        })
    }

    let handleDelete = () => {
        deleteItem(item._id).then(response => {
            if(response.data.message) {
                toast.error("Couldn't delete item")
            } else {
                toast.success("Item deleted")
            }
        }).catch(error => {
            toast.error("Internal Server Error")
            console.log(error);
        })
    }

    let handleBuy = () => {
        setShow(true);
    }

    return (
        <div className="ItemBox col-12 col-md-6 col-lg-3 store-item">
            <div className="block">
                <div className="title-wrapper">
                    <h5 className="title">
                        <span>{item.name}</span>
                    </h5>
                </div>
                <div className="main-body">
                    <div className="row">
                        <div className="col-12 align-content-center text-center">
                            <div className="image-holder">
                                <img src={item.icon}  alt="icon" />
                            </div>
                        </div>
                        <div className="col-12 align-content-center text-center">
                            <div>
                                {item.category === "tokens" && (
                                    <span className="price text-warning">

                                        ${item.price}
                                    </span>
                                )}
                                {item.category !== "tokens" && (
                                    <span className="price text-warning">

                                        {item.price} tokens
                                    </span>
                                )}

                                <br />
                                {item.category !== "tokens" && user?.role !== "admin" && (
                                    <button className="btn btn-danger" onClick={e => handleCart(e)}>Add To Cart</button>
                                )}
                                {item.category === "tokens" && user?.role !== "admin"  && (
                                    <button className="btn btn-danger" onClick={e => handleBuy()}>
                                       Buy Now
                                    </button>
                                )}
                                {user?.role === "admin" && (
                                    <button className="btn btn-danger" onClick={handleDelete}>
                                        <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
                                        &nbsp; Delete Item
                                    </button>
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CheckoutModal item={item} show={show} closeModal={toggleModal} />
        </div>
    )
}
