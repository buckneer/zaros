import React from 'react';
import './App.scss';
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";
import CSS from 'csstype';
import background from "../src/assets/main/bg.png";
import Store from "./pages/store/Store";

const styles : CSS.Properties = {
    backgroundImage: `url(${background})`,

    backgroundColor: "#231C23",
    minHeight: "1000px",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center'
}

function App() {
  return (
    <div className="App" style={styles}>
        <Navigation />
        <Store />
        <Footer />
    </div>
  );
}

export default App;
