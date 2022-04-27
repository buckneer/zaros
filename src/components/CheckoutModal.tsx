import {MouseEventHandler, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";
import {Item} from "../@types/item";
import {addCoins} from "../services/user/user.service";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

export default function CheckoutModal({item, show, closeModal} :
                                        {item: Item, show: boolean, closeModal: MouseEventHandler}) {

    const navigate = useNavigate();

    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_ID as string,
        currency: "USD",
        intent: "capture",
    }
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);


    // PAYPAL ACTIONS
    const createOrder = (data: any, action: any) => {
        return action.order.create({
            purchase_units: [{
                "name": item.name,
                "description": item.name,
                "amount": {
                    "currency_code": "USD",
                    "value": item.price,
                }
            }],
            application_context: {
                shipping_preference: "NO_SHIPPING",
            },
        }).then((orderID : any) => {
            setOrderID(orderID);
            return orderID;
        });
    }

    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then(function (details: any) {
            const {payer} = details;
            // @ts-ignore
            let quantity = item.name.match(/(\d+)/) as string

            addCoins(parseInt(quantity)).then(response => {
                if(response.headers['x-access-token']) {
                    localStorage.removeItem("authAccess");
                    localStorage.setItem('authAccess', response.headers['x-access-token'])
                }
                setSuccess(true)
            })

        })
    }

    const onError = () => {
        toast.error("An Error occurred with your payment")
        setErrorMessage("An Error occurred with your payment ");
    }

    useEffect(() => {

        if(success) {
            toast.success(`Success. You bought ${item.name}`)
        }
    }, [success]);

    return (
        <Modal show={show} >
            <PayPalScriptProvider options={initialOptions}>
                <ModalDialog>
                    <ModalHeader>
                        <ModalTitle>{item.name}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <p>You are about to buy: {item.name}</p>
                        <p><b>Price: </b> ${item.price}</p>
                        <PayPalButtons style={{layout: 'horizontal'}}
                                       createOrder={createOrder}
                                       onApprove={onApprove}
                                       onError={onError}/>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={closeModal}>Close</button>
                    </ModalFooter>
                </ModalDialog>
                <ToastContainer/>
            </PayPalScriptProvider>
        </Modal>
    )
}
