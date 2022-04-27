import "./PlayNow.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faUser, faKey, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {AuthContext} from "../../context/AuthProvider";
import {RegisterSchema} from "../../services/user/user.schema";
import {register} from "../../services/user/user.service";

export default function PlayNow() {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const {user, login, logout} = useContext(AuthContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("authRefresh")) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [localStorage.getItem("authRefresh")]);


    const handleRegister = (e: any) => {
        e.preventDefault()

        let data : RegisterSchema = {
            name: username,
            email: email,
            password,
            confirmPassword
        }


        register(data).then(response => {
            toast.success("Registered successfully. Please login");
            navigate("/login");
        }).catch(error => {
            toast.error("Internal Server Error")
            console.log(error.message)
        })

    }


    return (
        <div className="PlayNow my-5">

            <div className="row justify-content-center">

                {!loggedIn && (
                    <div className="col-12 col-md-5">
                        <div className="main-store container text-center my-5">
                            <div className="heading text-center">
                                <h3 className="title">REGISTER</h3>
                            </div>

                            <form>
                                <div className="row">
                                    <div className="input-field col-12 col-md-8">
                                        <div className="input-container w-100 d-flex justify-content-between text-muted">
                                            <FontAwesomeIcon size="2x" icon={faUser} />
                                            <input className="ms-4"
                                                   type="text"
                                                   placeholder="Username"
                                                   onChange={e => {setUsername(e.target.value)}}
                                                   value={username}
                                                   required
                                            />
                                        </div>
                                        <p className="input-help text-start">Usernames display in-game as CaSe SeNsItIvE.</p>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col-12 col-md-8">
                                            <div className="input-container w-100 d-flex justify-content-between text-muted">
                                                <FontAwesomeIcon size="2x" icon={faEnvelope} />
                                                <input className="ms-4"
                                                       type="email"
                                                       placeholder="Email"
                                                       onChange={e => setEmail(e.target.value)}
                                                       value={email}
                                                />
                                            </div>
                                            <p className="input-help text-start">Providing your email address is optional, however you will not be able to use the forgot password feature.</p>
                                        </div>
                                    </div>
                                    <div className="row">
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
                                    <div className="row my-4">
                                        <div className="input-field col-12 col-md-8">
                                            <div className="input-container w-100 d-flex justify-content-between text-muted">
                                                <FontAwesomeIcon size="2x" icon={faKey} />
                                                <input className="ms-4"
                                                       type="password"
                                                       placeholder="Confirm Password"
                                                       onChange={e => setConfirmPassword(e.target.value)}
                                                       value={confirmPassword}
                                                       required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 text-center text-white">
                                            <p style={{marginLeft: "12px", marginTop: "0"}}>
                                                <label>
                                                    <input className="w-auto me-1 h-auto"
                                                           type="checkbox"
                                                           name="terms"
                                                           onChange={e => setChecked(e.target.checked)}
                                                           value={checked.toString()}
                                                           required />
                                                    <span>I agree to the <a href="https://www.google.com">Terms and Conditions</a></span>
                                                </label>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-white">
                                        <Link to="/login">Already have an account?</Link>
                                    </div>
                                </div>
                                <div className="row text-center p-5">
                                    <button className="btn vote-btn" onClick={e => handleRegister(e)}>Register</button>
                                </div>
                            </form>

                        </div>
                    </div>
                )}


                <div className="col-12 col-md-5">
                    <div className="main-store container text-center my-5 download-game">
                        <div className="heading text-center">
                            <h3 className="title">DOWNLOAD</h3>
                        </div>

                        <p className="regular-text text-center">You can find various ways to play Vulcan PS below. If you're unsure, and you're on Windows, try the recommended option, as it comes bundled with Java. It's a hassle-free way to jump right into the game.</p>

                        <a className="btn vote-btn w-auto mb-4 pt-2" href="http://vulcanps.com/download/64bit.exe">
                            <FontAwesomeIcon icon={faDownload} className="mx-2" />
                            DOWNLOAD 64Bit</a>

                        <a className="btn vote-btn w-auto mb-4 pt-2 mx-2" href="http://vulcanps.com/download/game.jar">
                            <FontAwesomeIcon icon={faDownload} className="mx-2" />
                            DOWNLOAD JAR</a>



                        <p className="regular-text text-centre pb-4">If you have any issues launching the client, visit our Discord or the Help Desk of our forums.</p>

                    </div>
                </div>
            </div>

            <ToastContainer />

        </div>
    )
}
