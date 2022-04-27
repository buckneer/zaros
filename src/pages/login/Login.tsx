import "./Login.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LoginSchema} from "../../services/user/user.schema";
import {getUser, login} from "../../services/user/user.service";
import {toast, ToastContainer} from "react-toastify";
import {AuthContext} from "../../context/AuthProvider";
import {User} from "../../@types/user";

export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user, login : loginCont, logout} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if(localStorage.getItem("authRefresh")) {
            navigate("/store")
        }
    });



    const handleLogin = (e: any) => {
        e.preventDefault();

        let data : LoginSchema = {
            email,
            password
        }


        login(data).then(response => {
            if(response.data.success === false) {
                toast.error("Check your credentials and try again")
            }

            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;


            localStorage.setItem("authAccess", accessToken);
            localStorage.setItem("authRefresh", refreshToken);

            getUser(localStorage.getItem("authAccess") as string,
                localStorage.getItem("authRefresh") as string)
                .then(response => {
                   loginCont(response.data as User)
                }).catch(error => {
                toast.error("Internal Server Error")
                console.log(error.message)
            })


        }).catch(error => {
            toast.error("Internal Server Error")
            console.log(error.message)
        })




    }

    return (
        <div className="Login">
            <div className="main-store container w-50  my-5">
                <div className="heading text-center">
                    <h3 className="title">LOGIN</h3>
                </div>


                <form className="mx-auto text-center">
                    <div className="row justify-content-center">
                        <div className="input-field col-12 col-md-8">
                            <div className="input-container w-100 d-flex justify-content-between text-muted">
                                <FontAwesomeIcon size="2x" icon={faUser} />
                                <input className="ms-4"
                                       type="email"
                                       placeholder="Email"
                                       onChange={e => setEmail(e.target.value)}
                                       value={email}
                                       required />
                            </div>
                        </div>
                    </div>

                    <div className="row my-3 justify-content-center">
                        <div className="input-field col-12 col-md-8">
                            <div className="input-container w-100 d-flex justify-content-between text-muted">
                                <FontAwesomeIcon size="2x" icon={faKey} />
                                <input className="ms-4"
                                       type="password"
                                       placeholder="Password"
                                       onChange={e => setPassword(e.target.value)}
                                       value={password}
                                       required />
                            </div>
                        </div>
                    </div>
                    <div className="text-white">
                        <Link to="/play-now">Register account</Link>
                    </div>
                    <div className="row my-3 justify-content-center p-5">
                        <button className="btn vote-btn w-50" onClick={e => handleLogin(e)}>Login</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
