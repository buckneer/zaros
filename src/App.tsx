import React from 'react';
import './App.scss';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import CSS from 'csstype';
import background from "../src/assets/main/bg.png";
import Store from "./pages/store/Store";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PlayNow from "./pages/playnow/PlayNow";
import Scores from "./pages/scores/Scores";
import Login from "./pages/login/Login";

const styles : CSS.Properties = {
    backgroundImage: `url(${background})`,
    backgroundColor: "#240806",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top'
}

function App() {
  return (
    <div className="App" style={styles}>
        <BrowserRouter>
            <Navigation />

            <Routes>
                <Route path="/play-now" element={<PlayNow />} />
                <Route path="/store" element={<Store />} />
                <Route path="/hiscores" element={<Scores />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </BrowserRouter>

    </div>
  );
}

export default App;
