import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
        } from 'reactstrap';

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <Navbar color={"light"} light expand={"md"}>
                    <NavbarBrand href="/">SYMW</NavbarBrand>
                        <Nav className={"ml-auto"} navbar>
                            <NavItem>
                                <NavLink href={"http://localhost:8080/login"}>Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={"http://localhost:8080/register"}>Sign up</NavLink>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;

