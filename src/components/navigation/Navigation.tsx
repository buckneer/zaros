import "./Navigation.scss";
import logo from "../../assets/main/logo.png"
import linkImg from "../../assets/main/nav-item.png";

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">

                    </span>
                </button>
                <div className="navbar-brand d-sm-none d-block">
                    <img src={logo} alt="logo" height="100px" width="200px" />
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ms-5">
                            <a className="nav-link" aria-current="page" href="#">FORUMS</a>
                        </li>
                        <li className="ms-5 d-sm-block d-none">
                            <img className="py-2" src={linkImg} alt="item" />
                        </li>
                        <li className="nav-item ms-5">
                            <a className="nav-link" href="#">DISCORD</a>
                        </li>
                        <li className="ms-5 d-sm-block d-none">
                            <img className="py-2" src={linkImg} alt="item" />
                        </li>
                        <li className="nav-item ms-5">
                            <a className="nav-link" href="#">PLAY NOW</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-brand d-none d-sm-block">
                    <img src={logo} alt="logo" height="80px" width="180px" />
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item ms-5">
                            <a className="nav-link active" aria-current="page" href="#">STORE</a>
                        </li>
                        <li className="ms-5 d-sm-block d-none">
                            <img className="py-2" src={linkImg} alt="item" />
                        </li>
                        <li className="nav-item ms-5">
                            <a className="nav-link" href="#">VOTE</a>
                        </li>
                        <li className="ms-5 d-sm-block d-none">
                            <img className="py-2" src={linkImg} alt="item" />
                        </li>
                        <li className="nav-item ms-5">
                            <a className="nav-link" href="#">HIGH SCORES</a>
                        </li>
                    </ul>
                </div>


            </div>
        </nav>
    )
}
