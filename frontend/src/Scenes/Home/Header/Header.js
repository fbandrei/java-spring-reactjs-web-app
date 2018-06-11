import React from 'react';
import {Jumbotron, Button} from 'reactstrap';
import './Header.css'


const Header = () => {
    return (
        <div>
            <Jumbotron>
                <div className={"center-header"}>
                    <h2 className={"center-header"}>Welcome to SYMW.</h2>
                    <Button className={"button-header"} href={"http://localhost:8080/login"}>Get started</Button>
                </div>
            </Jumbotron>
        </div>
    );
}

export default Header;