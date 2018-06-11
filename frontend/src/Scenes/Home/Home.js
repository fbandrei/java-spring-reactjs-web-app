import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navigation from "../../Components/Navbar/Navbar";
import Header from "./Header/Header.js"
import './Home.css'


class Home extends React.Component {
    render() {
        return(
            <div className={"Site"}>
                <div className={"Site-content"}>
                    <div>
                        <Navigation/>
                    </div>
                    <div>
                        <Header/>
                    </div>
                </div>
                <Footer/>
            </div>

        );
    }
}

export default Home;