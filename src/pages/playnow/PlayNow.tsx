import "./PlayNow.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

export default function PlayNow() {
    return (
        <div className="PlayNow">


            <div className="main-store container text-center my-5">
                <div className="heading text-center">
                    <h3 className="title">DOWNLOAD</h3>
                </div>

                <p className="regular-text text-center">You can find various ways to play Zaros below. If you're unsure, and you're on Windows, try the recommended option, as it comes bundled with Java. It's a hassle-free way to jump right into the game.</p>

                <a className="btn vote-btn w-auto mb-4 pt-2" href="http://vulcanps.com/download/64bit.exe">
                    <FontAwesomeIcon icon={faDownload} className="mx-2" />
                    DOWNLOAD 64Bit</a>

                <a className="btn vote-btn w-auto mb-4 pt-2 mx-2" href="http://vulcanps.com/download/game.jar">
                    <FontAwesomeIcon icon={faDownload} className="mx-2" />
                    DOWNLOAD JAR</a>



                <p className="regular-text text-centre pb-4">If you have any issues launching the client, visit our Discord or the Help Desk of our forums.</p>

            </div>

        </div>
    )
}
